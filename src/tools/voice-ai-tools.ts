/**
 * Voice AI Tools for MCP
 * Exposes Voice AI agent, call logs, and actions endpoints as MCP tools
 */

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import { GHLApiClient } from '../clients/ghl-api-client.js';

export class VoiceAITools {
  constructor(private ghl: GHLApiClient) {}

  getTools(): Tool[] {
    return [
      // Agents
      {
        name: 'voiceai_create_agent',
        description: 'Create a Voice AI agent',
        inputSchema: {
          type: 'object',
          properties: {
            agent: { type: 'object', description: 'Agent creation payload' }
          },
          required: ['agent']
        }
      },
      {
        name: 'voiceai_list_agents',
        description: 'List Voice AI agents',
        inputSchema: {
          type: 'object',
          properties: {
            locationId: { type: 'string' },
            page: { type: 'number' },
            pageSize: { type: 'number' },
            query: { type: 'string' }
          }
        }
      },
      {
        name: 'voiceai_get_agent',
        description: 'Get a Voice AI agent by ID',
        inputSchema: {
          type: 'object',
          properties: {
            agentId: { type: 'string' },
            locationId: { type: 'string' }
          },
          required: ['agentId']
        }
      },
      {
        name: 'voiceai_patch_agent',
        description: 'Patch a Voice AI agent by ID',
        inputSchema: {
          type: 'object',
          properties: {
            agentId: { type: 'string' },
            updates: { type: 'object' },
            locationId: { type: 'string' }
          },
          required: ['agentId', 'updates']
        }
      },
      {
        name: 'voiceai_delete_agent',
        description: 'Delete a Voice AI agent by ID',
        inputSchema: {
          type: 'object',
          properties: {
            agentId: { type: 'string' },
            locationId: { type: 'string' }
          },
          required: ['agentId']
        }
      },

      // Call logs
      {
        name: 'voiceai_list_call_logs',
        description: 'List Voice AI call logs with optional filters',
        inputSchema: {
          type: 'object',
          properties: {
            locationId: { type: 'string' },
            agentId: { type: 'string' },
            contactId: { type: 'string' },
            callType: { type: 'string', enum: ['LIVE', 'TRIAL'] },
            startDate: { type: 'number' },
            endDate: { type: 'number' },
            actionType: { type: 'string' },
            sortBy: { type: 'string', enum: ['duration', 'createdAt'] },
            sort: { type: 'string', enum: ['ascend', 'descend'] },
            page: { type: 'number' },
            pageSize: { type: 'number' }
          }
        }
      },
      {
        name: 'voiceai_get_call_log',
        description: 'Get a Voice AI call log by ID',
        inputSchema: {
          type: 'object',
          properties: {
            callId: { type: 'string' },
            locationId: { type: 'string' }
          },
          required: ['callId']
        }
      },

      // Actions
      {
        name: 'voiceai_create_action',
        description: 'Create a Voice AI action',
        inputSchema: {
          type: 'object',
          properties: {
            action: { type: 'object' }
          },
          required: ['action']
        }
      },
      {
        name: 'voiceai_get_action',
        description: 'Get a Voice AI action by ID',
        inputSchema: {
          type: 'object',
          properties: {
            actionId: { type: 'string' },
            locationId: { type: 'string' }
          },
          required: ['actionId']
        }
      },
      {
        name: 'voiceai_update_action',
        description: 'Update a Voice AI action by ID',
        inputSchema: {
          type: 'object',
          properties: {
            actionId: { type: 'string' },
            updates: { type: 'object' },
            locationId: { type: 'string' }
          },
          required: ['actionId', 'updates']
        }
      },
      {
        name: 'voiceai_delete_action',
        description: 'Delete a Voice AI action by ID',
        inputSchema: {
          type: 'object',
          properties: {
            actionId: { type: 'string' },
            locationId: { type: 'string' }
          },
          required: ['actionId']
        }
      }
    ];
  }

  async executeTool(name: string, args: any): Promise<any> {
    switch (name) {
      // Agents
      case 'voiceai_create_agent':
        return (await this.ghl.createVoiceAIAgent(args.agent)).data;
      case 'voiceai_list_agents':
        return (await this.ghl.listVoiceAIAgents({
          locationId: args.locationId,
          page: args.page,
          pageSize: args.pageSize,
          query: args.query
        })).data;
      case 'voiceai_get_agent':
        return (await this.ghl.getVoiceAIAgent(args.agentId, args.locationId)).data;
      case 'voiceai_patch_agent':
        return (await this.ghl.patchVoiceAIAgent(args.agentId, args.updates, args.locationId)).data;
      case 'voiceai_delete_agent':
        return (await this.ghl.deleteVoiceAIAgent(args.agentId, args.locationId)).data;

      // Call logs
      case 'voiceai_list_call_logs':
        return (await this.ghl.listVoiceAICallLogs({
          locationId: args.locationId,
          agentId: args.agentId,
          contactId: args.contactId,
          callType: args.callType,
          startDate: args.startDate,
          endDate: args.endDate,
          actionType: args.actionType,
          sortBy: args.sortBy,
          sort: args.sort,
          page: args.page,
          pageSize: args.pageSize
        })).data;
      case 'voiceai_get_call_log':
        return (await this.ghl.getVoiceAICallLog(args.callId, args.locationId)).data;

      // Actions
      case 'voiceai_create_action':
        return (await this.ghl.createVoiceAIAction(args.action)).data;
      case 'voiceai_get_action':
        return (await this.ghl.getVoiceAIAction(args.actionId, args.locationId)).data;
      case 'voiceai_update_action':
        return (await this.ghl.updateVoiceAIAction(args.actionId, args.updates, args.locationId)).data;
      case 'voiceai_delete_action':
        return (await this.ghl.deleteVoiceAIAction(args.actionId, args.locationId)).data;

      default:
        throw new Error(`Unknown tool: ${name}`);
    }
  }

  getToolDefinitions(): Tool[] { return this.getTools(); }
}

