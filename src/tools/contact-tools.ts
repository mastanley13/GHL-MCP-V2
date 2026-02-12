/**
 * GoHighLevel Contact Tools - PRODUCTION READY VERSION
 * Implements all contact management functionality for the MCP server
 *
 * CHANGELOG:
 * - Fixed search_contacts to use query parameter for email/phone searches
 * - Fixed get_contact with proper contactId validation
 * - Enhanced search_contacts response with contactId on top level
 * - Added comprehensive error handling and logging
 * - Preserved get_contact tool with proper workflow
 * - Fixed "successed" typos to "succeeded"
 * - Added input validation to all methods
 * - Standardized response structures
 * - Implemented type guards
 * - Added retry logic with exponential backoff
 * - FIXED: APIError class now includes statusCode property
 * - FIXED: retryWithExponentialBackoff now uses statusCode instead of status
 */

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import { GHLApiClient } from '../clients/ghl-api-client.js';
import {
  MCPCreateContactParams,
  MCPSearchContactsParams,
  MCPUpdateContactParams,
  MCPAddContactTagsParams,
  MCPRemoveContactTagsParams,
  // Task Management
  MCPGetContactTasksParams,
  MCPCreateContactTaskParams,
  MCPGetContactTaskParams,
  MCPUpdateContactTaskParams,
  MCPDeleteContactTaskParams,
  MCPUpdateTaskCompletionParams,
  // Note Management
  MCPGetContactNotesParams,
  MCPCreateContactNoteParams,
  MCPGetContactNoteParams,
  MCPUpdateContactNoteParams,
  MCPDeleteContactNoteParams,
  // Advanced Operations
  MCPUpsertContactParams,
  MCPGetDuplicateContactParams,
  MCPGetContactsByBusinessParams,
  MCPGetContactAppointmentsParams,
  // Bulk Operations
  MCPBulkUpdateContactTagsParams,
  MCPBulkUpdateContactBusinessParams,
  // Followers Management
  MCPAddContactFollowersParams,
  MCPRemoveContactFollowersParams,
  // Campaign Management
  MCPAddContactToCampaignParams,
  MCPRemoveContactFromCampaignParams,
  MCPRemoveContactFromAllCampaignsParams,
  // Workflow Management
  MCPAddContactToWorkflowParams,
  MCPRemoveContactFromWorkflowParams,
  GHLContact,
  GHLSearchContactsResponse,
  GHLContactTagsResponse,
  GHLTask,
  GHLNote,
  GHLAppointment,
  GHLUpsertContactResponse,
  GHLBulkTagsResponse,
  GHLBulkBusinessResponse,
  GHLFollowersResponse
} from '../types/ghl-types.js';

// ═══════════════════════════════════════════════════════════
// ERROR CLASSES - FIXED VERSION
// ═══════════════════════════════════════════════════════════

class ValidationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'ValidationError';
  }
}

class APIError extends Error {
  public statusCode?: number;
  public details?: any;

  constructor(message: string, statusCode?: number, details?: any) {
    super(message);
    this.name = 'APIError';
    this.statusCode = statusCode;
    this.details = details;
  }
}

class NotFoundError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'NotFoundError';
  }
}

// ═══════════════════════════════════════════════════════════
// TYPE GUARDS
// ═══════════════════════════════════════════════════════════

function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

function isValidCreateContactParams(params: any): params is MCPCreateContactParams {
  return params && 
         typeof params.email === 'string' && 
         isValidEmail(params.email) &&
         (params.firstName === undefined || typeof params.firstName === 'string') &&
         (params.lastName === undefined || typeof params.lastName === 'string') &&
         (params.phone === undefined || typeof params.phone === 'string') &&
         (params.tags === undefined || Array.isArray(params.tags)) &&
         (params.source === undefined || typeof params.source === 'string');
}

function isValidSearchContactsParams(params: any): params is MCPSearchContactsParams {
  return params && 
         (typeof params.query === 'string' || 
          typeof params.email === 'string' || 
          typeof params.phone === 'string') &&
         (params.limit === undefined || typeof params.limit === 'number');
}

function isValidUpdateContactParams(params: any): params is MCPUpdateContactParams {
  return params && 
         typeof params.contactId === 'string' &&
         params.contactId.trim() !== '' &&
         (params.firstName === undefined || typeof params.firstName === 'string') &&
         (params.lastName === undefined || typeof params.lastName === 'string') &&
         (params.email === undefined || (typeof params.email === 'string' && isValidEmail(params.email))) &&
         (params.phone === undefined || typeof params.phone === 'string') &&
         (params.tags === undefined || Array.isArray(params.tags));
}

function isValidContactId(contactId: string): boolean {
  return typeof contactId === 'string' && contactId.trim() !== '';
}

/**
 * Retry utility with exponential backoff
 * Automatically retries failed operations for transient errors
 */
async function retryWithExponentialBackoff<T>(
  fn: () => Promise<T>,
  maxRetries: number = 3,
  initialDelay: number = 1000,
  factor: number = 2
): Promise<T> {
  let attempt = 0;
  let delay = initialDelay;

  while (true) {
    try {
      return await fn();
    } catch (error: any) {
      // FIXED: Безпечний доступ до коду статусу з різних типів помилок
      const statusCode = error.statusCode || error.status || 0;
      const isRetryable = [429, 500, 502, 503, 504].includes(statusCode);
      
      // Якщо досягли ліміту спроб або помилка не підлягає повтору - кидаємо її
      if (attempt >= maxRetries || !isRetryable) {
        throw error;
      }
      
      // Чекаємо затримку перед наступною спробою
      await new Promise(resolve => setTimeout(resolve, delay));
      delay *= factor;
      attempt++;
    }
  }
}

// ═══════════════════════════════════════════════════════════
// CONTACT TOOLS CLASS
// ═══════════════════════════════════════════════════════════

/**
 * Contact Tools class
 * Provides comprehensive contact management capabilities
 */
export class ContactTools {
  constructor(private ghlClient: GHLApiClient) {}

