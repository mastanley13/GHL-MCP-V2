/**
 * GoHighLevel MCP HTTP Server
 * HTTP version for ChatGPT web integration — uses ToolRegistry for auto-dispatch.
 */

import express from 'express';
import cors from 'cors';
import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { SSEServerTransport } from '@modelcontextprotocol/sdk/server/sse.js';
import { StreamableHTTPServerTransport } from '@modelcontextprotocol/sdk/server/streamableHttp.js';
import { randomUUID } from 'crypto';
import {
  CallToolRequestSchema,
  ErrorCode,
  ListToolsRequestSchema,
  McpError
} from '@modelcontextprotocol/sdk/types.js';
import * as dotenv from 'dotenv';

import { GHLApiClient } from './clients/ghl-api-client.js';
import { ToolRegistry } from './tools/tool-registry.js';
import { ContactTools } from './tools/contact-tools.js';
import { ConversationTools } from './tools/conversation-tools.js';
import { BlogTools } from './tools/blog-tools.js';
import { OpportunityTools } from './tools/opportunity-tools.js';
import { CalendarTools } from './tools/calendar-tools.js';
import { EmailTools } from './tools/email-tools.js';
import { LocationTools } from './tools/location-tools.js';
import { EmailISVTools } from './tools/email-isv-tools.js';
import { SocialMediaTools } from './tools/social-media-tools.js';
import { MediaTools } from './tools/media-tools.js';
import { ObjectTools } from './tools/object-tools.js';
import { AssociationTools } from './tools/association-tools.js';
import { CustomFieldV2Tools } from './tools/custom-field-v2-tools.js';
import { WorkflowTools } from './tools/workflow-tools.js';
import { SurveyTools } from './tools/survey-tools.js';
import { StoreTools } from './tools/store-tools.js';
import { ProductsTools } from './tools/products-tools.js';
import { PaymentsTools } from './tools/payments-tools.js';
import { InvoicesTools } from './tools/invoices-tools.js';
import { VoiceAITools } from './tools/voice-ai-tools.js';
import { GHLConfig } from './types/ghl-types.js';

// Load environment variables
dotenv.config();

/* ------------------------------------------------------------------ */
/*  Rate Limiter — simple sliding-window token bucket (10 req/sec)    */
/* ------------------------------------------------------------------ */
class RateLimiter {
  private tokens: number;
  private lastRefill: number;
  constructor(private maxTokens: number = 10, private refillRateMs: number = 1000) {
    this.tokens = maxTokens;
    this.lastRefill = Date.now();
  }
  tryConsume(): boolean {
    const now = Date.now();
    const elapsed = now - this.lastRefill;
    if (elapsed >= this.refillRateMs) {
      this.tokens = this.maxTokens;
      this.lastRefill = now;
    }
    if (this.tokens > 0) {
      this.tokens--;
      return true;
    }
    return false;
  }
}

/* ------------------------------------------------------------------ */
/*  Input Validator                                                    */
/* ------------------------------------------------------------------ */
function validateRequiredParams(toolName: string, args: Record<string, any>, required: string[]): void {
  const missing = required.filter(p => args[p] === undefined || args[p] === null || args[p] === '');
  if (missing.length > 0) {
    throw new McpError(
      ErrorCode.InvalidParams,
      `Tool "${toolName}" requires parameters: ${missing.join(', ')}`
    );
  }
}

/* ------------------------------------------------------------------ */
/*  GHL Error Wrapper                                                  */
/* ------------------------------------------------------------------ */
interface GHLErrorDetail {
  status?: number;
  message?: string;
  fields?: Record<string, any>;
  code?: string;
}

function formatGHLError(error: any): GHLErrorDetail {
  if (error?.response) {
    return {
      status: error.response.status,
      message: error.response.data?.message || error.response.data?.msg || error.message,
      fields: error.response.data?.errors || error.response.data?.fieldErrors,
      code: error.response.data?.code || error.response.data?.error,
    };
  }
  return { message: error?.message || String(error) };
}

/* ------------------------------------------------------------------ */
/*  HTTP MCP Server                                                    */
/* ------------------------------------------------------------------ */
class GHLMCPHttpServer {
  private app: express.Application;
  private server: Server;
  private ghlClient: GHLApiClient;
  private registry: ToolRegistry;
  private rateLimiter: RateLimiter;
  private port: number;
  private sseTransports: Map<string, SSEServerTransport> = new Map();
  private streamableTransports: Map<string, StreamableHTTPServerTransport> = new Map();

