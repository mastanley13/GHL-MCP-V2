import { Tool } from '@modelcontextprotocol/sdk/types.js';
import { GHLApiClient } from '../clients/ghl-api-client.js';
import {
  MCPSearchPostsParams,
  MCPCreatePostParams,
  MCPGetPostParams,
  MCPUpdatePostParams,
  MCPDeletePostParams,
  MCPBulkDeletePostsParams,
  MCPGetAccountsParams,
  MCPDeleteAccountParams,
  MCPUploadCSVParams,
  MCPGetUploadStatusParams,
  MCPSetAccountsParams,
  MCPGetCSVPostParams,
  MCPFinalizeCSVParams,
  MCPDeleteCSVParams,
  MCPDeleteCSVPostParams,
  MCPGetCategoriesParams,
  MCPGetCategoryParams,
  MCPGetTagsParams,
  MCPGetTagsByIdsParams,
  MCPStartOAuthParams,
  MCPGetOAuthAccountsParams,
  MCPAttachGoogleLocationsParams,
  MCPAttachFacebookPagesParams,
  MCPAttachInstagramAccountsParams,
  MCPAttachLinkedInAccountsParams,
  MCPAttachTwitterProfileParams,
  MCPAttachTikTokProfileParams,
  MCPAttachTikTokBusinessProfileParams,
  MCPGetSocialStatisticsParams
} from '../types/ghl-types.js';
import {
  GHLAttachGMBLocationRequest,
  GHLAttachFBAccountRequest,
  GHLAttachIGAccountRequest,
  GHLAttachLinkedInAccountRequest,
  GHLAttachTwitterAccountRequest,
  GHLAttachTikTokAccountRequest
} from '../types/ghl-types.js';

export class SocialMediaTools {
  constructor(private ghlClient: GHLApiClient) {}