  /**
   * Get tool definitions for all contact operations
   */
  getToolDefinitions(): Tool[] {
    return [
      // Basic Contact Management
      {
        name: 'create_contact',
        description: 'Create a new contact in GoHighLevel CRM. CRITICAL: Always use search_contacts with email parameter FIRST to check for duplicates before creating. If contact exists, use update_contact instead. For uncertain cases, use upsert_contact which automatically handles both create and update. Returns contactId (save this for future operations). LocationId is auto-handled by server.',
        inputSchema: {
          type: 'object',
          properties: {
            email: {
              type: 'string',
              format: 'email',
              description: 'Contact primary email address (REQUIRED). Must be unique per location. Used as primary identifier for duplicate detection. Format: user@domain.com (lowercase recommended). Example: "john.doe@example.com". Will be used for all email communications.'
            },
            firstName: {
              type: 'string',
              description: 'Contact first name. Used for personalization in emails and SMS. Should be properly capitalized. Optional but highly recommended for personalized communication. Min 1, max 50 characters. Example: "John"'
            },
            lastName: {
              type: 'string',
              description: 'Contact last name. Combined with firstName for full name display in CRM. Should be properly capitalized. Optional. Min 1, max 50 characters. Example: "Doe"'
            },
            phone: {
              type: 'string',
              description: 'Contact phone number. Accepts any format but E.164 international format recommended for SMS delivery (+14155552671). Used for SMS communications and calls. Optional. Example: "+380501234567" or "0501234567"'
            },
            tags: {
              type: 'array',
              items: { type: 'string' },
              description: 'Tags for contact segmentation and filtering. Use existing location tags when possible. Tags are case-insensitive. Optional. Max 20 tags, each max 50 characters. Examples: ["VIP", "Newsletter", "Enterprise", "Webinar Attendee"]'
            },
            source: {
              type: 'string',
              description: 'Source of contact acquisition. Used for tracking lead sources and attribution. Optional. Defaults to "ChatGPT MCP". Max 100 characters. Examples: "Website Form", "Facebook Ad", "Referral", "Manual Entry", "LinkedIn Campaign"'
            }
          },
          required: ['email']
        }
      },
      {
        name: 'search_contacts',
        description: 'Search for contacts in GoHighLevel using email, phone, or name query. Returns array of matching contacts with contactId on top level for easy access. CRITICAL USAGE: Call this BEFORE create_contact to check for duplicates. Returns contactId field that can be used directly in other tools like get_contact, update_contact, add_contact_tags. IMPORTANT: Provide at least ONE search parameter (query, email, or phone). Email search is most reliable for exact matches. LocationId is auto-handled.',
        inputSchema: {
          type: 'object',
          properties: {
            query: {
              type: 'string',
              description: 'Search by contact name, email, or phone. Performs fuzzy search across all text fields (firstName, lastName, email, phone, company). Case-insensitive. Min 2 characters for performance. Optional. Examples: "John Doe", "john@example.com", "0501234567", "Acme Corp"'
            },
            email: {
              type: 'string',
              format: 'email',
              description: 'Search by exact email address match. MOST RELIABLE method for duplicate detection. Case-insensitive. Returns 0 or 1 result. Format: user@domain.com. Optional. Example: "john.doe@example.com"'
            },
            phone: {
              type: 'string',
              description: 'Search by phone number. Searches across various phone formats. Less reliable than email due to formatting variations. Accepts any format. Optional. Examples: "+380501234567", "0501234567", "(050) 123-4567"'
            },
            limit: {
              type: 'number',
              description: 'Maximum number of results to return. Default: 25. Min: 1, Max: 100. Use smaller numbers (10-25) for faster responses. Larger numbers (50-100) for comprehensive searches. Optional.'
            }
          }
        }
      },
      {
        name: 'get_contact',
        description: 'Get COMPLETE detailed information about a specific contact by exact contactId. CRITICAL WORKFLOW: 1) First use search_contacts to find contact and get contactId from result.contactId field. 2) Then use this tool with that contactId. REQUIRED: Valid contactId from search_contacts result. Returns ALL contact fields including custom fields, metadata, business association. DO NOT use this tool without getting contactId from search_contacts first. If you receive undefined contactId error, use search_contacts first to get the contactId.',
        inputSchema: {
          type: 'object',
          properties: {
            contactId: {
              type: 'string',
              description: 'Exact contact ID obtained from search_contacts tool result.contactId field. REQUIRED. Must be a valid ID, not undefined or null. Example: "abc123xyz456def789". Get this from search_contacts response: result.contactId or result.contacts[0].id.'
            }
          },
          required: ['contactId']
        }
      },
      {
        name: 'update_contact',
        description: 'Update existing contact information in GoHighLevel. Only updates provided fields (partial update). IMPORTANT: Tags will REPLACE existing tags (not merge). To append tags, use add_contact_tags instead. Use search_contacts first to get contactId. Returns updated contact object. LocationId is auto-handled.',
        inputSchema: {
          type: 'object',
          properties: {
            contactId: {
              type: 'string',
              description: 'Contact ID to update. Get from search_contacts or previous operations. Required.'
            },
            firstName: {
              type: 'string',
              description: 'New first name (optional). Will replace existing firstName if provided. Leave empty to keep current value.'
            },
            lastName: {
              type: 'string',
              description: 'New last name (optional). Will replace existing lastName if provided.'
            },
            email: {
              type: 'string',
              format: 'email',
              description: 'New email address (optional). Must be unique per location. Check duplicates first with search_contacts if changing email.'
            },
            phone: {
              type: 'string',
              description: 'New phone number (optional). E.164 format recommended for SMS delivery.'
            },
            tags: {
              type: 'array',
              items: { type: 'string' },
              description: 'Tags array (optional). WARNING: This REPLACES all existing tags. To add tags while keeping existing ones, use add_contact_tags instead. To remove specific tags, use remove_contact_tags.'
            }
          },
          required: ['contactId']
        }
      },
      {
        name: 'delete_contact',
        description: 'Permanently delete contact from GoHighLevel. WARNING: IRREVERSIBLE operation. Deletes ALL related data including tasks, notes, appointments, conversation history, opportunities. Cannot be undone. ALWAYS confirm with user before executing. Use sparingly. Consider deactivating or tagging as "Inactive" instead. Required: contactId.',
        inputSchema: {
          type: 'object',
          properties: {
            contactId: {
              type: 'string',
              description: 'Contact ID to permanently delete. WARNING: This action cannot be undone. All contact data will be lost forever.'
            }
          },
          required: ['contactId']
        }
      },
      {
        name: 'add_contact_tags',
        description: 'Add tags to existing contact (APPENDS to existing tags, does not replace). Use this to add tags while keeping existing ones. Tags are used for segmentation, filtering, automation triggers. Tags are case-insensitive. Duplicates are automatically ignored. Returns updated tags array. Use search_contacts first to get contactId.',
        inputSchema: {
          type: 'object',
          properties: {
            contactId: {
              type: 'string',
              description: 'Contact ID to add tags to. Get from search_contacts. Required.'
            },
            tags: {
              type: 'array',
              items: { type: 'string' },
              description: 'Array of tag names to ADD (append) to contact. Tags will be created if they don\'t exist in location. Case-insensitive. Max 20 new tags per call. Each tag max 50 characters. Examples: ["VIP", "Premium", "Newsletter Subscriber"]'
            }
          },
          required: ['contactId', 'tags']
        }
      },
      {
        name: 'remove_contact_tags',
        description: 'Remove specific tags from contact. Only removes specified tags, keeps all others. Case-insensitive matching. If tag doesn\'t exist on contact, silently ignored. Returns updated tags array. Use search_contacts first to get contactId.',
        inputSchema: {
          type: 'object',
          properties: {
            contactId: {
              type: 'string',
              description: 'Contact ID to remove tags from. Required.'
            },
            tags: {
              type: 'array',
              items: { type: 'string' },
              description: 'Array of tag names to REMOVE from contact. Case-insensitive. Tags not found on contact will be ignored. Examples: ["Trial", "Old", "Inactive"]'
            }
          },
          required: ['contactId', 'tags']
        }
      },

      // Task Management
      {
        name: 'get_contact_tasks',
        description: 'Get all tasks (to-dos) for a specific contact. Returns array of tasks with taskId, title, description, dueDate, completed status, assignedTo user. Use this to view existing tasks before creating new ones. Useful for task management workflows.',
        inputSchema: {
          type: 'object',
          properties: {
            contactId: {
              type: 'string',
              description: 'Contact ID to get tasks for. Returns empty array if no tasks exist.'
            }
          },
          required: ['contactId']
        }
      },
      {
        name: 'create_contact_task',
        description: 'Create a new task (to-do) for a contact. Tasks are reminders/action items for team members. Can be assigned to specific users. Due dates trigger notifications. Returns taskId for future updates. Use for follow-up reminders, callbacks, appointments scheduling.',
        inputSchema: {
          type: 'object',
          properties: {
            contactId: { type: 'string', description: 'Contact ID to create task for. Required.' },
            title: { type: 'string', description: 'Task title (required). Short description of task. Max 200 characters. Examples: "Follow up call", "Send proposal"' },
            body: { type: 'string', description: 'Task description/notes (optional). Detailed information. Supports HTML. Max 5000 characters.' },
            dueDate: { type: 'string', description: 'Task due date (required). ISO 8601 format. Example: "2025-10-30T14:00:00Z"' },
            completed: { type: 'boolean', description: 'Task completion status (optional). Default: false.' },
            assignedTo: { type: 'string', description: 'User ID to assign task to (optional).' }
          },
          required: ['contactId', 'title', 'dueDate']
        }
      },
      {
        name: 'get_contact_task',
        description: 'Get a specific task for a contact',
        inputSchema: {
          type: 'object',
          properties: {
            contactId: { type: 'string', description: 'Contact ID' },
            taskId: { type: 'string', description: 'Task ID' }
          },
          required: ['contactId', 'taskId']
        }
      },
      {
        name: 'update_contact_task',
        description: 'Update a task for a contact',
        inputSchema: {
          type: 'object',
          properties: {
            contactId: { type: 'string', description: 'Contact ID' },
            taskId: { type: 'string', description: 'Task ID' },
            title: { type: 'string', description: 'Task title' },
            body: { type: 'string', description: 'Task description' },
            dueDate: { type: 'string', description: 'Due date (ISO format)' },
            completed: { type: 'boolean', description: 'Task completion status' },
            assignedTo: { type: 'string', description: 'User ID to assign task to' }
          },
          required: ['contactId', 'taskId']
        }
      },
      {
        name: 'delete_contact_task',
        description: 'Delete a task for a contact',
        inputSchema: {
          type: 'object',
          properties: {
            contactId: { type: 'string', description: 'Contact ID' },
            taskId: { type: 'string', description: 'Task ID' }
          },
          required: ['contactId', 'taskId']
        }
      },
      {
        name: 'update_task_completion',
        description: 'Mark task as completed or incomplete. Quick way to update task status without changing other fields. Returns updated task object.',
        inputSchema: {
          type: 'object',
          properties: {
            contactId: { type: 'string', description: 'Contact ID' },
            taskId: { type: 'string', description: 'Task ID to update' },
            completed: { type: 'boolean', description: 'Completion status. true = mark complete, false = mark incomplete' }
          },
          required: ['contactId', 'taskId', 'completed']
        }
      },

      // Note Management
      {
        name: 'get_contact_notes',
        description: 'Get all notes for a contact',
        inputSchema: {
          type: 'object',
          properties: {
            contactId: { type: 'string', description: 'Contact ID' }
          },
          required: ['contactId']
        }
      },
      {
        name: 'create_contact_note',
        description: 'Create a new note for a contact',
        inputSchema: {
          type: 'object',
          properties: {
            contactId: { type: 'string', description: 'Contact ID' },
            body: { type: 'string', description: 'Note content' },
            userId: { type: 'string', description: 'User ID creating the note' }
          },
          required: ['contactId', 'body']
        }
      },
      {
        name: 'get_contact_note',
        description: 'Get a specific note for a contact',
        inputSchema: {
          type: 'object',
          properties: {
            contactId: { type: 'string', description: 'Contact ID' },
            noteId: { type: 'string', description: 'Note ID' }
          },
          required: ['contactId', 'noteId']
        }
      },
      {
        name: 'update_contact_note',
        description: 'Update a note for a contact',
        inputSchema: {
          type: 'object',
          properties: {
            contactId: { type: 'string', description: 'Contact ID' },
            noteId: { type: 'string', description: 'Note ID' },
            body: { type: 'string', description: 'Note content' },
            userId: { type: 'string', description: 'User ID updating the note' }
          },
          required: ['contactId', 'noteId', 'body']
        }
      },
      {
        name: 'delete_contact_note',
        description: 'Delete a note for a contact',
        inputSchema: {
          type: 'object',
          properties: {
            contactId: { type: 'string', description: 'Contact ID' },
            noteId: { type: 'string', description: 'Note ID' }
          },
          required: ['contactId', 'noteId']
        }
      },

      // Advanced Contact Operations
      {
        name: 'upsert_contact',
        description: 'Smart create OR update contact automatically. Checks if contact exists by email/phone, then creates if new or updates if exists. BEST CHOICE when importing contacts or unsure if contact exists. Eliminates need for manual duplicate checking. Returns contactId and "created" boolean (true if new, false if updated). LocationId auto-handled.',
        inputSchema: {
          type: 'object',
          properties: {
            email: { type: 'string', format: 'email', description: 'Email address (recommended for upsert). Used to find existing contact.' },
            phone: { type: 'string', description: 'Phone number (alternative to email).' },
            firstName: { type: 'string', description: 'First name. Creates/updates this field.' },
            lastName: { type: 'string', description: 'Last name. Creates/updates this field.' },
            tags: { type: 'array', items: { type: 'string' }, description: 'Tags to assign. If updating, REPLACES existing tags.' },
            source: { type: 'string', description: 'Contact source for new contacts. Ignored if contact already exists.' },
            assignedTo: { type: 'string', description: 'User ID to assign contact to (optional).' }
          }
        }
      },
      {
        name: 'get_duplicate_contact',
        description: 'Check if contact already exists by email or phone WITHOUT creating. Returns existing contact object if found, null if not found. Use this for pre-validation before create_contact, or to find contactId without full search. Faster than search_contacts for simple existence check.',
        inputSchema: {
          type: 'object',
          properties: {
            email: { type: 'string', format: 'email', description: 'Email to check for duplicates.' },
            phone: { type: 'string', description: 'Phone to check for duplicates.' }
          }
        }
      },
      {
        name: 'get_contacts_by_business',
        description: 'Get contacts associated with a specific business',
        inputSchema: {
          type: 'object',
          properties: {
            businessId: { type: 'string', description: 'Business ID' },
            limit: { type: 'number', description: 'Maximum number of results' },
            skip: { type: 'number', description: 'Number of results to skip' },
            query: { type: 'string', description: 'Search query' }
          },
          required: ['businessId']
        }
      },
      {
        name: 'get_contact_appointments',
        description: 'Get all appointments for a contact',
        inputSchema: {
          type: 'object',
          properties: {
            contactId: { type: 'string', description: 'Contact ID' }
          },
          required: ['contactId']
        }
      },

      // Bulk Operations
      {
        name: 'bulk_update_contact_tags',
        description: 'Add or remove tags from multiple contacts in ONE operation. Much more efficient than calling add_contact_tags/remove_contact_tags multiple times. Use for mass segmentation, campaign tagging, or cleanup. Max 100 contacts per call. Returns count of successfully updated contacts.',
        inputSchema: {
          type: 'object',
          properties: {
            contactIds: { type: 'array', items: { type: 'string' }, description: 'Array of contact IDs. Min 1, max 100.' },
            tags: { type: 'array', items: { type: 'string' }, description: 'Tags to add or remove from all specified contacts.' },
            operation: { type: 'string', enum: ['add', 'remove'], description: '"add" = append tags. "remove" = remove tags.' },
            removeAllTags: { type: 'boolean', description: 'If true, removes ALL existing tags before adding new ones (only with operation="add").' }
          },
          required: ['contactIds', 'tags', 'operation']
        }
      },
      {
        name: 'bulk_update_contact_business',
        description: 'Bulk update business association for multiple contacts',
        inputSchema: {
          type: 'object',
          properties: {
            contactIds: { type: 'array', items: { type: 'string' }, description: 'Array of contact IDs' },
            businessId: { type: 'string', description: 'Business ID (null to remove from business)' }
          },
          required: ['contactIds']
        }
      },

      // Followers Management
      {
        name: 'add_contact_followers',
        description: 'Add followers to a contact',
        inputSchema: {
          type: 'object',
          properties: {
            contactId: { type: 'string', description: 'Contact ID' },
            followers: { type: 'array', items: { type: 'string' }, description: 'Array of user IDs to add as followers' }
          },
          required: ['contactId', 'followers']
        }
      },
      {
        name: 'remove_contact_followers',
        description: 'Remove followers from a contact',
        inputSchema: {
          type: 'object',
          properties: {
            contactId: { type: 'string', description: 'Contact ID' },
            followers: { type: 'array', items: { type: 'string' }, description: 'Array of user IDs to remove as followers' }
          },
          required: ['contactId', 'followers']
        }
      },

      // Campaign Management
      {
        name: 'add_contact_to_campaign',
        description: 'Add contact to a marketing campaign',
        inputSchema: {
          type: 'object',
          properties: {
            contactId: { type: 'string', description: 'Contact ID' },
            campaignId: { type: 'string', description: 'Campaign ID' }
          },
          required: ['contactId', 'campaignId']
        }
      },
      {
        name: 'remove_contact_from_campaign',
        description: 'Remove contact from a specific campaign',
        inputSchema: {
          type: 'object',
          properties: {
            contactId: { type: 'string', description: 'Contact ID' },
            campaignId: { type: 'string', description: 'Campaign ID' }
          },
          required: ['contactId', 'campaignId']
        }
      },
      {
        name: 'remove_contact_from_all_campaigns',
        description: 'Remove contact from all campaigns',
        inputSchema: {
          type: 'object',
          properties: {
            contactId: { type: 'string', description: 'Contact ID' }
          },
          required: ['contactId']
        }
      },

      // Workflow Management
      {
        name: 'add_contact_to_workflow',
        description: 'Enroll contact in automation workflow. Triggers workflow automation sequence (emails, SMS, tasks, etc.). Contact will start receiving automated messages based on workflow configuration. Use for onboarding, nurture sequences, follow-ups. Get workflowId from ghl_get_workflows tool first.',
        inputSchema: {
          type: 'object',
          properties: {
            contactId: { type: 'string', description: 'Contact ID to enroll in workflow. Required.' },
            workflowId: { type: 'string', description: 'Workflow ID to enroll contact in. Get from ghl_get_workflows tool. Required.' },
            eventStartTime: { type: 'string', description: 'Workflow start time (optional). ISO 8601 format. If not provided, starts immediately.' }
          },
          required: ['contactId', 'workflowId']
        }
      },
      {
        name: 'remove_contact_from_workflow',
        description: 'Unenroll contact from automation workflow. STOPS all pending workflow actions for this contact. Already-sent messages cannot be recalled. Use when contact unsubscribes, opts out, or no longer needs automation.',
        inputSchema: {
          type: 'object',
          properties: {
            contactId: { type: 'string', description: 'Contact ID to remove from workflow.' },
            workflowId: { type: 'string', description: 'Workflow ID to remove contact from.' },
            eventStartTime: { type: 'string', description: 'Optional. If workflow was started with specific eventStartTime, provide it here.' }
          },
          required: ['contactId', 'workflowId']
        }
      }
    ];
  }

