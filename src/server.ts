/**
 * GoHighLevel MCP Server — stdio transport
 * Uses ToolRegistry for auto-dispatch.
 */

import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
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

dotenv.config();

class GHLMCPServer {
  private server: Server;
  private ghlClient: GHLApiClient;
  private registry: ToolRegistry;

  constructor() {
    this.server = new Server(
      { name: 'ghl-mcp-server', version: '1.0.0' },
      { capabilities: { tools: {} } }
    );

    this.ghlClient = this.initializeGHLClient();

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

    this.setupHandlers();
    this.server.onerror = (error) => console.error('[MCP Error]', error);
    process.on('SIGINT', async () => {
      await this.server.close();
      process.exit(0);
    });
  }

  private initializeGHLClient(): GHLApiClient {
    const config: GHLConfig = {
      accessToken: process.env.GHL_API_KEY || '',
      baseUrl: process.env.GHL_BASE_URL || 'https://services.leadconnectorhq.com',
      version: '2021-07-28',
      locationId: process.env.GHL_LOCATION_ID || ''
    };
    if (!config.accessToken) throw new Error('GHL_API_KEY environment variable is required');
    if (!config.locationId) throw new Error('GHL_LOCATION_ID environment variable is required');
    return new GHLApiClient(config);
  }

  private setupHandlers(): void {
    this.server.setRequestHandler(ListToolsRequestSchema, async () => {
      const tools = this.registry.getAllTools();
      console.error(`[GHL MCP] Registered ${tools.length} tools`);
      return { tools };
    });

    this.server.setRequestHandler(CallToolRequestSchema, async (request) => {
      const { name, arguments: args } = request.params;
      console.error(`[GHL MCP] Executing: ${name}`);

      if (!this.registry.has(name)) {
        throw new McpError(ErrorCode.MethodNotFound, `Unknown tool: ${name}`);
      }

      try {
        const result = await this.registry.execute(name, args || {});
        // Some tools return {content: [...]} directly
        if (result?.content && Array.isArray(result.content)) {
          return result;
        }
        return {
          content: [{
            type: 'text' as const,
            text: typeof result === 'string' ? result : JSON.stringify(result, null, 2)
          }]
        };
      } catch (error: any) {
        const msg = error?.response?.data?.message || error?.message || String(error);
        throw new McpError(ErrorCode.InternalError, `Tool execution failed: ${msg}`);
      }
    });
  }

  async run(): Promise<void> {
    const transport = new StdioServerTransport();
    await this.server.connect(transport);
    console.error(`[GHL MCP] Server running on stdio — ${this.registry.getCounts().total} tools`);
  }
}

async function main(): Promise<void> {
  const server = new GHLMCPServer();
  await server.run();
}

main().catch(console.error);