  getTools(): Tool[] {
    return [
      // Post Management Tools
      {
        name: 'search_social_posts',
        description: 'Search and filter social media posts across all platforms',
        inputSchema: {
          type: 'object',
          properties: {
            type: {
              type: 'string',
              enum: ['recent', 'all', 'scheduled', 'draft', 'failed', 'in_review', 'published', 'in_progress', 'deleted'],
              description: 'Filter posts by status',
              default: 'all'
            },
            accounts: {
              type: 'string',
              description: 'Comma-separated account IDs to filter by'
            },
            skip: { type: 'number', description: 'Number of posts to skip', default: 0 },
            limit: { type: 'number', description: 'Number of posts to return', default: 10 },
            fromDate: { type: 'string', description: 'Start date (ISO format)' },
            toDate: { type: 'string', description: 'End date (ISO format)' },
            includeUsers: { type: 'boolean', description: 'Include user data in response', default: true },
            postType: {
              type: 'string',
              enum: ['post', 'story', 'reel'],
              description: 'Type of post to search for'
            }
          },
          required: ['fromDate', 'toDate']
        }
      },
      {
        name: 'create_social_post',
        description: 'Create a new social media post for multiple platforms',
        inputSchema: {
          type: 'object',
          properties: {
            accountIds: {
              type: 'array',
              items: { type: 'string' },
              description: 'Array of social media account IDs to post to'
            },
            summary: { type: 'string', description: 'Post content/text' },
            media: {
              type: 'array',
              items: {
                type: 'object',
                properties: {
                  url: { type: 'string', description: 'Media URL' },
                  caption: { type: 'string', description: 'Media caption' },
                  type: { type: 'string', description: 'Media MIME type' }
                },
                required: ['url']
              },
              description: 'Media attachments'
            },
            status: {
              type: 'string',
              enum: ['draft', 'scheduled', 'published'],
              description: 'Post status',
              default: 'draft'
            },
            scheduleDate: { type: 'string', description: 'Schedule date for post (ISO format)' },
            followUpComment: { type: 'string', description: 'Follow-up comment' },
            type: {
              type: 'string',
              enum: ['post', 'story', 'reel'],
              description: 'Type of post'
            },
            tags: {
              type: 'array',
              items: { type: 'string' },
              description: 'Tag IDs to associate with post'
            },
            categoryId: { type: 'string', description: 'Category ID' },
            userId: { type: 'string', description: 'User ID creating the post' }
          },
          required: ['accountIds', 'summary', 'type']
        }
      },
      {
        name: 'get_social_post',
        description: 'Get details of a specific social media post',
        inputSchema: {
          type: 'object',
          properties: {
            postId: { type: 'string', description: 'Social media post ID' }
          },
          required: ['postId']
        }
      },
      {
        name: 'update_social_post',
        description: 'Update an existing social media post',
        inputSchema: {
          type: 'object',
          properties: {
            postId: { type: 'string', description: 'Social media post ID' },
            summary: { type: 'string', description: 'Updated post content' },
            status: {
              type: 'string',
              enum: ['draft', 'scheduled', 'published'],
              description: 'Updated post status'
            },
            scheduleDate: { type: 'string', description: 'Updated schedule date' },
            tags: {
              type: 'array',
              items: { type: 'string' },
              description: 'Updated tag IDs'
            }
          },
          required: ['postId']
        }
      },
      {
        name: 'delete_social_post',
        description: 'Delete a social media post',
        inputSchema: {
          type: 'object',
          properties: {
            postId: { type: 'string', description: 'Social media post ID to delete' }
          },
          required: ['postId']
        }
      },
      {
        name: 'bulk_delete_social_posts',
        description: 'Delete multiple social media posts at once (max 50)',
        inputSchema: {
          type: 'object',
          properties: {
            postIds: {
              type: 'array',
              items: { type: 'string' },
              description: 'Array of post IDs to delete',
              maxItems: 50
            }
          },
          required: ['postIds']
        }
      },

      // Account Management Tools
      {
        name: 'get_social_accounts',
        description: 'Get all connected social media accounts and groups',
        inputSchema: {
          type: 'object',
          properties: {},
          additionalProperties: false
        }
      },
      {
        name: 'delete_social_account',
        description: 'Delete a social media account connection',
        inputSchema: {
          type: 'object',
          properties: {
            accountId: { type: 'string', description: 'Account ID to delete' },
            companyId: { type: 'string', description: 'Company ID' },
            userId: { type: 'string', description: 'User ID' }
          },
          required: ['accountId']
        }
      },

      // CSV Operations
      {
        name: 'upload_social_csv',
        description: 'Upload a CSV file containing social media posts for bulk scheduling',
        inputSchema: {
          type: 'object',
          properties: {
            file: {
              type: 'string',
              description: 'Base64-encoded CSV content or a file path accessible to the server',
              contentEncoding: 'base64',
              contentMediaType: 'text/csv'
            }
          },
          required: ['file']
        }
      },
      {
        name: 'get_csv_upload_status',
        description: 'List CSV uploads and their processing status',
        inputSchema: {
          type: 'object',
          properties: {
            skip: { type: 'number', description: 'Number of records to skip', default: 0 },
            limit: { type: 'number', description: 'Number of records to return', default: 10 },
            includeUsers: { type: 'boolean', description: 'Include user details in the response', default: true },
            userId: { type: 'string', description: 'Filter results by user ID' }
          }
        }
      },
      {
        name: 'set_csv_accounts',
        description: 'Assign connected accounts to an uploaded CSV file',
        inputSchema: {
          type: 'object',
          properties: {
            accountIds: {
              type: 'array',
              items: { type: 'string' },
              description: 'Account IDs that will publish the posts from the CSV'
            },
            filePath: { type: 'string', description: 'Storage path of the uploaded CSV file' },
            rowsCount: { type: 'number', description: 'Number of posts contained in the CSV' },
            fileName: { type: 'string', description: 'Original CSV file name' },
            approver: { type: 'string', description: 'Optional user ID responsible for approving the CSV' },
            userId: { type: 'string', description: 'User ID initiating the assignment' }
          },
          required: ['accountIds', 'filePath', 'rowsCount', 'fileName']
        }
      },
      {
        name: 'get_csv_posts',
        description: 'Retrieve posts contained within an uploaded CSV import',
        inputSchema: {
          type: 'object',
          properties: {
            csvId: { type: 'string', description: 'CSV import ID' },
            skip: { type: 'number', description: 'Number of records to skip', default: 0 },
            limit: { type: 'number', description: 'Number of records to return', default: 10 }
          },
          required: ['csvId']
        }
      },
      {
        name: 'finalize_social_csv',
        description: 'Finalize a CSV import so its posts can be scheduled or published',
        inputSchema: {
          type: 'object',
          properties: {
            csvId: { type: 'string', description: 'CSV import ID' },
            userId: { type: 'string', description: 'User ID confirming the finalize action' }
          },
          required: ['csvId']
        }
      },
      {
        name: 'delete_social_csv',
        description: 'Delete an uploaded CSV import',
        inputSchema: {
          type: 'object',
          properties: {
            csvId: { type: 'string', description: 'CSV import ID' }
          },
          required: ['csvId']
        }
      },
      {
        name: 'delete_csv_post',
        description: 'Delete a single post entry from a CSV import',
        inputSchema: {
          type: 'object',
          properties: {
            csvId: { type: 'string', description: 'CSV import ID' },
            postId: { type: 'string', description: 'Post ID inside the CSV import' }
          },
          required: ['csvId', 'postId']
        }
      },

      // OAuth Account Attachment Tools
      {
        name: 'attach_google_locations',
        description: 'Attach selected Google Business locations returned from OAuth',
        inputSchema: {
          type: 'object',
          properties: {
            accountId: { type: 'string', description: 'OAuth account ID for Google' },
            location: { type: 'object', description: 'Location payload returned by the OAuth window' },
            account: { type: 'object', description: 'Account payload returned by the OAuth window' },
            companyId: { type: 'string', description: 'Optional company ID' }
          },
          required: ['accountId', 'location', 'account']
        }
      },
      {
        name: 'attach_facebook_pages',
        description: 'Attach Facebook pages returned from OAuth',
        inputSchema: {
          type: 'object',
          properties: {
            accountId: { type: 'string', description: 'OAuth account ID for Facebook' },
            originId: { type: 'string', description: 'Facebook page origin ID' },
            name: { type: 'string', description: 'Facebook page name' },
            avatar: { type: 'string', description: 'Optional page avatar URL' },
            companyId: { type: 'string', description: 'Optional company ID' }
          },
          required: ['accountId', 'originId', 'name']
        }
      },
      {
        name: 'attach_instagram_accounts',
        description: 'Attach Instagram accounts returned from OAuth',
        inputSchema: {
          type: 'object',
          properties: {
            accountId: { type: 'string', description: 'OAuth account ID for Instagram' },
            originId: { type: 'string', description: 'Instagram account origin ID' },
            name: { type: 'string', description: 'Instagram account name' },
            pageId: { type: 'string', description: 'Facebook page ID linked to the Instagram account' },
            avatar: { type: 'string', description: 'Optional avatar URL' },
            companyId: { type: 'string', description: 'Optional company ID' }
          },
          required: ['accountId', 'originId', 'name', 'pageId']
        }
      },
      {
        name: 'attach_linkedin_accounts',
        description: 'Attach LinkedIn profiles, pages, or organizations returned from OAuth',
        inputSchema: {
          type: 'object',
          properties: {
            accountId: { type: 'string', description: 'OAuth account ID for LinkedIn' },
            originId: { type: 'string', description: 'LinkedIn origin ID' },
            name: { type: 'string', description: 'LinkedIn entity name' },
            type: { type: 'string', enum: ['page', 'group', 'profile', 'location', 'business'], description: 'Type of LinkedIn entity' },
            avatar: { type: 'string', description: 'Optional avatar URL' },
            urn: { type: 'string', description: 'Optional LinkedIn URN' },
            companyId: { type: 'string', description: 'Optional company ID' }
          },
          required: ['accountId', 'originId', 'name', 'type']
        }
      },
      {
        name: 'attach_twitter_profile',
        description: 'Attach a Twitter/X profile returned from OAuth',
        inputSchema: {
          type: 'object',
          properties: {
            accountId: { type: 'string', description: 'OAuth account ID for Twitter/X' },
            originId: { type: 'string', description: 'Twitter profile origin ID' },
            name: { type: 'string', description: 'Profile display name' },
            username: { type: 'string', description: 'Profile handle/username' },
            avatar: { type: 'string', description: 'Optional avatar URL' },
            protected: { type: 'boolean', description: 'Whether the profile is protected' },
            verified: { type: 'boolean', description: 'Whether the profile is verified' },
            companyId: { type: 'string', description: 'Optional company ID' }
          },
          required: ['accountId', 'originId', 'name']
        }
      },
      {
        name: 'attach_tiktok_profile',
        description: 'Attach a TikTok profile returned from OAuth',
        inputSchema: {
          type: 'object',
          properties: {
            accountId: { type: 'string', description: 'OAuth account ID for TikTok' },
            originId: { type: 'string', description: 'TikTok profile origin ID' },
            name: { type: 'string', description: 'Profile name' },
            username: { type: 'string', description: 'Profile username' },
            avatar: { type: 'string', description: 'Optional avatar URL' },
            verified: { type: 'boolean', description: 'Whether the profile is verified' },
            type: { type: 'string', enum: ['page', 'group', 'profile', 'location', 'business'], description: 'Profile type reported by TikTok', default: 'profile' },
            companyId: { type: 'string', description: 'Optional company ID' }
          },
          required: ['accountId', 'originId', 'name']
        }
      },
      {
        name: 'attach_tiktok_business_profile',
        description: 'Attach a TikTok Business profile returned from OAuth',
        inputSchema: {
          type: 'object',
          properties: {
            accountId: { type: 'string', description: 'OAuth account ID for TikTok Business' },
            originId: { type: 'string', description: 'TikTok Business profile origin ID' },
            name: { type: 'string', description: 'Profile name' },
            username: { type: 'string', description: 'Profile username' },
            avatar: { type: 'string', description: 'Optional avatar URL' },
            verified: { type: 'boolean', description: 'Whether the profile is verified' },
            type: { type: 'string', enum: ['page', 'group', 'profile', 'location', 'business'], description: 'Profile type reported by TikTok', default: 'business' },
            companyId: { type: 'string', description: 'Optional company ID' }
          },
          required: ['accountId', 'originId', 'name']
        }
      },

      // Analytics Tools
      {
        name: 'get_social_statistics',
        description: 'Retrieve 7-day social media performance metrics for connected accounts',
        inputSchema: {
          type: 'object',
          properties: {
            profileIds: {
              type: 'array',
              items: { type: 'string' },
              description: 'Array of connected account IDs to fetch analytics for'
            },
            platforms: {
              type: 'array',
              items: { type: 'string', enum: ['google', 'facebook', 'instagram', 'linkedin', 'twitter', 'tiktok', 'tiktok-business'] },
              description: 'Optional platforms to limit the analytics response'
            }
          },
          required: ['profileIds']
        }
      },

      // Categories & Tags Tools
      {
        name: 'get_social_categories',
        description: 'Get social media post categories',
        inputSchema: {
          type: 'object',
          properties: {
            searchText: { type: 'string', description: 'Search for categories' },
            limit: { type: 'number', description: 'Number to return', default: 10 },
            skip: { type: 'number', description: 'Number to skip', default: 0 }
          }
        }
      },
      {
        name: 'get_social_category',
        description: 'Get a specific social media category by ID',
        inputSchema: {
          type: 'object',
          properties: {
            categoryId: { type: 'string', description: 'Category ID' }
          },
          required: ['categoryId']
        }
      },
      {
        name: 'get_social_tags',
        description: 'Get social media post tags',
        inputSchema: {
          type: 'object',
          properties: {
            searchText: { type: 'string', description: 'Search for tags' },
            limit: { type: 'number', description: 'Number to return', default: 10 },
            skip: { type: 'number', description: 'Number to skip', default: 0 }
          }
        }
      },
      {
        name: 'get_social_tags_by_ids',
        description: 'Get specific social media tags by their IDs',
        inputSchema: {
          type: 'object',
          properties: {
            tagIds: {
              type: 'array',
              items: { type: 'string' },
              description: 'Array of tag IDs'
            }
          },
          required: ['tagIds']
        }
      },

      // OAuth Integration Tools
      {
        name: 'start_social_oauth',
        description: 'Start OAuth process for social media platform',
        inputSchema: {
          type: 'object',
          properties: {
            platform: {
              type: 'string',
              enum: ['google', 'facebook', 'instagram', 'linkedin', 'twitter', 'tiktok', 'tiktok-business'],
              description: 'Social media platform'
            },
            userId: { type: 'string', description: 'User ID initiating OAuth' },
            page: { type: 'string', description: 'Page context' },
            reconnect: { type: 'boolean', description: 'Whether this is a reconnection' }
          },
          required: ['platform', 'userId']
        }
      },
      {
        name: 'get_platform_accounts',
        description: 'Get available accounts for a specific platform after OAuth',
        inputSchema: {
          type: 'object',
          properties: {
            platform: {
              type: 'string',
              enum: ['google', 'facebook', 'instagram', 'linkedin', 'twitter', 'tiktok', 'tiktok-business'],
              description: 'Social media platform'
            },
            accountId: { type: 'string', description: 'OAuth account ID' }
          },
          required: ['platform', 'accountId']
        }
      }
    ];
  }