  /**
   * Execute a contact tool with the given parameters
   * @param toolName The name of the tool to execute
   * @param params The parameters for the tool
   * @returns Standardized response object
   */
  async executeTool(toolName: string, params: any): Promise<{ success: boolean; data?: any; error?: string }> {
    try {
      switch (toolName) {
        // Basic Contact Management
        case 'create_contact':
          return await this.createContact(params as MCPCreateContactParams);
        case 'search_contacts':
          return await this.searchContacts(params as MCPSearchContactsParams);
        case 'get_contact':
          return await this.getContact(params.contactId);
        case 'update_contact':
          return await this.updateContact(params as MCPUpdateContactParams);
        case 'delete_contact':
          return await this.deleteContact(params.contactId);
        case 'add_contact_tags':
          return await this.addContactTags(params as MCPAddContactTagsParams);
        case 'remove_contact_tags':
          return await this.removeContactTags(params as MCPRemoveContactTagsParams);

        // Task Management
        case 'get_contact_tasks':
          return await this.getContactTasks(params as MCPGetContactTasksParams);
        case 'create_contact_task':
          return await this.createContactTask(params as MCPCreateContactTaskParams);
        case 'get_contact_task':
          return await this.getContactTask(params as MCPGetContactTaskParams);
        case 'update_contact_task':
          return await this.updateContactTask(params as MCPUpdateContactTaskParams);
        case 'delete_contact_task':
          return await this.deleteContactTask(params as MCPDeleteContactTaskParams);
        case 'update_task_completion':
          return await this.updateTaskCompletion(params as MCPUpdateTaskCompletionParams);

        // Note Management
        case 'get_contact_notes':
          return await this.getContactNotes(params as MCPGetContactNotesParams);
        case 'create_contact_note':
          return await this.createContactNote(params as MCPCreateContactNoteParams);
        case 'get_contact_note':
          return await this.getContactNote(params as MCPGetContactNoteParams);
        case 'update_contact_note':
          return await this.updateContactNote(params as MCPUpdateContactNoteParams);
        case 'delete_contact_note':
          return await this.deleteContactNote(params as MCPDeleteContactNoteParams);

        // Advanced Operations
        case 'upsert_contact':
          return await this.upsertContact(params as MCPUpsertContactParams);
        case 'get_duplicate_contact':
          return await this.getDuplicateContact(params as MCPGetDuplicateContactParams);
        case 'get_contacts_by_business':
          return await this.getContactsByBusiness(params as MCPGetContactsByBusinessParams);
        case 'get_contact_appointments':
          return await this.getContactAppointments(params as MCPGetContactAppointmentsParams);

        // Bulk Operations
        case 'bulk_update_contact_tags':
          return await this.bulkUpdateContactTags(params as MCPBulkUpdateContactTagsParams);
        case 'bulk_update_contact_business':
          return await this.bulkUpdateContactBusiness(params as MCPBulkUpdateContactBusinessParams);

        // Followers Management
        case 'add_contact_followers':
          return await this.addContactFollowers(params as MCPAddContactFollowersParams);
        case 'remove_contact_followers':
          return await this.removeContactFollowers(params as MCPRemoveContactFollowersParams);

        // Campaign Management
        case 'add_contact_to_campaign':
          return await this.addContactToCampaign(params as MCPAddContactToCampaignParams);
        case 'remove_contact_from_campaign':
          return await this.removeContactFromCampaign(params as MCPRemoveContactFromCampaignParams);
        case 'remove_contact_from_all_campaigns':
          return await this.removeContactFromAllCampaigns(params as MCPRemoveContactFromAllCampaignsParams);

        // Workflow Management
        case 'add_contact_to_workflow':
          return await this.addContactToWorkflow(params as MCPAddContactToWorkflowParams);
        case 'remove_contact_from_workflow':
          return await this.removeContactFromWorkflow(params as MCPRemoveContactFromWorkflowParams);

        default:
          return {
            success: false,
            error: `Unknown tool: ${toolName}`
          };
      }
    } catch (error: any) {
      console.error(`Error executing contact tool ${toolName}:`, error);
      
      // Return standardized error response
      return {
        success: false,
        error: error.message || 'Unknown error occurred'
      };
    }
  }

