/**
 * Base interface for all GHL tool modules.
 * Every tool module must implement this interface so the
 * registry can auto-discover definitions and route calls.
 */
import { GHLApiClient } from '../clients/ghl-api-client.js';

/** Loose tool definition type that's compatible with the MCP SDK Tool type */
export interface ToolDefinition {
  name: string;
  description?: string;
  inputSchema: Record<string, any>;
  [key: string]: any;
}

export interface IToolModule {
  /** Return MCP tool definitions for this module */
  getToolDefinitions(): ToolDefinition[];
  /** Execute a named tool with the given arguments */
  executeTool(name: string, args: Record<string, any>): Promise<any>;
}

/**
 * Abstract base class that tool modules can extend.
 */
export abstract class BaseToolModule implements IToolModule {
  constructor(protected client: GHLApiClient) {}
  abstract getToolDefinitions(): ToolDefinition[];
  abstract executeTool(name: string, args: Record<string, any>): Promise<any>;
}