  async executeTool(name: string, args: any): Promise<any> {
    try {
      switch (name) {
        case 'search_social_posts':
          return await this.searchSocialPosts(args);
        case 'create_social_post':
          return await this.createSocialPost(args);
        case 'get_social_post':
          return await this.getSocialPost(args);
        case 'update_social_post':
          return await this.updateSocialPost(args);
        case 'delete_social_post':
          return await this.deleteSocialPost(args);
        case 'bulk_delete_social_posts':
          return await this.bulkDeleteSocialPosts(args);
        case 'get_social_accounts':
          return await this.getSocialAccounts();
        case 'delete_social_account':
          return await this.deleteSocialAccount(args);
        case 'upload_social_csv':
          return await this.uploadSocialCSV(args);
        case 'get_csv_upload_status':
          return await this.getSocialCSVUploadStatus(args);
        case 'set_csv_accounts':
          return await this.setSocialCSVAccounts(args);
        case 'get_csv_posts':
          return await this.getSocialCSVPosts(args);
        case 'finalize_social_csv':
          return await this.finalizeSocialCSV(args);
        case 'delete_social_csv':
          return await this.deleteSocialCSV(args);
        case 'delete_csv_post':
          return await this.deleteSocialCSVPost(args);
        case 'attach_google_locations':
          return await this.attachGoogleLocations(args);
        case 'attach_facebook_pages':
          return await this.attachFacebookPages(args);
        case 'attach_instagram_accounts':
          return await this.attachInstagramAccounts(args);
        case 'attach_linkedin_accounts':
          return await this.attachLinkedInAccounts(args);
        case 'attach_twitter_profile':
          return await this.attachTwitterProfile(args);
        case 'attach_tiktok_profile':
          return await this.attachTikTokProfile(args);
        case 'attach_tiktok_business_profile':
          return await this.attachTikTokBusinessProfile(args);
        case 'get_social_statistics':
          return await this.getSocialStatistics(args);
        case 'get_social_categories':
          return await this.getSocialCategories(args);
        case 'get_social_category':
          return await this.getSocialCategory(args);
        case 'get_social_tags':
          return await this.getSocialTags(args);
        case 'get_social_tags_by_ids':
          return await this.getSocialTagsByIds(args);
        case 'start_social_oauth':
          return await this.startSocialOAuth(args);
        case 'get_platform_accounts':
          return await this.getPlatformAccounts(args);
        default:
          throw new Error(`Unknown tool: ${name}`);
      }
    } catch (error) {
      throw new Error(`Error executing ${name}: ${error}`);
    }
  }