  // ═══════════════════════════════════════════════════════════
  // IMPLEMENTATION METHODS
  // ═══════════════════════════════════════════════════════════

  /**
   * Create a new contact in GoHighLevel CRM
   * @param params Contact creation parameters
   * @returns Standardized response with created contact data
   */
  private async createContact(params: MCPCreateContactParams): Promise<{ success: boolean; data?: any; error?: string }> {
    try {
      // Validate input parameters
      if (!isValidCreateContactParams(params)) {
        throw new ValidationError('Invalid create contact parameters');
      }

      if (!params.email) {
        throw new ValidationError('Email is required');
      }

      // Execute API call with retry logic
      const response = await retryWithExponentialBackoff(() => 
        this.ghlClient.createContact({
          locationId: this.ghlClient.getConfig().locationId,
          firstName: params.firstName,
          lastName: params.lastName,
          email: params.email,
          phone: params.phone,
          tags: params.tags,
          source: params.source || 'ChatGPT MCP'
        })
      );

      if (!response.success) {
        throw new APIError(`Failed to create contact: ${response.error || 'Unknown error'}`);
      }

      return {
        success: true,
        data: response.data,
        error: undefined
      };
    } catch (error: any) {
      if (error instanceof ValidationError || error instanceof APIError) {
        throw error;
      }
      throw new APIError(`Failed to create contact: ${error.message || String(error)}`);
    }
  }

  /**
   * Search contacts in GoHighLevel CRM
   * @param params Search parameters
   * @returns Standardized response with search results
   */
  private async searchContacts(params: MCPSearchContactsParams): Promise<{ success: boolean; data?: any; error?: string }> {
    try {
      // Validate input parameters
      if (!isValidSearchContactsParams(params)) {
        throw new ValidationError('Invalid search contacts parameters');
      }

      const searchQuery = params.email || params.phone || params.query;

      if (!searchQuery) {
        throw new ValidationError('At least one search parameter (query, email, or phone) is required');
      }

      console.log('[Contact Tools] Searching contacts with query:', searchQuery);

      // Execute API call with retry logic
      const response = await retryWithExponentialBackoff(() => 
        this.ghlClient.searchContacts({
          locationId: this.ghlClient.getConfig().locationId,
          query: searchQuery,
          limit: params.limit || 25
        })
      );

      if (!response.success) {
        throw new APIError(response.error?.message || 'Failed to search contacts');
      }

      const data = response.data || { contacts: [], total: 0 };
      const contacts = data.contacts || [];

      console.log(`[Contact Tools] Found ${contacts.length} contacts`);

      const result: any = {
        contacts: contacts,
        total: data.total || 0
      };

      if (contacts.length > 0) {
        const firstContact = contacts[0];
        result.contactId = firstContact.id;
        result.id = firstContact.id;
        result.email = firstContact.email;
        result.phone = firstContact.phone;
        result.firstName = firstContact.firstName;
        result.lastName = firstContact.lastName;
        result.fullName = `${firstContact.firstName || ''} ${firstContact.lastName || ''}`.trim();
        result.tags = firstContact.tags || [];

        console.log('[Contact Tools] First contact ID:', firstContact.id);
      } else {
        console.log('[Contact Tools] No contacts found');
      }

      return {
        success: true,
        data: result,
        error: undefined
      };
    } catch (error: any) {
      if (error instanceof ValidationError || error instanceof APIError) {
        throw error;
      }
      console.error('[Contact Tools] Search error:', error);
      throw new APIError(`Failed to search contacts: ${error.message || String(error)}`);
    }
  }