  constructor() {
    this.port = parseInt(process.env.PORT || process.env.MCP_SERVER_PORT || '8000');
    this.rateLimiter = new RateLimiter(10, 1000);

    // Initialize Express app
    this.app = express();
    this.setupExpress();

    // Initialize MCP server
    this.server = new Server(
      { name: 'ghl-mcp-server', version: '1.0.0' },
      { capabilities: { tools: {} } }
    );

    // Initialize GHL API client
    this.ghlClient = this.initializeGHLClient();

    // Build the tool registry — all modules auto-register
    this.registry = new ToolRegistry();
    this.registry.registerAll(
      new ContactTools(this.ghlClient),
      new ConversationTools(this.ghlClient),
      new BlogTools(this.ghlClient),
      new OpportunityTools(this.ghlClient),
      new CalendarTools(this.ghlClient),
      new EmailTools(this.ghlClient),
      new LocationTools(this.ghlClient),
      new EmailISVTools(this.ghlClient),
      new SocialMediaTools(this.ghlClient),
      new MediaTools(this.ghlClient),
      new ObjectTools(this.ghlClient),
      new AssociationTools(this.ghlClient),
      new CustomFieldV2Tools(this.ghlClient),
      new WorkflowTools(this.ghlClient),
      new SurveyTools(this.ghlClient),
      new StoreTools(this.ghlClient),
      new ProductsTools(this.ghlClient),
      new PaymentsTools(this.ghlClient),
      new InvoicesTools(this.ghlClient),
      new VoiceAITools(this.ghlClient),
    );

    // Setup handlers & routes
    this.setupMCPHandlers();
    this.setupRoutes();
  }

  /* ---------- Express middleware ---------- */
  private setupExpress(): void {
    this.app.use(cors({
      origin: ['https://chatgpt.com', 'https://chat.openai.com', 'http://localhost:*'],
      methods: ['GET', 'POST', 'OPTIONS', 'DELETE'],
      allowedHeaders: [
        'Content-Type', 'Authorization', 'Accept',
        'X-Session-Id', 'X-MCP-Session-Id', 'MCP-Session-Id'
      ],
      credentials: true
    }));
    this.app.use(express.json({ limit: '2mb' }));
    this.app.use((req, _res, next) => {
      console.log(`[HTTP] ${req.method} ${req.path} - ${new Date().toISOString()}`);
      next();
    });
  }

  /* ---------- GHL client init ---------- */
  private initializeGHLClient(): GHLApiClient {
    const config: GHLConfig = {
      accessToken: process.env.GHL_API_KEY || '',
      baseUrl: process.env.GHL_BASE_URL || 'https://services.leadconnectorhq.com',
      version: '2021-07-28',
      locationId: process.env.GHL_LOCATION_ID || ''
    };
    if (!config.accessToken) throw new Error('GHL_API_KEY environment variable is required');
    if (!config.locationId) throw new Error('GHL_LOCATION_ID environment variable is required');

    console.log(`[GHL MCP HTTP] Base URL: ${config.baseUrl}`);
    console.log(`[GHL MCP HTTP] Location ID: ${config.locationId}`);
    return new GHLApiClient(config);
  }

  /* ---------- MCP handlers (registry-based) ---------- */
  private setupMCPHandlers(): void {
    // List tools
    this.server.setRequestHandler(ListToolsRequestSchema, async () => {
      try {
        const tools = this.registry.getAllTools();
        console.log(`[GHL MCP HTTP] Registered ${tools.length} tools total`);
        return { tools };
      } catch (error) {
        console.error('[GHL MCP HTTP] Error listing tools:', error);
        throw new McpError(ErrorCode.InternalError, `Failed to list tools: ${error}`);
      }
    });

    // Execute tool
    this.server.setRequestHandler(CallToolRequestSchema, async (request) => {
      const { name, arguments: args } = request.params;
      console.log(`[GHL MCP HTTP] Executing tool: ${name}`);

      // Rate limit
      if (!this.rateLimiter.tryConsume()) {
        throw new McpError(ErrorCode.InternalError, 'Rate limit exceeded — max 10 requests/second');
      }

      // Check tool exists
      if (!this.registry.has(name)) {
        throw new McpError(ErrorCode.MethodNotFound, `Unknown tool: ${name}`);
      }

      try {
        const result = await this.registry.execute(name, args || {});
        console.log(`[GHL MCP HTTP] Tool ${name} executed successfully`);
        return {
          content: [{
            type: 'text' as const,
            text: typeof result === 'string' ? result : JSON.stringify(result, null, 2)
          }]
        };
      } catch (error: any) {
        const detail = formatGHLError(error);
        console.error(`[GHL MCP HTTP] Error executing tool ${name}:`, detail);
        throw new McpError(
          ErrorCode.InternalError,
          JSON.stringify({
            tool: name,
            ...detail
          })
        );
      }
    });
  }