  // Implementation methods
  private async searchSocialPosts(params: MCPSearchPostsParams) {
    const response = await this.ghlClient.searchSocialPosts({
      type: params.type,
      accounts: params.accounts,
      skip: params.skip?.toString(),
      limit: params.limit?.toString(),
      fromDate: params.fromDate,
      toDate: params.toDate,
      includeUsers: params.includeUsers?.toString() || 'true',
      postType: params.postType
    });

    return {
      success: true,
      posts: response.data?.posts || [],
      count: response.data?.count || 0,
      message: `Found ${response.data?.count || 0} social media posts`
    };
  }

  private async createSocialPost(params: MCPCreatePostParams) {
    const response = await this.ghlClient.createSocialPost({
      accountIds: params.accountIds,
      summary: params.summary,
      media: params.media,
      status: params.status,
      scheduleDate: params.scheduleDate,
      followUpComment: params.followUpComment,
      type: params.type,
      tags: params.tags,
      categoryId: params.categoryId,
      userId: params.userId
    });

    return {
      success: true,
      post: response.data?.post,
      message: `Social media post created successfully`
    };
  }

  private async getSocialPost(params: MCPGetPostParams) {
    const response = await this.ghlClient.getSocialPost(params.postId);
    
    return {
      success: true,
      post: response.data?.post,
      message: `Retrieved social media post ${params.postId}`
    };
  }