  /**
   * Get detailed information about a specific contact
   * @param contactId The ID of the contact to retrieve
   * @returns Standardized response with contact data
   */
  private async getContact(contactId: string): Promise<{ success: boolean; data?: any; error?: string }> {
    try {
      // Validate contactId
      if (!isValidContactId(contactId)) {
        throw new ValidationError('Valid contactId is required');
      }

      console.log('[Contact Tools] Getting contact with ID:', contactId);

      // Execute API call with retry logic
      const response = await retryWithExponentialBackoff(() => 
        this.ghlClient.getContact(contactId)
      );

      if (!response.success) {
        console.error('[Contact Tools] Failed to get contact:', response.error);
        if (response.error?.status === 404) {
          throw new NotFoundError(`Contact with ID ${contactId} not found`);
        }
        throw new APIError(response.error?.message || 'Failed to retrieve contact');
      }

      console.log('[Contact Tools] Contact retrieved successfully');

      return {
        success: true,
        data: {
          contact: response.data,
          contactId: response.data?.id,
          email: response.data?.email,
          phone: response.data?.phone,
          firstName: response.data?.firstName,
          lastName: response.data?.lastName,
          fullName: `${response.data?.firstName || ''} ${response.data?.lastName || ''}`.trim(),
          tags: response.data?.tags || []
        },
        error: undefined
      };
    } catch (error: any) {
      if (error instanceof ValidationError || error instanceof APIError || error instanceof NotFoundError) {
        throw error;
      }
      console.error('[Contact Tools] Get contact error:', error);
      throw new APIError(`Failed to get contact: ${error.message || 'Unknown error'}`);
    }
  }

  /**
   * Update existing contact information
   * @param params Contact update parameters
   * @returns Standardized response with updated contact data
   */
  private async updateContact(params: MCPUpdateContactParams): Promise<{ success: boolean; data?: any; error?: string }> {
    try {
      // Validate input parameters
      if (!isValidUpdateContactParams(params)) {
        throw new ValidationError('Invalid update contact parameters');
      }

      if (!isValidContactId(params.contactId)) {
        throw new ValidationError('Valid contactId is required');
      }

      // Execute API call with retry logic
      const response = await retryWithExponentialBackoff(() => 
        this.ghlClient.updateContact(params.contactId, {
          firstName: params.firstName,
          lastName: params.lastName,
          email: params.email,
          phone: params.phone,
          tags: params.tags
        })
      );

      if (!response.success) {
        throw new APIError(`Failed to update contact: ${response.error?.message || 'Unknown error'}`);
      }

      return {
        success: true,
        data: response.data,
        error: undefined
      };
    } catch (error: any) {
      if (error instanceof ValidationError || error instanceof APIError) {
        throw error;
      }
      throw new APIError(`Failed to update contact: ${error.message || String(error)}`);
    }
  }

  /**
   * Delete a contact from GoHighLevel CRM
   * @param contactId The ID of the contact to delete
   * @returns Standardized response indicating success or failure
   */
  private async deleteContact(contactId: string): Promise<{ success: boolean; data?: any; error?: string }> {
    try {
      // Validate contactId
      if (!isValidContactId(contactId)) {
        throw new ValidationError('Valid contactId is required');
      }

      // Execute API call with retry logic
      const response = await retryWithExponentialBackoff(() => 
        this.ghlClient.deleteContact(contactId)
      );

      if (!response.success) {
        throw new APIError(`Failed to delete contact: ${response.error?.message || 'Unknown error'}`);
      }

      return {
        success: true,
        data: { message: 'Contact deleted successfully' },
        error: undefined
      };
    } catch (error: any) {
      if (error instanceof ValidationError || error instanceof APIError) {
        throw error;
      }
      throw new APIError(`Failed to delete contact: ${error.message || String(error)}`);
    }
  }

  /**
   * Add tags to an existing contact
   * @param params Tag addition parameters
   * @returns Standardized response with updated tags
   */
  private async addContactTags(params: MCPAddContactTagsParams): Promise<{ success: boolean; data?: any; error?: string }> {
    try {
      // Validate input parameters
      if (!params || !isValidContactId(params.contactId) || !Array.isArray(params.tags)) {
        throw new ValidationError('Invalid add contact tags parameters');
      }

      if (params.tags.length === 0) {
        throw new ValidationError('At least one tag is required');
      }

      // Execute API call with retry logic
      const response = await retryWithExponentialBackoff(() => 
        this.ghlClient.addContactTags(params.contactId, params.tags)
      );

      if (!response.success) {
        throw new APIError(`Failed to add contact tags: ${response.error?.message || 'Unknown error'}`);
      }

      return {
        success: true,
        data: {
          tags: response.data?.tags || [],
          message: `Successfully added ${params.tags.length} tags to contact`
        },
        error: undefined
      };
    } catch (error: any) {
      if (error instanceof ValidationError || error instanceof APIError) {
        throw error;
      }
      throw new APIError(`Failed to add contact tags: ${error.message || String(error)}`);
    }
  }

  /**
   * Remove specific tags from a contact
   * @param params Tag removal parameters
   * @returns Standardized response with updated tags
   */
  private async removeContactTags(params: MCPRemoveContactTagsParams): Promise<{ success: boolean; data?: any; error?: string }> {
    try {
      // Validate input parameters
      if (!params || !isValidContactId(params.contactId) || !Array.isArray(params.tags)) {
        throw new ValidationError('Invalid remove contact tags parameters');
      }

      if (params.tags.length === 0) {
        throw new ValidationError('At least one tag is required');
      }

      // Execute API call with retry logic
      const response = await retryWithExponentialBackoff(() => 
        this.ghlClient.removeContactTags(params.contactId, params.tags)
      );

      if (!response.success) {
        throw new APIError(`Failed to remove contact tags: ${response.error?.message || 'Unknown error'}`);
      }

      return {
        success: true,
        data: {
          tags: response.data?.tags || [],
          message: `Successfully removed ${params.tags.length} tags from contact`
        },
        error: undefined
      };
    } catch (error: any) {
      if (error instanceof ValidationError || error instanceof APIError) {
        throw error;
      }
      throw new APIError(`Failed to remove contact tags: ${error.message || String(error)}`);
    }
  }

  /**
   * Get all tasks for a specific contact
   * @param params Contact tasks retrieval parameters
   * @returns Standardized response with array of tasks
   */
  private async getContactTasks(params: MCPGetContactTasksParams): Promise<{ success: boolean; data?: any; error?: string }> {
    try {
      // Validate input parameters
      if (!params || !isValidContactId(params.contactId)) {
        throw new ValidationError('Valid contactId is required');
      }

      // Execute API call with retry logic
      const response = await retryWithExponentialBackoff(() => 
        this.ghlClient.getContactTasks(params.contactId)
      );

      if (!response.success) {
        throw new APIError(response.error?.message || 'Failed to get contact tasks');
      }

      return {
        success: true,
        data: response.data,
        error: undefined
      };
    } catch (error: any) {
      if (error instanceof ValidationError || error instanceof APIError) {
        throw error;
      }
      throw new APIError(`Failed to get contact tasks: ${error.message || String(error)}`);
    }
  }