  /* ---------- HTTP Routes ---------- */
  private setupRoutes(): void {
    // Health
    this.app.get('/health', (_req, res) => {
      res.json({
        status: 'healthy',
        server: 'ghl-mcp-server',
        version: '1.0.0',
        timestamp: new Date().toISOString(),
        tools: this.registry.getCounts()
      });
    });

    // Capabilities
    this.app.get('/capabilities', (_req, res) => {
      res.json({
        capabilities: { tools: {} },
        server: { name: 'ghl-mcp-server', version: '1.0.0' }
      });
    });

    // Tools listing
    this.app.get('/tools', async (_req, res) => {
      try {
        const tools = this.registry.getAllTools();
        res.json({ tools, count: tools.length });
      } catch (error) {
        res.status(500).json({ error: 'Failed to list tools' });
      }
    });

    // Streamable HTTP (modern MCP clients)
    this.app.all('/mcp', async (req, res) => {
      try {
        let transport: StreamableHTTPServerTransport | undefined;
        const sidHeader = (req.headers['x-session-id'] || req.headers['x-mcp-session-id'] || req.headers['mcp-session-id']) as string | undefined;
        if (sidHeader) transport = this.streamableTransports.get(sidHeader);

        if (!transport) {
          transport = new StreamableHTTPServerTransport({
            sessionIdGenerator: () => randomUUID(),
            onsessioninitialized: (sid: string) => {
              this.streamableTransports.set(sid, transport!);
              console.log(`[GHL MCP HTTP] Streamable session initialized: ${sid}`);
            },
          });
          await this.server.connect(transport);
        }

        await transport.handleRequest(req as any, res as any, (req as any).body);

        transport.onclose = () => {
          if (transport?.sessionId) {
            this.streamableTransports.delete(transport.sessionId);
            console.log(`[GHL MCP HTTP] Streamable session closed: ${transport.sessionId}`);
          }
        };
      } catch (error) {
        console.error('[GHL MCP HTTP] Streamable HTTP error:', error);
        if (!res.headersSent) res.status(500).json({ error: 'Streamable HTTP handling failed' });
        else res.end();
      }
    });

    // SSE (legacy MCP clients)
    this.app.get('/sse', async (req, res) => {
      try {
        const transport = new SSEServerTransport('/sse', res);
        await this.server.connect(transport);
        const sid = transport.sessionId;
        this.sseTransports.set(sid, transport);
        console.log(`[GHL MCP HTTP] SSE connected. Session: ${sid}`);
        transport.onclose = () => {
          this.sseTransports.delete(sid);
          console.log(`[GHL MCP HTTP] SSE closed. Session: ${sid}`);
        };
      } catch (error) {
        console.error('[GHL MCP HTTP] SSE GET error:', error);
        if (!res.headersSent) res.status(500).json({ error: 'Failed to establish SSE connection' });
        else res.end();
      }
    });

    this.app.post('/sse', async (req, res) => {
      const sessionId = (req.query.sessionId as string) || '';
      const transport = sessionId ? this.sseTransports.get(sessionId) : undefined;
      if (!transport) {
        res.status(400).json({ error: 'Unknown or missing sessionId' });
        return;
      }
      try {
        await transport.handlePostMessage(req as any, res);
      } catch (error) {
        console.error(`[GHL MCP HTTP] SSE POST error for session ${sessionId}:`, error);
        if (!res.headersSent) res.status(500).json({ error: 'Failed to handle SSE message' });
        else res.end();
      }
    });

    // Root info
    this.app.get('/', (_req, res) => {
      res.json({
        name: 'GoHighLevel MCP Server',
        version: '1.0.0',
        status: 'running',
        endpoints: { health: '/health', capabilities: '/capabilities', tools: '/tools', sse: '/sse', mcp: '/mcp' },
        tools: this.registry.getCounts()
      });
    });
  }

  /* ---------- Connection test ---------- */
  private async testGHLConnection(): Promise<void> {
    try {
      console.log('[GHL MCP HTTP] Testing GHL API connection...');
      const result = await this.ghlClient.testConnection();
      console.log('[GHL MCP HTTP] GHL API connection successful');
      console.log(`[GHL MCP HTTP] Connected to location: ${result.data?.locationId}`);
    } catch (error) {
      console.error('[GHL MCP HTTP] GHL API connection failed:', error);
      throw new Error(`Failed to connect to GHL API: ${error}`);
    }
  }

  /* ---------- Start ---------- */
  async start(): Promise<void> {
    console.log('Starting GoHighLevel MCP HTTP Server...');
    try {
      await this.testGHLConnection();
      this.app.listen(this.port, '0.0.0.0', () => {
        console.log(`Server running on http://0.0.0.0:${this.port}`);
        console.log(`Tools available: ${this.registry.getCounts().total}`);
        console.log('Ready for MCP connections');
      });
    } catch (error) {
      console.error('Failed to start GHL MCP HTTP Server:', error);
      process.exit(1);
    }
  }
}

/* ---------- Graceful shutdown ---------- */
function setupGracefulShutdown(): void {
  const shutdown = (signal: string) => {
    console.log(`Received ${signal}, shutting down...`);
    process.exit(0);
  };
  process.on('SIGINT', () => shutdown('SIGINT'));
  process.on('SIGTERM', () => shutdown('SIGTERM'));
}

/* ---------- Main ---------- */
async function main(): Promise<void> {
  setupGracefulShutdown();
  const server = new GHLMCPHttpServer();
  await server.start();
}

main().catch((error) => {
  console.error('Unhandled error:', error);
  process.exit(1);
});