  private async updateSocialPost(params: MCPUpdatePostParams) {
    const { postId, ...updateData } = params;
    const response = await this.ghlClient.updateSocialPost(postId, updateData);
    
    return {
      success: true,
      message: `Social media post ${postId} updated successfully`
    };
  }

  private async deleteSocialPost(params: MCPDeletePostParams) {
    const response = await this.ghlClient.deleteSocialPost(params.postId);
    
    return {
      success: true,
      message: `Social media post ${params.postId} deleted successfully`
    };
  }

  private async bulkDeleteSocialPosts(params: MCPBulkDeletePostsParams) {
    const response = await this.ghlClient.bulkDeleteSocialPosts({ postIds: params.postIds });
    const data: any = response.data || {};
    const deletedCount = data.deletedCount ?? data.results?.deletedCount ?? 0;
    const message = data.message ?? data.results?.message ?? `${deletedCount} social media posts deleted successfully`;

    return {
      success: true,
      deletedCount,
      message
    };
  }

  private async getSocialAccounts(_params?: MCPGetAccountsParams) {
    const response = await this.ghlClient.getSocialAccounts();
    
    return {
      success: true,
      accounts: response.data?.accounts || [],
      groups: response.data?.groups || [],
      message: `Retrieved ${response.data?.accounts?.length || 0} social media accounts and ${response.data?.groups?.length || 0} groups`
    };
  }