  /**
   * Create a new task for a contact
   * @param params Task creation parameters
   * @returns Standardized response with created task data
   */
  private async createContactTask(params: MCPCreateContactTaskParams): Promise<{ success: boolean; data?: any; error?: string }> {
    try {
      // Validate input parameters
      if (!params || !isValidContactId(params.contactId) || !params.title || !params.dueDate) {
        throw new ValidationError('ContactId, title, and dueDate are required');
      }

      // Execute API call with retry logic
      const response = await retryWithExponentialBackoff(() => 
        this.ghlClient.createContactTask(params.contactId, {
          title: params.title,
          body: params.body,
          dueDate: params.dueDate,
          completed: params.completed || false,
          assignedTo: params.assignedTo
        })
      );

      if (!response.success) {
        throw new APIError(response.error?.message || 'Failed to create contact task');
      }

      return {
        success: true,
        data: response.data,
        error: undefined
      };
    } catch (error: any) {
      if (error instanceof ValidationError || error instanceof APIError) {
        throw error;
      }
      throw new APIError(`Failed to create contact task: ${error.message || String(error)}`);
    }
  }

  /**
   * Get a specific task for a contact
   * @param params Task retrieval parameters
   * @returns Standardized response with task data
   */
  private async getContactTask(params: MCPGetContactTaskParams): Promise<{ success: boolean; data?: any; error?: string }> {
    try {
      // Validate input parameters
      if (!params || !isValidContactId(params.contactId) || !params.taskId) {
        throw new ValidationError('ContactId and taskId are required');
      }

      // Execute API call with retry logic
      const response = await retryWithExponentialBackoff(() => 
        this.ghlClient.getContactTask(params.contactId, params.taskId)
      );

      if (!response.success) {
        throw new APIError(response.error?.message || 'Failed to get contact task');
      }

      return {
        success: true,
        data: response.data,
        error: undefined
      };
    } catch (error: any) {
      if (error instanceof ValidationError || error instanceof APIError) {
        throw error;
      }
      throw new APIError(`Failed to get contact task: ${error.message || String(error)}`);
    }
  }

  /**
   * Update a task for a contact
   * @param params Task update parameters
   * @returns Standardized response with updated task data
   */
  private async updateContactTask(params: MCPUpdateContactTaskParams): Promise<{ success: boolean; data?: any; error?: string }> {
    try {
      // Validate input parameters
      if (!params || !isValidContactId(params.contactId) || !params.taskId) {
        throw new ValidationError('ContactId and taskId are required');
      }

      // Execute API call with retry logic
      const response = await retryWithExponentialBackoff(() => 
        this.ghlClient.updateContactTask(params.contactId, params.taskId, {
          title: params.title,
          body: params.body,
          dueDate: params.dueDate,
          completed: params.completed,
          assignedTo: params.assignedTo
        })
      );

      if (!response.success) {
        throw new APIError(response.error?.message || 'Failed to update contact task');
      }

      return {
        success: true,
        data: response.data,
        error: undefined
      };
    } catch (error: any) {
      if (error instanceof ValidationError || error instanceof APIError) {
        throw error;
      }
      throw new APIError(`Failed to update contact task: ${error.message || String(error)}`);
    }
  }

  /**
   * Delete a task for a contact
   * @param params Task deletion parameters
   * @returns Standardized response indicating success or failure
   */
  private async deleteContactTask(params: MCPDeleteContactTaskParams): Promise<{ success: boolean; data?: any; error?: string }> {
    try {
      // Validate input parameters
      if (!params || !isValidContactId(params.contactId) || !params.taskId) {
        throw new ValidationError('ContactId and taskId are required');
      }

      // Execute API call with retry logic
      const response = await retryWithExponentialBackoff(() => 
        this.ghlClient.deleteContactTask(params.contactId, params.taskId)
      );

      if (!response.success) {
        throw new APIError(response.error?.message || 'Failed to delete contact task');
      }

      return {
        success: true,
        data: { succeeded: response.data?.succeded || false },
        error: undefined
      };
    } catch (error: any) {
      if (error instanceof ValidationError || error instanceof APIError) {
        throw error;
      }
      throw new APIError(`Failed to delete contact task: ${error.message || String(error)}`);
    }
  }

  /**
   * Update task completion status
   * @param params Task completion update parameters
   * @returns Standardized response with updated task data
   */
  private async updateTaskCompletion(params: MCPUpdateTaskCompletionParams): Promise<{ success: boolean; data?: any; error?: string }> {
    try {
      // Validate input parameters
      if (!params || !isValidContactId(params.contactId) || !params.taskId || typeof params.completed !== 'boolean') {
        throw new ValidationError('ContactId, taskId, and completed status are required');
      }

      // Execute API call with retry logic
      const response = await retryWithExponentialBackoff(() => 
        this.ghlClient.updateTaskCompletion(params.contactId, params.taskId, params.completed)
      );

      if (!response.success) {
        throw new APIError(response.error?.message || 'Failed to update task completion');
      }

      return {
        success: true,
        data: response.data,
        error: undefined
      };
    } catch (error: any) {
      if (error instanceof ValidationError || error instanceof APIError) {
        throw error;
      }
      throw new APIError(`Failed to update task completion: ${error.message || String(error)}`);
    }
  }

  /**
   * Get all notes for a contact
   * @param params Contact notes retrieval parameters
   * @returns Standardized response with array of notes
   */
  private async getContactNotes(params: MCPGetContactNotesParams): Promise<{ success: boolean; data?: any; error?: string }> {
    try {
      // Validate input parameters
      if (!params || !isValidContactId(params.contactId)) {
        throw new ValidationError('Valid contactId is required');
      }

      // Execute API call with retry logic
      const response = await retryWithExponentialBackoff(() => 
        this.ghlClient.getContactNotes(params.contactId)
      );

      if (!response.success) {
        throw new APIError(response.error?.message || 'Failed to get contact notes');
      }

      return {
        success: true,
        data: response.data,
        error: undefined
      };
    } catch (error: any) {
      if (error instanceof ValidationError || error instanceof APIError) {
        throw error;
      }
      throw new APIError(`Failed to get contact notes: ${error.message || String(error)}`);
    }
  }

  /**
   * Create a new note for a contact
   * @param params Note creation parameters
   * @returns Standardized response with created note data
   */
  private async createContactNote(params: MCPCreateContactNoteParams): Promise<{ success: boolean; data?: any; error?: string }> {
    try {
      // Validate input parameters
      if (!params || !isValidContactId(params.contactId) || !params.body) {
        throw new ValidationError('ContactId and note body are required');
      }

      // Execute API call with retry logic
      const response = await retryWithExponentialBackoff(() => 
        this.ghlClient.createContactNote(params.contactId, {
          body: params.body,
          userId: params.userId
        })
      );

      if (!response.success) {
        throw new APIError(response.error?.message || 'Failed to create contact note');
      }

      return {
        success: true,
        data: response.data,
        error: undefined
      };
    } catch (error: any) {
      if (error instanceof ValidationError || error instanceof APIError) {
        throw error;
      }
      throw new APIError(`Failed to create contact note: ${error.message || String(error)}`);
    }
  }

  /**
   * Get a specific note for a contact
   * @param params Note retrieval parameters
   * @returns Standardized response with note data
   */
  private async getContactNote(params: MCPGetContactNoteParams): Promise<{ success: boolean; data?: any; error?: string }> {
    try {
      // Validate input parameters
      if (!params || !isValidContactId(params.contactId) || !params.noteId) {
        throw new ValidationError('ContactId and noteId are required');
      }

      // Execute API call with retry logic
      const response = await retryWithExponentialBackoff(() => 
        this.ghlClient.getContactNote(params.contactId, params.noteId)
      );

      if (!response.success) {
        throw new APIError(response.error?.message || 'Failed to get contact note');
      }

      return {
        success: true,
        data: response.data,
        error: undefined
      };
    } catch (error: any) {
      if (error instanceof ValidationError || error instanceof APIError) {
        throw error;
      }
      throw new APIError(`Failed to get contact note: ${error.message || String(error)}`);
    }
  }

  /**
   * Update a note for a contact
   * @param params Note update parameters
   * @returns Standardized response with updated note data
   */
  private async updateContactNote(params: MCPUpdateContactNoteParams): Promise<{ success: boolean; data?: any; error?: string }> {
    try {
      // Validate input parameters
      if (!params || !isValidContactId(params.contactId) || !params.noteId || !params.body) {
        throw new ValidationError('ContactId, noteId, and body are required');
      }

      // Execute API call with retry logic
      const response = await retryWithExponentialBackoff(() => 
        this.ghlClient.updateContactNote(params.contactId, params.noteId, {
          body: params.body,
          userId: params.userId
        })
      );

      if (!response.success) {
        throw new APIError(response.error?.message || 'Failed to update contact note');
      }

      return {
        success: true,
        data: response.data,
        error: undefined
      };
    } catch (error: any) {
      if (error instanceof ValidationError || error instanceof APIError) {
        throw error;
      }
      throw new APIError(`Failed to update contact note: ${error.message || String(error)}`);
    }
  }