  private async deleteSocialAccount(params: MCPDeleteAccountParams) {
    await this.ghlClient.deleteSocialAccount(
      params.accountId,
      params.companyId,
      params.userId
    );
    
    return {
      success: true,
      message: `Social media account ${params.accountId} deleted successfully`
    };
  }

  private async uploadSocialCSV(params: MCPUploadCSVParams) {
    const response = await this.ghlClient.uploadSocialCSV(params);
    return {
      success: true,
      data: response.data,
      message: 'CSV uploaded successfully'
    };
  }

  private async getSocialCSVUploadStatus(params: MCPGetUploadStatusParams) {
    const response = await this.ghlClient.getSocialCSVUploadStatus(
      params.skip,
      params.limit,
      params.includeUsers,
      params.userId
    );
    return {
      success: true,
      csvs: response.data?.csvs || [],
      count: response.data?.count || 0,
      message: `Retrieved ${response.data?.count || 0} CSV imports`
    };
  }

  private async setSocialCSVAccounts(params: MCPSetAccountsParams) {
    const response = await this.ghlClient.setSocialCSVAccounts({
      accountIds: params.accountIds,
      filePath: params.filePath,
      rowsCount: params.rowsCount,
      fileName: params.fileName,
      approver: params.approver,
      userId: params.userId
    });
    return {
      success: true,
      data: response.data,
      message: 'Accounts assigned to CSV import'
    };
  }