  /**
   * Delete a note for a contact
   * @param params Note deletion parameters
   * @returns Standardized response indicating success or failure
   */
  private async deleteContactNote(params: MCPDeleteContactNoteParams): Promise<{ success: boolean; data?: any; error?: string }> {
    try {
      // Validate input parameters
      if (!params || !isValidContactId(params.contactId) || !params.noteId) {
        throw new ValidationError('ContactId and noteId are required');
      }

      // Execute API call with retry logic
      const response = await retryWithExponentialBackoff(() => 
        this.ghlClient.deleteContactNote(params.contactId, params.noteId)
      );

      if (!response.success) {
        throw new APIError(response.error?.message || 'Failed to delete contact note');
      }

      return {
        success: true,
        data: { succeeded: response.data?.succeded || false },
        error: undefined
      };
    } catch (error: any) {
      if (error instanceof ValidationError || error instanceof APIError) {
        throw error;
      }
      throw new APIError(`Failed to delete contact note: ${error.message || String(error)}`);
    }
  }

  /**
   * Create or update a contact based on email/phone existence
   * @param params Contact upsert parameters
   * @returns Standardized response with upsert result
   */
  private async upsertContact(params: MCPUpsertContactParams): Promise<{ success: boolean; data?: any; error?: string }> {
    try {
      // Validate input parameters
      if (!params || (!params.email && !params.phone)) {
        throw new ValidationError('Email or phone is required for upsert operation');
      }

      // Execute API call with retry logic
      const response = await retryWithExponentialBackoff(() => 
        this.ghlClient.upsertContact({
          locationId: this.ghlClient.getConfig().locationId,
          firstName: params.firstName,
          lastName: params.lastName,
          name: params.name,
          email: params.email,
          phone: params.phone,
          address1: params.address,
          city: params.city,
          state: params.state,
          country: params.country,
          postalCode: params.postalCode,
          website: params.website,
          timezone: params.timezone,
          companyName: params.companyName,
          tags: params.tags,
          customFields: params.customFields,
          source: params.source,
          assignedTo: params.assignedTo
        })
      );

      if (!response.success) {
        throw new APIError(response.error?.message || 'Failed to upsert contact');
      }

      return {
        success: true,
        data: response.data,
        error: undefined
      };
    } catch (error: any) {
      if (error instanceof ValidationError || error instanceof APIError) {
        throw error;
      }
      throw new APIError(`Failed to upsert contact: ${error.message || String(error)}`);
    }
  }

  /**
   * Check if a contact already exists by email or phone
   * @param params Duplicate contact check parameters
   * @returns Standardized response with existing contact data or null
   */
  private async getDuplicateContact(params: MCPGetDuplicateContactParams): Promise<{ success: boolean; data?: any; error?: string }> {
    try {
      // Validate input parameters
      if (!params || (!params.email && !params.phone)) {
        throw new ValidationError('Email or phone is required for duplicate check');
      }

      const searchQuery = params.email || params.phone;

      if (!searchQuery) {
        return {
          success: true,
          data: null,
          error: undefined
        };
      }

      // Execute API call with retry logic
      const response = await retryWithExponentialBackoff(() => 
        this.ghlClient.searchContacts({
          locationId: this.ghlClient.getConfig().locationId,
          query: searchQuery,
          limit: 1
        })
      );

      if (!response.success) {
        throw new APIError('Failed to check for duplicate contact');
      }

      const data = response.data || { contacts: [] };

      const contact = data.contacts && data.contacts.length > 0 ? data.contacts[0] : null;

      return {
        success: true,
        data: contact,
        error: undefined
      };
    } catch (error: any) {
      if (error instanceof ValidationError || error instanceof APIError) {
        throw error;
      }
      throw new APIError(`Failed to check for duplicate contact: ${error.message || String(error)}`);
    }
  }

  /**
   * Get contacts associated with a specific business
   * @param params Business contacts retrieval parameters
   * @returns Standardized response with contacts data
   */
  private async getContactsByBusiness(params: MCPGetContactsByBusinessParams): Promise<{ success: boolean; data?: any; error?: string }> {
    try {
      // Validate input parameters
      if (!params || !params.businessId) {
        throw new ValidationError('BusinessId is required');
      }

      // Execute API call with retry logic
      const response = await retryWithExponentialBackoff(() => 
        this.ghlClient.getContactsByBusiness(params.businessId, {
          limit: params.limit,
          skip: params.skip,
          query: params.query
        })
      );

      if (!response.success) {
        throw new APIError(response.error?.message || 'Failed to get contacts by business');
      }

      return {
        success: true,
        data: response.data,
        error: undefined
      };
    } catch (error: any) {
      if (error instanceof ValidationError || error instanceof APIError) {
        throw error;
      }
      throw new APIError(`Failed to get contacts by business: ${error.message || String(error)}`);
    }
  }

  /**
   * Get all appointments for a contact
   * @param params Contact appointments retrieval parameters
   * @returns Standardized response with appointments data
   */
  private async getContactAppointments(params: MCPGetContactAppointmentsParams): Promise<{ success: boolean; data?: any; error?: string }> {
    try {
      // Validate input parameters
      if (!params || !isValidContactId(params.contactId)) {
        throw new ValidationError('Valid contactId is required');
      }

      // Execute API call with retry logic
      const response = await retryWithExponentialBackoff(() => 
        this.ghlClient.getContactAppointments(params.contactId)
      );

      if (!response.success) {
        throw new APIError(response.error?.message || 'Failed to get contact appointments');
      }

      return {
        success: true,
        data: response.data,
        error: undefined
      };
    } catch (error: any) {
      if (error instanceof ValidationError || error instanceof APIError) {
        throw error;
      }
      throw new APIError(`Failed to get contact appointments: ${error.message || String(error)}`);
    }
  }

  /**
   * Add or remove tags from multiple contacts in one operation
   * @param params Bulk tag update parameters
   * @returns Standardized response with operation result
   */
  private async bulkUpdateContactTags(params: MCPBulkUpdateContactTagsParams): Promise<{ success: boolean; data?: any; error?: string }> {
    try {
      // Validate input parameters
      if (!params || !Array.isArray(params.contactIds) || !Array.isArray(params.tags) || !params.operation) {
        throw new ValidationError('ContactIds, tags, and operation are required');
      }

      if (params.contactIds.length === 0 || params.tags.length === 0) {
        throw new ValidationError('ContactIds and tags arrays must not be empty');
      }

      if (params.contactIds.length > 100) {
        throw new ValidationError('Maximum 100 contacts allowed per bulk operation');
      }

      if (!['add', 'remove'].includes(params.operation)) {
        throw new ValidationError('Operation must be either "add" or "remove"');
      }

      // Execute API call with retry logic
      const response = await retryWithExponentialBackoff(() => 
        this.ghlClient.bulkUpdateContactTags(
          params.contactIds,
          params.tags,
          params.operation,
          params.removeAllTags
        )
      );

      if (!response.success) {
        throw new APIError(response.error?.message || 'Failed to bulk update contact tags');
      }

      return {
        success: true,
        data: response.data,
        error: undefined
      };
    } catch (error: any) {
      if (error instanceof ValidationError || error instanceof APIError) {
        throw error;
      }
      throw new APIError(`Failed to bulk update contact tags: ${error.message || String(error)}`);
    }
  }