  private async getSocialCSVPosts(params: MCPGetCSVPostParams) {
    const response = await this.ghlClient.getSocialCSVPosts(
      params.csvId,
      params.skip,
      params.limit
    );
    return {
      success: true,
      data: response.data,
      message: `Retrieved posts for CSV import ${params.csvId}`
    };
  }

  private async finalizeSocialCSV(params: MCPFinalizeCSVParams) {
    const response = await this.ghlClient.finalizeSocialCSV(params.csvId, { userId: params.userId });
    return {
      success: true,
      data: response.data,
      message: `CSV import ${params.csvId} finalized`
    };
  }

  private async deleteSocialCSV(params: MCPDeleteCSVParams) {
    await this.ghlClient.deleteSocialCSV(params.csvId);
    return {
      success: true,
      message: `CSV import ${params.csvId} deleted`
    };
  }

  private async deleteSocialCSVPost(params: MCPDeleteCSVPostParams) {
    await this.ghlClient.deleteSocialCSVPost(params.csvId, params.postId);
    return {
      success: true,
      message: `Removed post ${params.postId} from CSV import ${params.csvId}`
    };
  }

  private async attachGoogleLocations(params: MCPAttachGoogleLocationsParams) {
    const { accountId, ...attachData } = params;
    const payload: GHLAttachGMBLocationRequest = {
      companyId: attachData.companyId,
      location: attachData.location,
      account: attachData.account
    };
    const response = await this.ghlClient.setGoogleBusinessLocations(accountId, payload);
    return {
      success: true,
      account: response.data,
      message: `Attached Google locations to account ${accountId}`
    };
  }

  private async attachFacebookPages(params: MCPAttachFacebookPagesParams) {
    const { accountId, ...attachData } = params;
    const payload: GHLAttachFBAccountRequest = {
      type: 'page',
      originId: attachData.originId,
      name: attachData.name,
      avatar: attachData.avatar,
      companyId: attachData.companyId
    };
    const response = await this.ghlClient.attachFacebookPages(accountId, payload);
    return {
      success: true,
      account: response.data,
      message: `Facebook pages attached to account ${accountId}`
    };
  }

  private async attachInstagramAccounts(params: MCPAttachInstagramAccountsParams) {
    const { accountId, ...attachData } = params;
    const payload: GHLAttachIGAccountRequest = {
      originId: attachData.originId,
      name: attachData.name,
      avatar: attachData.avatar,
      pageId: attachData.pageId,
      companyId: attachData.companyId
    };
    const response = await this.ghlClient.attachInstagramAccounts(accountId, payload);
    return {
      success: true,
      account: response.data,
      message: `Instagram account attached to account ${accountId}`
    };
  }

  private async attachLinkedInAccounts(params: MCPAttachLinkedInAccountsParams) {
    const { accountId, ...attachData } = params;
    const payload: GHLAttachLinkedInAccountRequest = {
      originId: attachData.originId,
      name: attachData.name,
      type: attachData.type,
      avatar: attachData.avatar,
      urn: attachData.urn,
      companyId: attachData.companyId
    };
    const response = await this.ghlClient.attachLinkedInAccounts(accountId, payload);
    return {
      success: true,
      account: response.data,
      message: `LinkedIn account attached to account ${accountId}`
    };
  }

  private async attachTwitterProfile(params: MCPAttachTwitterProfileParams) {
    const { accountId, ...attachData } = params;
    const payload: GHLAttachTwitterAccountRequest = {
      originId: attachData.originId,
      name: attachData.name,
      username: attachData.username,
      avatar: attachData.avatar,
      protected: attachData.protected,
      verified: attachData.verified,
      companyId: attachData.companyId
    };
    const response = await this.ghlClient.attachTwitterProfile(accountId, payload);
    return {
      success: true,
      account: response.data,
      message: `Twitter profile attached to account ${accountId}`
    };
  }

  private async attachTikTokProfile(params: MCPAttachTikTokProfileParams) {
    const { accountId, ...attachData } = params;
    const payload: GHLAttachTikTokAccountRequest = {
      originId: attachData.originId,
      name: attachData.name,
      username: attachData.username,
      avatar: attachData.avatar,
      verified: attachData.verified,
      type: attachData.type ?? 'profile',
      companyId: attachData.companyId
    };
    const response = await this.ghlClient.attachTikTokProfile(accountId, payload);
    return {
      success: true,
      account: response.data,
      message: `TikTok profile attached to account ${accountId}`
    };
  }

  private async attachTikTokBusinessProfile(params: MCPAttachTikTokBusinessProfileParams) {
    const { accountId, ...attachData } = params;
    const payload: GHLAttachTikTokAccountRequest = {
      originId: attachData.originId,
      name: attachData.name,
      username: attachData.username,
      avatar: attachData.avatar,
      verified: attachData.verified,
      type: attachData.type ?? 'business',
      companyId: attachData.companyId
    };
    const response = await this.ghlClient.attachTikTokBusinessProfile(accountId, payload);
    return {
      success: true,
      account: response.data,
      message: `TikTok Business profile attached to account ${accountId}`
    };
  }

  private async getSocialStatistics(params: MCPGetSocialStatisticsParams) {
    const response = await this.ghlClient.getSocialStatistics(params.profileIds, params.platforms);
    return {
      success: true,
      statistics: response.data,
      message: `Retrieved analytics for ${params.profileIds.length} profile(s)`
    };
  }

  private async getSocialCategories(params: MCPGetCategoriesParams) {
    const response = await this.ghlClient.getSocialCategories(
      params.searchText,
      params.limit,
      params.skip
    );
    
    return {
      success: true,
      categories: response.data?.categories || [],
      count: response.data?.count || 0,
      message: `Retrieved ${response.data?.count || 0} social media categories`
    };
  }

  private async getSocialCategory(params: MCPGetCategoryParams) {
    const response = await this.ghlClient.getSocialCategory(params.categoryId);
    
    return {
      success: true,
      category: response.data?.category,
      message: `Retrieved social media category ${params.categoryId}`
    };
  }

  private async getSocialTags(params: MCPGetTagsParams) {
    const response = await this.ghlClient.getSocialTags(
      params.searchText,
      params.limit,
      params.skip
    );
    
    return {
      success: true,
      tags: response.data?.tags || [],
      count: response.data?.count || 0,
      message: `Retrieved ${response.data?.count || 0} social media tags`
    };
  }

  private async getSocialTagsByIds(params: MCPGetTagsByIdsParams) {
    const response = await this.ghlClient.getSocialTagsByIds(params.tagIds);
    
    return {
      success: true,
      tags: response.data?.tags || [],
      count: response.data?.count || 0,
      message: `Retrieved ${response.data?.count || 0} social media tags by IDs`
    };
  }

  private async startSocialOAuth(params: MCPStartOAuthParams) {
    const response = await this.ghlClient.startSocialOAuth(
      params.platform,
      params.userId,
      params.page,
      params.reconnect
    );
    
    return {
      success: true,
      oauthData: response.data,
      message: `OAuth process started for ${params.platform}`
    };
  }

  private async getPlatformAccounts(params: MCPGetOAuthAccountsParams) {
    let response;
    
    switch (params.platform) {
      case 'google':
        response = await this.ghlClient.getGoogleBusinessLocations(params.accountId);
        break;
      case 'facebook':
        response = await this.ghlClient.getFacebookPages(params.accountId);
        break;
      case 'instagram':
        response = await this.ghlClient.getInstagramAccounts(params.accountId);
        break;
      case 'linkedin':
        response = await this.ghlClient.getLinkedInAccounts(params.accountId);
        break;
      case 'twitter':
        response = await this.ghlClient.getTwitterProfile(params.accountId);
        break;
      case 'tiktok':
        response = await this.ghlClient.getTikTokProfile(params.accountId);
        break;
      case 'tiktok-business':
        response = await this.ghlClient.getTikTokBusinessProfile(params.accountId);
        break;
      default:
        throw new Error(`Unsupported platform: ${params.platform}`);
    }
    
    return {
      success: true,
      platformAccounts: response.data,
      message: `Retrieved ${params.platform} accounts for OAuth ID ${params.accountId}`
    };
  }

  getToolDefinitions(): Tool[] { return this.getTools(); }
} 