  /**
   * Bulk update business association for multiple contacts
   * @param params Bulk business update parameters
   * @returns Standardized response with operation result
   */
  private async bulkUpdateContactBusiness(params: MCPBulkUpdateContactBusinessParams): Promise<{ success: boolean; data?: any; error?: string }> {
    try {
      // Validate input parameters
      if (!params || !Array.isArray(params.contactIds)) {
        throw new ValidationError('ContactIds are required');
      }

      if (params.contactIds.length === 0) {
        throw new ValidationError('ContactIds array must not be empty');
      }

      if (params.contactIds.length > 100) {
        throw new ValidationError('Maximum 100 contacts allowed per bulk operation');
      }

      // Execute API call with retry logic
      const response = await retryWithExponentialBackoff(() => 
        this.ghlClient.bulkUpdateContactBusiness(params.contactIds, params.businessId)
      );

      if (!response.success) {
        throw new APIError(response.error?.message || 'Failed to bulk update contact business');
      }

      return {
        success: true,
        data: response.data,
        error: undefined
      };
    } catch (error: any) {
      if (error instanceof ValidationError || error instanceof APIError) {
        throw error;
      }
      throw new APIError(`Failed to bulk update contact business: ${error.message || String(error)}`);
    }
  }

  /**
   * Add followers to a contact
   * @param params Add followers parameters
   * @returns Standardized response with updated followers data
   */
  private async addContactFollowers(params: MCPAddContactFollowersParams): Promise<{ success: boolean; data?: any; error?: string }> {
    try {
      // Validate input parameters
      if (!params || !isValidContactId(params.contactId) || !Array.isArray(params.followers)) {
        throw new ValidationError('ContactId and followers array are required');
      }

      if (params.followers.length === 0) {
        throw new ValidationError('Followers array must not be empty');
      }

      // Execute API call with retry logic
      const response = await retryWithExponentialBackoff(() => 
        this.ghlClient.addContactFollowers(params.contactId, params.followers)
      );

      if (!response.success) {
        throw new APIError(response.error?.message || 'Failed to add contact followers');
      }

      return {
        success: true,
        data: response.data,
        error: undefined
      };
    } catch (error: any) {
      if (error instanceof ValidationError || error instanceof APIError) {
        throw error;
      }
      throw new APIError(`Failed to add contact followers: ${error.message || String(error)}`);
    }
  }

  /**
   * Remove followers from a contact
   * @param params Remove followers parameters
   * @returns Standardized response with updated followers data
   */
  private async removeContactFollowers(params: MCPRemoveContactFollowersParams): Promise<{ success: boolean; data?: any; error?: string }> {
    try {
      // Validate input parameters
      if (!params || !isValidContactId(params.contactId) || !Array.isArray(params.followers)) {
        throw new ValidationError('ContactId and followers array are required');
      }

      if (params.followers.length === 0) {
        throw new ValidationError('Followers array must not be empty');
      }

      // Execute API call with retry logic
      const response = await retryWithExponentialBackoff(() => 
        this.ghlClient.removeContactFollowers(params.contactId, params.followers)
      );

      if (!response.success) {
        throw new APIError(response.error?.message || 'Failed to remove contact followers');
      }

      return {
        success: true,
        data: response.data,
        error: undefined
      };
    } catch (error: any) {
      if (error instanceof ValidationError || error instanceof APIError) {
        throw error;
      }
      throw new APIError(`Failed to remove contact followers: ${error.message || String(error)}`);
    }
  }

  /**
   * Add contact to a marketing campaign
   * @param params Add to campaign parameters
   * @returns Standardized response indicating success or failure
   */
  private async addContactToCampaign(params: MCPAddContactToCampaignParams): Promise<{ success: boolean; data?: any; error?: string }> {
    try {
      // Validate input parameters
      if (!params || !isValidContactId(params.contactId) || !params.campaignId) {
        throw new ValidationError('ContactId and campaignId are required');
      }

      // Execute API call with retry logic
      const response = await retryWithExponentialBackoff(() => 
        this.ghlClient.addContactToCampaign(params.contactId, params.campaignId)
      );

      if (!response.success) {
        throw new APIError(response.error?.message || 'Failed to add contact to campaign');
      }

      return {
        success: true,
        data: { succeeded: response.data?.succeded || false },
        error: undefined
      };
    } catch (error: any) {
      if (error instanceof ValidationError || error instanceof APIError) {
        throw error;
      }
      throw new APIError(`Failed to add contact to campaign: ${error.message || String(error)}`);
    }
  }

  /**
   * Remove contact from a specific campaign
   * @param params Remove from campaign parameters
   * @returns Standardized response indicating success or failure
   */
  private async removeContactFromCampaign(params: MCPRemoveContactFromCampaignParams): Promise<{ success: boolean; data?: any; error?: string }> {
    try {
      // Validate input parameters
      if (!params || !isValidContactId(params.contactId) || !params.campaignId) {
        throw new ValidationError('ContactId and campaignId are required');
      }

      // Execute API call with retry logic
      const response = await retryWithExponentialBackoff(() => 
        this.ghlClient.removeContactFromCampaign(params.contactId, params.campaignId)
      );

      if (!response.success) {
        throw new APIError(response.error?.message || 'Failed to remove contact from campaign');
      }

      return {
        success: true,
        data: { succeeded: response.data?.succeded || false },
        error: undefined
      };
    } catch (error: any) {
      if (error instanceof ValidationError || error instanceof APIError) {
        throw error;
      }
      throw new APIError(`Failed to remove contact from campaign: ${error.message || String(error)}`);
    }
  }

  /**
   * Remove contact from all campaigns
   * @param params Remove from all campaigns parameters
   * @returns Standardized response indicating success or failure
   */
  private async removeContactFromAllCampaigns(params: MCPRemoveContactFromAllCampaignsParams): Promise<{ success: boolean; data?: any; error?: string }> {
    try {
      // Validate input parameters
      if (!params || !isValidContactId(params.contactId)) {
        throw new ValidationError('Valid contactId is required');
      }

      // Execute API call with retry logic
      const response = await retryWithExponentialBackoff(() => 
        this.ghlClient.removeContactFromAllCampaigns(params.contactId)
      );

      if (!response.success) {
        throw new APIError(response.error?.message || 'Failed to remove contact from all campaigns');
      }

      return {
        success: true,
        data: { succeeded: response.data?.succeded || false },
        error: undefined
      };
    } catch (error: any) {
      if (error instanceof ValidationError || error instanceof APIError) {
        throw error;
      }
      throw new APIError(`Failed to remove contact from all campaigns: ${error.message || String(error)}`);
    }
  }

  /**
   * Enroll contact in automation workflow
   * @param params Add to workflow parameters
   * @returns Standardized response indicating success or failure
   */
  private async addContactToWorkflow(params: MCPAddContactToWorkflowParams): Promise<{ success: boolean; data?: any; error?: string }> {
    try {
      // Validate input parameters
      if (!params || !isValidContactId(params.contactId) || !params.workflowId) {
        throw new ValidationError('ContactId and workflowId are required');
      }

      // Execute API call with retry logic
      const response = await retryWithExponentialBackoff(() => 
        this.ghlClient.addContactToWorkflow(
          params.contactId,
          params.workflowId,
          params.eventStartTime
        )
      );

      if (!response.success) {
        throw new APIError(response.error?.message || 'Failed to add contact to workflow');
      }

      return {
        success: true,
        data: { succeeded: response.data?.succeded || false },
        error: undefined
      };
    } catch (error: any) {
      if (error instanceof ValidationError || error instanceof APIError) {
        throw error;
      }
      throw new APIError(`Failed to add contact to workflow: ${error.message || String(error)}`);
    }
  }

  /**
   * Unenroll contact from automation workflow
   * @param params Remove from workflow parameters
   * @returns Standardized response indicating success or failure
   */
  private async removeContactFromWorkflow(params: MCPRemoveContactFromWorkflowParams): Promise<{ success: boolean; data?: any; error?: string }> {
    try {
      // Validate input parameters
      if (!params || !isValidContactId(params.contactId) || !params.workflowId) {
        throw new ValidationError('ContactId and workflowId are required');
      }

      // Execute API call with retry logic
      const response = await retryWithExponentialBackoff(() => 
        this.ghlClient.removeContactFromWorkflow(
          params.contactId,
          params.workflowId,
          params.eventStartTime
        )
      );

      if (!response.success) {
        throw new APIError(response.error?.message || 'Failed to remove contact from workflow');
      }

      return {
        success: true,
        data: { succeeded: response.data?.succeded || false },
        error: undefined
      };
    } catch (error: any) {
      if (error instanceof ValidationError || error instanceof APIError) {
        throw error;
      }
      throw new APIError(`Failed to remove contact from workflow: ${error.message || String(error)}`);
    }
  }
}
