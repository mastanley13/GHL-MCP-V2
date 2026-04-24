/**
 * GoHighLevel API Client
 * Implements exact API endpoints from OpenAPI specifications v2021-07-28 (Contacts) and v2021-04-15 (Conversations)
 */

import axios, { AxiosInstance, AxiosResponse, AxiosError } from 'axios';
import {
  GHLConfig,
  GHLContact,
  GHLCreateContactRequest,
  GHLSearchContactsRequest,
  GHLSearchContactsResponse,
  GHLContactTagsRequest,
  GHLContactTagsResponse,
  GHLApiResponse,
  GHLErrorResponse,
  GHLTask,
  GHLNote,
  // Conversation types
  GHLConversation,
  GHLMessage,
  GHLSendMessageRequest,
  GHLSendMessageResponse,
  GHLSearchConversationsRequest,
  GHLSearchConversationsResponse,
  GHLGetMessagesResponse,
  GHLCreateConversationRequest,
  GHLCreateConversationResponse,
  GHLUpdateConversationRequest,
  // Blog types
  GHLBlogPost,
  GHLCreateBlogPostRequest,
  GHLUpdateBlogPostRequest,
  GHLBlogPostCreateResponse,
  GHLBlogPostUpdateResponse,
  GHLBlogPostListResponse,
  GHLBlogAuthor,
  GHLBlogAuthorsResponse,
  GHLBlogCategory,
  GHLBlogCategoriesResponse,
  GHLBlogSite,
  GHLBlogSitesResponse,
  GHLUrlSlugCheckResponse,
  GHLGetBlogPostsRequest,
  GHLGetBlogAuthorsRequest,
  GHLGetBlogCategoriesRequest,
  GHLGetBlogSitesRequest,
  GHLCheckUrlSlugRequest,
  GHLSearchOpportunitiesRequest,
  GHLSearchOpportunitiesResponse,
  GHLGetPipelinesResponse,
  GHLOpportunity,
  GHLCreateOpportunityRequest,
  GHLUpdateOpportunityRequest,
  GHLOpportunityStatus,
  GHLUpdateOpportunityStatusRequest,
  GHLUpsertOpportunityRequest,
  GHLUpsertOpportunityResponse,
  GHLGetCalendarGroupsResponse,
  GHLCreateCalendarGroupRequest,
  GHLCalendarGroup,
  GHLGetCalendarsResponse,
  GHLCreateCalendarRequest,
  GHLCalendar,
  GHLUpdateCalendarRequest,
  GHLGetCalendarEventsRequest,
  GHLGetCalendarEventsResponse,
  GHLGetFreeSlotsRequest,
  GHLGetFreeSlotsResponse,
  GHLCreateAppointmentRequest,
  GHLCalendarEvent,
  GHLUpdateAppointmentRequest,
  GHLCreateBlockSlotRequest,
  GHLBlockSlotResponse,
  GHLUpdateBlockSlotRequest,
  GHLEmailCampaignsResponse,
  MCPGetEmailCampaignsParams,
  MCPCreateEmailTemplateParams,
  MCPGetEmailTemplatesParams,
  MCPUpdateEmailTemplateParams,
  MCPDeleteEmailTemplateParams,
  GHLEmailTemplate,
  // Location types
  GHLLocationSearchResponse,
  GHLLocationDetailsResponse,
  GHLLocationDetailed,
  GHLCreateLocationRequest,
  GHLUpdateLocationRequest,
  GHLLocationDeleteResponse,
  GHLLocationTagsResponse,
  GHLLocationTagResponse,
  GHLLocationTagRequest,
  GHLLocationTagDeleteResponse,
  GHLLocationTaskSearchRequest,
  GHLLocationTaskSearchResponse,
  GHLRecurringTaskCreateRequest,
  GHLRecurringTaskUpdateRequest,
  GHLRecurringTaskResponse,
  GHLDeleteRecurringTaskResponse,
  GHLLocationCustomFieldsResponse,
  GHLLocationCustomFieldResponse,
  GHLCreateCustomFieldRequest,
  GHLUpdateCustomFieldRequest,
  GHLCustomFieldDeleteResponse,
  GHLFileUploadRequest,
  GHLFileUploadResponse,
  GHLLocationCustomValuesResponse,
  GHLLocationCustomValueResponse,
  GHLCustomValueRequest,
  GHLCustomValueDeleteResponse,
  GHLLocationTemplatesResponse,
  // Email ISV types
  GHLEmailVerificationRequest,
  GHLEmailVerificationResponse,
  // Additional Contact types
  GHLAppointment,
  GHLUpsertContactResponse,
  GHLBulkTagsResponse,
  GHLBulkBusinessResponse,
  GHLBulkTagsUpdateRequest,
  GHLBulkBusinessUpdateRequest,
  GHLGetContactsResponse,
  GHLFollowersResponse,
  GHLCampaign,
  GHLWorkflow,
  // Additional Conversation/Message types
  GHLEmailMessage,
  GHLProcessInboundMessageRequest,
  GHLProcessOutboundMessageRequest,
  GHLProcessMessageResponse,
  GHLCancelScheduledResponse,
  GHLMessageRecordingResponse,
  GHLMessageTranscription,
  GHLMessageTranscriptionResponse,
  GHLLiveChatTypingRequest,
  GHLLiveChatTypingResponse,
  GHLUploadFilesRequest,
  GHLUploadFilesResponse,
  GHLUpdateMessageStatusRequest,
  // Social Media Posting API types
  GHLSocialPlatform,
  GHLSearchPostsRequest,
  GHLSearchPostsResponse,
  GHLCreatePostRequest,
  GHLCreatePostResponse,
  GHLUpdatePostRequest,
  GHLGetPostResponse,
  GHLBulkDeletePostsRequest,
  GHLBulkDeleteResponse,
  GHLGetAccountsResponse,
  GHLUploadCSVRequest,
  GHLUploadCSVResponse,
  GHLGetUploadStatusResponse,
  GHLSetAccountsRequest,
  GHLCSVFinalizeRequest,
  GHLGetCategoriesResponse,
  GHLGetCategoryResponse,
  GHLGetTagsResponse,
  GHLGetTagsByIdsRequest,
  GHLGetTagsByIdsResponse,
  GHLOAuthStartResponse,
  GHLGetGoogleLocationsResponse,
  GHLAttachGMBLocationRequest,
  GHLGetFacebookPagesResponse,
  GHLAttachFBAccountRequest,
  GHLGetInstagramAccountsResponse,
  GHLAttachIGAccountRequest,
  GHLGetLinkedInAccountsResponse,
  GHLAttachLinkedInAccountRequest,
  GHLGetTwitterAccountsResponse,
  GHLAttachTwitterAccountRequest,
  GHLGetTikTokAccountsResponse,
  GHLAttachTikTokAccountRequest,
  GHLCSVImport,
  GHLSocialPost,
  GHLSocialAccount,
  GHLValidateGroupSlugResponse,
  GHLGroupSuccessResponse,
  GHLGroupStatusUpdateRequest,
  GHLUpdateCalendarGroupRequest,
  GHLGetAppointmentNotesResponse,
  GHLCreateAppointmentNoteRequest,
  GHLAppointmentNoteResponse,
  GHLUpdateAppointmentNoteRequest,
  GHLDeleteAppointmentNoteResponse,
  GHLCalendarResource,
  GHLCreateCalendarResourceRequest,
  GHLCalendarResourceResponse,
  GHLCalendarResourceByIdResponse,
  GHLUpdateCalendarResourceRequest,
  GHLResourceDeleteResponse,
  GHLCalendarNotification,
  GHLCreateCalendarNotificationRequest,
  GHLUpdateCalendarNotificationRequest,
  GHLCalendarNotificationDeleteResponse,
  GHLGetCalendarNotificationsRequest,
  GHLGetBlockedSlotsRequest,
  GHLGetMediaFilesRequest,
  GHLGetMediaFilesResponse,
  GHLUploadMediaFileRequest,
  GHLUploadMediaFileResponse,
  GHLDeleteMediaRequest,
  GHLDeleteMediaResponse,
  // Custom Objects API types
  GHLGetObjectSchemaRequest,
  GHLGetObjectSchemaResponse,
  GHLObjectListResponse,
  GHLCreateObjectSchemaRequest,
  GHLObjectSchemaResponse,
  GHLUpdateObjectSchemaRequest,
  GHLCreateObjectRecordRequest,
  GHLObjectRecordResponse,
  GHLDetailedObjectRecordResponse,
  GHLUpdateObjectRecordRequest,
  GHLObjectRecordDeleteResponse,
  GHLSearchObjectRecordsRequest,
  GHLSearchObjectRecordsResponse,
  // Associations API types
  GHLAssociation,
  GHLRelation,
  GHLCreateAssociationRequest,
  GHLUpdateAssociationRequest,
  GHLCreateRelationRequest,
  GHLGetAssociationsRequest,
  GHLGetRelationsByRecordRequest,
  GHLGetAssociationByKeyRequest,
  GHLGetAssociationByObjectKeyRequest,
  GHLDeleteRelationRequest,
  GHLAssociationResponse,
  GHLDeleteAssociationResponse,
  GHLGetAssociationsResponse,
  GHLGetRelationsResponse,
  // Custom Fields V2 API types
  GHLV2CustomField,
  GHLV2CustomFieldFolder,
  GHLV2CreateCustomFieldRequest,
  GHLV2UpdateCustomFieldRequest,
  GHLV2CreateCustomFieldFolderRequest,
  GHLV2UpdateCustomFieldFolderRequest,
  GHLV2GetCustomFieldsByObjectKeyRequest,
  GHLV2DeleteCustomFieldFolderRequest,
  GHLV2CustomFieldResponse,
  GHLV2CustomFieldsResponse,
  GHLV2CustomFieldFolderResponse,
  GHLV2DeleteCustomFieldResponse,
  // Workflows API types
  GHLGetWorkflowsRequest,
  GHLGetWorkflowsResponse,
  // Surveys API types
  GHLGetSurveysRequest,
  GHLGetSurveysResponse,
  GHLGetSurveySubmissionsRequest,
  GHLGetSurveySubmissionsResponse,
  // Store API types
  GHLCreateShippingZoneRequest,
  GHLCreateShippingZoneResponse,
  GHLListShippingZonesResponse,
  GHLGetShippingZonesRequest,
  GHLGetShippingZoneResponse,
  GHLUpdateShippingZoneRequest,
  GHLUpdateShippingZoneResponse,
  GHLDeleteShippingZoneRequest,
  GHLDeleteShippingZoneResponse,
  GHLGetAvailableShippingRatesRequest,
  GHLGetAvailableShippingRatesResponse,
  GHLCreateShippingRateRequest,
  GHLCreateShippingRateResponse,
  GHLListShippingRatesResponse,
  GHLGetShippingRatesRequest,
  GHLGetShippingRateResponse,
  GHLUpdateShippingRateRequest,
  GHLUpdateShippingRateResponse,
  GHLDeleteShippingRateRequest,
  GHLDeleteShippingRateResponse,
  GHLCreateShippingCarrierRequest,
  GHLCreateShippingCarrierResponse,
  GHLListShippingCarriersResponse,
  GHLGetShippingCarriersRequest,
  GHLGetShippingCarrierResponse,
  GHLUpdateShippingCarrierRequest,
  GHLUpdateShippingCarrierResponse,
  GHLDeleteShippingCarrierRequest,
  GHLDeleteShippingCarrierResponse,
  GHLCreateStoreSettingRequest,
  GHLCreateStoreSettingResponse,
  GHLGetStoreSettingRequest,
  GHLGetStoreSettingResponse,
  GHLCreateProductRequest,
  GHLCreateProductResponse,
  GHLUpdateProductRequest,
  GHLUpdateProductResponse,
  GHLGetProductRequest,
  GHLGetProductResponse,
  GHLListProductsRequest,
  GHLListProductsResponse,
  GHLDeleteProductRequest,
  GHLDeleteProductResponse,
  GHLBulkUpdateRequest,
  GHLBulkUpdateResponse,
  GHLCreatePriceRequest,
  GHLCreatePriceResponse,
  GHLUpdatePriceRequest,
  GHLUpdatePriceResponse,
  GHLGetPriceRequest,
  GHLGetPriceResponse,
  GHLListPricesRequest,
  GHLListPricesResponse,
  GHLDeletePriceRequest,
  GHLDeletePriceResponse,
  GHLListInventoryRequest,
  GHLListInventoryResponse,
  GHLUpdateInventoryRequest,
  GHLUpdateInventoryResponse,
  GHLGetProductStoreStatsRequest,
  GHLGetProductStoreStatsResponse,
  GHLUpdateProductStoreRequest,
  GHLUpdateProductStoreResponse,
  GHLCreateProductCollectionRequest,
  GHLCreateCollectionResponse,
  GHLUpdateProductCollectionRequest,
  GHLUpdateProductCollectionResponse,
  GHLGetProductCollectionRequest,
  GHLDefaultCollectionResponse,
  GHLListProductCollectionsRequest,
  GHLListCollectionResponse,
  GHLDeleteProductCollectionRequest,
  GHLDeleteProductCollectionResponse,
  GHLListProductReviewsRequest,
  GHLListProductReviewsResponse,
  GHLGetReviewsCountRequest,
  GHLCountReviewsByStatusResponse,
  GHLUpdateProductReviewRequest,
  GHLUpdateProductReviewsResponse,
  GHLDeleteProductReviewRequest,
  GHLDeleteProductReviewResponse,
  GHLBulkUpdateProductReviewsRequest,
  // Invoice API types
  CreateInvoiceTemplateDto,
  CreateInvoiceTemplateResponseDto,
  UpdateInvoiceTemplateDto,
  UpdateInvoiceTemplateResponseDto,
  DeleteInvoiceTemplateResponseDto,
  ListTemplatesResponse,
  InvoiceTemplate,
  UpdateInvoiceLateFeesConfigurationDto,
  UpdatePaymentMethodsConfigurationDto,
  CreateInvoiceScheduleDto,
  CreateInvoiceScheduleResponseDto,
  UpdateInvoiceScheduleDto,
  UpdateInvoiceScheduleResponseDto,
  DeleteInvoiceScheduleResponseDto,
  ListSchedulesResponse,
  GetScheduleResponseDto,
  ScheduleInvoiceScheduleDto,
  ScheduleInvoiceScheduleResponseDto,
  AutoPaymentScheduleDto,
  AutoPaymentInvoiceScheduleResponseDto,
  CancelInvoiceScheduleDto,
  CancelInvoiceScheduleResponseDto,
  UpdateAndScheduleInvoiceScheduleResponseDto,
  Text2PayDto,
  Text2PayInvoiceResponseDto,
  GenerateInvoiceNumberResponse,
  GetInvoiceResponseDto,
  UpdateInvoiceDto,
  UpdateInvoiceResponseDto,
  DeleteInvoiceResponseDto,
  VoidInvoiceDto,
  VoidInvoiceResponseDto,
  SendInvoiceDto,
  SendInvoicesResponseDto,
  RecordPaymentDto,
  RecordPaymentResponseDto,
  PatchInvoiceStatsLastViewedDto,
  CreateEstimatesDto,
  EstimateResponseDto,
  UpdateEstimateDto,
  GenerateEstimateNumberResponse,
  SendEstimateDto,
  CreateInvoiceFromEstimateDto,
  CreateInvoiceFromEstimateResponseDto,
  ListEstimatesResponseDto,
  EstimateIdParam,
  ListEstimateTemplateResponseDto,
  EstimateTemplatesDto,
  EstimateTemplateResponseDto,
  CreateInvoiceDto,
  CreateInvoiceResponseDto,
  ListInvoicesResponseDto,
  AltDto
} from '../types/ghl-types.js';
import { LocationKeyManager, ResolvedAuth } from './location-keys.js';

/**
 * GoHighLevel API Client
 * Handles all API communication with GHL services
 */
export class GHLApiClient {
  private axiosInstance: AxiosInstance;
  private config: GHLConfig;
  private locationKeyManager: LocationKeyManager;

  constructor(config?: GHLConfig) {
    // Use provided config or create from environment variables
    if (config) {
      this.config = config;
    } else {
      const apiKey = process.env.GHL_API_KEY;
      const baseUrl = process.env.GHL_BASE_URL;
      const locationId = process.env.GHL_LOCATION_ID;
      const version = process.env.GHL_VERSION || '2021-07-28';

      if (!apiKey) {
        throw new Error('GHL_API_KEY environment variable is required');
      }
      if (!baseUrl) {
        throw new Error('GHL_BASE_URL environment variable is required');
      }
      if (!locationId) {
        throw new Error('GHL_LOCATION_ID environment variable is required');
      }

      this.config = {
        accessToken: apiKey,
        baseUrl: baseUrl,
        locationId: locationId,
        version: version
      };
    }
    
    // Initialize location key manager for dual auth
    this.locationKeyManager = new LocationKeyManager();

    // Create axios instance with base configuration
    this.axiosInstance = axios.create({
      baseURL: this.config.baseUrl,
      headers: {
        'Authorization': `Bearer ${this.config.accessToken}`,
        'Version': this.config.version,
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      timeout: 30000 // 30 second timeout
    });

    // Add request interceptor for logging
    this.axiosInstance.interceptors.request.use(
      (config) => {
        process.stderr.write(`[GHL API] ${config.method?.toUpperCase()} ${config.url}\n`);
        return config;
      },
      (error) => {
        console.error('[GHL API] Request error:', error);
        return Promise.reject(error);
      }
    );

    // Add response interceptor for error handling
    this.axiosInstance.interceptors.response.use(
      (response) => {
        process.stderr.write(`[GHL API] Response ${response.status}: ${response.config.url}\n`);
        return response;
      },
      (error: AxiosError<GHLErrorResponse>) => {
        console.error('[GHL API] Response error:', {
          status: error.response?.status,
          message: error.response?.data?.message,
          url: error.config?.url
        });
        return this.handleApiError(error);
      }
    );
  }

  /**
   * Handle API errors and convert to standardized format
   */
  private handleApiError(error: AxiosError<GHLErrorResponse>): GHLApiResponse<never> {
    const status = error.response?.status || 500;
    const data = error.response?.data as any;
    const message = data?.message || error.message || 'Unknown error';
    const errorMessage = Array.isArray(message) ? message.join(', ') : message;
    
    return {
      success: false,
      data: null as never,
      error: {
        message: `GHL API Error (${status}): ${errorMessage}`,
        statusCode: status,
        code: data?.error || data?.code,
        fields: data?.errors || data?.fieldErrors,
        details: data
      }
    };
  }


  /**
   * Get authorization headers for a specific request, using per-location
   * PIT keys when available, or falling back to the agency key.
   */
  getAuthHeaders(args?: Record<string, any>): Record<string, string> {
    const resolved = this.locationKeyManager.resolve(args);
    return {
      'Authorization': `Bearer ${resolved.apiKey}`,
      'Version': this.config.version,
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    };
  }

  /**
   * Resolve the effective locationId for this request
   */
  resolveLocationId(args?: Record<string, any>): string {
    return this.locationKeyManager.resolve(args).locationId;
  }

  /**
 API responses in standardized format
   */
  private wrapResponse<T>(data: T): GHLApiResponse<T> {
    return {
      success: true,
      data
    };
  }

  /**
   * Create custom headers for different API versions
   */
  private getConversationHeaders() {
    return {
      'Authorization': `Bearer ${this.config.accessToken}`,
      'Version': '2021-04-15', // Conversations API uses different version
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    };
  }

  /**
   * Create headers for a specific API Version
   */
  private getHeadersForVersion(version: string) {
    return {
      'Authorization': `Bearer ${this.config.accessToken}`,
      'Version': version,
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    };
  }

  /**
   * CONTACTS API METHODS
   */

  /**
   * Create a new contact
   * POST /contacts/
   */
  async createContact(contactData: GHLCreateContactRequest): Promise<GHLApiResponse<GHLContact>> {
    try {
      // Ensure locationId is set
      const payload = {
        ...contactData,
        locationId: contactData.locationId || this.config.locationId
      };

      const response: AxiosResponse<{ contact: GHLContact }> = await this.axiosInstance.post(
        '/contacts/',
        payload
      );

      return this.wrapResponse(response.data.contact);
    } catch (error) {
      return this.handleApiError(error as AxiosError<GHLErrorResponse>);
    }
  }

  /**
   * Get contact by ID
   * GET /contacts/{contactId}
   */
  async getContact(contactId: string): Promise<GHLApiResponse<GHLContact>> {
    try {
      const response: AxiosResponse<{ contact: GHLContact }> = await this.axiosInstance.get(
        `/contacts/${contactId}`
      );

      return this.wrapResponse(response.data.contact);
    } catch (error) {
      return this.handleApiError(error as AxiosError<GHLErrorResponse>);
    }
  }

  /**
   * Update existing contact
   * PUT /contacts/{contactId}
   */
  async updateContact(contactId: string, updates: Partial<GHLCreateContactRequest>): Promise<GHLApiResponse<GHLContact>> {
    try {
      const response: AxiosResponse<{ contact: GHLContact; succeded: boolean }> = await this.axiosInstance.put(
        `/contacts/${contactId}`,
        updates
      );

      return this.wrapResponse(response.data.contact);
    } catch (error) {
      return this.handleApiError(error as AxiosError<GHLErrorResponse>);
    }
  }

  /**
   * Delete contact
   * DELETE /contacts/{contactId}
   */
  async deleteContact(contactId: string): Promise<GHLApiResponse<{ succeded: boolean }>> {
    try {
      const response: AxiosResponse<{ succeded: boolean }> = await this.axiosInstance.delete(
        `/contacts/${contactId}`
      );

      return this.wrapResponse(response.data);
    } catch (error) {
      return this.handleApiError(error as AxiosError<GHLErrorResponse>);
    }
  }

  /**
   * Search contacts with advanced filters
   * POST /contacts/search
   */
  async searchContacts(searchParams: GHLSearchContactsRequest): Promise<GHLApiResponse<GHLSearchContactsResponse>> {
    try {
      // Build minimal request body with only required/supported parameters
      // Start with just locationId and pageLimit as per API requirements
      const payload: any = {
        locationId: searchParams.locationId || this.config.locationId,
        pageLimit: searchParams.limit || 25
      };

      // Only add optional parameters if they have valid values
      if (searchParams.query && searchParams.query.trim()) {
        payload.query = searchParams.query.trim();
      }

      if (searchParams.startAfterId && searchParams.startAfterId.trim()) {
        payload.startAfterId = searchParams.startAfterId.trim();
      }

      if (searchParams.startAfter && typeof searchParams.startAfter === 'number') {
        payload.startAfter = searchParams.startAfter;
      }

      // Only add filters if we have valid filter values
      if (searchParams.filters) {
        const filters: any = {};
        let hasFilters = false;

        if (searchParams.filters.email && searchParams.filters.email.trim()) {
          filters.email = searchParams.filters.email.trim();
          hasFilters = true;
        }
        
        if (searchParams.filters.phone && searchParams.filters.phone.trim()) {
          filters.phone = searchParams.filters.phone.trim();
          hasFilters = true;
        }

        if (searchParams.filters.tags && Array.isArray(searchParams.filters.tags) && searchParams.filters.tags.length > 0) {
          filters.tags = searchParams.filters.tags;
          hasFilters = true;
        }

        if (searchParams.filters.dateAdded && typeof searchParams.filters.dateAdded === 'object') {
          filters.dateAdded = searchParams.filters.dateAdded;
          hasFilters = true;
        }

        // Only add filters object if we have actual filters
        if (hasFilters) {
          payload.filters = filters;
        }
      }

      process.stderr.write(`[GHL API] Search contacts payload: ${JSON.stringify(payload, null, 2)}\n`);

      const response: AxiosResponse<GHLSearchContactsResponse> = await this.axiosInstance.post(
        '/contacts/search',
        payload
      );

      return this.wrapResponse(response.data);
    } catch (error) {
      const axiosError = error as AxiosError<GHLErrorResponse>;
      process.stderr.write(`[GHL API] Search contacts error: ${JSON.stringify({
        status: axiosError.response?.status,
        statusText: axiosError.response?.statusText,
        data: axiosError.response?.data,
        message: axiosError.message
      }, null, 2)}\n`);
      
      return this.handleApiError(axiosError);
    }
  }

  /**
   * Get duplicate contact by email or phone
   * GET /contacts/search/duplicate
   */
  async getDuplicateContact(email?: string, phone?: string): Promise<GHLApiResponse<GHLContact | null>> {
    try {
      const params: any = {
        locationId: this.config.locationId
      };

      if (email) params.email = encodeURIComponent(email);
      if (phone) params.number = encodeURIComponent(phone);

      const response: AxiosResponse<{ contact?: GHLContact }> = await this.axiosInstance.get(
        '/contacts/search/duplicate',
        { params }
      );

      return this.wrapResponse(response.data.contact || null);
    } catch (error) {
      return this.handleApiError(error as AxiosError<GHLErrorResponse>);
    }
  }

  /**
   * Add tags to contact
   * POST /contacts/{contactId}/tags
   */
  async addContactTags(contactId: string, tags: string[]): Promise<GHLApiResponse<GHLContactTagsResponse>> {
    try {
      const payload: GHLContactTagsRequest = { tags };
      
      const response: AxiosResponse<GHLContactTagsResponse> = await this.axiosInstance.post(
        `/contacts/${contactId}/tags`,
        payload
      );

      return this.wrapResponse(response.data);
    } catch (error) {
      return this.handleApiError(error as AxiosError<GHLErrorResponse>);
    }
  }

  /**
   * Remove tags from contact
   * DELETE /contacts/{contactId}/tags
   */
  async removeContactTags(contactId: string, tags: string[]): Promise<GHLApiResponse<GHLContactTagsResponse>> {
    try {
      const payload: GHLContactTagsRequest = { tags };
      
      const response: AxiosResponse<GHLContactTagsResponse> = await this.axiosInstance.delete(
        `/contacts/${contactId}/tags`,
        { data: payload }
      );

      return this.wrapResponse(response.data);
    } catch (error) {
      return this.handleApiError(error as AxiosError<GHLErrorResponse>);
    }
  }

  /**
   * CONVERSATIONS API METHODS
   */

  /**
   * Search conversations with filters
   * GET /conversations/search
   */
  async searchConversations(searchParams: GHLSearchConversationsRequest): Promise<GHLApiResponse<GHLSearchConversationsResponse>> {
    try {
      // Ensure locationId is set
      const params = {
        ...searchParams,
        locationId: searchParams.locationId || this.config.locationId
      };

      const response: AxiosResponse<GHLSearchConversationsResponse> = await this.axiosInstance.get(
        '/conversations/search',
        { 
          params,
          headers: this.getConversationHeaders()
        }
      );

      return this.wrapResponse(response.data);
    } catch (error) {
      return this.handleApiError(error as AxiosError<GHLErrorResponse>);
    }
  }

  /**
   * Get conversation by ID
   * GET /conversations/{conversationId}
   */
  async getConversation(conversationId: string): Promise<GHLApiResponse<GHLConversation>> {
    try {
      const response: AxiosResponse<GHLConversation> = await this.axiosInstance.get(
        `/conversations/${conversationId}`,
        { headers: this.getConversationHeaders() }
      );

      return this.wrapResponse(response.data);
    } catch (error) {
      return this.handleApiError(error as AxiosError<GHLErrorResponse>);
    }
  }

  /**
   * Create a new conversation
   * POST /conversations/
   */
  async createConversation(conversationData: GHLCreateConversationRequest): Promise<GHLApiResponse<GHLCreateConversationResponse>> {
    try {
      // Ensure locationId is set
      const payload = {
        ...conversationData,
        locationId: conversationData.locationId || this.config.locationId
      };

      const response: AxiosResponse<{ success: boolean; conversation: GHLCreateConversationResponse }> = await this.axiosInstance.post(
        '/conversations/',
        payload,
        { headers: this.getConversationHeaders() }
      );

      return this.wrapResponse(response.data.conversation);
    } catch (error) {
      return this.handleApiError(error as AxiosError<GHLErrorResponse>);
    }
  }

  /**
   * Update conversation
   * PUT /conversations/{conversationId}
   */
  async updateConversation(conversationId: string, updates: GHLUpdateConversationRequest): Promise<GHLApiResponse<GHLConversation>> {
    try {
      // Ensure locationId is set
      const payload = {
        ...updates,
        locationId: updates.locationId || this.config.locationId
      };

      const response: AxiosResponse<{ success: boolean; conversation: GHLConversation }> = await this.axiosInstance.put(
        `/conversations/${conversationId}`,
        payload,
        { headers: this.getConversationHeaders() }
      );

      return this.wrapResponse(response.data.conversation);
    } catch (error) {
      return this.handleApiError(error as AxiosError<GHLErrorResponse>);
    }
  }

  /**
   * Delete conversation
   * DELETE /conversations/{conversationId}
   */
  async deleteConversation(conversationId: string): Promise<GHLApiResponse<{ success: boolean }>> {
    try {
      const response: AxiosResponse<{ success: boolean }> = await this.axiosInstance.delete(
        `/conversations/${conversationId}`,
        { headers: this.getConversationHeaders() }
      );

      return this.wrapResponse(response.data);
    } catch (error) {
      return this.handleApiError(error as AxiosError<GHLErrorResponse>);
    }
  }

  /**
   * Get messages from a conversation
   * GET /conversations/{conversationId}/messages
   */
  async getConversationMessages(
    conversationId: string, 
    options?: { 
      lastMessageId?: string; 
      limit?: number; 
      type?: string; 
    }
  ): Promise<GHLApiResponse<GHLGetMessagesResponse>> {
    try {
      const params: any = {};
      if (options?.lastMessageId) params.lastMessageId = options.lastMessageId;
      if (options?.limit) params.limit = options.limit;
      if (options?.type) params.type = options.type;

      const response: AxiosResponse<GHLGetMessagesResponse> = await this.axiosInstance.get(
        `/conversations/${conversationId}/messages`,
        { 
          params,
          headers: this.getConversationHeaders()
        }
      );

      return this.wrapResponse(response.data);
    } catch (error) {
      return this.handleApiError(error as AxiosError<GHLErrorResponse>);
    }
  }

  /**
   * Get message by ID
   * GET /conversations/messages/{id}
   */
  async getMessage(id: string): Promise<GHLApiResponse<GHLMessage>> {
    try {
      const response: AxiosResponse<GHLMessage> = await this.axiosInstance.get(
        `/conversations/messages/${id}`,
        { headers: this.getConversationHeaders() }
      );

      return this.wrapResponse(response.data);
    } catch (error) {
      return this.handleApiError(error as AxiosError<GHLErrorResponse>);
    }
  }

  /**
   * Send a new message (SMS, Email, etc.)
   * POST /conversations/messages
   */
  async sendMessage(messageData: GHLSendMessageRequest): Promise<GHLApiResponse<GHLSendMessageResponse>> {
    try {
      const response: AxiosResponse<GHLSendMessageResponse> = await this.axiosInstance.post(
        '/conversations/messages',
        messageData,
        { headers: this.getConversationHeaders() }
      );

      return this.wrapResponse(response.data);
    } catch (error) {
      return this.handleApiError(error as AxiosError<GHLErrorResponse>);
    }
  }

  /**
   * Send SMS message to a contact
   * Convenience method for sending SMS
   */
  async sendSMS(contactId: string, message: string, fromNumber?: string): Promise<GHLApiResponse<GHLSendMessageResponse>> {
    try {
      const messageData: GHLSendMessageRequest = {
        type: 'SMS',
        contactId,
        message,
        fromNumber
      };

      return await this.sendMessage(messageData);
    } catch (error) {
      return this.handleApiError(error as AxiosError<GHLErrorResponse>);
    }
  }

  /**
   * Send Email message to a contact
   * Convenience method for sending Email
   */
  async sendEmail(
    contactId: string, 
    subject: string, 
    message?: string, 
    html?: string,
    options?: {
      emailFrom?: string;
      emailTo?: string;
      emailCc?: string[];
      emailBcc?: string[];
      attachments?: string[];
    }
  ): Promise<GHLApiResponse<GHLSendMessageResponse>> {
    try {
      const messageData: GHLSendMessageRequest = {
        type: 'Email',
        contactId,
        subject,
        message,
        html,
        ...options
      };

      return await this.sendMessage(messageData);
    } catch (error) {
      return this.handleApiError(error as AxiosError<GHLErrorResponse>);
    }
  }

  /**
   * BLOG API METHODS
   */

  /**
   * Get all blog sites for a location
   * GET /blogs/site/all
   */
  async getBlogSites(params: GHLGetBlogSitesRequest): Promise<GHLApiResponse<GHLBlogSitesResponse>> {
    try {
      // Ensure locationId is set
      const queryParams = {
        locationId: params.locationId || this.config.locationId,
        skip: params.skip || 0,
        limit: params.limit || 10,
        ...(params.searchTerm && { searchTerm: params.searchTerm })
      };

      const response: AxiosResponse<GHLBlogSitesResponse> = await this.axiosInstance.get(
        '/blogs/site/all',
        { params: queryParams }
      );

      return this.wrapResponse(response.data);
    } catch (error) {
      return this.handleApiError(error as AxiosError<GHLErrorResponse>);
    }
  }

  /**
   * Get blog posts for a specific blog
   * GET /blogs/posts/all
   */
  async getBlogPosts(params: GHLGetBlogPostsRequest): Promise<GHLApiResponse<GHLBlogPostListResponse>> {
    try {
      // Ensure locationId is set
      const queryParams = {
        locationId: params.locationId || this.config.locationId,
        blogId: params.blogId,
        limit: params.limit || 10,
        offset: params.offset || 0,
        ...(params.searchTerm && { searchTerm: params.searchTerm }),
        ...(params.status && { status: params.status })
      };

      const response: AxiosResponse<GHLBlogPostListResponse> = await this.axiosInstance.get(
        '/blogs/posts/all',
        { params: queryParams }
      );

      return this.wrapResponse(response.data);
    } catch (error) {
      return this.handleApiError(error as AxiosError<GHLErrorResponse>);
    }
  }

  /**
   * Create a new blog post
   * POST /blogs/posts
   */
  async createBlogPost(postData: GHLCreateBlogPostRequest): Promise<GHLApiResponse<GHLBlogPostCreateResponse>> {
    try {
      // Ensure locationId is set
      const payload = {
        ...postData,
        locationId: postData.locationId || this.config.locationId
      };

      const response: AxiosResponse<GHLBlogPostCreateResponse> = await this.axiosInstance.post(
        '/blogs/posts',
        payload
      );

      const blogPostData = response.data.data;
      const createResponse: GHLBlogPostCreateResponse = { data: blogPostData };
      return this.wrapResponse(createResponse);
    } catch (error) {
      return this.handleApiError(error as AxiosError<GHLErrorResponse>);
    }
  }

  /**
   * Update an existing blog post
   * PUT /blogs/posts/{postId}
   */
  async updateBlogPost(postId: string, postData: GHLUpdateBlogPostRequest): Promise<GHLApiResponse<GHLBlogPostUpdateResponse>> {
    try {
      // Ensure locationId is set
      const payload = {
        ...postData,
        locationId: postData.locationId || this.config.locationId
      };

      const response: AxiosResponse<GHLBlogPostUpdateResponse> = await this.axiosInstance.put(
        `/blogs/posts/${postId}`,
        payload
      );

      const blogPostData = response.data.updatedBlogPost;
      const updateResponse: GHLBlogPostUpdateResponse = { updatedBlogPost: blogPostData };
      return this.wrapResponse(updateResponse);
    } catch (error) {
      return this.handleApiError(error as AxiosError<GHLErrorResponse>);
    }
  }

  /**
   * Get all blog authors for a location
   * GET /blogs/authors
   */
  async getBlogAuthors(params: GHLGetBlogAuthorsRequest): Promise<GHLApiResponse<GHLBlogAuthorsResponse>> {
    try {
      // Ensure locationId is set
      const queryParams = {
        locationId: params.locationId || this.config.locationId,
        limit: params.limit || 10,
        offset: params.offset || 0
      };

      const response: AxiosResponse<GHLBlogAuthorsResponse> = await this.axiosInstance.get(
        '/blogs/authors',
        { params: queryParams }
      );

      return this.wrapResponse(response.data);
    } catch (error) {
      return this.handleApiError(error as AxiosError<GHLErrorResponse>);
    }
  }

  /**
   * Get all blog categories for a location
   * GET /blogs/categories
   */
  async getBlogCategories(params: GHLGetBlogCategoriesRequest): Promise<GHLApiResponse<GHLBlogCategoriesResponse>> {
    try {
      // Ensure locationId is set
      const queryParams = {
        locationId: params.locationId || this.config.locationId,
        limit: params.limit || 10,
        offset: params.offset || 0
      };

      const response: AxiosResponse<GHLBlogCategoriesResponse> = await this.axiosInstance.get(
        '/blogs/categories',
        { params: queryParams }
      );

      return this.wrapResponse(response.data);
    } catch (error) {
      return this.handleApiError(error as AxiosError<GHLErrorResponse>);
    }
  }

  /**
   * Check if a URL slug exists (for validation before creating/updating posts)
   * GET /blogs/posts/url-slug-exists
   */
  async checkUrlSlugExists(params: GHLCheckUrlSlugRequest): Promise<GHLApiResponse<GHLUrlSlugCheckResponse>> {
    try {
      // Ensure locationId is set
      const queryParams = {
        locationId: params.locationId || this.config.locationId,
        urlSlug: params.urlSlug,
        ...(params.postId && { postId: params.postId })
      };

      const response: AxiosResponse<GHLUrlSlugCheckResponse> = await this.axiosInstance.get(
        '/blogs/posts/url-slug-exists',
        { params: queryParams }
      );

      return this.wrapResponse(response.data);
    } catch (error) {
      return this.handleApiError(error as AxiosError<GHLErrorResponse>);
    }
  }

  /**
   * TASKS API METHODS
   */

  /**
   * Get all tasks for a contact
   * GET /contacts/{contactId}/tasks
   */
  async getContactTasks(contactId: string): Promise<GHLApiResponse<GHLTask[]>> {
    try {
      const response: AxiosResponse<{ tasks: GHLTask[] }> = await this.axiosInstance.get(
        `/contacts/${contactId}/tasks`
      );

      return this.wrapResponse(response.data.tasks);
    } catch (error) {
      return this.handleApiError(error as AxiosError<GHLErrorResponse>);
    }
  }

  /**
   * Create task for contact
   * POST /contacts/{contactId}/tasks
   */
  async createContactTask(contactId: string, taskData: Omit<GHLTask, 'id' | 'contactId'>): Promise<GHLApiResponse<GHLTask>> {
    try {
      const response: AxiosResponse<{ task: GHLTask }> = await this.axiosInstance.post(
        `/contacts/${contactId}/tasks`,
        taskData
      );

      return this.wrapResponse(response.data.task);
    } catch (error) {
      return this.handleApiError(error as AxiosError<GHLErrorResponse>);
    }
  }

  /**
   * NOTES API METHODS
   */

  /**
   * Get all notes for a contact
   * GET /contacts/{contactId}/notes
   */
  async getContactNotes(contactId: string): Promise<GHLApiResponse<GHLNote[]>> {
    try {
      const response: AxiosResponse<{ notes: GHLNote[] }> = await this.axiosInstance.get(
        `/contacts/${contactId}/notes`
      );

      return this.wrapResponse(response.data.notes);
    } catch (error) {
      return this.handleApiError(error as AxiosError<GHLErrorResponse>);
    }
  }

  /**
   * Create note for contact
   * POST /contacts/{contactId}/notes
   */
  async createContactNote(contactId: string, noteData: Omit<GHLNote, 'id' | 'contactId' | 'dateAdded'>): Promise<GHLApiResponse<GHLNote>> {
    try {
      const response: AxiosResponse<{ note: GHLNote }> = await this.axiosInstance.post(
        `/contacts/${contactId}/notes`,
        noteData
      );

      return this.wrapResponse(response.data.note);
    } catch (error) {
      return this.handleApiError(error as AxiosError<GHLErrorResponse>);
    }
  }

  /**
   * ADDITIONAL CONTACT API METHODS
   */

  /**
   * Get a specific task for a contact
   * GET /contacts/{contactId}/tasks/{taskId}
   */
  async getContactTask(contactId: string, taskId: string): Promise<GHLApiResponse<GHLTask>> {
    try {
      const response: AxiosResponse<{ task: GHLTask }> = await this.axiosInstance.get(
        `/contacts/${contactId}/tasks/${taskId}`
      );

      return this.wrapResponse(response.data.task);
    } catch (error) {
      return this.handleApiError(error as AxiosError<GHLErrorResponse>);
    }
  }

  /**
   * Update a task for a contact
   * PUT /contacts/{contactId}/tasks/{taskId}
   */
  async updateContactTask(contactId: string, taskId: string, updates: Partial<GHLTask>): Promise<GHLApiResponse<GHLTask>> {
    try {
      const response: AxiosResponse<{ task: GHLTask }> = await this.axiosInstance.put(
        `/contacts/${contactId}/tasks/${taskId}`,
        updates
      );

      return this.wrapResponse(response.data.task);
    } catch (error) {
      return this.handleApiError(error as AxiosError<GHLErrorResponse>);
    }
  }

  /**
   * Delete a task for a contact
   * DELETE /contacts/{contactId}/tasks/{taskId}
   */
  async deleteContactTask(contactId: string, taskId: string): Promise<GHLApiResponse<{ succeded: boolean }>> {
    try {
      const response: AxiosResponse<{ succeded: boolean }> = await this.axiosInstance.delete(
        `/contacts/${contactId}/tasks/${taskId}`
      );

      return this.wrapResponse(response.data);
    } catch (error) {
      return this.handleApiError(error as AxiosError<GHLErrorResponse>);
    }
  }

  /**
   * Update task completion status
   * PUT /contacts/{contactId}/tasks/{taskId}/completed
   */
  async updateTaskCompletion(contactId: string, taskId: string, completed: boolean): Promise<GHLApiResponse<GHLTask>> {
    try {
      const response: AxiosResponse<{ task: GHLTask }> = await this.axiosInstance.put(
        `/contacts/${contactId}/tasks/${taskId}/completed`,
        { completed }
      );

      return this.wrapResponse(response.data.task);
    } catch (error) {
      return this.handleApiError(error as AxiosError<GHLErrorResponse>);
    }
  }

  /**
   * Get a specific note for a contact
   * GET /contacts/{contactId}/notes/{noteId}
   */
  async getContactNote(contactId: string, id: string): Promise<GHLApiResponse<GHLNote>> {
    try {
      const response: AxiosResponse<{ note: GHLNote }> = await this.axiosInstance.get(
        `/contacts/${contactId}/notes/${id}`
      );

      return this.wrapResponse(response.data.note);
    } catch (error) {
      return this.handleApiError(error as AxiosError<GHLErrorResponse>);
    }
  }

  /**
   * Update a note for a contact
   * PUT /contacts/{contactId}/notes/{noteId}
   */
  async updateContactNote(contactId: string, id: string, updates: Partial<GHLNote>): Promise<GHLApiResponse<GHLNote>> {
    try {
      const response: AxiosResponse<{ note: GHLNote }> = await this.axiosInstance.put(
        `/contacts/${contactId}/notes/${id}`,
        updates
      );

      return this.wrapResponse(response.data.note);
    } catch (error) {
      return this.handleApiError(error as AxiosError<GHLErrorResponse>);
    }
  }

  /**
   * Delete a note for a contact
   * DELETE /contacts/{contactId}/notes/{noteId}
   */
  async deleteContactNote(contactId: string, id: string): Promise<GHLApiResponse<{ succeded: boolean }>> {
    try {
      const response: AxiosResponse<{ succeded: boolean }> = await this.axiosInstance.delete(
        `/contacts/${contactId}/notes/${id}`
      );

      return this.wrapResponse(response.data);
    } catch (error) {
      return this.handleApiError(error as AxiosError<GHLErrorResponse>);
    }
  }

  /**
   * Upsert contact (create or update based on email/phone)
   * POST /contacts/upsert
   */
  async upsertContact(contactData: Partial<GHLCreateContactRequest>): Promise<GHLApiResponse<GHLUpsertContactResponse>> {
    try {
      const payload = {
        ...contactData,
        locationId: contactData.locationId || this.config.locationId
      };

      const response: AxiosResponse<GHLUpsertContactResponse> = await this.axiosInstance.post(
        '/contacts/upsert',
        payload
      );

      return this.wrapResponse(response.data);
    } catch (error) {
      return this.handleApiError(error as AxiosError<GHLErrorResponse>);
    }
  }

  /**
   * Get contacts by business ID
   * GET /contacts/business/{businessId}
   */
  async getContactsByBusiness(businessId: string, params: { limit?: number; skip?: number; query?: string } = {}): Promise<GHLApiResponse<GHLSearchContactsResponse>> {
    try {
      const queryParams = {
        limit: params.limit || 25,
        skip: params.skip || 0,
        ...(params.query && { query: params.query })
      };

      const response: AxiosResponse<GHLSearchContactsResponse> = await this.axiosInstance.get(
        `/contacts/business/${businessId}`,
        { params: queryParams }
      );

      return this.wrapResponse(response.data);
    } catch (error) {
      return this.handleApiError(error as AxiosError<GHLErrorResponse>);
    }
  }

  /**
   * Get contact appointments
   * GET /contacts/{contactId}/appointments
   */
  async getContactAppointments(contactId: string): Promise<GHLApiResponse<GHLAppointment[]>> {
    try {
      const response: AxiosResponse<{ events: GHLAppointment[] }> = await this.axiosInstance.get(
        `/contacts/${contactId}/appointments`
      );

      return this.wrapResponse(response.data.events);
    } catch (error) {
      return this.handleApiError(error as AxiosError<GHLErrorResponse>);
    }
  }

  /**
   * Bulk update contact tags
   * POST /contacts/tags/bulk
   */
  async bulkUpdateContactTags(contactIds: string[], tags: string[], operation: 'add' | 'remove', removeAllTags?: boolean): Promise<GHLApiResponse<GHLBulkTagsResponse>> {
    try {
      const payload = {
        ids: contactIds,
        tags,
        operation,
        ...(removeAllTags !== undefined && { removeAllTags })
      };

      const response: AxiosResponse<GHLBulkTagsResponse> = await this.axiosInstance.post(
        '/contacts/tags/bulk',
        payload
      );

      return this.wrapResponse(response.data);
    } catch (error) {
      return this.handleApiError(error as AxiosError<GHLErrorResponse>);
    }
  }

  /**
   * Bulk update contact business
   * POST /contacts/business/bulk
   */
  async bulkUpdateContactBusiness(contactIds: string[], businessId?: string): Promise<GHLApiResponse<GHLBulkBusinessResponse>> {
    try {
      const payload = {
        ids: contactIds,
        businessId: businessId || null
      };

      const response: AxiosResponse<GHLBulkBusinessResponse> = await this.axiosInstance.post(
        '/contacts/business/bulk',
        payload
      );

      return this.wrapResponse(response.data);
    } catch (error) {
      return this.handleApiError(error as AxiosError<GHLErrorResponse>);
    }
  }

  /**
   * Add contact followers
   * POST /contacts/{contactId}/followers
   */
  async addContactFollowers(contactId: string, followers: string[]): Promise<GHLApiResponse<GHLFollowersResponse>> {
    try {
      const payload = { followers };

      const response: AxiosResponse<GHLFollowersResponse> = await this.axiosInstance.post(
        `/contacts/${contactId}/followers`,
        payload
      );

      return this.wrapResponse(response.data);
    } catch (error) {
      return this.handleApiError(error as AxiosError<GHLErrorResponse>);
    }
  }

  /**
   * Remove contact followers
   * DELETE /contacts/{contactId}/followers
   */
  async removeContactFollowers(contactId: string, followers: string[]): Promise<GHLApiResponse<GHLFollowersResponse>> {
    try {
      const payload = { followers };

      const response: AxiosResponse<GHLFollowersResponse> = await this.axiosInstance.delete(
        `/contacts/${contactId}/followers`,
        { data: payload }
      );

      return this.wrapResponse(response.data);
    } catch (error) {
      return this.handleApiError(error as AxiosError<GHLErrorResponse>);
    }
  }

  /**
   * Add contact to campaign
   * POST /contacts/{contactId}/campaigns/{campaignId}
   */
  async addContactToCampaign(contactId: string, campaignId: string): Promise<GHLApiResponse<{ succeded: boolean }>> {
    try {
      const response: AxiosResponse<{ succeded: boolean }> = await this.axiosInstance.post(
        `/contacts/${contactId}/campaigns/${campaignId}`
      );

      return this.wrapResponse(response.data);
    } catch (error) {
      return this.handleApiError(error as AxiosError<GHLErrorResponse>);
    }
  }

  /**
   * Remove contact from campaign
   * DELETE /contacts/{contactId}/campaigns/{campaignId}
   */
  async removeContactFromCampaign(contactId: string, campaignId: string): Promise<GHLApiResponse<{ succeded: boolean }>> {
    try {
      const response: AxiosResponse<{ succeded: boolean }> = await this.axiosInstance.delete(
        `/contacts/${contactId}/campaigns/${campaignId}`
      );

      return this.wrapResponse(response.data);
    } catch (error) {
      return this.handleApiError(error as AxiosError<GHLErrorResponse>);
    }
  }

  /**
   * Remove contact from all campaigns
   * DELETE /contacts/{contactId}/campaigns/removeAll
   * Version: 2021-07-28
   */
  async removeContactFromAllCampaigns(contactId: string): Promise<GHLApiResponse<{ succeded: boolean }>> {
    try {
      const response: AxiosResponse<{ succeded: boolean }> = await this.axiosInstance.delete(
        `/contacts/${contactId}/campaigns/removeAll`,
        {
          headers: {
            Version: '2021-07-28'
          }
        }
      );

      return this.wrapResponse(response.data);
    } catch (error) {
      return this.handleApiError(error as AxiosError<GHLErrorResponse>);
    }
  }

  /**
   * Update contacts tags in bulk (add or remove)
   * POST /contacts/bulk/tags/update/{type}
   * Version: 2021-07-28
   */
  async updateContactTagsBulk(contactIds: string[], tagIds: string[], type: 'add' | 'remove'): Promise<GHLApiResponse<GHLBulkTagsResponse>> {
    try {
      const payload: GHLBulkTagsUpdateRequest = {
        ids: contactIds,
        tags: tagIds
      };

      const response: AxiosResponse<GHLBulkTagsResponse> = await this.axiosInstance.post(
        `/contacts/bulk/tags/update/${type}`,
        payload,
        {
          headers: {
            Version: '2021-07-28'
          }
        }
      );

      return this.wrapResponse(response.data);
    } catch (error) {
      return this.handleApiError(error as AxiosError<GHLErrorResponse>);
    }
  }

  /**
   * Update contacts business association in bulk
   * POST /contacts/bulk/business
   * Version: 2021-07-28
   */
  async updateContactBusinessBulk(contactIds: string[], businessId?: string | null): Promise<GHLApiResponse<GHLBulkBusinessResponse>> {
    try {
      const payload: GHLBulkBusinessUpdateRequest = {
        ids: contactIds,
        businessId: businessId
      };

      const response: AxiosResponse<GHLBulkBusinessResponse> = await this.axiosInstance.post(
        '/contacts/bulk/business',
        payload,
        {
          headers: {
            Version: '2021-07-28'
          }
        }
      );

      return this.wrapResponse(response.data);
    } catch (error) {
      return this.handleApiError(error as AxiosError<GHLErrorResponse>);
    }
  }

  /**
   * Get contacts (deprecated)
   * GET /contacts
   * Version: 2021-07-28
   */
  async getContacts(params: {
    locationId: string;
    startAfterId?: string;
    limit?: number;
    query?: string;
  }): Promise<GHLApiResponse<GHLGetContactsResponse>> {
    try {
      const queryParams = {
        locationId: params.locationId,
        limit: params.limit || 100,
        ...(params.startAfterId && { startAfterId: params.startAfterId }),
        ...(params.query && { query: params.query })
      };

      const response: AxiosResponse<GHLGetContactsResponse> = await this.axiosInstance.get(
        '/contacts',
        {
          params: queryParams,
          headers: {
            Version: '2021-07-28'
          }
        }
      );

      return this.wrapResponse(response.data);
    } catch (error) {
      return this.handleApiError(error as AxiosError<GHLErrorResponse>);
    }
  }

  /**
   * Add contact to workflow
   * POST /contacts/{contactId}/workflow/{workflowId}
   */
  async addContactToWorkflow(contactId: string, workflowId: string, eventStartTime?: string): Promise<GHLApiResponse<{ succeded: boolean }>> {
    try {
      const payload = eventStartTime ? { eventStartTime } : {};

      const response: AxiosResponse<{ succeded: boolean }> = await this.axiosInstance.post(
        `/contacts/${contactId}/workflow/${workflowId}`,
        payload
      );

      return this.wrapResponse(response.data);
    } catch (error) {
      return this.handleApiError(error as AxiosError<GHLErrorResponse>);
    }
  }

  /**
   * Remove contact from workflow
   * DELETE /contacts/{contactId}/workflow/{workflowId}
   */
  async removeContactFromWorkflow(contactId: string, workflowId: string, eventStartTime?: string): Promise<GHLApiResponse<{ succeded: boolean }>> {
    try {
      const payload = eventStartTime ? { eventStartTime } : {};

      const response: AxiosResponse<{ succeded: boolean }> = await this.axiosInstance.delete(
        `/contacts/${contactId}/workflow/${workflowId}`,
        { data: payload }
      );

      return this.wrapResponse(response.data);
    } catch (error) {
      return this.handleApiError(error as AxiosError<GHLErrorResponse>);
    }
  }

  /**
   * UTILITY METHODS
   */

  /**
   * Test API connection and authentication
   */
  async testConnection(): Promise<GHLApiResponse<{ status: string; locationId: string }>> {
    try {
      // Test with a simple GET request to check API connectivity
      const response: AxiosResponse<any> = await this.axiosInstance.get('/locations/' + this.config.locationId);

      return this.wrapResponse({
        status: 'connected',
        locationId: this.config.locationId
      });
    } catch (error) {
      throw new Error(`GHL API connection test failed: ${error}`);
    }
  }

  /**
   * Update access token
   */
  updateAccessToken(newToken: string): void {
    this.config.accessToken = newToken;
    
    // Recreate axios instance with new token
    this.axiosInstance = axios.create({
      baseURL: this.config.baseUrl,
      headers: {
        'Authorization': `Bearer ${this.config.accessToken}`,
        'Version': this.config.version,
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      timeout: 30000 // 30 second timeout
    });

    // Re-add interceptors
    this.axiosInstance.interceptors.request.use(
      (config) => {
        process.stderr.write(`[GHL API] ${config.method?.toUpperCase()} ${config.url}\n`);
        return config;
      },
      (error) => {
        console.error('[GHL API] Request error:', error);
        return Promise.reject(error);
      }
    );

    this.axiosInstance.interceptors.response.use(
      (response) => {
        process.stderr.write(`[GHL API] Response ${response.status}: ${response.config.url}\n`);
        return response;
      },
      (error: AxiosError<GHLErrorResponse>) => {
        console.error('[GHL API] Response error:', {
          status: error.response?.status,
          message: error.response?.data?.message,
          url: error.config?.url
        });
        return this.handleApiError(error);
      }
    );

    process.stderr.write('[GHL API] Access token updated\n');
  }

  /**
   * Get current configuration
   */
  getConfig(): Readonly<GHLConfig> {
    return { ...this.config };
  }

  /**
   * OPPORTUNITIES API METHODS
   */

  /**
   * Search opportunities with advanced filters
   * GET /opportunities/search
   */
  async searchOpportunities(searchParams: GHLSearchOpportunitiesRequest): Promise<GHLApiResponse<GHLSearchOpportunitiesResponse>> {
    try {
      // Build query parameters with exact API naming (underscores)
      const params: any = {
        location_id: searchParams.location_id || this.config.locationId
      };

      // Add optional search parameters only if they have values
      if (searchParams.q && searchParams.q.trim()) {
        params.q = searchParams.q.trim();
      }

      if (searchParams.pipeline_id) {
        params.pipeline_id = searchParams.pipeline_id;
      }

      if (searchParams.pipeline_stage_id) {
        params.pipeline_stage_id = searchParams.pipeline_stage_id;
      }

      if (searchParams.contact_id) {
        params.contact_id = searchParams.contact_id;
      }

      if (searchParams.status) {
        params.status = searchParams.status;
      }

      if (searchParams.assigned_to) {
        params.assigned_to = searchParams.assigned_to;
      }

      if (searchParams.campaignId) {
        params.campaignId = searchParams.campaignId;
      }

      if (searchParams.id) {
        params.id = searchParams.id;
      }

      if (searchParams.order) {
        params.order = searchParams.order;
      }

      if (searchParams.endDate) {
        params.endDate = searchParams.endDate;
      }

      if (searchParams.startAfter) {
        params.startAfter = searchParams.startAfter;
      }

      if (searchParams.startAfterId) {
        params.startAfterId = searchParams.startAfterId;
      }

      if (searchParams.date) {
        params.date = searchParams.date;
      }

      if (searchParams.country) {
        params.country = searchParams.country;
      }

      if (searchParams.page) {
        params.page = searchParams.page;
      }

      if (searchParams.limit) {
        params.limit = searchParams.limit;
      }

      if (searchParams.getTasks !== undefined) {
        params.getTasks = searchParams.getTasks;
      }

      if (searchParams.getNotes !== undefined) {
        params.getNotes = searchParams.getNotes;
      }

      if (searchParams.getCalendarEvents !== undefined) {
        params.getCalendarEvents = searchParams.getCalendarEvents;
      }

      process.stderr.write(`[GHL API] Search opportunities params: ${JSON.stringify(params, null, 2)}\n`);

      const response: AxiosResponse<GHLSearchOpportunitiesResponse> = await this.axiosInstance.get(
        '/opportunities/search',
        { params }
      );

      return this.wrapResponse(response.data);
    } catch (error) {
      const axiosError = error as AxiosError<GHLErrorResponse>;
      process.stderr.write(`[GHL API] Search opportunities error: ${JSON.stringify({
        status: axiosError.response?.status,
        statusText: axiosError.response?.statusText,
        data: axiosError.response?.data,
        message: axiosError.message
      }, null, 2)}\n`);
      
      return this.handleApiError(axiosError);
    }
  }

  /**
   * Get all pipelines for a location
   * GET /opportunities/pipelines
   */
  async getPipelines(locationId?: string): Promise<GHLApiResponse<GHLGetPipelinesResponse>> {
    try {
      const params = {
        locationId: locationId || this.config.locationId
      };

      const response: AxiosResponse<GHLGetPipelinesResponse> = await this.axiosInstance.get(
        '/opportunities/pipelines',
        { params }
      );

      return this.wrapResponse(response.data);
    } catch (error) {
      return this.handleApiError(error as AxiosError<GHLErrorResponse>);
    }
  }

  /**
   * Get opportunity by ID
   * GET /opportunities/{id}
   */
  async getOpportunity(id: string): Promise<GHLApiResponse<GHLOpportunity>> {
    try {
      const response: AxiosResponse<{ opportunity: GHLOpportunity }> = await this.axiosInstance.get(
        `/opportunities/${id}`
      );

      return this.wrapResponse(response.data.opportunity);
    } catch (error) {
      return this.handleApiError(error as AxiosError<GHLErrorResponse>);
    }
  }

  /**
   * Create a new opportunity
   * POST /opportunities/
   */
  async createOpportunity(opportunityData: GHLCreateOpportunityRequest): Promise<GHLApiResponse<GHLOpportunity>> {
    try {
      // Ensure locationId is set
      const payload = {
        ...opportunityData,
        locationId: opportunityData.locationId || this.config.locationId
      };

      const response: AxiosResponse<{ opportunity: GHLOpportunity }> = await this.axiosInstance.post(
        '/opportunities/',
        payload
      );

      return this.wrapResponse(response.data.opportunity);
    } catch (error) {
      return this.handleApiError(error as AxiosError<GHLErrorResponse>);
    }
  }

  /**
   * Update existing opportunity
   * PUT /opportunities/{id}
   */
  async updateOpportunity(id: string, updates: GHLUpdateOpportunityRequest): Promise<GHLApiResponse<GHLOpportunity>> {
    try {
      const response: AxiosResponse<{ opportunity: GHLOpportunity }> = await this.axiosInstance.put(
        `/opportunities/${id}`,
        updates
      );

      return this.wrapResponse(response.data.opportunity);
    } catch (error) {
      return this.handleApiError(error as AxiosError<GHLErrorResponse>);
    }
  }

  /**
   * Update opportunity status
   * PUT /opportunities/{id}/status
   */
  async updateOpportunityStatus(id: string, status: GHLOpportunityStatus): Promise<GHLApiResponse<{ succeded: boolean }>> {
    try {
      const payload: GHLUpdateOpportunityStatusRequest = { status };

      const response: AxiosResponse<{ succeded: boolean }> = await this.axiosInstance.put(
        `/opportunities/${id}/status`,
        payload
      );

      return this.wrapResponse(response.data);
    } catch (error) {
      return this.handleApiError(error as AxiosError<GHLErrorResponse>);
    }
  }

  /**
   * Upsert opportunity (create or update)
   * POST /opportunities/upsert
   */
  async upsertOpportunity(opportunityData: GHLUpsertOpportunityRequest): Promise<GHLApiResponse<GHLUpsertOpportunityResponse>> {
    try {
      // Ensure locationId is set
      const payload = {
        ...opportunityData,
        locationId: opportunityData.locationId || this.config.locationId
      };

      const response: AxiosResponse<GHLUpsertOpportunityResponse> = await this.axiosInstance.post(
        '/opportunities/upsert',
        payload
      );

      return this.wrapResponse(response.data);
    } catch (error) {
      return this.handleApiError(error as AxiosError<GHLErrorResponse>);
    }
  }

  /**
   * Delete opportunity
   * DELETE /opportunities/{id}
   */
  async deleteOpportunity(id: string): Promise<GHLApiResponse<{ succeded: boolean }>> {
    try {
      const response: AxiosResponse<{ succeded: boolean }> = await this.axiosInstance.delete(
        `/opportunities/${id}`
      );

      return this.wrapResponse(response.data);
    } catch (error) {
      return this.handleApiError(error as AxiosError<GHLErrorResponse>);
    }
  }

  /**
   * Add followers to opportunity
   * POST /opportunities/{id}/followers
   */
  async addOpportunityFollowers(id: string, followers: string[]): Promise<GHLApiResponse<any>> {
    try {
      const payload = { followers };

      const response: AxiosResponse<any> = await this.axiosInstance.post(
        `/opportunities/${id}/followers`,
        payload
      );

      return this.wrapResponse(response.data);
    } catch (error) {
      return this.handleApiError(error as AxiosError<GHLErrorResponse>);
    }
  }

  /**
   * Remove followers from opportunity
   * DELETE /opportunities/{id}/followers
   */
  async removeOpportunityFollowers(id: string, followers: string[]): Promise<GHLApiResponse<any>> {
    try {
      const payload = { followers };

      const response: AxiosResponse<any> = await this.axiosInstance.delete(
        `/opportunities/${id}/followers`,
        { data: payload }
      );

      return this.wrapResponse(response.data);
    } catch (error) {
      return this.handleApiError(error as AxiosError<GHLErrorResponse>);
    }
  }

  /**
   * CALENDAR & APPOINTMENTS API METHODS
   */

  /**
   * Get all calendar groups in a location
   * GET /calendars/groups
   */
  async getCalendarGroups(locationId?: string): Promise<GHLApiResponse<GHLGetCalendarGroupsResponse>> {
    try {
      const params = {
        locationId: locationId || this.config.locationId
      };

      const response: AxiosResponse<GHLGetCalendarGroupsResponse> = await this.axiosInstance.get(
        '/calendars/groups',
        { params }
      );

      return this.wrapResponse(response.data);
    } catch (error) {
      return this.handleApiError(error as AxiosError<GHLErrorResponse>);
    }
  }

  /**
   * Create a new calendar group
   * POST /calendars/groups
   */
  async createCalendarGroup(groupData: GHLCreateCalendarGroupRequest): Promise<GHLApiResponse<{ group: GHLCalendarGroup }>> {
    try {
      const payload = {
        ...groupData,
        locationId: groupData.locationId || this.config.locationId
      };

      const response: AxiosResponse<{ group: GHLCalendarGroup }> = await this.axiosInstance.post(
        '/calendars/groups',
        payload
      );

      return this.wrapResponse(response.data);
    } catch (error) {
      return this.handleApiError(error as AxiosError<GHLErrorResponse>);
    }
  }

  /**
   * Get all calendars in a location
   * GET /calendars/
   */
  async getCalendars(params?: { locationId?: string; groupId?: string; showDrafted?: boolean }): Promise<GHLApiResponse<GHLGetCalendarsResponse>> {
    try {
      const queryParams = {
        locationId: params?.locationId || this.config.locationId,
        ...(params?.groupId && { groupId: params.groupId }),
        ...(params?.showDrafted !== undefined && { showDrafted: params.showDrafted })
      };

      const response: AxiosResponse<GHLGetCalendarsResponse> = await this.axiosInstance.get(
        '/calendars/',
        { params: queryParams }
      );

      return this.wrapResponse(response.data);
    } catch (error) {
      return this.handleApiError(error as AxiosError<GHLErrorResponse>);
    }
  }

  /**
   * Create a new calendar
   * POST /calendars/
   */
  async createCalendar(calendarData: GHLCreateCalendarRequest): Promise<GHLApiResponse<{ calendar: GHLCalendar }>> {
    try {
      const payload = {
        ...calendarData,
        locationId: calendarData.locationId || this.config.locationId
      };

      const response: AxiosResponse<{ calendar: GHLCalendar }> = await this.axiosInstance.post(
        '/calendars/',
        payload
      );

      return this.wrapResponse(response.data);
    } catch (error) {
      return this.handleApiError(error as AxiosError<GHLErrorResponse>);
    }
  }

  /**
   * Get calendar by ID
   * GET /calendars/{calendarId}
   */
  async getCalendar(calendarId: string): Promise<GHLApiResponse<{ calendar: GHLCalendar }>> {
    try {
      const response: AxiosResponse<{ calendar: GHLCalendar }> = await this.axiosInstance.get(
        `/calendars/${calendarId}`
      );

      return this.wrapResponse(response.data);
    } catch (error) {
      return this.handleApiError(error as AxiosError<GHLErrorResponse>);
    }
  }

  /**
   * Update calendar by ID
   * PUT /calendars/{calendarId}
   */
  async updateCalendar(calendarId: string, updates: GHLUpdateCalendarRequest): Promise<GHLApiResponse<{ calendar: GHLCalendar }>> {
    try {
      const response: AxiosResponse<{ calendar: GHLCalendar }> = await this.axiosInstance.put(
        `/calendars/${calendarId}`,
        updates
      );

      return this.wrapResponse(response.data);
    } catch (error) {
      return this.handleApiError(error as AxiosError<GHLErrorResponse>);
    }
  }

  /**
   * Delete calendar by ID
   * DELETE /calendars/{calendarId}
   */
  async deleteCalendar(calendarId: string): Promise<GHLApiResponse<{ success: boolean }>> {
    try {
      const response: AxiosResponse<{ success: boolean }> = await this.axiosInstance.delete(
        `/calendars/${calendarId}`
      );

      return this.wrapResponse(response.data);
    } catch (error) {
      return this.handleApiError(error as AxiosError<GHLErrorResponse>);
    }
  }

  /**
   * Get calendar events/appointments
   * GET /calendars/events
   */
  async getCalendarEvents(eventParams: GHLGetCalendarEventsRequest): Promise<GHLApiResponse<GHLGetCalendarEventsResponse>> {
    try {
      const params = {
        locationId: eventParams.locationId || this.config.locationId,
        startTime: eventParams.startTime,
        endTime: eventParams.endTime,
        ...(eventParams.userId && { userId: eventParams.userId }),
        ...(eventParams.calendarId && { calendarId: eventParams.calendarId }),
        ...(eventParams.groupId && { groupId: eventParams.groupId })
      };

      const response: AxiosResponse<GHLGetCalendarEventsResponse> = await this.axiosInstance.get(
        '/calendars/events',
        { params }
      );

      return this.wrapResponse(response.data);
    } catch (error) {
      return this.handleApiError(error as AxiosError<GHLErrorResponse>);
    }
  }

  /**
   * Get blocked slots
   * GET /calendars/blocked-slots
   */
  async getBlockedSlots(eventParams: GHLGetCalendarEventsRequest): Promise<GHLApiResponse<GHLGetCalendarEventsResponse>> {
    try {
      const params = {
        locationId: eventParams.locationId || this.config.locationId,
        startTime: eventParams.startTime,
        endTime: eventParams.endTime,
        ...(eventParams.userId && { userId: eventParams.userId }),
        ...(eventParams.calendarId && { calendarId: eventParams.calendarId }),
        ...(eventParams.groupId && { groupId: eventParams.groupId })
      };

      const response: AxiosResponse<GHLGetCalendarEventsResponse> = await this.axiosInstance.get(
        '/calendars/blocked-slots',
        { params }
      );

      return this.wrapResponse(response.data);
    } catch (error) {
      return this.handleApiError(error as AxiosError<GHLErrorResponse>);
    }
  }

  /**
   * Get free slots for a calendar
   * GET /calendars/{calendarId}/free-slots
   */
  async getFreeSlots(slotParams: GHLGetFreeSlotsRequest): Promise<GHLApiResponse<GHLGetFreeSlotsResponse>> {
    try {
      const params = {
        startDate: slotParams.startDate,
        endDate: slotParams.endDate,
        ...(slotParams.timezone && { timezone: slotParams.timezone }),
        ...(slotParams.userId && { userId: slotParams.userId }),
        ...(slotParams.userIds && { userIds: slotParams.userIds }),
        ...(slotParams.enableLookBusy !== undefined && { enableLookBusy: slotParams.enableLookBusy })
      };

      const { calendarId } = slotParams;
      const response: AxiosResponse<GHLGetFreeSlotsResponse> = await this.axiosInstance.get(
        `/calendars/${calendarId}/free-slots`,
        { params }
      );

      return this.wrapResponse(response.data);
    } catch (error) {
      return this.handleApiError(error as AxiosError<GHLErrorResponse>);
    }
  }

  /**
   * Create a new appointment
   * POST /calendars/events/appointments
   */
  async createAppointment(appointmentData: GHLCreateAppointmentRequest): Promise<GHLApiResponse<GHLCalendarEvent>> {
    try {
      const payload = {
        ...appointmentData,
        locationId: appointmentData.locationId || this.config.locationId
      };

      const response: AxiosResponse<GHLCalendarEvent> = await this.axiosInstance.post(
        '/calendars/events/appointments',
        payload
      );

      return this.wrapResponse(response.data);
    } catch (error) {
      return this.handleApiError(error as AxiosError<GHLErrorResponse>);
    }
  }

  /**
   * Get appointment by ID
   * GET /calendars/events/appointments/{eventId}
   */
  async getAppointment(eventId: string): Promise<GHLApiResponse<{ event: GHLCalendarEvent }>> {
    try {
      const response: AxiosResponse<{ event: GHLCalendarEvent }> = await this.axiosInstance.get(
        `/calendars/events/appointments/${eventId}`
      );

      return this.wrapResponse(response.data);
    } catch (error) {
      return this.handleApiError(error as AxiosError<GHLErrorResponse>);
    }
  }

  /**
   * Update appointment by ID
   * PUT /calendars/events/appointments/{eventId}
   */
  async updateAppointment(eventId: string, updates: GHLUpdateAppointmentRequest): Promise<GHLApiResponse<GHLCalendarEvent>> {
    try {
      const response: AxiosResponse<GHLCalendarEvent> = await this.axiosInstance.put(
        `/calendars/events/appointments/${eventId}`,
        updates
      );

      return this.wrapResponse(response.data);
    } catch (error) {
      return this.handleApiError(error as AxiosError<GHLErrorResponse>);
    }
  }

  /**
   * Delete appointment by ID  
   * DELETE /calendars/events/appointments/{eventId}
   */
  async deleteAppointment(eventId: string): Promise<GHLApiResponse<{ succeeded: boolean }>> {
    try {
      const response: AxiosResponse<{ succeeded: boolean }> = await this.axiosInstance.delete(
        `/calendars/events/appointments/${eventId}`
      );

      return this.wrapResponse(response.data);
    } catch (error) {
      return this.handleApiError(error as AxiosError<GHLErrorResponse>);
    }
  }



  /**
   * Update block slot by ID
   * PUT /calendars/events/block-slots/{eventId}
   */
  async updateBlockSlot(eventId: string, updates: GHLUpdateBlockSlotRequest): Promise<GHLApiResponse<GHLBlockSlotResponse>> {
    try {
      const response: AxiosResponse<GHLBlockSlotResponse> = await this.axiosInstance.put(
        `/calendars/events/block-slots/${eventId}`,
        updates
      );

      return this.wrapResponse(response.data);
    } catch (error) {
      return this.handleApiError(error as AxiosError<GHLErrorResponse>);
    }
  }

  /**
   * EMAIL API METHODS
   */

  async getEmailCampaigns(params: MCPGetEmailCampaignsParams): Promise<GHLApiResponse<GHLEmailCampaignsResponse>> {
    try {
      const response: AxiosResponse<GHLEmailCampaignsResponse> = await this.axiosInstance.get('/emails/schedule', {
        params: {
          locationId: this.config.locationId,
          ...params
        }
      });
      return this.wrapResponse(response.data);
    } catch (error) {
      return this.handleApiError(error as AxiosError<GHLErrorResponse>);
    }
  }

  async createEmailTemplate(params: MCPCreateEmailTemplateParams): Promise<GHLApiResponse<any>> {
    try {
      const response: AxiosResponse<any> = await this.axiosInstance.post('/emails/builder', {
        locationId: this.config.locationId,
        type: 'html',
        ...params
      });
      return this.wrapResponse(response.data);
    } catch (error) {
      return this.handleApiError(error as AxiosError<GHLErrorResponse>);
    }
  }

  async getEmailTemplates(params: MCPGetEmailTemplatesParams): Promise<GHLApiResponse<GHLEmailTemplate[]>> {
    try {
      const response: AxiosResponse<GHLEmailTemplate[]> = await this.axiosInstance.get('/emails/builder', {
        params: {
          locationId: this.config.locationId,
          ...params
        }
      });
      return this.wrapResponse(response.data);
    } catch (error) {
      return this.handleApiError(error as AxiosError<GHLErrorResponse>);
    }
  }

  async updateEmailTemplate(params: MCPUpdateEmailTemplateParams): Promise<GHLApiResponse<any>> {
    try {
      const { templateId, ...data } = params;
      const response: AxiosResponse<any> = await this.axiosInstance.post('/emails/builder/data', {
        locationId: this.config.locationId,
        templateId,
        ...data,
        editorType: 'html'
      });
      return this.wrapResponse(response.data);
    } catch (error) {
      return this.handleApiError(error as AxiosError<GHLErrorResponse>);
    }
  }

  async deleteEmailTemplate(params: MCPDeleteEmailTemplateParams): Promise<GHLApiResponse<any>> {
    try {
      const { templateId } = params;
      const locationId = this.config.locationId;
      const response: AxiosResponse<any> = await this.axiosInstance.delete(`/emails/builder/${locationId}/${templateId}`);
      return this.wrapResponse(response.data);
    } catch (error) {
      return this.handleApiError(error as AxiosError<GHLErrorResponse>);
    }
  }

  /**
   * LOCATION API METHODS
   */

  /**
   * Search locations/sub-accounts
   * GET /locations/search
   */
  async searchLocations(params: {
    companyId?: string;
    skip?: number;
    limit?: number;
    order?: 'asc' | 'desc';
    email?: string;
  } = {}): Promise<GHLApiResponse<GHLLocationSearchResponse>> {
    try {
      const queryParams = {
        skip: params.skip || 0,
        limit: params.limit || 10,
        order: params.order || 'asc',
        ...(params.companyId && { companyId: params.companyId }),
        ...(params.email && { email: params.email })
      };

      const response: AxiosResponse<GHLLocationSearchResponse> = await this.axiosInstance.get(
        '/locations/search',
        { params: queryParams }
      );

      return this.wrapResponse(response.data);
    } catch (error) {
      return this.handleApiError(error as AxiosError<GHLErrorResponse>);
    }
  }

  /**
   * Get location by ID
   * GET /locations/{locationId}
   */
  async getLocationById(locationId: string): Promise<GHLApiResponse<GHLLocationDetailsResponse>> {
    try {
      const response: AxiosResponse<GHLLocationDetailsResponse> = await this.axiosInstance.get(
        `/locations/${locationId}`
      );

      return this.wrapResponse(response.data);
    } catch (error) {
      return this.handleApiError(error as AxiosError<GHLErrorResponse>);
    }
  }

  /**
   * Create a new location/sub-account
   * POST /locations/
   */
  async createLocation(locationData: GHLCreateLocationRequest): Promise<GHLApiResponse<GHLLocationDetailed>> {
    try {
      const response: AxiosResponse<GHLLocationDetailed> = await this.axiosInstance.post(
        '/locations/',
        locationData
      );

      return this.wrapResponse(response.data);
    } catch (error) {
      return this.handleApiError(error as AxiosError<GHLErrorResponse>);
    }
  }

  /**
   * Update location/sub-account
   * PUT /locations/{locationId}
   */
  async updateLocation(locationId: string, updates: GHLUpdateLocationRequest): Promise<GHLApiResponse<GHLLocationDetailed>> {
    try {
      const response: AxiosResponse<GHLLocationDetailed> = await this.axiosInstance.put(
        `/locations/${locationId}`,
        updates
      );

      return this.wrapResponse(response.data);
    } catch (error) {
      return this.handleApiError(error as AxiosError<GHLErrorResponse>);
    }
  }

  /**
   * Delete location/sub-account
   * DELETE /locations/{locationId}
   */
  async deleteLocation(locationId: string, deleteTwilioAccount: boolean): Promise<GHLApiResponse<GHLLocationDeleteResponse>> {
    try {
      const response: AxiosResponse<GHLLocationDeleteResponse> = await this.axiosInstance.delete(
        `/locations/${locationId}`,
        {
          params: { deleteTwilioAccount }
        }
      );

      return this.wrapResponse(response.data);
    } catch (error) {
      return this.handleApiError(error as AxiosError<GHLErrorResponse>);
    }
  }

  /**
   * LOCATION TAGS API METHODS
   */

  /**
   * Get location tags
   * GET /locations/{locationId}/tags
   */
  async getLocationTags(locationId: string): Promise<GHLApiResponse<GHLLocationTagsResponse>> {
    try {
      const response: AxiosResponse<GHLLocationTagsResponse> = await this.axiosInstance.get(
        `/locations/${locationId}/tags`
      );

      return this.wrapResponse(response.data);
    } catch (error) {
      return this.handleApiError(error as AxiosError<GHLErrorResponse>);
    }
  }

  /**
   * Create location tag
   * POST /locations/{locationId}/tags
   */
  async createLocationTag(locationId: string, tagData: GHLLocationTagRequest): Promise<GHLApiResponse<GHLLocationTagResponse>> {
    try {
      const response: AxiosResponse<GHLLocationTagResponse> = await this.axiosInstance.post(
        `/locations/${locationId}/tags`,
        tagData
      );

      return this.wrapResponse(response.data);
    } catch (error) {
      return this.handleApiError(error as AxiosError<GHLErrorResponse>);
    }
  }

  /**
   * Get location tag by ID
   * GET /locations/{locationId}/tags/{tagId}
   */
  async getLocationTag(locationId: string, tagId: string): Promise<GHLApiResponse<GHLLocationTagResponse>> {
    try {
      const response: AxiosResponse<GHLLocationTagResponse> = await this.axiosInstance.get(
        `/locations/${locationId}/tags/${tagId}`
      );

      return this.wrapResponse(response.data);
    } catch (error) {
      return this.handleApiError(error as AxiosError<GHLErrorResponse>);
    }
  }

  /**
   * Update location tag
   * PUT /locations/{locationId}/tags/{tagId}
   */
  async updateLocationTag(locationId: string, tagId: string, tagData: GHLLocationTagRequest): Promise<GHLApiResponse<GHLLocationTagResponse>> {
    try {
      const response: AxiosResponse<GHLLocationTagResponse> = await this.axiosInstance.put(
        `/locations/${locationId}/tags/${tagId}`,
        tagData
      );

      return this.wrapResponse(response.data);
    } catch (error) {
      return this.handleApiError(error as AxiosError<GHLErrorResponse>);
    }
  }

  /**
   * Delete location tag
   * DELETE /locations/{locationId}/tags/{tagId}
   */
  async deleteLocationTag(locationId: string, tagId: string): Promise<GHLApiResponse<GHLLocationTagDeleteResponse>> {
    try {
      const response: AxiosResponse<GHLLocationTagDeleteResponse> = await this.axiosInstance.delete(
        `/locations/${locationId}/tags/${tagId}`
      );

      return this.wrapResponse(response.data);
    } catch (error) {
      return this.handleApiError(error as AxiosError<GHLErrorResponse>);
    }
  }

  /**
   * LOCATION TASKS API METHODS
   */

  /**
   * Search location tasks
   * POST /locations/{locationId}/tasks/search
   */
  async searchLocationTasks(locationId: string, searchParams: GHLLocationTaskSearchRequest): Promise<GHLApiResponse<GHLLocationTaskSearchResponse>> {
    try {
      const response: AxiosResponse<GHLLocationTaskSearchResponse> = await this.axiosInstance.post(
        `/locations/${locationId}/tasks/search`,
        searchParams
      );

      return this.wrapResponse(response.data);
    } catch (error) {
      return this.handleApiError(error as AxiosError<GHLErrorResponse>);
    }
  }

  /**
   * CUSTOM FIELDS API METHODS
   */

  /**
   * Get custom fields for location
   * GET /locations/{locationId}/customFields
   */
  async getLocationCustomFields(locationId: string, model?: 'contact' | 'opportunity' | 'all'): Promise<GHLApiResponse<GHLLocationCustomFieldsResponse>> {
    try {
      const params: any = {};
      if (model) params.model = model;

      const response: AxiosResponse<GHLLocationCustomFieldsResponse> = await this.axiosInstance.get(
        `/locations/${locationId}/customFields`,
        { params }
      );

      return this.wrapResponse(response.data);
    } catch (error) {
      return this.handleApiError(error as AxiosError<GHLErrorResponse>);
    }
  }

  /**
   * Create custom field for location
   * POST /locations/{locationId}/customFields
   */
  async createLocationCustomField(locationId: string, fieldData: GHLCreateCustomFieldRequest): Promise<GHLApiResponse<GHLLocationCustomFieldResponse>> {
    try {
      const response: AxiosResponse<GHLLocationCustomFieldResponse> = await this.axiosInstance.post(
        `/locations/${locationId}/customFields`,
        fieldData
      );

      return this.wrapResponse(response.data);
    } catch (error) {
      return this.handleApiError(error as AxiosError<GHLErrorResponse>);
    }
  }

  /**
   * Get custom field by ID
   * GET /locations/{locationId}/customFields/{id}
   */
  async getLocationCustomField(locationId: string, id: string): Promise<GHLApiResponse<GHLLocationCustomFieldResponse>> {
    try {
      const response: AxiosResponse<GHLLocationCustomFieldResponse> = await this.axiosInstance.get(
        `/locations/${locationId}/customFields/${id}`
      );

      return this.wrapResponse(response.data);
    } catch (error) {
      return this.handleApiError(error as AxiosError<GHLErrorResponse>);
    }
  }

  /**
   * Update custom field
   * PUT /locations/{locationId}/customFields/{id}
   */
  async updateLocationCustomField(locationId: string, id: string, fieldData: GHLUpdateCustomFieldRequest): Promise<GHLApiResponse<GHLLocationCustomFieldResponse>> {
    try {
      const response: AxiosResponse<GHLLocationCustomFieldResponse> = await this.axiosInstance.put(
        `/locations/${locationId}/customFields/${id}`,
        fieldData
      );

      return this.wrapResponse(response.data);
    } catch (error) {
      return this.handleApiError(error as AxiosError<GHLErrorResponse>);
    }
  }

  /**
   * Delete custom field
   * DELETE /locations/{locationId}/customFields/{id}
   */
  async deleteLocationCustomField(locationId: string, id: string): Promise<GHLApiResponse<GHLCustomFieldDeleteResponse>> {
    try {
      const response: AxiosResponse<GHLCustomFieldDeleteResponse> = await this.axiosInstance.delete(
        `/locations/${locationId}/customFields/${id}`
      );

      return this.wrapResponse(response.data);
    } catch (error) {
      return this.handleApiError(error as AxiosError<GHLErrorResponse>);
    }
  }

  /**
   * Upload file to custom fields
   * POST /locations/{locationId}/customFields/upload
   */
  async uploadLocationCustomFieldFile(locationId: string, uploadData: GHLFileUploadRequest): Promise<GHLApiResponse<GHLFileUploadResponse>> {
    try {
      // Note: This endpoint expects multipart/form-data but we'll handle it as JSON for now
      // In a real implementation, you'd use FormData for file uploads
      const response: AxiosResponse<GHLFileUploadResponse> = await this.axiosInstance.post(
        `/locations/${locationId}/customFields/upload`,
        uploadData,
        { headers: { 'Content-Type': 'multipart/form-data' } }
      );

      return this.wrapResponse(response.data);
    } catch (error) {
      return this.handleApiError(error as AxiosError<GHLErrorResponse>);
    }
  }

  /**
   * CUSTOM VALUES API METHODS
   */

  /**
   * Get custom values for location
   * GET /locations/{locationId}/customValues
   */
  async getLocationCustomValues(locationId: string): Promise<GHLApiResponse<GHLLocationCustomValuesResponse>> {
    try {
      const response: AxiosResponse<GHLLocationCustomValuesResponse> = await this.axiosInstance.get(
        `/locations/${locationId}/customValues`
      );

      return this.wrapResponse(response.data);
    } catch (error) {
      return this.handleApiError(error as AxiosError<GHLErrorResponse>);
    }
  }

  /**
   * Create custom value for location
   * POST /locations/{locationId}/customValues
   */
  async createLocationCustomValue(locationId: string, valueData: GHLCustomValueRequest): Promise<GHLApiResponse<GHLLocationCustomValueResponse>> {
    try {
      const response: AxiosResponse<GHLLocationCustomValueResponse> = await this.axiosInstance.post(
        `/locations/${locationId}/customValues`,
        valueData
      );

      return this.wrapResponse(response.data);
    } catch (error) {
      return this.handleApiError(error as AxiosError<GHLErrorResponse>);
    }
  }

  /**
   * Get custom value by ID
   * GET /locations/{locationId}/customValues/{id}
   */
  async getLocationCustomValue(locationId: string, id: string): Promise<GHLApiResponse<GHLLocationCustomValueResponse>> {
    try {
      const response: AxiosResponse<GHLLocationCustomValueResponse> = await this.axiosInstance.get(
        `/locations/${locationId}/customValues/${id}`
      );

      return this.wrapResponse(response.data);
    } catch (error) {
      return this.handleApiError(error as AxiosError<GHLErrorResponse>);
    }
  }

  /**
   * Update custom value
   * PUT /locations/{locationId}/customValues/{id}
   */
  async updateLocationCustomValue(locationId: string, id: string, valueData: GHLCustomValueRequest): Promise<GHLApiResponse<GHLLocationCustomValueResponse>> {
    try {
      const response: AxiosResponse<GHLLocationCustomValueResponse> = await this.axiosInstance.put(
        `/locations/${locationId}/customValues/${id}`,
        valueData
      );

      return this.wrapResponse(response.data);
    } catch (error) {
      return this.handleApiError(error as AxiosError<GHLErrorResponse>);
    }
  }

  /**
   * Delete custom value
   * DELETE /locations/{locationId}/customValues/{id}
   */
  async deleteLocationCustomValue(locationId: string, id: string): Promise<GHLApiResponse<GHLCustomValueDeleteResponse>> {
    try {
      const response: AxiosResponse<GHLCustomValueDeleteResponse> = await this.axiosInstance.delete(
        `/locations/${locationId}/customValues/${id}`
      );

      return this.wrapResponse(response.data);
    } catch (error) {
      return this.handleApiError(error as AxiosError<GHLErrorResponse>);
    }
  }

  /**
   * TEMPLATES API METHODS
   */

  /**
   * Get location templates (SMS/Email)
   * GET /locations/{locationId}/templates
   */
  async getLocationTemplates(locationId: string, params: {
    originId: string;
    deleted?: boolean;
    skip?: number;
    limit?: number;
    type?: 'sms' | 'email' | 'whatsapp';
  }): Promise<GHLApiResponse<GHLLocationTemplatesResponse>> {
    try {
      const queryParams = {
        originId: params.originId,
        deleted: params.deleted || false,
        skip: params.skip || 0,
        limit: params.limit || 25,
        ...(params.type && { type: params.type })
      };

      const response: AxiosResponse<GHLLocationTemplatesResponse> = await this.axiosInstance.get(
        `/locations/${locationId}/templates`,
        { params: queryParams }
      );

      return this.wrapResponse(response.data);
    } catch (error) {
      return this.handleApiError(error as AxiosError<GHLErrorResponse>);
    }
  }

  /**
   * Delete location template
   * DELETE /locations/{locationId}/templates/{id}
   */
  async deleteLocationTemplate(locationId: string, id: string): Promise<GHLApiResponse<any>> {
    try {
      const response: AxiosResponse<any> = await this.axiosInstance.delete(
        `/locations/${locationId}/templates/${id}`
      );

      return this.wrapResponse(response.data);
    } catch (error) {
      return this.handleApiError(error as AxiosError<GHLErrorResponse>);
    }
  }

  /**
   * TIMEZONES API METHODS
   */

  /**
   * Get available timezones
   * GET /locations/{locationId}/timezones
   */
  async getTimezones(locationId?: string): Promise<GHLApiResponse<string[]>> {
    try {
      let response: AxiosResponse<string[]>;
      if (locationId) {
        response = await this.axiosInstance.get(`/locations/${locationId}/timezones`);
      } else {
        response = await this.axiosInstance.get('/locations/timezones');
      }

      return this.wrapResponse(response.data);
    } catch (error) {
      return this.handleApiError(error as AxiosError<GHLErrorResponse>);
    }
  }

  /**
   * EMAIL ISV (VERIFICATION) API METHODS
   */

  /**
   * Verify email address or contact
   * POST /email/verify
   */
  async verifyEmail(locationId: string, verificationData: GHLEmailVerificationRequest): Promise<GHLApiResponse<GHLEmailVerificationResponse>> {
    try {
      const params = {
        locationId: locationId
      };

      const response: AxiosResponse<GHLEmailVerificationResponse> = await this.axiosInstance.post(
        '/email/verify',
        verificationData,
        { params }
      );

      return this.wrapResponse(response.data);
    } catch (error) {
      return this.handleApiError(error as AxiosError<GHLErrorResponse>);
    }
  }

  /**
   * ADDITIONAL CONVERSATION/MESSAGE API METHODS
   */

  /**
   * Get email message by ID
   * GET /conversations/messages/email/{id}
   */
  async getEmailMessage(id: string): Promise<GHLApiResponse<GHLEmailMessage>> {
    try {
      const response: AxiosResponse<GHLEmailMessage> = await this.axiosInstance.get(
        `/conversations/messages/email/${id}`
      );

      return this.wrapResponse(response.data);
    } catch (error) {
      return this.handleApiError(error as AxiosError<GHLErrorResponse>);
    }
  }

  /**
   * Cancel scheduled email message
   * DELETE /conversations/messages/email/{emailMessageId}/schedule
   */
  async cancelScheduledEmail(emailMessageId: string): Promise<GHLApiResponse<GHLCancelScheduledResponse>> {
    try {
      const response: AxiosResponse<GHLCancelScheduledResponse> = await this.axiosInstance.delete(
        `/conversations/messages/email/${emailMessageId}/schedule`
      );

      return this.wrapResponse(response.data);
    } catch (error) {
      return this.handleApiError(error as AxiosError<GHLErrorResponse>);
    }
  }

  /**
   * Add inbound message manually
   * POST /conversations/messages/inbound
   */
  async addInboundMessage(messageData: GHLProcessInboundMessageRequest): Promise<GHLApiResponse<GHLProcessMessageResponse>> {
    try {
      const response: AxiosResponse<GHLProcessMessageResponse> = await this.axiosInstance.post(
        '/conversations/messages/inbound',
        messageData,
        { headers: this.getConversationHeaders() }
      );

      return this.wrapResponse(response.data);
    } catch (error) {
      return this.handleApiError(error as AxiosError<GHLErrorResponse>);
    }
  }

  /**
   * Add outbound call manually
   * POST /conversations/messages/outbound
   */
  async addOutboundCall(messageData: GHLProcessOutboundMessageRequest): Promise<GHLApiResponse<GHLProcessMessageResponse>> {
    try {
      const response: AxiosResponse<GHLProcessMessageResponse> = await this.axiosInstance.post(
        '/conversations/messages/outbound',
        messageData,
        { headers: this.getConversationHeaders() }
      );

      return this.wrapResponse(response.data);
    } catch (error) {
      return this.handleApiError(error as AxiosError<GHLErrorResponse>);
    }
  }

  /**
   * Cancel scheduled message
   * DELETE /conversations/messages/{messageId}/schedule
   */
  async cancelScheduledMessage(messageId: string): Promise<GHLApiResponse<GHLCancelScheduledResponse>> {
    try {
      const response: AxiosResponse<GHLCancelScheduledResponse> = await this.axiosInstance.delete(
        `/conversations/messages/${messageId}/schedule`,
        { headers: this.getConversationHeaders() }
      );

      return this.wrapResponse(response.data);
    } catch (error) {
      return this.handleApiError(error as AxiosError<GHLErrorResponse>);
    }
  }

  /**
   * Upload file attachments for messages
   * POST /conversations/messages/upload
   */
  async uploadMessageAttachments(uploadData: GHLUploadFilesRequest): Promise<GHLApiResponse<GHLUploadFilesResponse>> {
    try {
      const response: AxiosResponse<GHLUploadFilesResponse> = await this.axiosInstance.post(
        '/conversations/messages/upload',
        uploadData,
        { 
          headers: {
            ...this.getConversationHeaders(),
            'Content-Type': 'multipart/form-data'
          }
        }
      );

      return this.wrapResponse(response.data);
    } catch (error) {
      return this.handleApiError(error as AxiosError<GHLErrorResponse>);
    }
  }

  /**
   * Update message status
   * PUT /conversations/messages/{messageId}/status
   */
  async updateMessageStatus(messageId: string, statusData: GHLUpdateMessageStatusRequest): Promise<GHLApiResponse<GHLSendMessageResponse>> {
    try {
      const response: AxiosResponse<GHLSendMessageResponse> = await this.axiosInstance.put(
        `/conversations/messages/${messageId}/status`,
        statusData,
        { headers: this.getConversationHeaders() }
      );

      return this.wrapResponse(response.data);
    } catch (error) {
      return this.handleApiError(error as AxiosError<GHLErrorResponse>);
    }
  }

  /**
   * Get message recording
   * GET /conversations/messages/{messageId}/locations/{locationId}/recording
   */
  async getMessageRecording(messageId: string, locId?: string): Promise<GHLApiResponse<GHLMessageRecordingResponse>> {
    try {
      const locationId = locId || this.config.locationId;
      const response: AxiosResponse<ArrayBuffer> = await this.axiosInstance.get(
        `/conversations/messages/${messageId}/locations/${locationId}/recording`,
        { 
          headers: this.getConversationHeaders(),
          responseType: 'arraybuffer'
        }
      );

      const recordingResponse: GHLMessageRecordingResponse = {
        audioData: response.data,
        contentType: response.headers['content-type'] || 'audio/x-wav',
        contentDisposition: response.headers['content-disposition'] || 'attachment; filename=audio.wav'
      };

      return this.wrapResponse(recordingResponse);
    } catch (error) {
      return this.handleApiError(error as AxiosError<GHLErrorResponse>);
    }
  }

  /**
   * Get message transcription
   * GET /conversations/locations/{locationId}/messages/{messageId}/transcription
   */
  async getMessageTranscription(messageId: string, locId?: string): Promise<GHLApiResponse<GHLMessageTranscriptionResponse>> {
    try {
      const locationId = locId || this.config.locationId;
      const response: AxiosResponse<GHLMessageTranscription[]> = await this.axiosInstance.get(
        `/conversations/locations/${locationId}/messages/${messageId}/transcription`,
        { headers: this.getConversationHeaders() }
      );

      return this.wrapResponse({ transcriptions: response.data });
    } catch (error) {
      return this.handleApiError(error as AxiosError<GHLErrorResponse>);
    }
  }

  /**
   * Download message transcription
   * GET /conversations/locations/{locationId}/messages/{messageId}/transcription/download
   */
  async downloadMessageTranscription(messageId: string, locId?: string): Promise<GHLApiResponse<string>> {
    try {
      const locationId = locId || this.config.locationId;
      const response: AxiosResponse<string> = await this.axiosInstance.get(
        `/conversations/locations/${locationId}/messages/${messageId}/transcription/download`,
        { 
          headers: this.getConversationHeaders(),
          responseType: 'text'
        }
      );

      return this.wrapResponse(response.data);
    } catch (error) {
      return this.handleApiError(error as AxiosError<GHLErrorResponse>);
    }
  }

  /**
   * Live chat typing indicator
   * POST /conversations/providers/live-chat/typing
   */
  async liveChatTyping(typingData: GHLLiveChatTypingRequest): Promise<GHLApiResponse<GHLLiveChatTypingResponse>> {
    try {
      const response: AxiosResponse<GHLLiveChatTypingResponse> = await this.axiosInstance.post(
        '/conversations/providers/live-chat/typing',
        typingData,
        { headers: this.getConversationHeaders() }
      );

      return this.wrapResponse(response.data);
    } catch (error) {
      return this.handleApiError(error as AxiosError<GHLErrorResponse>);
    }
  }

  // ============================================================================
  // SOCIAL MEDIA POSTING API METHODS
  // ============================================================================

  // ===== POST MANAGEMENT =====

  /**
   * Search/List Social Media Posts
   */
  async searchSocialPosts(searchData: GHLSearchPostsRequest): Promise<GHLApiResponse<GHLSearchPostsResponse>> {
    try {
      const locationId = this.config.locationId;
      const response: AxiosResponse<GHLSearchPostsResponse> = await this.axiosInstance.post(
        `/social-media-posting/${locationId}/posts/list`,
        searchData
      );
      return this.wrapResponse(response.data);
    } catch (error) {
      return this.handleApiError(error as AxiosError<GHLErrorResponse>);
    }
  }

  /**
   * Create Social Media Post
   */
  async createSocialPost(postData: GHLCreatePostRequest): Promise<GHLApiResponse<GHLCreatePostResponse>> {
    try {
      const locationId = this.config.locationId;
      const response: AxiosResponse<GHLCreatePostResponse> = await this.axiosInstance.post(
        `/social-media-posting/${locationId}/posts`,
        postData
      );
      return this.wrapResponse(response.data);
    } catch (error) {
      return this.handleApiError(error as AxiosError<GHLErrorResponse>);
    }
  }

  /**
   * Get Social Media Post by ID
   */
  async getSocialPost(id: string): Promise<GHLApiResponse<GHLGetPostResponse>> {
    try {
      const locationId = this.config.locationId;
      const response: AxiosResponse<GHLGetPostResponse> = await this.axiosInstance.get(
        `/social-media-posting/${locationId}/posts/${id}`
      );
      return this.wrapResponse(response.data);
    } catch (error) {
      return this.handleApiError(error as AxiosError<GHLErrorResponse>);
    }
  }

  /**
   * Update Social Media Post
   */
  async updateSocialPost(id: string, updateData: GHLUpdatePostRequest): Promise<GHLApiResponse<any>> {
    try {
      const locationId = this.config.locationId;
      const response: AxiosResponse<any> = await this.axiosInstance.put(
        `/social-media-posting/${locationId}/posts/${id}`,
        updateData
      );
      return this.wrapResponse(response.data);
    } catch (error) {
      return this.handleApiError(error as AxiosError<GHLErrorResponse>);
    }
  }

  /**
   * Delete Social Media Post
   */
  async deleteSocialPost(id: string): Promise<GHLApiResponse<any>> {
    try {
      const locationId = this.config.locationId;
      const response: AxiosResponse<any> = await this.axiosInstance.delete(
        `/social-media-posting/${locationId}/posts/${id}`
      );
      return this.wrapResponse(response.data);
    } catch (error) {
      return this.handleApiError(error as AxiosError<GHLErrorResponse>);
    }
  }

  /**
   * Bulk Delete Social Media Posts
   */
  async bulkDeleteSocialPosts(deleteData: GHLBulkDeletePostsRequest): Promise<GHLApiResponse<GHLBulkDeleteResponse>> {
    try {
      const locationId = this.config.locationId;
      const response: AxiosResponse<GHLBulkDeleteResponse> = await this.axiosInstance.post(
        `/social-media-posting/${locationId}/posts/bulk-delete`,
        deleteData
      );
      return this.wrapResponse(response.data);
    } catch (error) {
      return this.handleApiError(error as AxiosError<GHLErrorResponse>);
    }
  }

  // ===== ACCOUNT MANAGEMENT =====

  /**
   * Get Social Media Accounts and Groups
   */
  async getSocialAccounts(): Promise<GHLApiResponse<GHLGetAccountsResponse>> {
    try {
      const locationId = this.config.locationId;
      const response: AxiosResponse<GHLGetAccountsResponse> = await this.axiosInstance.get(
        `/social-media-posting/${locationId}/accounts`
      );
      return this.wrapResponse(response.data);
    } catch (error) {
      return this.handleApiError(error as AxiosError<GHLErrorResponse>);
    }
  }

  /**
   * Delete Social Media Account
   */
  async deleteSocialAccount(id: string, companyId?: string, userId?: string): Promise<GHLApiResponse<any>> {
    try {
      const locationId = this.config.locationId;
      const params: any = {};
      if (companyId) params.companyId = companyId;
      if (userId) params.userId = userId;
      
      const response: AxiosResponse<any> = await this.axiosInstance.delete(
        `/social-media-posting/${locationId}/accounts/${id}`,
        { params }
      );
      return this.wrapResponse(response.data);
    } catch (error) {
      return this.handleApiError(error as AxiosError<GHLErrorResponse>);
    }
  }

  // ===== CSV OPERATIONS =====

  /**
   * Upload CSV for Social Media Posts
   */
  async uploadSocialCSV(csvData: GHLUploadCSVRequest): Promise<GHLApiResponse<GHLUploadCSVResponse>> {
    try {
      const locationId = this.config.locationId;
      // Note: This would typically use FormData for file upload
      const response: AxiosResponse<GHLUploadCSVResponse> = await this.axiosInstance.post(
        `/social-media-posting/${locationId}/csv`,
        csvData
      );
      return this.wrapResponse(response.data);
    } catch (error) {
      return this.handleApiError(error as AxiosError<GHLErrorResponse>);
    }
  }

  /**
   * Get CSV Upload Status
   */
  async getSocialCSVUploadStatus(skip?: number, limit?: number, includeUsers?: boolean, userId?: string): Promise<GHLApiResponse<GHLGetUploadStatusResponse>> {
    try {
      const locationId = this.config.locationId;
      const params: any = {};
      if (skip !== undefined) params.skip = skip.toString();
      if (limit !== undefined) params.limit = limit.toString();
      if (includeUsers !== undefined) params.includeUsers = includeUsers.toString();
      if (userId) params.userId = userId;
      
      const response: AxiosResponse<GHLGetUploadStatusResponse> = await this.axiosInstance.get(
        `/social-media-posting/${locationId}/csv`,
        { params }
      );
      return this.wrapResponse(response.data);
    } catch (error) {
      return this.handleApiError(error as AxiosError<GHLErrorResponse>);
    }
  }

  /**
   * Set Accounts for CSV Import
   */
  async setSocialCSVAccounts(accountsData: GHLSetAccountsRequest): Promise<GHLApiResponse<any>> {
    try {
      const locationId = this.config.locationId;
      const response: AxiosResponse<any> = await this.axiosInstance.post(
        `/social-media-posting/${locationId}/set-accounts`,
        accountsData
      );
      return this.wrapResponse(response.data);
    } catch (error) {
      return this.handleApiError(error as AxiosError<GHLErrorResponse>);
    }
  }

  /**
   * Get CSV Posts
   */
  async getSocialCSVPosts(id: string, skip?: number, limit?: number): Promise<GHLApiResponse<any>> {
    try {
      const locationId = this.config.locationId;
      const params: any = {};
      if (skip !== undefined) params.skip = skip.toString();
      if (limit !== undefined) params.limit = limit.toString();
      
      const response: AxiosResponse<any> = await this.axiosInstance.get(
        `/social-media-posting/${locationId}/csv/${id}`,
        { params }
      );
      return this.wrapResponse(response.data);
    } catch (error) {
      return this.handleApiError(error as AxiosError<GHLErrorResponse>);
    }
  }

  /**
   * Start CSV Finalization
   */
  async finalizeSocialCSV(id: string, finalizeData: GHLCSVFinalizeRequest): Promise<GHLApiResponse<any>> {
    try {
      const locationId = this.config.locationId;
      const response: AxiosResponse<any> = await this.axiosInstance.patch(
        `/social-media-posting/${locationId}/csv/${id}`,
        finalizeData
      );
      return this.wrapResponse(response.data);
    } catch (error) {
      return this.handleApiError(error as AxiosError<GHLErrorResponse>);
    }
  }

  /**
   * Delete CSV Import
   */
  async deleteSocialCSV(id: string): Promise<GHLApiResponse<any>> {
    try {
      const locationId = this.config.locationId;
      const response: AxiosResponse<any> = await this.axiosInstance.delete(
        `/social-media-posting/${locationId}/csv/${id}`
      );
      return this.wrapResponse(response.data);
    } catch (error) {
      return this.handleApiError(error as AxiosError<GHLErrorResponse>);
    }
  }

  /**
   * Delete CSV Post
   */
  async deleteSocialCSVPost(csvId: string, postId: string): Promise<GHLApiResponse<any>> {
    try {
      const locationId = this.config.locationId;
      const response: AxiosResponse<any> = await this.axiosInstance.delete(
        `/social-media-posting/${locationId}/csv/${csvId}/post/${postId}`
      );
      return this.wrapResponse(response.data);
    } catch (error) {
      return this.handleApiError(error as AxiosError<GHLErrorResponse>);
    }
  }

  // ===== CATEGORIES & TAGS =====

  /**
   * Get Social Media Categories
   */
  async getSocialCategories(searchText?: string, limit?: number, skip?: number): Promise<GHLApiResponse<GHLGetCategoriesResponse>> {
    try {
      const locationId = this.config.locationId;
      const params: any = {};
      if (searchText) params.searchText = searchText;
      if (limit !== undefined) params.limit = String(limit);
      if (skip !== undefined) params.skip = String(skip);
      const response: AxiosResponse<GHLGetCategoriesResponse> = await this.axiosInstance.get(
        `/social-media-posting/${locationId}/categories`,
        { params }
      );
      return this.wrapResponse(response.data);
    } catch (error) {
      return this.handleApiError(error as AxiosError<GHLErrorResponse>);
    }
  }

  async getSocialCategory(id: string): Promise<GHLApiResponse<GHLGetCategoryResponse>> {
    try {
      const locationId = this.config.locationId;
      const response: AxiosResponse<GHLGetCategoryResponse> = await this.axiosInstance.get(
        `/social-media-posting/${locationId}/categories/${id}`
      );
      return this.wrapResponse(response.data);
    } catch (error) {
      return this.handleApiError(error as AxiosError<GHLErrorResponse>);
    }
  }

  async getSocialTags(searchText?: string, limit?: number, skip?: number): Promise<GHLApiResponse<GHLGetTagsResponse>> {
    try {
      const locationId = this.config.locationId;
      const params: any = {};
      if (searchText) params.searchText = searchText;
      if (limit !== undefined) params.limit = String(limit);
      if (skip !== undefined) params.skip = String(skip);
      const response: AxiosResponse<GHLGetTagsResponse> = await this.axiosInstance.get(
        `/social-media-posting/${locationId}/tags`,
        { params }
      );
      return this.wrapResponse(response.data);
    } catch (error) {
      return this.handleApiError(error as AxiosError<GHLErrorResponse>);
    }
  }

  /**
   * Get Social Tags by IDs (details)
   */
  async getSocialTagsByIds(ids: string[]): Promise<GHLApiResponse<GHLGetTagsByIdsResponse>> {
    try {
      const locationId = this.config.locationId;
      const payload: GHLGetTagsByIdsRequest = { ids } as any;
      const response: AxiosResponse<GHLGetTagsByIdsResponse> = await this.axiosInstance.post(
        `/social-media-posting/${locationId}/tags/details`,
        payload
      );
      return this.wrapResponse(response.data);
    } catch (error) {
      return this.handleApiError(error as AxiosError<GHLErrorResponse>);
    }
  }

  // ===== STATISTICS =====

  /**
   * Get Social Media Statistics
   * POST /social-media-posting/statistics
   */
  async getSocialStatistics(profileIds: string[], platforms?: string[]): Promise<GHLApiResponse<any>> {
    try {
      const locationId = this.config.locationId;
      const params = { locationId } as any;
      const payload: any = { profileIds };
      if (platforms && platforms.length) payload.platforms = platforms;
      const response: AxiosResponse<any> = await this.axiosInstance.post(
        '/social-media-posting/statistics',
        payload,
        { params }
      );
      return this.wrapResponse(response.data);
    } catch (error) {
      return this.handleApiError(error as AxiosError<GHLErrorResponse>);
    }
  }

  // ============================================================================
  // VOICE AI API METHODS
  // ============================================================================

  /**
   * Create Voice AI Agent
   * POST /voice-ai/agents
   */
  async createVoiceAIAgent(agentData: any): Promise<GHLApiResponse<any>> {
    try {
      const response: AxiosResponse<any> = await this.axiosInstance.post(
        '/voice-ai/agents',
        agentData,
        { headers: this.getHeadersForVersion('2021-04-15') }
      );
      return this.wrapResponse(response.data);
    } catch (error) {
      return this.handleApiError(error as AxiosError<GHLErrorResponse>);
    }
  }

  // ============================================================================
  // BUSINESSES API METHODS
  // ============================================================================

  /**
   * List Businesses
   * GET /businesses/
   */
  async listBusinesses(locationId?: string): Promise<GHLApiResponse<any>> {
    try {
      const params = { locationId: locationId || this.config.locationId } as any;
      const response: AxiosResponse<any> = await this.axiosInstance.get('/businesses/', { params });
      return this.wrapResponse(response.data);
    } catch (error) { return this.handleApiError(error as AxiosError<GHLErrorResponse>); }
  }

  /**
   * Create Business
   * POST /businesses/
   */
  async createBusiness(businessData: any): Promise<GHLApiResponse<any>> {
    try {
      const response: AxiosResponse<any> = await this.axiosInstance.post('/businesses/', businessData);
      return this.wrapResponse(response.data);
    } catch (error) { return this.handleApiError(error as AxiosError<GHLErrorResponse>); }
  }

  /**
   * Get Business by ID
   * GET /businesses/{businessId}
   */
  async getBusiness(businessId: string): Promise<GHLApiResponse<any>> {
    try {
      const response: AxiosResponse<any> = await this.axiosInstance.get(`/businesses/${businessId}`);
      return this.wrapResponse(response.data);
    } catch (error) { return this.handleApiError(error as AxiosError<GHLErrorResponse>); }
  }

  /**
   * Update Business
   * PUT /businesses/{businessId}
   */
  async updateBusiness(businessId: string, updates: any): Promise<GHLApiResponse<any>> {
    try {
      const response: AxiosResponse<any> = await this.axiosInstance.put(`/businesses/${businessId}`, updates);
      return this.wrapResponse(response.data);
    } catch (error) { return this.handleApiError(error as AxiosError<GHLErrorResponse>); }
  }

  /**
   * Delete Business
   * DELETE /businesses/{businessId}
   */
  async deleteBusiness(businessId: string): Promise<GHLApiResponse<any>> {
    try {
      const response: AxiosResponse<any> = await this.axiosInstance.delete(`/businesses/${businessId}`);
      return this.wrapResponse(response.data);
    } catch (error) { return this.handleApiError(error as AxiosError<GHLErrorResponse>); }
  }

  // ============================================================================
  // USERS API METHODS
  // ============================================================================

  /**
   * List Users by location
   * GET /users/
   */
  async listUsers(locationId?: string): Promise<GHLApiResponse<any>> {
    try {
      const params = { locationId: locationId || this.config.locationId } as any;
      const response: AxiosResponse<any> = await this.axiosInstance.get('/users/', { params });
      return this.wrapResponse(response.data);
    } catch (error) { return this.handleApiError(error as AxiosError<GHLErrorResponse>); }
  }

  /**
   * Create User
   * POST /users/
   */
  async createUser(userData: any): Promise<GHLApiResponse<any>> {
    try {
      const response: AxiosResponse<any> = await this.axiosInstance.post('/users/', userData);
      return this.wrapResponse(response.data);
    } catch (error) { return this.handleApiError(error as AxiosError<GHLErrorResponse>); }
  }

  /**
   * Get User by ID
   * GET /users/{userId}
   */
  async getUser(userId: string, locationId?: string): Promise<GHLApiResponse<any>> {
    try {
      const params = { locationId: locationId || this.config.locationId } as any;
      const response: AxiosResponse<any> = await this.axiosInstance.get(`/users/${userId}`, { params });
      return this.wrapResponse(response.data);
    } catch (error) { return this.handleApiError(error as AxiosError<GHLErrorResponse>); }
  }

  /**
   * Update User
   * PUT /users/{userId}
   */
  async updateUser(userId: string, updates: any, locationId?: string): Promise<GHLApiResponse<any>> {
    try {
      const params = { locationId: locationId || this.config.locationId } as any;
      const response: AxiosResponse<any> = await this.axiosInstance.put(`/users/${userId}`, updates, { params });
      return this.wrapResponse(response.data);
    } catch (error) { return this.handleApiError(error as AxiosError<GHLErrorResponse>); }
  }

  /**
   * Delete User
   * DELETE /users/{userId}
   */
  async deleteUser(userId: string, locationId?: string): Promise<GHLApiResponse<any>> {
    try {
      const params = { locationId: locationId || this.config.locationId } as any;
      const response: AxiosResponse<any> = await this.axiosInstance.delete(`/users/${userId}`, { params });
      return this.wrapResponse(response.data);
    } catch (error) { return this.handleApiError(error as AxiosError<GHLErrorResponse>); }
  }

  /**
   * Search Users
   * GET /users/search (requires companyId)
   */
  async searchUsers(params: { companyId: string; query?: string; skip?: number; limit?: number; locationId?: string; type?: string; role?: string; ids?: string; sort?: string; sortDirection?: string; enabled2waySync?: boolean }): Promise<GHLApiResponse<any>> {
    try {
      const qp: any = { companyId: params.companyId };
      if (params.query) qp.query = params.query;
      if (params.skip !== undefined) qp.skip = String(params.skip);
      if (params.limit !== undefined) qp.limit = String(params.limit);
      if (params.locationId) qp.locationId = params.locationId;
      if (params.type) qp.type = params.type;
      if (params.role) qp.role = params.role;
      if (params.ids) qp.ids = params.ids;
      if (params.sort) qp.sort = params.sort;
      if (params.sortDirection) qp.sortDirection = params.sortDirection;
      if (params.enabled2waySync !== undefined) qp.enabled2waySync = params.enabled2waySync;
      const response: AxiosResponse<any> = await this.axiosInstance.get('/users/search', { params: qp });
      return this.wrapResponse(response.data);
    } catch (error) { return this.handleApiError(error as AxiosError<GHLErrorResponse>); }
  }

  /**
   * Filter Users by Email
   * POST /users/search/filter-by-email
   */
  async filterUsersByEmail(body: any): Promise<GHLApiResponse<any>> {
    try {
      const response: AxiosResponse<any> = await this.axiosInstance.post('/users/search/filter-by-email', body);
      return this.wrapResponse(response.data);
    } catch (error) { return this.handleApiError(error as AxiosError<GHLErrorResponse>); }
  }

  // ============================================================================
  // SAAS API METHODS (Public and Internal)
  // ============================================================================

  /**
   * Public: List locations with SaaS details (filters)
   * GET /saas-api/public-api/locations
   */
  async saasPublicListLocations(params?: { customerId?: string; subscriptionId?: string; companyId?: string }): Promise<GHLApiResponse<any>> {
    try {
      const qp: any = {};
      if (params?.customerId) qp.customerId = params.customerId;
      if (params?.subscriptionId) qp.subscriptionId = params.subscriptionId;
      if (params?.companyId) qp.companyId = params.companyId;
      const response: AxiosResponse<any> = await this.axiosInstance.get('/saas-api/public-api/locations', { params: qp });
      return this.wrapResponse(response.data);
    } catch (error) { return this.handleApiError(error as AxiosError<GHLErrorResponse>); }
  }

  /** PUT /saas-api/public-api/update-saas-subscription/{locationId} */
  async saasPublicUpdateSubscription(locationId: string, updates: any): Promise<GHLApiResponse<any>> {
    try {
      const response: AxiosResponse<any> = await this.axiosInstance.put(`/saas-api/public-api/update-saas-subscription/${locationId}`, updates);
      return this.wrapResponse(response.data);
    } catch (error) { return this.handleApiError(error as AxiosError<GHLErrorResponse>); }
  }

  /** POST /saas-api/public-api/bulk-disable-saas/{companyId} */
  async saasPublicBulkDisable(companyId: string, body: any): Promise<GHLApiResponse<any>> {
    try {
      const response: AxiosResponse<any> = await this.axiosInstance.post(`/saas-api/public-api/bulk-disable-saas/${companyId}`, body);
      return this.wrapResponse(response.data);
    } catch (error) { return this.handleApiError(error as AxiosError<GHLErrorResponse>); }
  }

  /** POST /saas-api/public-api/enable-saas/{locationId} */
  async saasPublicEnable(locationId: string, body: any): Promise<GHLApiResponse<any>> {
    try {
      const response: AxiosResponse<any> = await this.axiosInstance.post(`/saas-api/public-api/enable-saas/${locationId}`, body);
      return this.wrapResponse(response.data);
    } catch (error) { return this.handleApiError(error as AxiosError<GHLErrorResponse>); }
  }

  /** POST /saas-api/public-api/pause/{locationId} */
  async saasPublicPause(locationId: string, body: any): Promise<GHLApiResponse<any>> {
    try {
      const response: AxiosResponse<any> = await this.axiosInstance.post(`/saas-api/public-api/pause/${locationId}`, body);
      return this.wrapResponse(response.data);
    } catch (error) { return this.handleApiError(error as AxiosError<GHLErrorResponse>); }
  }

  /** POST /saas-api/public-api/update-rebilling/{companyId} */
  async saasPublicUpdateRebilling(companyId: string, body: any): Promise<GHLApiResponse<any>> {
    try {
      const response: AxiosResponse<any> = await this.axiosInstance.post(`/saas-api/public-api/update-rebilling/${companyId}`, body);
      return this.wrapResponse(response.data);
    } catch (error) { return this.handleApiError(error as AxiosError<GHLErrorResponse>); }
  }

  /** GET /saas-api/public-api/agency-plans/{companyId} */
  async saasPublicGetAgencyPlans(companyId: string): Promise<GHLApiResponse<any>> {
    try {
      const response: AxiosResponse<any> = await this.axiosInstance.get(`/saas-api/public-api/agency-plans/${companyId}`);
      return this.wrapResponse(response.data);
    } catch (error) { return this.handleApiError(error as AxiosError<GHLErrorResponse>); }
  }

  /** GET /saas-api/public-api/get-saas-subscription/{locationId} */
  async saasPublicGetSubscription(locationId: string, companyId?: string): Promise<GHLApiResponse<any>> {
    try {
      const params: any = {};
      if (companyId) params.companyId = companyId;
      const response: AxiosResponse<any> = await this.axiosInstance.get(`/saas-api/public-api/get-saas-subscription/${locationId}`, { params });
      return this.wrapResponse(response.data);
    } catch (error) { return this.handleApiError(error as AxiosError<GHLErrorResponse>); }
  }

  /** POST /saas-api/public-api/bulk-enable-saas/{companyId} */
  async saasPublicBulkEnable(companyId: string, body: any): Promise<GHLApiResponse<any>> {
    try {
      const response: AxiosResponse<any> = await this.axiosInstance.post(`/saas-api/public-api/bulk-enable-saas/${companyId}`, body);
      return this.wrapResponse(response.data);
    } catch (error) { return this.handleApiError(error as AxiosError<GHLErrorResponse>); }
  }

  /** GET /saas-api/public-api/saas-locations/{companyId} */
  async saasPublicGetSaaSLocations(companyId: string, page?: number): Promise<GHLApiResponse<any>> {
    try {
      const params: any = {};
      if (page !== undefined) params.page = page;
      const response: AxiosResponse<any> = await this.axiosInstance.get(`/saas-api/public-api/saas-locations/${companyId}`, { params });
      return this.wrapResponse(response.data);
    } catch (error) { return this.handleApiError(error as AxiosError<GHLErrorResponse>); }
  }

  /** GET /saas-api/public-api/saas-plan/{planId} */
  async saasPublicGetPlan(planId: string, companyId?: string): Promise<GHLApiResponse<any>> {
    try {
      const params: any = {};
      if (companyId) params.companyId = companyId;
      const response: AxiosResponse<any> = await this.axiosInstance.get(`/saas-api/public-api/saas-plan/${planId}`, { params });
      return this.wrapResponse(response.data);
    } catch (error) { return this.handleApiError(error as AxiosError<GHLErrorResponse>); }
  }

  // Internal SAAS (same endpoints without /public-api)

  async saasListLocations(params?: { customerId?: string; subscriptionId?: string; companyId?: string }): Promise<GHLApiResponse<any>> {
    try {
      const qp: any = {};
      if (params?.customerId) qp.customerId = params.customerId;
      if (params?.subscriptionId) qp.subscriptionId = params.subscriptionId;
      if (params?.companyId) qp.companyId = params.companyId;
      const response: AxiosResponse<any> = await this.axiosInstance.get('/saas/locations', { params: qp });
      return this.wrapResponse(response.data);
    } catch (error) { return this.handleApiError(error as AxiosError<GHLErrorResponse>); }
  }

  async saasUpdateSubscription(locationId: string, updates: any): Promise<GHLApiResponse<any>> {
    try { const r = await this.axiosInstance.put(`/saas/update-saas-subscription/${locationId}`, updates); return this.wrapResponse(r.data); } catch (e) { return this.handleApiError(e as AxiosError<GHLErrorResponse>); }
  }
  async saasBulkDisable(companyId: string, body: any): Promise<GHLApiResponse<any>> {
    try { const r = await this.axiosInstance.post(`/saas/bulk-disable-saas/${companyId}`, body); return this.wrapResponse(r.data); } catch (e) { return this.handleApiError(e as AxiosError<GHLErrorResponse>); }
  }
  async saasEnable(locationId: string, body: any): Promise<GHLApiResponse<any>> {
    try { const r = await this.axiosInstance.post(`/saas/enable-saas/${locationId}`, body); return this.wrapResponse(r.data); } catch (e) { return this.handleApiError(e as AxiosError<GHLErrorResponse>); }
  }
  async saasPause(locationId: string, body: any): Promise<GHLApiResponse<any>> {
    try { const r = await this.axiosInstance.post(`/saas/pause/${locationId}`, body); return this.wrapResponse(r.data); } catch (e) { return this.handleApiError(e as AxiosError<GHLErrorResponse>); }
  }
  async saasUpdateRebilling(companyId: string, body: any): Promise<GHLApiResponse<any>> {
    try { const r = await this.axiosInstance.post(`/saas/update-rebilling/${companyId}`, body); return this.wrapResponse(r.data); } catch (e) { return this.handleApiError(e as AxiosError<GHLErrorResponse>); }
  }
  async saasGetAgencyPlans(companyId: string): Promise<GHLApiResponse<any>> {
    try { const r = await this.axiosInstance.get(`/saas/agency-plans/${companyId}`); return this.wrapResponse(r.data); } catch (e) { return this.handleApiError(e as AxiosError<GHLErrorResponse>); }
  }
  async saasGetSubscription(locationId: string, companyId?: string): Promise<GHLApiResponse<any>> {
    try { const params: any = {}; if (companyId) params.companyId = companyId; const r = await this.axiosInstance.get(`/saas/get-saas-subscription/${locationId}`, { params }); return this.wrapResponse(r.data); } catch (e) { return this.handleApiError(e as AxiosError<GHLErrorResponse>); }
  }
  async saasBulkEnable(companyId: string, body: any): Promise<GHLApiResponse<any>> {
    try { const r = await this.axiosInstance.post(`/saas/bulk-enable-saas/${companyId}`, body); return this.wrapResponse(r.data); } catch (e) { return this.handleApiError(e as AxiosError<GHLErrorResponse>); }
  }
  async saasGetLocationsByCompany(companyId: string, page?: number): Promise<GHLApiResponse<any>> {
    try { const params: any = {}; if (page !== undefined) params.page = page; const r = await this.axiosInstance.get(`/saas/saas-locations/${companyId}`, { params }); return this.wrapResponse(r.data); } catch (e) { return this.handleApiError(e as AxiosError<GHLErrorResponse>); }
  }
  async saasGetPlan(planId: string, companyId?: string): Promise<GHLApiResponse<any>> {
    try { const params: any = {}; if (companyId) params.companyId = companyId; const r = await this.axiosInstance.get(`/saas/saas-plan/${planId}`, { params }); return this.wrapResponse(r.data); } catch (e) { return this.handleApiError(e as AxiosError<GHLErrorResponse>); }
  }

  /**
   * List Voice AI Agents
   * GET /voice-ai/agents
   */
  async listVoiceAIAgents(params?: { locationId?: string; page?: number; pageSize?: number; query?: string }): Promise<GHLApiResponse<any>> {
    try {
      const queryParams: any = {
        locationId: params?.locationId || this.config.locationId
      };
      if (params?.page !== undefined) queryParams.page = params.page;
      if (params?.pageSize !== undefined) queryParams.pageSize = params.pageSize;
      if (params?.query) queryParams.query = params.query;
      const response: AxiosResponse<any> = await this.axiosInstance.get(
        '/voice-ai/agents',
        { params: queryParams, headers: this.getHeadersForVersion('2021-04-15') }
      );
      return this.wrapResponse(response.data);
    } catch (error) {
      return this.handleApiError(error as AxiosError<GHLErrorResponse>);
    }
  }

  /**
   * Patch Voice AI Agent
   * PATCH /voice-ai/agents/{agentId}
   */
  async patchVoiceAIAgent(agentId: string, updates: any, locationId?: string): Promise<GHLApiResponse<any>> {
    try {
      const params = { locationId: locationId || this.config.locationId };
      const response: AxiosResponse<any> = await this.axiosInstance.patch(
        `/voice-ai/agents/${agentId}`,
        updates,
        { params, headers: this.getHeadersForVersion('2021-04-15') }
      );
      return this.wrapResponse(response.data);
    } catch (error) {
      return this.handleApiError(error as AxiosError<GHLErrorResponse>);
    }
  }

  /**
   * Get Voice AI Agent by ID
   * GET /voice-ai/agents/{agentId}
   */
  async getVoiceAIAgent(agentId: string, locationId?: string): Promise<GHLApiResponse<any>> {
    try {
      const params = { locationId: locationId || this.config.locationId };
      const response: AxiosResponse<any> = await this.axiosInstance.get(
        `/voice-ai/agents/${agentId}`,
        { params, headers: this.getHeadersForVersion('2021-04-15') }
      );
      return this.wrapResponse(response.data);
    } catch (error) {
      return this.handleApiError(error as AxiosError<GHLErrorResponse>);
    }
  }

  /**
   * Delete Voice AI Agent
   * DELETE /voice-ai/agents/{agentId}
   */
  async deleteVoiceAIAgent(agentId: string, locationId?: string): Promise<GHLApiResponse<any>> {
    try {
      const params = { locationId: locationId || this.config.locationId };
      const response: AxiosResponse<any> = await this.axiosInstance.delete(
        `/voice-ai/agents/${agentId}`,
        { params, headers: this.getHeadersForVersion('2021-04-15') }
      );
      return this.wrapResponse(response.data);
    } catch (error) {
      return this.handleApiError(error as AxiosError<GHLErrorResponse>);
    }
  }

  /**
   * List Voice AI Call Logs
   * GET /voice-ai/dashboard/call-logs
   */
  async listVoiceAICallLogs(params?: { locationId?: string; agentId?: string; contactId?: string; callType?: 'LIVE'|'TRIAL'; startDate?: number; endDate?: number; actionType?: string; sortBy?: 'duration'|'createdAt'; sort?: 'ascend'|'descend'; page?: number; pageSize?: number }): Promise<GHLApiResponse<any>> {
    try {
      const queryParams: any = { locationId: params?.locationId || this.config.locationId };
      if (params?.agentId) queryParams.agentId = params.agentId;
      if (params?.contactId) queryParams.contactId = params.contactId;
      if (params?.callType) queryParams.callType = params.callType;
      if (params?.startDate !== undefined) queryParams.startDate = params.startDate;
      if (params?.endDate !== undefined) queryParams.endDate = params.endDate;
      if (params?.actionType) queryParams.actionType = params.actionType;
      if (params?.sortBy) queryParams.sortBy = params.sortBy;
      if (params?.sort) queryParams.sort = params.sort;
      if (params?.page !== undefined) queryParams.page = params.page;
      if (params?.pageSize !== undefined) queryParams.pageSize = params.pageSize;
      const response: AxiosResponse<any> = await this.axiosInstance.get(
        '/voice-ai/dashboard/call-logs',
        { params: queryParams, headers: this.getHeadersForVersion('2021-04-15') }
      );
      return this.wrapResponse(response.data);
    } catch (error) {
      return this.handleApiError(error as AxiosError<GHLErrorResponse>);
    }
  }

  /**
   * Get Voice AI Call Log by ID
   * GET /voice-ai/dashboard/call-logs/{callId}
   */
  async getVoiceAICallLog(callId: string, locationId?: string): Promise<GHLApiResponse<any>> {
    try {
      const params = { locationId: locationId || this.config.locationId };
      const response: AxiosResponse<any> = await this.axiosInstance.get(
        `/voice-ai/dashboard/call-logs/${callId}`,
        { params, headers: this.getHeadersForVersion('2021-04-15') }
      );
      return this.wrapResponse(response.data);
    } catch (error) {
      return this.handleApiError(error as AxiosError<GHLErrorResponse>);
    }
  }

  /**
   * Create Voice AI Action
   * POST /voice-ai/actions
   */
  async createVoiceAIAction(actionData: any): Promise<GHLApiResponse<any>> {
    try {
      const response: AxiosResponse<any> = await this.axiosInstance.post(
        '/voice-ai/actions',
        actionData,
        { headers: this.getHeadersForVersion('2021-04-15') }
      );
      return this.wrapResponse(response.data);
    } catch (error) {
      return this.handleApiError(error as AxiosError<GHLErrorResponse>);
    }
  }

  /**
   * Get Voice AI Action by ID
   * GET /voice-ai/actions/{actionId}
   */
  async getVoiceAIAction(actionId: string, locationId?: string): Promise<GHLApiResponse<any>> {
    try {
      const params = { locationId: locationId || this.config.locationId };
      const response: AxiosResponse<any> = await this.axiosInstance.get(
        `/voice-ai/actions/${actionId}`,
        { params, headers: this.getHeadersForVersion('2021-04-15') }
      );
      return this.wrapResponse(response.data);
    } catch (error) {
      return this.handleApiError(error as AxiosError<GHLErrorResponse>);
    }
  }

  /**
   * Update Voice AI Action
   * PUT /voice-ai/actions/{actionId}
   */
  async updateVoiceAIAction(actionId: string, updates: any, locationId?: string): Promise<GHLApiResponse<any>> {
    try {
      const params = { locationId: locationId || this.config.locationId };
      const response: AxiosResponse<any> = await this.axiosInstance.put(
        `/voice-ai/actions/${actionId}`,
        updates,
        { params, headers: this.getHeadersForVersion('2021-04-15') }
      );
      return this.wrapResponse(response.data);
    } catch (error) {
      return this.handleApiError(error as AxiosError<GHLErrorResponse>);
    }
  }

  /**
   * Delete Voice AI Action
   * DELETE /voice-ai/actions/{actionId}
   */
  async deleteVoiceAIAction(actionId: string, locationId?: string): Promise<GHLApiResponse<any>> {
    try {
      const params = { locationId: locationId || this.config.locationId };
      const response: AxiosResponse<any> = await this.axiosInstance.delete(
        `/voice-ai/actions/${actionId}`,
        { params, headers: this.getHeadersForVersion('2021-04-15') }
      );
      return this.wrapResponse(response.data);
    } catch (error) {
      return this.handleApiError(error as AxiosError<GHLErrorResponse>);
    }
  }

  // ============================================================================
  // LOCATIONS — RECURRING TASKS
  // ============================================================================

  /**
   * Create Recurring Task
   * POST /locations/{locationId}/recurring-tasks
   */
  async createLocationRecurringTask(
    locationId: string,
    taskData: GHLRecurringTaskCreateRequest
  ): Promise<GHLApiResponse<GHLRecurringTaskResponse>> {
    try {
      const response: AxiosResponse<GHLRecurringTaskResponse> = await this.axiosInstance.post(
        `/locations/${locationId}/recurring-tasks`,
        taskData,
        { headers: this.getHeadersForVersion('2021-07-28') }
      );
      return this.wrapResponse(response.data);
    } catch (error) { return this.handleApiError(error as AxiosError<GHLErrorResponse>); }
  }

  /**
   * Get Recurring Task By Id
   * GET /locations/{locationId}/recurring-tasks/{id}
   */
  async getLocationRecurringTask(
    locationId: string,
    id: string
  ): Promise<GHLApiResponse<GHLRecurringTaskResponse>> {
    try {
      const response: AxiosResponse<GHLRecurringTaskResponse> = await this.axiosInstance.get(
        `/locations/${locationId}/recurring-tasks/${id}`,
        { headers: this.getHeadersForVersion('2021-07-28') }
      );
      return this.wrapResponse(response.data);
    } catch (error) { return this.handleApiError(error as AxiosError<GHLErrorResponse>); }
  }

  /**
   * Update Recurring Task
   * PUT /locations/{locationId}/recurring-tasks/{id}
   */
  async updateLocationRecurringTask(
    locationId: string,
    id: string,
    updates: GHLRecurringTaskUpdateRequest
  ): Promise<GHLApiResponse<GHLRecurringTaskResponse>> {
    try {
      const response: AxiosResponse<GHLRecurringTaskResponse> = await this.axiosInstance.put(
        `/locations/${locationId}/recurring-tasks/${id}`,
        updates,
        { headers: this.getHeadersForVersion('2021-07-28') }
      );
      return this.wrapResponse(response.data);
    } catch (error) { return this.handleApiError(error as AxiosError<GHLErrorResponse>); }
  }

  /**
   * Delete Recurring Task
   * DELETE /locations/{locationId}/recurring-tasks/{id}
   */
  async deleteLocationRecurringTask(
    locationId: string,
    id: string
  ): Promise<GHLApiResponse<GHLDeleteRecurringTaskResponse>> {
    try {
      const response: AxiosResponse<GHLDeleteRecurringTaskResponse> = await this.axiosInstance.delete(
        `/locations/${locationId}/recurring-tasks/${id}`,
        { headers: this.getHeadersForVersion('2021-07-28') }
      );
      return this.wrapResponse(response.data);
    } catch (error) { return this.handleApiError(error as AxiosError<GHLErrorResponse>); }
  }

  // ============================================================================
  // MEDIAS — FOLDER & BULK OPERATIONS
  // ============================================================================

  /**
   * Update File/Folder
   * POST /medias/{id}
   */
  async updateMediaItem(id: string, updateData: any): Promise<GHLApiResponse<any>> {
    try {
      const response: AxiosResponse<any> = await this.axiosInstance.post(
        `/medias/${id}`,
        updateData
      );
      return this.wrapResponse(response.data);
    } catch (error) { return this.handleApiError(error as AxiosError<GHLErrorResponse>); }
  }

  /**
   * Create Folder
   * POST /medias/folder
   */
  async createMediaFolder(folderData: any): Promise<GHLApiResponse<any>> {
    try {
      const response: AxiosResponse<any> = await this.axiosInstance.post(
        '/medias/folder',
        folderData
      );
      return this.wrapResponse(response.data);
    } catch (error) { return this.handleApiError(error as AxiosError<GHLErrorResponse>); }
  }

  /**
   * Bulk Update Files/Folders
   * PUT /medias/update-files
   */
  async bulkUpdateMediaItems(updatePayload: any): Promise<GHLApiResponse<any>> {
    try {
      const response: AxiosResponse<any> = await this.axiosInstance.put(
        '/medias/update-files',
        updatePayload
      );
      return this.wrapResponse(response.data);
    } catch (error) { return this.handleApiError(error as AxiosError<GHLErrorResponse>); }
  }

  /**
   * Bulk Delete/Trash Files or Folders
   * PUT /medias/delete-files
   */
  async bulkDeleteMediaItems(deletePayload: any): Promise<GHLApiResponse<any>> {
    try {
      const response: AxiosResponse<any> = await this.axiosInstance.put(
        '/medias/delete-files',
        deletePayload
      );
      return this.wrapResponse(response.data);
    } catch (error) { return this.handleApiError(error as AxiosError<GHLErrorResponse>); }
  }

  // ============================================================================
  // PRODUCTS — BULK OPERATIONS
  // ============================================================================

  /**
   * Bulk Edit Products
   * POST /products/bulk-update/edit
   */
  async bulkEditProducts(editPayload: any): Promise<GHLApiResponse<any>> {
    try {
      const response: AxiosResponse<any> = await this.axiosInstance.post('/products/bulk-update/edit', editPayload);
      return this.wrapResponse(response.data);
    } catch (error) { return this.handleApiError(error as AxiosError<GHLErrorResponse>); }
  }

  /**
   * Update store product priorities
   * POST /products/store/{storeId}/priority
   */
  async updateStoreProductPriority(storeId: string, priorityPayload: any): Promise<GHLApiResponse<any>> {
    try {
      const response: AxiosResponse<any> = await this.axiosInstance.post(`/products/store/${storeId}/priority`, priorityPayload);
      return this.wrapResponse(response.data);
    } catch (error) { return this.handleApiError(error as AxiosError<GHLErrorResponse>); }
  }

  // ============================================================================
  // SURVEYS — SUBMISSIONS
  // ============================================================================


  // ============================================================================
  // FUNNELS API METHODS
  // ============================================================================

  /** POST /funnels/lookup/redirect */
  async createFunnelRedirect(payload: any): Promise<GHLApiResponse<any>> {
    try {
      const r = await this.axiosInstance.post('/funnels/lookup/redirect', payload);
      return this.wrapResponse(r.data);
    } catch (error) { return this.handleApiError(error as AxiosError<GHLErrorResponse>); }
  }

  /** GET /funnels/lookup/redirect/list */
  async listFunnelRedirects(params: { locationId?: string; limit?: number; offset?: number; search?: string } = {}): Promise<GHLApiResponse<any>> {
    try {
      const qp: any = {};
      if (params.locationId) qp.locationId = params.locationId;
      if (params.limit !== undefined) qp.limit = params.limit;
      if (params.offset !== undefined) qp.offset = params.offset;
      if (params.search) qp.search = params.search;
      const r = await this.axiosInstance.get('/funnels/lookup/redirect/list', { params: qp });
      return this.wrapResponse(r.data);
    } catch (error) { return this.handleApiError(error as AxiosError<GHLErrorResponse>); }
  }

  /** PATCH /funnels/lookup/redirect/{id} */
  async updateFunnelRedirect(id: string, updates: any): Promise<GHLApiResponse<any>> {
    try {
      const r = await this.axiosInstance.patch(`/funnels/lookup/redirect/${id}`, updates);
      return this.wrapResponse(r.data);
    } catch (error) { return this.handleApiError(error as AxiosError<GHLErrorResponse>); }
  }

  /** DELETE /funnels/lookup/redirect/{id} */
  async deleteFunnelRedirect(id: string, locationId?: string): Promise<GHLApiResponse<any>> {
    try {
      const params: any = {};
      if (locationId) params.locationId = locationId;
      const r = await this.axiosInstance.delete(`/funnels/lookup/redirect/${id}`, { params });
      return this.wrapResponse(r.data);
    } catch (error) { return this.handleApiError(error as AxiosError<GHLErrorResponse>); }
  }

  /** GET /funnels/funnel/list */
  async listFunnels(params: { locationId?: string; type?: string; category?: string; offset?: number; limit?: number; parentId?: string; name?: string } = {}): Promise<GHLApiResponse<any>> {
    try {
      const qp: any = {};
      if (params.locationId) qp.locationId = params.locationId;
      if (params.type) qp.type = params.type;
      if (params.category) qp.category = params.category;
      if (params.offset !== undefined) qp.offset = params.offset;
      if (params.limit !== undefined) qp.limit = params.limit;
      if (params.parentId) qp.parentId = params.parentId;
      if (params.name) qp.name = params.name;
      const r = await this.axiosInstance.get('/funnels/funnel/list', { params: qp });
      return this.wrapResponse(r.data);
    } catch (error) { return this.handleApiError(error as AxiosError<GHLErrorResponse>); }
  }

  /** GET /funnels/page */
  async listFunnelPages(params: { locationId?: string; funnelId?: string; name?: string; limit?: number; offset?: number } = {}): Promise<GHLApiResponse<any>> {
    try {
      const qp: any = {};
      if (params.locationId) qp.locationId = params.locationId;
      if (params.funnelId) qp.funnelId = params.funnelId;
      if (params.name) qp.name = params.name;
      if (params.limit !== undefined) qp.limit = params.limit;
      if (params.offset !== undefined) qp.offset = params.offset;
      const r = await this.axiosInstance.get('/funnels/page', { params: qp });
      return this.wrapResponse(r.data);
    } catch (error) { return this.handleApiError(error as AxiosError<GHLErrorResponse>); }
  }

  /** GET /funnels/page/count */
  async countFunnelPages(params: { locationId?: string; funnelId?: string; name?: string } = {}): Promise<GHLApiResponse<any>> {
    try {
      const qp: any = {};
      if (params.locationId) qp.locationId = params.locationId;
      if (params.funnelId) qp.funnelId = params.funnelId;
      if (params.name) qp.name = params.name;
      const r = await this.axiosInstance.get('/funnels/page/count', { params: qp });
      return this.wrapResponse(r.data);
    } catch (error) { return this.handleApiError(error as AxiosError<GHLErrorResponse>); }
  }

  // ============================================================================
  // LINKS API METHODS
  // ============================================================================

  /** GET /links/ */
  async listLinks(locationId?: string): Promise<GHLApiResponse<any>> {
    try {
      const params = { locationId: locationId || this.config.locationId } as any;
      const r = await this.axiosInstance.get('/links/', { params });
      return this.wrapResponse(r.data);
    } catch (error) { return this.handleApiError(error as AxiosError<GHLErrorResponse>); }
  }

  /** POST /links/ */
  async createLink(linkData: any): Promise<GHLApiResponse<any>> {
    try {
      const r = await this.axiosInstance.post('/links/', linkData);
      return this.wrapResponse(r.data);
    } catch (error) { return this.handleApiError(error as AxiosError<GHLErrorResponse>); }
  }

  /** GET /links/id/{linkId} */
  async getLinkById(linkId: string, locationId?: string): Promise<GHLApiResponse<any>> {
    try {
      const params = { locationId: locationId || this.config.locationId } as any;
      const r = await this.axiosInstance.get(`/links/id/${linkId}`, { params });
      return this.wrapResponse(r.data);
    } catch (error) { return this.handleApiError(error as AxiosError<GHLErrorResponse>); }
  }

  /** PUT /links/{linkId} */
  async updateLink(linkId: string, updates: any): Promise<GHLApiResponse<any>> {
    try { const r = await this.axiosInstance.put(`/links/${linkId}`, updates); return this.wrapResponse(r.data); } catch (e) { return this.handleApiError(e as AxiosError<GHLErrorResponse>); }
  }

  /** DELETE /links/{linkId} */
  async deleteLink(linkId: string): Promise<GHLApiResponse<any>> {
    try { const r = await this.axiosInstance.delete(`/links/${linkId}`); return this.wrapResponse(r.data); } catch (e) { return this.handleApiError(e as AxiosError<GHLErrorResponse>); }
  }

  /** GET /links/search */
  async searchLinks(params: { locationId?: string; query?: string; skip?: number; limit?: number }): Promise<GHLApiResponse<any>> {
    try {
      const qp: any = { locationId: params.locationId || this.config.locationId };
      if (params.query) qp.query = params.query;
      if (params.skip !== undefined) qp.skip = String(params.skip);
      if (params.limit !== undefined) qp.limit = String(params.limit);
      const r = await this.axiosInstance.get('/links/search', { params: qp });
      return this.wrapResponse(r.data);
    } catch (e) { return this.handleApiError(e as AxiosError<GHLErrorResponse>); }
  }

  // ============================================================================
  // MARKETPLACE API METHODS
  // ============================================================================

  /** POST /marketplace/billing/charges */
  async createMarketplaceCharge(body: any): Promise<GHLApiResponse<any>> {
    try { const r = await this.axiosInstance.post('/marketplace/billing/charges', body); return this.wrapResponse(r.data); } catch (e) { return this.handleApiError(e as AxiosError<GHLErrorResponse>); }
  }
  /** GET /marketplace/billing/charges */
  async listMarketplaceCharges(params?: { meterId?: string; eventId?: string; userId?: string; startDate?: string; endDate?: string; skip?: number; limit?: number }): Promise<GHLApiResponse<any>> {
    try { const r = await this.axiosInstance.get('/marketplace/billing/charges', { params }); return this.wrapResponse(r.data); } catch (e) { return this.handleApiError(e as AxiosError<GHLErrorResponse>); }
  }
  /** GET /marketplace/billing/charges/{chargeId} */
  async getMarketplaceCharge(chargeId: string): Promise<GHLApiResponse<any>> {
    try { const r = await this.axiosInstance.get(`/marketplace/billing/charges/${chargeId}`); return this.wrapResponse(r.data); } catch (e) { return this.handleApiError(e as AxiosError<GHLErrorResponse>); }
  }
  /** DELETE /marketplace/billing/charges/{chargeId} */
  async deleteMarketplaceCharge(chargeId: string): Promise<GHLApiResponse<any>> {
    try { const r = await this.axiosInstance.delete(`/marketplace/billing/charges/${chargeId}`); return this.wrapResponse(r.data); } catch (e) { return this.handleApiError(e as AxiosError<GHLErrorResponse>); }
  }
  /** GET /marketplace/billing/charges/has-funds */
  async marketplaceHasFunds(): Promise<GHLApiResponse<any>> {
    try { const r = await this.axiosInstance.get('/marketplace/billing/charges/has-funds'); return this.wrapResponse(r.data); } catch (e) { return this.handleApiError(e as AxiosError<GHLErrorResponse>); }
  }
  /** GET /marketplace/app/{appId}/installations */
  async getMarketplaceAppInstallations(appId: string): Promise<GHLApiResponse<any>> {
    try { const r = await this.axiosInstance.get(`/marketplace/app/${appId}/installations`); return this.wrapResponse(r.data); } catch (e) { return this.handleApiError(e as AxiosError<GHLErrorResponse>); }
  }
  /** DELETE /marketplace/app/{appId}/installations */
  async deleteMarketplaceAppInstallations(appId: string, body?: any): Promise<GHLApiResponse<any>> {
    try { const r = await this.axiosInstance.delete(`/marketplace/app/${appId}/installations`, { data: body }); return this.wrapResponse(r.data); } catch (e) { return this.handleApiError(e as AxiosError<GHLErrorResponse>); }
  }

  // ============================================================================
  // CUSTOM MENUS API METHODS
  // ============================================================================
  async listCustomMenus(params?: { locationId?: string; skip?: number; limit?: number; query?: string; showOnCompany?: boolean }): Promise<GHLApiResponse<any>> {
    try { const qp: any = {}; if (params?.locationId) qp.locationId = params.locationId; if (params?.skip !== undefined) qp.skip = String(params.skip); if (params?.limit !== undefined) qp.limit = String(params.limit); if (params?.query) qp.query = params.query; if (params?.showOnCompany !== undefined) qp.showOnCompany = String(params.showOnCompany); const r = await this.axiosInstance.get('/custom-menus/', { params: qp }); return this.wrapResponse(r.data);} catch (e) { return this.handleApiError(e as AxiosError<GHLErrorResponse>);} }
  async createCustomMenu(body: any): Promise<GHLApiResponse<any>> { try { const r = await this.axiosInstance.post('/custom-menus/', body); return this.wrapResponse(r.data);} catch (e) { return this.handleApiError(e as AxiosError<GHLErrorResponse>);} }
  async getCustomMenu(customMenuId: string): Promise<GHLApiResponse<any>> { try { const r = await this.axiosInstance.get(`/custom-menus/${customMenuId}`); return this.wrapResponse(r.data);} catch (e) { return this.handleApiError(e as AxiosError<GHLErrorResponse>);} }
  async updateCustomMenu(customMenuId: string, body: any): Promise<GHLApiResponse<any>> { try { const r = await this.axiosInstance.put(`/custom-menus/${customMenuId}`, body); return this.wrapResponse(r.data);} catch (e) { return this.handleApiError(e as AxiosError<GHLErrorResponse>);} }
  async deleteCustomMenu(customMenuId: string): Promise<GHLApiResponse<any>> { try { const r = await this.axiosInstance.delete(`/custom-menus/${customMenuId}`); return this.wrapResponse(r.data);} catch (e) { return this.handleApiError(e as AxiosError<GHLErrorResponse>);} }

  // ============================================================================
  // SNAPSHOTS API METHODS
  // ============================================================================
  async listSnapshots(companyId: string): Promise<GHLApiResponse<any>> { try { const params = { companyId }; const r = await this.axiosInstance.get('/snapshots/', { params }); return this.wrapResponse(r.data);} catch (e) { return this.handleApiError(e as AxiosError<GHLErrorResponse>);} }
  async shareSnapshotLink(companyId: string, body: any): Promise<GHLApiResponse<any>> { try { const params = { companyId }; const r = await this.axiosInstance.post('/snapshots/share/link', body, { params }); return this.wrapResponse(r.data);} catch (e) { return this.handleApiError(e as AxiosError<GHLErrorResponse>);} }
  async getSnapshotStatus(snapshotId: string, companyId: string, from?: string, to?: string, lastDoc?: string, limit?: number): Promise<GHLApiResponse<any>> { try { const params: any = { companyId }; if (from) params.from = from; if (to) params.to = to; if (lastDoc) params.lastDoc = lastDoc; if (limit !== undefined) params.limit = limit; const r = await this.axiosInstance.get(`/snapshots/snapshot-status/${snapshotId}`, { params }); return this.wrapResponse(r.data);} catch (e) { return this.handleApiError(e as AxiosError<GHLErrorResponse>);} }
  async getSnapshotLocationStatus(snapshotId: string, locationId: string, companyId: string): Promise<GHLApiResponse<any>> { try { const params: any = { companyId }; const r = await this.axiosInstance.get(`/snapshots/snapshot-status/${snapshotId}/location/${locationId}`, { params }); return this.wrapResponse(r.data);} catch (e) { return this.handleApiError(e as AxiosError<GHLErrorResponse>);} }

  // ============================================================================
  // PROPOSALS API METHODS
  // ============================================================================
  async listProposalDocuments(params?: { locationId?: string; status?: string; paymentStatus?: string; limit?: number; skip?: number; query?: string; dateFrom?: string; dateTo?: string }): Promise<GHLApiResponse<any>> { try { const qp: any = {}; if (params?.locationId) qp.locationId = params.locationId; if (params?.status) qp.status = params.status; if (params?.paymentStatus) qp.paymentStatus = params.paymentStatus; if (params?.limit !== undefined) qp.limit = params.limit; if (params?.skip !== undefined) qp.skip = params.skip; if (params?.query) qp.query = params.query; if (params?.dateFrom) qp.dateFrom = params.dateFrom; if (params?.dateTo) qp.dateTo = params.dateTo; const r = await this.axiosInstance.get('/proposals/document', { params: qp }); return this.wrapResponse(r.data);} catch (e) { return this.handleApiError(e as AxiosError<GHLErrorResponse>);} }
  async sendProposalDocument(body: any): Promise<GHLApiResponse<any>> { try { const r = await this.axiosInstance.post('/proposals/document/send', body); return this.wrapResponse(r.data);} catch (e) { return this.handleApiError(e as AxiosError<GHLErrorResponse>);} }
  async listProposalTemplates(params?: { locationId?: string; dateFrom?: string; dateTo?: string; type?: string; name?: string; isPublicDocument?: boolean; userId?: string; limit?: number; skip?: number }): Promise<GHLApiResponse<any>> { try { const qp: any = {}; if (params?.locationId) qp.locationId = params.locationId; if (params?.dateFrom) qp.dateFrom = params.dateFrom; if (params?.dateTo) qp.dateTo = params.dateTo; if (params?.type) qp.type = params.type; if (params?.name) qp.name = params.name; if (params?.isPublicDocument !== undefined) qp.isPublicDocument = params.isPublicDocument; if (params?.userId) qp.userId = params.userId; if (params?.limit !== undefined) qp.limit = params.limit; if (params?.skip !== undefined) qp.skip = params.skip; const r = await this.axiosInstance.get('/proposals/templates', { params: qp }); return this.wrapResponse(r.data);} catch (e) { return this.handleApiError(e as AxiosError<GHLErrorResponse>);} }
  async sendProposalTemplate(body: any): Promise<GHLApiResponse<any>> { try { const r = await this.axiosInstance.post('/proposals/templates/send', body); return this.wrapResponse(r.data);} catch (e) { return this.handleApiError(e as AxiosError<GHLErrorResponse>);} }

  // ============================================================================
  // FORMS API METHODS
  // ============================================================================
  async listForms(params?: { locationId?: string; skip?: number; limit?: number; type?: string }): Promise<GHLApiResponse<any>> { try { const qp: any = { locationId: params?.locationId || this.config.locationId }; if (params?.skip !== undefined) qp.skip = params.skip; if (params?.limit !== undefined) qp.limit = params.limit; if (params?.type) qp.type = params.type; const r = await this.axiosInstance.get('/forms/', { params: qp }); return this.wrapResponse(r.data);} catch (e) { return this.handleApiError(e as AxiosError<GHLErrorResponse>);} }
  async listFormSubmissions(params?: { locationId?: string; page?: number; limit?: number; formId?: string; q?: string; startAt?: string; endAt?: string }): Promise<GHLApiResponse<any>> { try { const qp: any = { locationId: params?.locationId || this.config.locationId }; if (params?.page !== undefined) qp.page = params.page; if (params?.limit !== undefined) qp.limit = params.limit; if (params?.formId) qp.formId = params.formId; if (params?.q) qp.q = params.q; if (params?.startAt) qp.startAt = params.startAt; if (params?.endAt) qp.endAt = params.endAt; const r = await this.axiosInstance.get('/forms/submissions', { params: qp }); return this.wrapResponse(r.data);} catch (e) { return this.handleApiError(e as AxiosError<GHLErrorResponse>);} }
  async uploadFormCustomFiles(contactId: string, locationId?: string, formData?: any): Promise<GHLApiResponse<any>> { try { const params: any = { contactId, locationId: locationId || this.config.locationId }; const r = await this.axiosInstance.post('/forms/upload-custom-files', formData || {}, { params, headers: { 'Content-Type': 'multipart/form-data' } }); return this.wrapResponse(r.data);} catch (e) { return this.handleApiError(e as AxiosError<GHLErrorResponse>);} }

  // ============================================================================
  // OAUTH API METHODS
  // ============================================================================
  async oauthToken(body: any): Promise<GHLApiResponse<any>> { try { const r = await this.axiosInstance.post('/oauth/token', body); return this.wrapResponse(r.data);} catch (e) { return this.handleApiError(e as AxiosError<GHLErrorResponse>);} }
  async oauthLocationToken(body: any): Promise<GHLApiResponse<any>> { try { const r = await this.axiosInstance.post('/oauth/locationToken', body); return this.wrapResponse(r.data);} catch (e) { return this.handleApiError(e as AxiosError<GHLErrorResponse>);} }
  async oauthInstalledLocations(params?: { skip?: number; limit?: number; query?: string; isInstalled?: boolean; companyId?: string; appId?: string; versionId?: string; onTrial?: boolean; planId?: string }): Promise<GHLApiResponse<any>> { try { const qp: any = {}; if (params?.skip !== undefined) qp.skip = params.skip; if (params?.limit !== undefined) qp.limit = params.limit; if (params?.query) qp.query = params.query; if (params?.isInstalled !== undefined) qp.isInstalled = params.isInstalled; if (params?.companyId) qp.companyId = params.companyId; if (params?.appId) qp.appId = params.appId; if (params?.versionId) qp.versionId = params.versionId; if (params?.onTrial !== undefined) qp.onTrial = params.onTrial; if (params?.planId) qp.planId = params.planId; const r = await this.axiosInstance.get('/oauth/installedLocations', { params: qp }); return this.wrapResponse(r.data);} catch (e) { return this.handleApiError(e as AxiosError<GHLErrorResponse>);} }

  // ============================================================================
  // CAMPAIGNS, COMPANIES, COURSES (singletons)
  // ============================================================================
  async listCampaigns(): Promise<GHLApiResponse<any>> { try { const r = await this.axiosInstance.get('/campaigns/'); return this.wrapResponse(r.data);} catch (e) { return this.handleApiError(e as AxiosError<GHLErrorResponse>);} }
  async getCompany(companyId: string): Promise<GHLApiResponse<any>> { try { const r = await this.axiosInstance.get(`/companies/${companyId}`); return this.wrapResponse(r.data);} catch (e) { return this.handleApiError(e as AxiosError<GHLErrorResponse>);} }
  async importCoursesPublic(body: any): Promise<GHLApiResponse<any>> { try { const r = await this.axiosInstance.post('/courses/courses-exporter/public/import', body); return this.wrapResponse(r.data);} catch (e) { return this.handleApiError(e as AxiosError<GHLErrorResponse>);} }

  // ============================================================================
  // PHONE SYSTEM API METHODS
  // ============================================================================
  async getPhoneNumberPools(): Promise<GHLApiResponse<any>> { try { const r = await this.axiosInstance.get('/phone-system/number-pools'); return this.wrapResponse(r.data);} catch (e) { return this.handleApiError(e as AxiosError<GHLErrorResponse>);} }
  async getPhoneNumbersByLocation(locationId: string): Promise<GHLApiResponse<any>> { try { const r = await this.axiosInstance.get(`/phone-system/numbers/location/${locationId}`); return this.wrapResponse(r.data);} catch (e) { return this.handleApiError(e as AxiosError<GHLErrorResponse>);} }

  async startSocialOAuth(platform: GHLSocialPlatform, userId: string, page?: string, reconnect?: boolean): Promise<GHLApiResponse<GHLOAuthStartResponse>> {
    try {
      const locationId = this.config.locationId;
      const params: any = { locationId, userId };
      if (page) params.page = page;
      if (reconnect !== undefined) params.reconnect = String(reconnect);
      const response: AxiosResponse<GHLOAuthStartResponse> = await this.axiosInstance.get(
        `/social-media-posting/oauth/${platform}/start`,
        { params }
      );
      return this.wrapResponse(response.data);
    } catch (error) {
      return this.handleApiError(error as AxiosError<GHLErrorResponse>);
    }
  }

  /**
   * Explicit OAuth start endpoints per platform (spec-exact paths)
   */
  async startGoogleOAuth(userId: string, page?: string, reconnect?: boolean): Promise<GHLApiResponse<GHLOAuthStartResponse>> {
    try {
      const locationId = this.config.locationId;
      const params: any = { locationId, userId };
      if (page) params.page = page;
      if (reconnect !== undefined) params.reconnect = String(reconnect);
      const response: AxiosResponse<GHLOAuthStartResponse> = await this.axiosInstance.get(
        '/social-media-posting/oauth/google/start',
        { params }
      );
      return this.wrapResponse(response.data);
    } catch (error) { return this.handleApiError(error as AxiosError<GHLErrorResponse>); }
  }

  async startFacebookOAuth(userId: string, page?: string, reconnect?: boolean): Promise<GHLApiResponse<GHLOAuthStartResponse>> {
    try {
      const locationId = this.config.locationId;
      const params: any = { locationId, userId };
      if (page) params.page = page;
      if (reconnect !== undefined) params.reconnect = String(reconnect);
      const response: AxiosResponse<GHLOAuthStartResponse> = await this.axiosInstance.get(
        '/social-media-posting/oauth/facebook/start',
        { params }
      );
      return this.wrapResponse(response.data);
    } catch (error) { return this.handleApiError(error as AxiosError<GHLErrorResponse>); }
  }

  async startInstagramOAuth(userId: string, page?: string, reconnect?: boolean): Promise<GHLApiResponse<GHLOAuthStartResponse>> {
    try {
      const locationId = this.config.locationId;
      const params: any = { locationId, userId };
      if (page) params.page = page;
      if (reconnect !== undefined) params.reconnect = String(reconnect);
      const response: AxiosResponse<GHLOAuthStartResponse> = await this.axiosInstance.get(
        '/social-media-posting/oauth/instagram/start',
        { params }
      );
      return this.wrapResponse(response.data);
    } catch (error) { return this.handleApiError(error as AxiosError<GHLErrorResponse>); }
  }

  async startLinkedInOAuth(userId: string, page?: string, reconnect?: boolean): Promise<GHLApiResponse<GHLOAuthStartResponse>> {
    try {
      const locationId = this.config.locationId;
      const params: any = { locationId, userId };
      if (page) params.page = page;
      if (reconnect !== undefined) params.reconnect = String(reconnect);
      const response: AxiosResponse<GHLOAuthStartResponse> = await this.axiosInstance.get(
        '/social-media-posting/oauth/linkedin/start',
        { params }
      );
      return this.wrapResponse(response.data);
    } catch (error) { return this.handleApiError(error as AxiosError<GHLErrorResponse>); }
  }

  async startTwitterOAuth(userId: string, page?: string, reconnect?: boolean): Promise<GHLApiResponse<GHLOAuthStartResponse>> {
    try {
      const locationId = this.config.locationId;
      const params: any = { locationId, userId };
      if (page) params.page = page;
      if (reconnect !== undefined) params.reconnect = String(reconnect);
      const response: AxiosResponse<GHLOAuthStartResponse> = await this.axiosInstance.get(
        '/social-media-posting/oauth/twitter/start',
        { params }
      );
      return this.wrapResponse(response.data);
    } catch (error) { return this.handleApiError(error as AxiosError<GHLErrorResponse>); }
  }

  async startTikTokOAuth(userId: string, page?: string, reconnect?: boolean): Promise<GHLApiResponse<GHLOAuthStartResponse>> {
    try {
      const locationId = this.config.locationId;
      const params: any = { locationId, userId };
      if (page) params.page = page;
      if (reconnect !== undefined) params.reconnect = String(reconnect);
      const response: AxiosResponse<GHLOAuthStartResponse> = await this.axiosInstance.get(
        '/social-media-posting/oauth/tiktok/start',
        { params }
      );
      return this.wrapResponse(response.data);
    } catch (error) { return this.handleApiError(error as AxiosError<GHLErrorResponse>); }
  }

  async startTikTokBusinessOAuth(userId: string, page?: string, reconnect?: boolean): Promise<GHLApiResponse<GHLOAuthStartResponse>> {
    try {
      const locationId = this.config.locationId;
      const params: any = { locationId, userId };
      if (page) params.page = page;
      if (reconnect !== undefined) params.reconnect = String(reconnect);
      const response: AxiosResponse<GHLOAuthStartResponse> = await this.axiosInstance.get(
        '/social-media-posting/oauth/tiktok-business/start',
        { params }
      );
      return this.wrapResponse(response.data);
    } catch (error) { return this.handleApiError(error as AxiosError<GHLErrorResponse>); }
  }

  async getGoogleBusinessLocations(accountId: string): Promise<GHLApiResponse<GHLGetGoogleLocationsResponse>> {
    try {
      const locationId = this.config.locationId;
      const response: AxiosResponse<GHLGetGoogleLocationsResponse> = await this.axiosInstance.get(
        `/social-media-posting/oauth/${locationId}/google/locations/${accountId}`
      );
      return this.wrapResponse(response.data);
    } catch (error) {
      return this.handleApiError(error as AxiosError<GHLErrorResponse>);
    }
  }

  async setGoogleBusinessLocations(accountId: string, locationData: GHLAttachGMBLocationRequest): Promise<GHLApiResponse<GHLSocialAccount>> {
    try {
      const locationId = this.config.locationId;
      const response: AxiosResponse<GHLSocialAccount> = await this.axiosInstance.post(
        `/social-media-posting/oauth/${locationId}/google/locations/${accountId}`,
        locationData
      );
      return this.wrapResponse(response.data);
    } catch (error) {
      return this.handleApiError(error as AxiosError<GHLErrorResponse>);
    }
  }

  async getFacebookPages(accountId: string): Promise<GHLApiResponse<GHLGetFacebookPagesResponse>> {
    try {
      const locationId = this.config.locationId;
      const response: AxiosResponse<GHLGetFacebookPagesResponse> = await this.axiosInstance.get(
        `/social-media-posting/oauth/${locationId}/facebook/accounts/${accountId}`
      );
      return this.wrapResponse(response.data);
    } catch (error) {
      return this.handleApiError(error as AxiosError<GHLErrorResponse>);
    }
  }

  async attachFacebookPages(accountId: string, pageData: GHLAttachFBAccountRequest): Promise<GHLApiResponse<GHLSocialAccount>> {
    try {
      const locationId = this.config.locationId;
      const response: AxiosResponse<GHLSocialAccount> = await this.axiosInstance.post(
        `/social-media-posting/oauth/${locationId}/facebook/accounts/${accountId}`,
        pageData
      );
      return this.wrapResponse(response.data);
    } catch (error) {
      return this.handleApiError(error as AxiosError<GHLErrorResponse>);
    }
  }

  async getInstagramAccounts(accountId: string): Promise<GHLApiResponse<GHLGetInstagramAccountsResponse>> {
    try {
      const locationId = this.config.locationId;
      const response: AxiosResponse<GHLGetInstagramAccountsResponse> = await this.axiosInstance.get(
        `/social-media-posting/oauth/${locationId}/instagram/accounts/${accountId}`
      );
      return this.wrapResponse(response.data);
    } catch (error) {
      return this.handleApiError(error as AxiosError<GHLErrorResponse>);
    }
  }

  async attachInstagramAccounts(accountId: string, accountData: GHLAttachIGAccountRequest): Promise<GHLApiResponse<GHLSocialAccount>> {
    try {
      const locationId = this.config.locationId;
      const response: AxiosResponse<GHLSocialAccount> = await this.axiosInstance.post(
        `/social-media-posting/oauth/${locationId}/instagram/accounts/${accountId}`,
        accountData
      );
      return this.wrapResponse(response.data);
    } catch (error) {
      return this.handleApiError(error as AxiosError<GHLErrorResponse>);
    }
  }

  async getLinkedInAccounts(accountId: string): Promise<GHLApiResponse<GHLGetLinkedInAccountsResponse>> {
    try {
      const locationId = this.config.locationId;
      const response: AxiosResponse<GHLGetLinkedInAccountsResponse> = await this.axiosInstance.get(
        `/social-media-posting/oauth/${locationId}/linkedin/accounts/${accountId}`
      );
      return this.wrapResponse(response.data);
    } catch (error) {
      return this.handleApiError(error as AxiosError<GHLErrorResponse>);
    }
  }

  async attachLinkedInAccounts(accountId: string, accountData: GHLAttachLinkedInAccountRequest): Promise<GHLApiResponse<GHLSocialAccount>> {
    try {
      const locationId = this.config.locationId;
      const response: AxiosResponse<GHLSocialAccount> = await this.axiosInstance.post(
        `/social-media-posting/oauth/${locationId}/linkedin/accounts/${accountId}`,
        accountData
      );
      return this.wrapResponse(response.data);
    } catch (error) {
      return this.handleApiError(error as AxiosError<GHLErrorResponse>);
    }
  }

  async getTwitterProfile(accountId: string): Promise<GHLApiResponse<GHLGetTwitterAccountsResponse>> {
    try {
      const locationId = this.config.locationId;
      const response: AxiosResponse<GHLGetTwitterAccountsResponse> = await this.axiosInstance.get(
        `/social-media-posting/oauth/${locationId}/twitter/accounts/${accountId}`
      );
      return this.wrapResponse(response.data);
    } catch (error) {
      return this.handleApiError(error as AxiosError<GHLErrorResponse>);
    }
  }

  async attachTwitterProfile(accountId: string, profileData: GHLAttachTwitterAccountRequest): Promise<GHLApiResponse<GHLSocialAccount>> {
    try {
      const locationId = this.config.locationId;
      const response: AxiosResponse<GHLSocialAccount> = await this.axiosInstance.post(
        `/social-media-posting/oauth/${locationId}/twitter/accounts/${accountId}`,
        profileData
      );
      return this.wrapResponse(response.data);
    } catch (error) {
      return this.handleApiError(error as AxiosError<GHLErrorResponse>);
    }
  }

  async getTikTokProfile(accountId: string): Promise<GHLApiResponse<GHLGetTikTokAccountsResponse>> {
    try {
      const locationId = this.config.locationId;
      const response: AxiosResponse<GHLGetTikTokAccountsResponse> = await this.axiosInstance.get(
        `/social-media-posting/oauth/${locationId}/tiktok/accounts/${accountId}`
      );
      return this.wrapResponse(response.data);
    } catch (error) {
      return this.handleApiError(error as AxiosError<GHLErrorResponse>);
    }
  }

  async attachTikTokProfile(accountId: string, profileData: GHLAttachTikTokAccountRequest): Promise<GHLApiResponse<GHLSocialAccount>> {
    try {
      const locationId = this.config.locationId;
      const response: AxiosResponse<GHLSocialAccount> = await this.axiosInstance.post(
        `/social-media-posting/oauth/${locationId}/tiktok/accounts/${accountId}`,
        profileData
      );
      return this.wrapResponse(response.data);
    } catch (error) {
      return this.handleApiError(error as AxiosError<GHLErrorResponse>);
    }
  }

  async attachTikTokBusinessProfile(accountId: string, profileData: GHLAttachTikTokAccountRequest): Promise<GHLApiResponse<GHLSocialAccount>> {
    try {
      const locationId = this.config.locationId;
      const response: AxiosResponse<GHLSocialAccount> = await this.axiosInstance.post(
        `/social-media-posting/oauth/${locationId}/tiktok-business/accounts/${accountId}`,
        profileData
      );
      return this.wrapResponse(response.data);
    } catch (error) {
      return this.handleApiError(error as AxiosError<GHLErrorResponse>);
    }
  }

  async getTikTokBusinessProfile(accountId: string): Promise<GHLApiResponse<GHLGetTikTokAccountsResponse>> {
    try {
      const locationId = this.config.locationId;
      const response: AxiosResponse<GHLGetTikTokAccountsResponse> = await this.axiosInstance.get(
        `/social-media-posting/oauth/${locationId}/tiktok-business/accounts/${accountId}`
      );
      return this.wrapResponse(response.data);
    } catch (error) {
      return this.handleApiError(error as AxiosError<GHLErrorResponse>);
    }
  }

  // ===== MISSING CALENDAR GROUPS MANAGEMENT METHODS =====

  /**
   * Validate calendar group slug
   * GET /calendars/groups/slug/validate
   */
  async validateCalendarGroupSlug(slug: string, locationId?: string): Promise<GHLApiResponse<GHLValidateGroupSlugResponse>> {
    try {
      const params = {
        locationId: locationId || this.config.locationId,
        slug
      };

      const response: AxiosResponse<GHLValidateGroupSlugResponse> = await this.axiosInstance.get(
        '/calendars/groups/slug/validate',
        { params }
      );

      return this.wrapResponse(response.data);
    } catch (error) {
      return this.handleApiError(error as AxiosError<GHLErrorResponse>);
    }
  }

  /**
   * Create block slot
   * POST /calendars/events/block-slots
   */
  async createBlockSlot(blockData: GHLCreateBlockSlotRequest): Promise<GHLApiResponse<GHLBlockSlotResponse>> {
    try {
      const payload = {
        ...blockData,
        locationId: (blockData as any).locationId || this.config.locationId
      };

      const response: AxiosResponse<GHLBlockSlotResponse> = await this.axiosInstance.post(
        '/calendars/events/block-slots',
        payload
      );

      return this.wrapResponse(response.data);
    } catch (error) {
      return this.handleApiError(error as AxiosError<GHLErrorResponse>);
    }
  }

  /**
   * Delete calendar event
   * DELETE /calendars/events/{eventId}
   */
  async deleteCalendarEvent(eventId: string): Promise<GHLApiResponse<{ succeeded?: boolean }>> {
    try {
      const response: AxiosResponse<{ succeeded?: boolean }> = await this.axiosInstance.delete(
        `/calendars/events/${eventId}`
      );
      return this.wrapResponse(response.data);
    } catch (error) {
      return this.handleApiError(error as AxiosError<GHLErrorResponse>);
    }
  }

  /**
   * Validate calendar group slug (spec-compliant)
   * POST /calendars/groups/validate-slug
   */
  async validateCalendarGroupSlugPost(slug: string, locationId?: string): Promise<GHLApiResponse<GHLValidateGroupSlugResponse>> {
    try {
      const payload = {
        slug,
        locationId: locationId || this.config.locationId
      };

      const response: AxiosResponse<GHLValidateGroupSlugResponse> = await this.axiosInstance.post(
        '/calendars/groups/validate-slug',
        payload
      );

      return this.wrapResponse(response.data);
    } catch (error) {
      return this.handleApiError(error as AxiosError<GHLErrorResponse>);
    }
  }

  /**
   * Update calendar group by ID
   * PUT /calendars/groups/{groupId}
   */
  async updateCalendarGroup(groupId: string, updateData: GHLUpdateCalendarGroupRequest): Promise<GHLApiResponse<GHLGroupSuccessResponse>> {
    try {
      const response: AxiosResponse<GHLGroupSuccessResponse> = await this.axiosInstance.put(
        `/calendars/groups/${groupId}`,
        updateData
      );

      return this.wrapResponse(response.data);
    } catch (error) {
      return this.handleApiError(error as AxiosError<GHLErrorResponse>);
    }
  }

  /**
   * Delete calendar group by ID
   * DELETE /calendars/groups/{groupId}
   */
  async deleteCalendarGroup(groupId: string): Promise<GHLApiResponse<GHLGroupSuccessResponse>> {
    try {
      const response: AxiosResponse<GHLGroupSuccessResponse> = await this.axiosInstance.delete(
        `/calendars/groups/${groupId}`
      );

      return this.wrapResponse(response.data);
    } catch (error) {
      return this.handleApiError(error as AxiosError<GHLErrorResponse>);
    }
  }

  /**
   * Disable calendar group
   * POST /calendars/groups/{groupId}/status
   */
  async disableCalendarGroup(groupId: string, isActive: boolean): Promise<GHLApiResponse<GHLGroupSuccessResponse>> {
    try {
      const payload: GHLGroupStatusUpdateRequest = { isActive };

      const response: AxiosResponse<GHLGroupSuccessResponse> = await this.axiosInstance.put(
        `/calendars/groups/${groupId}/status`,
        payload
      );

      return this.wrapResponse(response.data);
    } catch (error) {
      return this.handleApiError(error as AxiosError<GHLErrorResponse>);
    }
  }

  // ===== APPOINTMENT NOTES METHODS =====

  /**
   * Get appointment notes
   * GET /calendars/appointments/{appointmentId}/notes
   */
  async getAppointmentNotes(appointmentId: string, limit = 10, offset = 0): Promise<GHLApiResponse<GHLGetAppointmentNotesResponse>> {
    try {
      const params = { limit, offset };

      const response: AxiosResponse<GHLGetAppointmentNotesResponse> = await this.axiosInstance.get(
        `/calendars/appointments/${appointmentId}/notes`,
        { params }
      );

      return this.wrapResponse(response.data);
    } catch (error) {
      return this.handleApiError(error as AxiosError<GHLErrorResponse>);
    }
  }

  /**
   * Create appointment note
   * POST /calendars/appointments/{appointmentId}/notes
   */
  async createAppointmentNote(appointmentId: string, noteData: GHLCreateAppointmentNoteRequest): Promise<GHLApiResponse<GHLAppointmentNoteResponse>> {
    try {
      const response: AxiosResponse<GHLAppointmentNoteResponse> = await this.axiosInstance.post(
        `/calendars/appointments/${appointmentId}/notes`,
        noteData
      );

      return this.wrapResponse(response.data);
    } catch (error) {
      return this.handleApiError(error as AxiosError<GHLErrorResponse>);
    }
  }

  /**
   * Update appointment note
   * PUT /calendars/appointments/{appointmentId}/notes/{noteId}
   */
  async updateAppointmentNote(appointmentId: string, noteId: string, updateData: GHLUpdateAppointmentNoteRequest): Promise<GHLApiResponse<GHLAppointmentNoteResponse>> {
    try {
      const response: AxiosResponse<GHLAppointmentNoteResponse> = await this.axiosInstance.put(
        `/calendars/appointments/${appointmentId}/notes/${noteId}`,
        updateData
      );

      return this.wrapResponse(response.data);
    } catch (error) {
      return this.handleApiError(error as AxiosError<GHLErrorResponse>);
    }
  }

  /**
   * Delete appointment note
   * DELETE /calendars/appointments/{appointmentId}/notes/{noteId}
   */
  async deleteAppointmentNote(appointmentId: string, noteId: string): Promise<GHLApiResponse<GHLDeleteAppointmentNoteResponse>> {
    try {
      const response: AxiosResponse<GHLDeleteAppointmentNoteResponse> = await this.axiosInstance.delete(
        `/calendars/appointments/${appointmentId}/notes/${noteId}`
      );

      return this.wrapResponse(response.data);
    } catch (error) {
      return this.handleApiError(error as AxiosError<GHLErrorResponse>);
    }
  }

  // ===== CALENDAR RESOURCES METHODS =====

  /**
   * Get calendar resources
   * GET /calendars/resources/{resourceType}
   */
  async getCalendarResources(resourceType: 'equipments' | 'rooms', limit = 20, skip = 0, locationId?: string): Promise<GHLApiResponse<GHLCalendarResource[]>> {
    try {
      const params = {
        locationId: locationId || this.config.locationId,
        limit,
        skip
      };

      const response: AxiosResponse<GHLCalendarResource[]> = await this.axiosInstance.get(
        `/calendars/resources/${resourceType}`,
        { params }
      );

      return this.wrapResponse(response.data);
    } catch (error) {
      return this.handleApiError(error as AxiosError<GHLErrorResponse>);
    }
  }

  /**
   * Create calendar resource
   * POST /calendars/resources/{resourceType}
   */
  async createCalendarResource(resourceType: 'equipments' | 'rooms', resourceData: GHLCreateCalendarResourceRequest): Promise<GHLApiResponse<GHLCalendarResourceResponse>> {
    try {
      const payload = {
        ...resourceData,
        locationId: resourceData.locationId || this.config.locationId
      };

      const response: AxiosResponse<GHLCalendarResourceResponse> = await this.axiosInstance.post(
        `/calendars/resources/${resourceType}`,
        payload
      );

      return this.wrapResponse(response.data);
    } catch (error) {
      return this.handleApiError(error as AxiosError<GHLErrorResponse>);
    }
  }

  /**
   * Get calendar resource by ID
   * GET /calendars/resources/{resourceType}/{resourceId}
   */
  async getCalendarResource(resourceType: 'equipments' | 'rooms', id: string): Promise<GHLApiResponse<GHLCalendarResourceByIdResponse>> {
    try {
      const response: AxiosResponse<GHLCalendarResourceByIdResponse> = await this.axiosInstance.get(
        `/calendars/resources/${resourceType}/${id}`
      );

      return this.wrapResponse(response.data);
    } catch (error) {
      return this.handleApiError(error as AxiosError<GHLErrorResponse>);
    }
  }

  /**
   * Update calendar resource
   * PUT /calendars/resources/{resourceType}/{resourceId}
   */
  async updateCalendarResource(resourceType: 'equipments' | 'rooms', id: string, updateData: GHLUpdateCalendarResourceRequest): Promise<GHLApiResponse<GHLCalendarResourceResponse>> {
    try {
      const response: AxiosResponse<GHLCalendarResourceResponse> = await this.axiosInstance.put(
        `/calendars/resources/${resourceType}/${id}`,
        updateData
      );

      return this.wrapResponse(response.data);
    } catch (error) {
      return this.handleApiError(error as AxiosError<GHLErrorResponse>);
    }
  }

  /**
   * Delete calendar resource
   * DELETE /calendars/resources/{resourceType}/{resourceId}
   */
  async deleteCalendarResource(resourceType: 'equipments' | 'rooms', id: string): Promise<GHLApiResponse<GHLResourceDeleteResponse>> {
    try {
      const response: AxiosResponse<GHLResourceDeleteResponse> = await this.axiosInstance.delete(
        `/calendars/resources/${resourceType}/${id}`
      );

      return this.wrapResponse(response.data);
    } catch (error) {
      return this.handleApiError(error as AxiosError<GHLErrorResponse>);
    }
  }

  // ===== CALENDAR NOTIFICATIONS METHODS =====

  /**
   * Get calendar notifications
   * GET /calendars/{calendarId}/notifications
   */
  async getCalendarNotifications(calendarId: string, queryParams?: GHLGetCalendarNotificationsRequest): Promise<GHLApiResponse<GHLCalendarNotification[]>> {
    try {
      const params = {
        ...queryParams
      };

      const response: AxiosResponse<GHLCalendarNotification[]> = await this.axiosInstance.get(
        `/calendars/${calendarId}/notifications`,
        { params }
      );

      return this.wrapResponse(response.data);
    } catch (error) {
      return this.handleApiError(error as AxiosError<GHLErrorResponse>);
    }
  }

  /**
   * Create calendar notifications
   * POST /calendars/{calendarId}/notifications
   */
  async createCalendarNotifications(calendarId: string, notifications: GHLCreateCalendarNotificationRequest[]): Promise<GHLApiResponse<GHLCalendarNotification[]>> {
    try {
      const payload = { notifications };

      const response: AxiosResponse<GHLCalendarNotification[]> = await this.axiosInstance.post(
        `/calendars/${calendarId}/notifications`,
        payload
      );

      return this.wrapResponse(response.data);
    } catch (error) {
      return this.handleApiError(error as AxiosError<GHLErrorResponse>);
    }
  }

  /**
   * Get calendar notification by ID
   * GET /calendars/{calendarId}/notifications/{notificationId}
   */
  async getCalendarNotification(calendarId: string, notificationId: string): Promise<GHLApiResponse<GHLCalendarNotification>> {
    try {
      const response: AxiosResponse<GHLCalendarNotification> = await this.axiosInstance.get(
        `/calendars/${calendarId}/notifications/${notificationId}`
      );

      return this.wrapResponse(response.data);
    } catch (error) {
      return this.handleApiError(error as AxiosError<GHLErrorResponse>);
    }
  }

  /**
   * Update calendar notification
   * PUT /calendars/{calendarId}/notifications/{notificationId}
   */
  async updateCalendarNotification(calendarId: string, notificationId: string, updateData: GHLUpdateCalendarNotificationRequest): Promise<GHLApiResponse<GHLCalendarNotification>> {
    try {
      const response: AxiosResponse<GHLCalendarNotification> = await this.axiosInstance.put(
        `/calendars/${calendarId}/notifications/${notificationId}`,
        updateData
      );

      return this.wrapResponse(response.data);
    } catch (error) {
      return this.handleApiError(error as AxiosError<GHLErrorResponse>);
    }
  }

  /**
   * Delete calendar notification
   * DELETE /calendars/{calendarId}/notifications/{notificationId}
   */
  async deleteCalendarNotification(calendarId: string, notificationId: string): Promise<GHLApiResponse<GHLCalendarNotificationDeleteResponse>> {
    try {
      const response: AxiosResponse<GHLCalendarNotificationDeleteResponse> = await this.axiosInstance.delete(
        `/calendars/${calendarId}/notifications/${notificationId}`
      );

      return this.wrapResponse(response.data);
    } catch (error) {
      return this.handleApiError(error as AxiosError<GHLErrorResponse>);
    }
  }

  /**
   * Get blocked slots by location
   * GET /calendars/blocked-slots
   */
  async getBlockedSlotsByLocation(slotParams: GHLGetBlockedSlotsRequest): Promise<GHLApiResponse<GHLGetCalendarEventsResponse>> {
    try {
      const params = new URLSearchParams({
        locationId: slotParams.locationId,
        startTime: slotParams.startTime,
        endTime: slotParams.endTime,
        ...(slotParams.userId && { userId: slotParams.userId }),
        ...(slotParams.calendarId && { calendarId: slotParams.calendarId }),
        ...(slotParams.groupId && { groupId: slotParams.groupId })
      });

      const response: AxiosResponse<GHLGetCalendarEventsResponse> = await this.axiosInstance.get(
        `/calendars/blocked-slots?${params}`
      );

      return this.wrapResponse(response.data);
    } catch (error) {
      return this.handleApiError(error as AxiosError<GHLErrorResponse>);
    }
  }


  // ===== MEDIA LIBRARY API METHODS =====

  /**
   * Get list of files and folders from media library
   * GET /medias/files
   */
  async getMediaFiles(params: GHLGetMediaFilesRequest): Promise<GHLApiResponse<GHLGetMediaFilesResponse>> {
    try {
      const queryParams = new URLSearchParams({
        sortBy: params.sortBy,
        sortOrder: params.sortOrder,
        altType: params.altType,
        altId: params.altId,
        ...(params.offset !== undefined && { offset: params.offset.toString() }),
        ...(params.limit !== undefined && { limit: params.limit.toString() }),
        ...(params.type && { type: params.type }),
        ...(params.query && { query: params.query }),
        ...(params.parentId && { parentId: params.parentId })
      });

      const response: AxiosResponse<GHLGetMediaFilesResponse> = await this.axiosInstance.get(
        `/medias/files?${queryParams}`
      );

      return this.wrapResponse(response.data);
    } catch (error) {
      return this.handleApiError(error as AxiosError<GHLErrorResponse>);
    }
  }

  /**
   * Upload file to media library
   * POST /medias/upload-file
   */
  async uploadMediaFile(uploadData: GHLUploadMediaFileRequest): Promise<GHLApiResponse<GHLUploadMediaFileResponse>> {
    try {
      const formData = new FormData();

      // Handle file upload (either direct file or hosted file URL)
      if (uploadData.hosted && uploadData.fileUrl) {
        formData.append('hosted', 'true');
        formData.append('fileUrl', uploadData.fileUrl);
      } else if (uploadData.file) {
        formData.append('hosted', 'false');
        formData.append('file', uploadData.file);
      } else {
        throw new Error('Either file or fileUrl (with hosted=true) must be provided');
      }

      // Add optional fields
      if (uploadData.name) {
        formData.append('name', uploadData.name);
      }
      if (uploadData.parentId) {
        formData.append('parentId', uploadData.parentId);
      }

      const response: AxiosResponse<GHLUploadMediaFileResponse> = await this.axiosInstance.post(
        '/medias/upload-file',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          }
        }
      );

      return this.wrapResponse(response.data);
    } catch (error) {
      return this.handleApiError(error as AxiosError<GHLErrorResponse>);
    }
  }

  /**
   * Delete file or folder from media library
   * DELETE /medias/{id}
   */
  async deleteMediaFile(deleteParams: GHLDeleteMediaRequest): Promise<GHLApiResponse<GHLDeleteMediaResponse>> {
    try {
      const queryParams = new URLSearchParams({
        altType: deleteParams.altType,
        altId: deleteParams.altId
      });

      const { id } = deleteParams;
      const response: AxiosResponse<GHLDeleteMediaResponse> = await this.axiosInstance.delete(
        `/medias/${id}?${queryParams}`
      );

      return this.wrapResponse({ success: true, message: 'Media file deleted successfully' });
    } catch (error) {
      return this.handleApiError(error as AxiosError<GHLErrorResponse>);
    }
  }

  // ===== CUSTOM OBJECTS API METHODS =====

  /**
   * Get all objects for a location
   * GET /objects/
   */
  async getObjectsByLocation(locationId?: string): Promise<GHLApiResponse<GHLObjectListResponse>> {
    try {
      const params = {
        locationId: locationId || this.config.locationId
      };

      const response: AxiosResponse<GHLObjectListResponse> = await this.axiosInstance.get(
        '/objects/',
        { params }
      );

      return this.wrapResponse(response.data);
    } catch (error) {
      return this.handleApiError(error as AxiosError<GHLErrorResponse>);
    }
  }

  /**
   * Create custom object schema
   * POST /objects/
   */
  async createObjectSchema(schemaData: GHLCreateObjectSchemaRequest): Promise<GHLApiResponse<GHLObjectSchemaResponse>> {
    try {
      const payload = {
        ...schemaData,
        locationId: schemaData.locationId || this.config.locationId
      };

      const response: AxiosResponse<GHLObjectSchemaResponse> = await this.axiosInstance.post(
        '/objects/',
        payload
      );

      return this.wrapResponse(response.data);
    } catch (error) {
      return this.handleApiError(error as AxiosError<GHLErrorResponse>);
    }
  }

  /**
   * Get object schema by key/id
   * GET /objects/{key}
   */
  async getObjectSchema(params: GHLGetObjectSchemaRequest): Promise<GHLApiResponse<GHLGetObjectSchemaResponse>> {
    try {
      const { key, locationId, fetchProperties } = params as any;
      const queryParams = {
        locationId: locationId || this.config.locationId,
        ...(fetchProperties !== undefined && { fetchProperties: String(fetchProperties) })
      };

      const response: AxiosResponse<GHLGetObjectSchemaResponse> = await this.axiosInstance.get(
        `/objects/${key}`,
        { params: queryParams }
      );

      return this.wrapResponse(response.data);
    } catch (error) {
      return this.handleApiError(error as AxiosError<GHLErrorResponse>);
    }
  }

  /**
   * Update object schema by key/id
   * PUT /objects/{key}
   */
  async updateObjectSchema(key: string, updateData: GHLUpdateObjectSchemaRequest): Promise<GHLApiResponse<GHLObjectSchemaResponse>> {
    try {
      const payload = {
        ...updateData,
        locationId: updateData.locationId || this.config.locationId
      };

      const response: AxiosResponse<GHLObjectSchemaResponse> = await this.axiosInstance.put(
        `/objects/${key}`,
        payload
      );

      return this.wrapResponse(response.data);
    } catch (error) {
      return this.handleApiError(error as AxiosError<GHLErrorResponse>);
    }
  }

  /**
   * Create object record
   * POST /objects/{schemaKey}/records
   */
  async createObjectRecord(schemaKey: string, recordData: GHLCreateObjectRecordRequest): Promise<GHLApiResponse<GHLDetailedObjectRecordResponse>> {
    try {
      const payload = {
        ...recordData,
        locationId: recordData.locationId || this.config.locationId
      };

      const response: AxiosResponse<GHLDetailedObjectRecordResponse> = await this.axiosInstance.post(
        `/objects/${schemaKey}/records`,
        payload
      );

      return this.wrapResponse(response.data);
    } catch (error) {
      return this.handleApiError(error as AxiosError<GHLErrorResponse>);
    }
  }

  /**
   * Get object record by id
   * GET /objects/{schemaKey}/records/{id}
   */
  async getObjectRecord(schemaKey: string, id: string): Promise<GHLApiResponse<GHLObjectRecordResponse>> {
    try {
      const response: AxiosResponse<GHLObjectRecordResponse> = await this.axiosInstance.get(
        `/objects/${schemaKey}/records/${id}`
      );

      return this.wrapResponse(response.data);
    } catch (error) {
      return this.handleApiError(error as AxiosError<GHLErrorResponse>);
    }
  }

  /**
   * Update object record
   * PUT /objects/{schemaKey}/records/{id}
   */
  async updateObjectRecord(schemaKey: string, id: string, updateData: GHLUpdateObjectRecordRequest): Promise<GHLApiResponse<GHLObjectRecordResponse>> {
    try {
      const queryParams = {
        locationId: updateData.locationId || this.config.locationId
      };

      const response: AxiosResponse<GHLObjectRecordResponse> = await this.axiosInstance.put(
        `/objects/${schemaKey}/records/${id}`,
        updateData,
        { params: queryParams }
      );

      return this.wrapResponse(response.data);
    } catch (error) {
      return this.handleApiError(error as AxiosError<GHLErrorResponse>);
    }
  }

  /**
   * Delete object record
   * DELETE /objects/{schemaKey}/records/{id}
   */
  async deleteObjectRecord(schemaKey: string, id: string): Promise<GHLApiResponse<GHLObjectRecordDeleteResponse>> {
    try {
      const response: AxiosResponse<GHLObjectRecordDeleteResponse> = await this.axiosInstance.delete(
        `/objects/${schemaKey}/records/${id}`
      );

      return this.wrapResponse(response.data);
    } catch (error) {
      return this.handleApiError(error as AxiosError<GHLErrorResponse>);
    }
  }

  /**
   * Search object records
   * POST /objects/{schemaKey}/records/search
   */
  async searchObjectRecords(schemaKey: string, searchData: GHLSearchObjectRecordsRequest): Promise<GHLApiResponse<GHLSearchObjectRecordsResponse>> {
    try {
      const payload = {
        ...searchData,
        locationId: searchData.locationId || this.config.locationId
      };

      const response: AxiosResponse<GHLSearchObjectRecordsResponse> = await this.axiosInstance.post(
        `/objects/${schemaKey}/records/search`,
        payload
      );

      return this.wrapResponse(response.data);
    } catch (error) {
      return this.handleApiError(error as AxiosError<GHLErrorResponse>);
    }
  }

  // ===== ASSOCIATIONS API METHODS =====

  /**
   * Get all associations for a location
   * GET /associations/
   */
  async getAssociations(params: GHLGetAssociationsRequest): Promise<GHLApiResponse<GHLGetAssociationsResponse>> {
    try {
      const queryParams = {
        locationId: params.locationId || this.config.locationId,
        skip: params.skip.toString(),
        limit: params.limit.toString()
      };

      const response: AxiosResponse<GHLGetAssociationsResponse> = await this.axiosInstance.get(
        '/associations/',
        { params: queryParams }
      );

      return this.wrapResponse(response.data);
    } catch (error) {
      return this.handleApiError(error as AxiosError<GHLErrorResponse>);
    }
  }

  /**
   * Create association
   * POST /associations/
   */
  async createAssociation(associationData: GHLCreateAssociationRequest): Promise<GHLApiResponse<GHLAssociationResponse>> {
    try {
      const payload = {
        ...associationData,
        locationId: associationData.locationId || this.config.locationId
      };

      const response: AxiosResponse<GHLAssociationResponse> = await this.axiosInstance.post(
        '/associations/',
        payload
      );

      return this.wrapResponse(response.data);
    } catch (error) {
      return this.handleApiError(error as AxiosError<GHLErrorResponse>);
    }
  }

  /**
   * Get association by ID
   * GET /associations/{associationId}
   */
  async getAssociationById(associationId: string): Promise<GHLApiResponse<GHLAssociationResponse>> {
    try {
      const response: AxiosResponse<GHLAssociationResponse> = await this.axiosInstance.get(
        `/associations/${associationId}`
      );

      return this.wrapResponse(response.data);
    } catch (error) {
      return this.handleApiError(error as AxiosError<GHLErrorResponse>);
    }
  }

  /**
   * Update association
   * PUT /associations/{associationId}
   */
  async updateAssociation(associationId: string, updateData: GHLUpdateAssociationRequest): Promise<GHLApiResponse<GHLAssociationResponse>> {
    try {
      const response: AxiosResponse<GHLAssociationResponse> = await this.axiosInstance.put(
        `/associations/${associationId}`,
        updateData
      );

      return this.wrapResponse(response.data);
    } catch (error) {
      return this.handleApiError(error as AxiosError<GHLErrorResponse>);
    }
  }

  /**
   * Delete association
   * DELETE /associations/{associationId}
   */
  async deleteAssociation(associationId: string): Promise<GHLApiResponse<GHLDeleteAssociationResponse>> {
    try {
      const response: AxiosResponse<GHLDeleteAssociationResponse> = await this.axiosInstance.delete(
        `/associations/${associationId}`
      );

      return this.wrapResponse(response.data);
    } catch (error) {
      return this.handleApiError(error as AxiosError<GHLErrorResponse>);
    }
  }

  /**
   * Get association by key name
   * GET /associations/key/{key_name}
   */
  async getAssociationByKey(params: GHLGetAssociationByKeyRequest): Promise<GHLApiResponse<GHLAssociationResponse>> {
    try {
      const { keyName: key_name, locationId } = params as any;
      const queryParams = {
        locationId: locationId || this.config.locationId
      };

      const response: AxiosResponse<GHLAssociationResponse> = await this.axiosInstance.get(
        `/associations/key/${key_name}`,
        { params: queryParams }
      );

      return this.wrapResponse(response.data);
    } catch (error) {
      return this.handleApiError(error as AxiosError<GHLErrorResponse>);
    }
  }

  /**
   * Get association by object key
   * GET /associations/objectKey/{objectKey}
   */
  async getAssociationByObjectKey(params: GHLGetAssociationByObjectKeyRequest): Promise<GHLApiResponse<GHLAssociationResponse>> {
    try {
      const { objectKey, locationId } = params as any;
      const queryParams = locationId ? { locationId } : {};

      const response: AxiosResponse<GHLAssociationResponse> = await this.axiosInstance.get(
        `/associations/objectKey/${objectKey}`,
        { params: queryParams }
      );

      return this.wrapResponse(response.data);
    } catch (error) {
      return this.handleApiError(error as AxiosError<GHLErrorResponse>);
    }
  }

  /**
   * Create relation between entities
   * POST /associations/relations
   */
  async createRelation(relationData: GHLCreateRelationRequest): Promise<GHLApiResponse<GHLAssociationResponse>> {
    try {
      const payload = {
        ...relationData,
        locationId: relationData.locationId || this.config.locationId
      };

      const response: AxiosResponse<GHLAssociationResponse> = await this.axiosInstance.post(
        '/associations/relations',
        payload
      );

      return this.wrapResponse(response.data);
    } catch (error) {
      return this.handleApiError(error as AxiosError<GHLErrorResponse>);
    }
  }

  /**
   * Get relations by record ID
   * GET /associations/relations/{recordId}
   */
  async getRelationsByRecord(params: GHLGetRelationsByRecordRequest): Promise<GHLApiResponse<GHLGetRelationsResponse>> {
    try {
      const { recordId, locationId, skip, limit, associationIds } = params as any;
      const queryParams = {
        locationId: locationId || this.config.locationId,
        skip: String(skip),
        limit: String(limit),
        ...(associationIds && { associationIds })
      };

      const response: AxiosResponse<GHLGetRelationsResponse> = await this.axiosInstance.get(
        `/associations/relations/${recordId}`,
        { params: queryParams }
      );

      return this.wrapResponse(response.data);
    } catch (error) {
      return this.handleApiError(error as AxiosError<GHLErrorResponse>);
    }
  }

  /**
   * Delete relation
   * DELETE /associations/relations/{relationId}
   */
  async deleteRelation(params: GHLDeleteRelationRequest): Promise<GHLApiResponse<GHLAssociationResponse>> {
    try {
      const { relationId, locationId } = params as any;
      const queryParams = {
        locationId: locationId || this.config.locationId
      };

      const response: AxiosResponse<GHLAssociationResponse> = await this.axiosInstance.delete(
        `/associations/relations/${relationId}`,
        { params: queryParams }
      );

      return this.wrapResponse(response.data);
    } catch (error) {
      return this.handleApiError(error as AxiosError<GHLErrorResponse>);
    }
  }

  // ===== CUSTOM FIELDS V2 API METHODS =====

  /**
   * Get custom field or folder by ID
   * GET /custom-fields/{id}
   */
  async getCustomFieldV2ById(id: string): Promise<GHLApiResponse<GHLV2CustomFieldResponse>> {
    try {
      const response: AxiosResponse<GHLV2CustomFieldResponse> = await this.axiosInstance.get(
        `/custom-fields/${id}`
      );

      return this.wrapResponse(response.data);
    } catch (error) {
      return this.handleApiError(error as AxiosError<GHLErrorResponse>);
    }
  }

  /**
   * Create custom field
   * POST /custom-fields/
   */
  async createCustomFieldV2(fieldData: GHLV2CreateCustomFieldRequest): Promise<GHLApiResponse<GHLV2CustomFieldResponse>> {
    try {
      const payload = {
        ...fieldData,
        locationId: fieldData.locationId || this.config.locationId
      };

      const response: AxiosResponse<GHLV2CustomFieldResponse> = await this.axiosInstance.post(
        '/custom-fields/',
        payload
      );

      return this.wrapResponse(response.data);
    } catch (error) {
      return this.handleApiError(error as AxiosError<GHLErrorResponse>);
    }
  }

  /**
   * Update custom field by ID
   * PUT /custom-fields/{id}
   */
  async updateCustomFieldV2(id: string, fieldData: GHLV2UpdateCustomFieldRequest): Promise<GHLApiResponse<GHLV2CustomFieldResponse>> {
    try {
      const payload = {
        ...fieldData,
        locationId: fieldData.locationId || this.config.locationId
      };

      const response: AxiosResponse<GHLV2CustomFieldResponse> = await this.axiosInstance.put(
        `/custom-fields/${id}`,
        payload
      );

      return this.wrapResponse(response.data);
    } catch (error) {
      return this.handleApiError(error as AxiosError<GHLErrorResponse>);
    }
  }

  /**
   * Delete custom field by ID
   * DELETE /custom-fields/{id}
   */
  async deleteCustomFieldV2(id: string): Promise<GHLApiResponse<GHLV2DeleteCustomFieldResponse>> {
    try {
      const response: AxiosResponse<GHLV2DeleteCustomFieldResponse> = await this.axiosInstance.delete(
        `/custom-fields/${id}`
      );

      return this.wrapResponse(response.data);
    } catch (error) {
      return this.handleApiError(error as AxiosError<GHLErrorResponse>);
    }
  }

  /**
   * Get custom fields by object key
   * GET /custom-fields/object-key/{objectKey}
   */
  async getCustomFieldsV2ByObjectKey(params: GHLV2GetCustomFieldsByObjectKeyRequest): Promise<GHLApiResponse<GHLV2CustomFieldsResponse>> {
    try {
      const { objectKey, locationId } = params;
      const queryParams = {
        locationId: locationId || this.config.locationId
      };

      const response: AxiosResponse<GHLV2CustomFieldsResponse> = await this.axiosInstance.get(
        `/custom-fields/object-key/${objectKey}`,
        { params: queryParams }
      );

      return this.wrapResponse(response.data);
    } catch (error) {
      return this.handleApiError(error as AxiosError<GHLErrorResponse>);
    }
  }

  /**
   * Create custom field folder
   * POST /custom-fields/folder
   */
  async createCustomFieldV2Folder(folderData: GHLV2CreateCustomFieldFolderRequest): Promise<GHLApiResponse<GHLV2CustomFieldFolderResponse>> {
    try {
      const payload = {
        ...folderData,
        locationId: folderData.locationId || this.config.locationId
      };

      const response: AxiosResponse<GHLV2CustomFieldFolderResponse> = await this.axiosInstance.post(
        '/custom-fields/folder',
        payload
      );

      return this.wrapResponse(response.data);
    } catch (error) {
      return this.handleApiError(error as AxiosError<GHLErrorResponse>);
    }
  }

  /**
   * Update custom field folder name
   * PUT /custom-fields/folder/{id}
   */
  async updateCustomFieldV2Folder(id: string, folderData: GHLV2UpdateCustomFieldFolderRequest): Promise<GHLApiResponse<GHLV2CustomFieldFolderResponse>> {
    try {
      const payload = {
        ...folderData,
        locationId: folderData.locationId || this.config.locationId
      };

      const response: AxiosResponse<GHLV2CustomFieldFolderResponse> = await this.axiosInstance.put(
        `/custom-fields/folder/${id}`,
        payload
      );

      return this.wrapResponse(response.data);
    } catch (error) {
      return this.handleApiError(error as AxiosError<GHLErrorResponse>);
    }
  }

  /**
   * Delete custom field folder
   * DELETE /custom-fields/folder/{id}
   */
  async deleteCustomFieldV2Folder(params: GHLV2DeleteCustomFieldFolderRequest): Promise<GHLApiResponse<GHLV2DeleteCustomFieldResponse>> {
    try {
      const { id, locationId } = params;
      const queryParams = {
        locationId: locationId || this.config.locationId
      };

      const response: AxiosResponse<GHLV2DeleteCustomFieldResponse> = await this.axiosInstance.delete(
        `/custom-fields/folder/${id}`,
        { params: queryParams }
      );

      return this.wrapResponse(response.data);
    } catch (error) {
      return this.handleApiError(error as AxiosError<GHLErrorResponse>);
    }
  }

  // ===== WORKFLOWS API METHODS =====

  /**
   * Get all workflows for a location
   * GET /workflows/
   */
  async getWorkflows(request: GHLGetWorkflowsRequest): Promise<GHLApiResponse<GHLGetWorkflowsResponse>> {
    try {
      const queryParams = {
        locationId: request.locationId || this.config.locationId
      };

      const response: AxiosResponse<GHLGetWorkflowsResponse> = await this.axiosInstance.get(
        '/workflows/',
        { params: queryParams }
      );

      return this.wrapResponse(response.data);
    } catch (error) {
      return this.handleApiError(error as AxiosError<GHLErrorResponse>);
    }
  }

  // ===== SURVEYS API METHODS =====

  /**
   * Get all surveys for a location
   * GET /surveys/
   */
  async getSurveys(request: GHLGetSurveysRequest): Promise<GHLApiResponse<GHLGetSurveysResponse>> {
    try {
      const queryParams: Record<string, string> = {
        locationId: request.locationId || this.config.locationId
      };

      if (request.skip !== undefined) {
        queryParams.skip = request.skip.toString();
      }
      if (request.limit !== undefined) {
        queryParams.limit = request.limit.toString();
      }
      if (request.type) {
        queryParams.type = request.type;
      }

      const response: AxiosResponse<GHLGetSurveysResponse> = await this.axiosInstance.get(
        '/surveys/',
        { params: queryParams }
      );

      return this.wrapResponse(response.data);
    } catch (error) {
      return this.handleApiError(error as AxiosError<GHLErrorResponse>);
    }
  }

  /**
   * Get survey submissions with filtering and pagination
   * GET /surveys/submissions
   */
  async getSurveySubmissions(request: GHLGetSurveySubmissionsRequest): Promise<GHLApiResponse<GHLGetSurveySubmissionsResponse>> {
    try {
      const locationId = request.locationId || this.config.locationId;
      
      const params = new URLSearchParams();
      params.append('locationId', locationId); // Canonical: locationId as query param
      if (request.page) params.append('page', request.page.toString());
      if (request.limit) params.append('limit', request.limit.toString());
      if (request.surveyId) params.append('surveyId', request.surveyId);
      if (request.q) params.append('q', request.q);
      if (request.startAt) params.append('startAt', request.startAt);
      if (request.endAt) params.append('endAt', request.endAt);

      const response: AxiosResponse<GHLGetSurveySubmissionsResponse> = await this.axiosInstance.get(
        `/surveys/submissions?${params.toString()}`,
        {
          headers: {
            'Authorization': this.axiosInstance.defaults.headers['Authorization'],
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Version': '2021-07-28' // Canonical version header
          }
        }
      );

      return this.wrapResponse(response.data);
    } catch (error) {
      return this.handleApiError(error as AxiosError<GHLErrorResponse>);
    }
  }

  // Keep legacy location-scoped method for backward compatibility
  async getSurveySubmissionsLegacy(request: GHLGetSurveySubmissionsRequest): Promise<GHLApiResponse<GHLGetSurveySubmissionsResponse>> {
    try {
      const locationId = request.locationId || this.config.locationId;
      
      const params = new URLSearchParams();
      if (request.page) params.append('page', request.page.toString());
      if (request.limit) params.append('limit', request.limit.toString());
      if (request.surveyId) params.append('surveyId', request.surveyId);
      if (request.q) params.append('q', request.q);
      if (request.startAt) params.append('startAt', request.startAt);
      if (request.endAt) params.append('endAt', request.endAt);

      const response: AxiosResponse<GHLGetSurveySubmissionsResponse> = await this.axiosInstance.get(
        `/locations/${locationId}/surveys/submissions?${params.toString()}`
      );

      return this.wrapResponse(response.data);
    } catch (error) {
      return this.handleApiError(error as AxiosError<GHLErrorResponse>);
    }
  }

  // ===== STORE API METHODS =====

  /**
   * SHIPPING ZONES API METHODS
   */

  /**
   * Create a new shipping zone
   * POST /store/shipping-zone
   */
  async createShippingZone(zoneData: GHLCreateShippingZoneRequest): Promise<GHLApiResponse<GHLCreateShippingZoneResponse>> {
    try {
      const payload = {
        ...zoneData,
        altId: zoneData.altId || this.config.locationId,
        altType: 'location' as const
      };

      const response: AxiosResponse<GHLCreateShippingZoneResponse> = await this.axiosInstance.post(
        '/store/shipping-zone',
        payload
      );

      return this.wrapResponse(response.data);
    } catch (error) {
      return this.handleApiError(error as AxiosError<GHLErrorResponse>);
    }
  }

  /**
   * List all shipping zones
   * GET /store/shipping-zone
   */
  async listShippingZones(params: GHLGetShippingZonesRequest): Promise<GHLApiResponse<GHLListShippingZonesResponse>> {
    try {
      const altId = params.altId || this.config.locationId;
      const queryParams = new URLSearchParams({
        altId,
        altType: 'location'
      });
      
      if (params.limit) queryParams.append('limit', params.limit.toString());
      if (params.offset) queryParams.append('offset', params.offset.toString());
      if (params.withShippingRate !== undefined) queryParams.append('withShippingRate', params.withShippingRate.toString());

      const response: AxiosResponse<GHLListShippingZonesResponse> = await this.axiosInstance.get(
        `/store/shipping-zone?${queryParams.toString()}`
      );

      return this.wrapResponse(response.data);
    } catch (error) {
      return this.handleApiError(error as AxiosError<GHLErrorResponse>);
    }
  }

  /**
   * Get a specific shipping zone by ID
   * GET /store/shipping-zone/{shippingZoneId}
   */
  async getShippingZone(shippingZoneId: string, params: Omit<GHLGetShippingZonesRequest, 'limit' | 'offset'>): Promise<GHLApiResponse<GHLGetShippingZoneResponse>> {
    try {
      const altId = params.altId || this.config.locationId;
      const queryParams = new URLSearchParams({
        altId,
        altType: 'location'
      });
      
      if (params.withShippingRate !== undefined) queryParams.append('withShippingRate', params.withShippingRate.toString());

      const response: AxiosResponse<GHLGetShippingZoneResponse> = await this.axiosInstance.get(
        `/store/shipping-zone/${shippingZoneId}?${queryParams.toString()}`
      );

      return this.wrapResponse(response.data);
    } catch (error) {
      return this.handleApiError(error as AxiosError<GHLErrorResponse>);
    }
  }

  /**
   * Update a shipping zone
   * PUT /store/shipping-zone/{shippingZoneId}
   */
  async updateShippingZone(shippingZoneId: string, updateData: GHLUpdateShippingZoneRequest): Promise<GHLApiResponse<GHLUpdateShippingZoneResponse>> {
    try {
      const payload = {
        ...updateData,
        altId: updateData.altId || this.config.locationId,
        altType: 'location' as const
      };

      const response: AxiosResponse<GHLUpdateShippingZoneResponse> = await this.axiosInstance.put(
        `/store/shipping-zone/${shippingZoneId}`,
        payload
      );

      return this.wrapResponse(response.data);
    } catch (error) {
      return this.handleApiError(error as AxiosError<GHLErrorResponse>);
    }
  }

  /**
   * Delete a shipping zone
   * DELETE /store/shipping-zone/{shippingZoneId}
   */
  async deleteShippingZone(shippingZoneId: string, params: GHLDeleteShippingZoneRequest): Promise<GHLApiResponse<GHLDeleteShippingZoneResponse>> {
    try {
      const altId = params.altId || this.config.locationId;
      const queryParams = new URLSearchParams({
        altId,
        altType: 'location'
      });

      const response: AxiosResponse<GHLDeleteShippingZoneResponse> = await this.axiosInstance.delete(
        `/store/shipping-zone/${shippingZoneId}?${queryParams.toString()}`
      );

      return this.wrapResponse(response.data);
    } catch (error) {
      return this.handleApiError(error as AxiosError<GHLErrorResponse>);
    }
  }

  /**
   * SHIPPING RATES API METHODS
   */

  /**
   * Get available shipping rates for an order
   * POST /store/shipping-zone/shipping-rates
   */
  async getAvailableShippingRates(rateData: GHLGetAvailableShippingRatesRequest): Promise<GHLApiResponse<GHLGetAvailableShippingRatesResponse>> {
    try {
      const payload = {
        ...rateData,
        altId: rateData.altId || this.config.locationId,
        altType: 'location' as const
      };

      const response: AxiosResponse<GHLGetAvailableShippingRatesResponse> = await this.axiosInstance.post(
        '/store/shipping-zone/shipping-rates',
        payload
      );

      return this.wrapResponse(response.data);
    } catch (error) {
      return this.handleApiError(error as AxiosError<GHLErrorResponse>);
    }
  }

  /**
   * Create a new shipping rate for a zone
   * POST /store/shipping-zone/{shippingZoneId}/shipping-rate
   */
  async createShippingRate(shippingZoneId: string, rateData: GHLCreateShippingRateRequest): Promise<GHLApiResponse<GHLCreateShippingRateResponse>> {
    try {
      const payload = {
        ...rateData,
        altId: rateData.altId || this.config.locationId,
        altType: 'location' as const
      };

      const response: AxiosResponse<GHLCreateShippingRateResponse> = await this.axiosInstance.post(
        `/store/shipping-zone/${shippingZoneId}/shipping-rate`,
        payload
      );

      return this.wrapResponse(response.data);
    } catch (error) {
      return this.handleApiError(error as AxiosError<GHLErrorResponse>);
    }
  }

  /**
   * List shipping rates for a zone
   * GET /store/shipping-zone/{shippingZoneId}/shipping-rate
   */
  async listShippingRates(shippingZoneId: string, params: GHLGetShippingRatesRequest): Promise<GHLApiResponse<GHLListShippingRatesResponse>> {
    try {
      const altId = params.altId || this.config.locationId;
      const queryParams = new URLSearchParams({
        altId,
        altType: 'location'
      });
      
      if (params.limit) queryParams.append('limit', params.limit.toString());
      if (params.offset) queryParams.append('offset', params.offset.toString());

      const response: AxiosResponse<GHLListShippingRatesResponse> = await this.axiosInstance.get(
        `/store/shipping-zone/${shippingZoneId}/shipping-rate?${queryParams.toString()}`
      );

      return this.wrapResponse(response.data);
    } catch (error) {
      return this.handleApiError(error as AxiosError<GHLErrorResponse>);
    }
  }

  /**
   * Get a specific shipping rate
   * GET /store/shipping-zone/{shippingZoneId}/shipping-rate/{shippingRateId}
   */
  async getShippingRate(shippingZoneId: string, shippingRateId: string, params: Omit<GHLGetShippingRatesRequest, 'limit' | 'offset'>): Promise<GHLApiResponse<GHLGetShippingRateResponse>> {
    try {
      const altId = params.altId || this.config.locationId;
      const queryParams = new URLSearchParams({
        altId,
        altType: 'location'
      });

      const response: AxiosResponse<GHLGetShippingRateResponse> = await this.axiosInstance.get(
        `/store/shipping-zone/${shippingZoneId}/shipping-rate/${shippingRateId}?${queryParams.toString()}`
      );

      return this.wrapResponse(response.data);
    } catch (error) {
      return this.handleApiError(error as AxiosError<GHLErrorResponse>);
    }
  }

  /**
   * Update a shipping rate
   * PUT /store/shipping-zone/{shippingZoneId}/shipping-rate/{shippingRateId}
   */
  async updateShippingRate(shippingZoneId: string, shippingRateId: string, updateData: GHLUpdateShippingRateRequest): Promise<GHLApiResponse<GHLUpdateShippingRateResponse>> {
    try {
      const payload = {
        ...updateData,
        altId: updateData.altId || this.config.locationId,
        altType: 'location' as const
      };

      const response: AxiosResponse<GHLUpdateShippingRateResponse> = await this.axiosInstance.put(
        `/store/shipping-zone/${shippingZoneId}/shipping-rate/${shippingRateId}`,
        payload
      );

      return this.wrapResponse(response.data);
    } catch (error) {
      return this.handleApiError(error as AxiosError<GHLErrorResponse>);
    }
  }

  /**
   * Delete a shipping rate
   * DELETE /store/shipping-zone/{shippingZoneId}/shipping-rate/{shippingRateId}
   */
  async deleteShippingRate(shippingZoneId: string, shippingRateId: string, params: GHLDeleteShippingRateRequest): Promise<GHLApiResponse<GHLDeleteShippingRateResponse>> {
    try {
      const altId = params.altId || this.config.locationId;
      const queryParams = new URLSearchParams({
        altId,
        altType: 'location'
      });

      const response: AxiosResponse<GHLDeleteShippingRateResponse> = await this.axiosInstance.delete(
        `/store/shipping-zone/${shippingZoneId}/shipping-rate/${shippingRateId}?${queryParams.toString()}`
      );

      return this.wrapResponse(response.data);
    } catch (error) {
      return this.handleApiError(error as AxiosError<GHLErrorResponse>);
    }
  }

  /**
   * SHIPPING CARRIERS API METHODS
   */

  /**
   * Create a new shipping carrier
   * POST /store/shipping-carrier
   */
  async createShippingCarrier(carrierData: GHLCreateShippingCarrierRequest): Promise<GHLApiResponse<GHLCreateShippingCarrierResponse>> {
    try {
      const payload = {
        ...carrierData,
        altId: carrierData.altId || this.config.locationId,
        altType: 'location' as const
      };

      const response: AxiosResponse<GHLCreateShippingCarrierResponse> = await this.axiosInstance.post(
        '/store/shipping-carrier',
        payload
      );

      return this.wrapResponse(response.data);
    } catch (error) {
      return this.handleApiError(error as AxiosError<GHLErrorResponse>);
    }
  }

  /**
   * List all shipping carriers
   * GET /store/shipping-carrier
   */
  async listShippingCarriers(params: GHLGetShippingCarriersRequest): Promise<GHLApiResponse<GHLListShippingCarriersResponse>> {
    try {
      const altId = params.altId || this.config.locationId;
      const queryParams = new URLSearchParams({
        altId,
        altType: 'location'
      });

      const response: AxiosResponse<GHLListShippingCarriersResponse> = await this.axiosInstance.get(
        `/store/shipping-carrier?${queryParams.toString()}`
      );

      return this.wrapResponse(response.data);
    } catch (error) {
      return this.handleApiError(error as AxiosError<GHLErrorResponse>);
    }
  }

  /**
   * Get a specific shipping carrier by ID
   * GET /store/shipping-carrier/{shippingCarrierId}
   */
  async getShippingCarrier(shippingCarrierId: string, params: GHLGetShippingCarriersRequest): Promise<GHLApiResponse<GHLGetShippingCarrierResponse>> {
    try {
      const altId = params.altId || this.config.locationId;
      const queryParams = new URLSearchParams({
        altId,
        altType: 'location'
      });

      const response: AxiosResponse<GHLGetShippingCarrierResponse> = await this.axiosInstance.get(
        `/store/shipping-carrier/${shippingCarrierId}?${queryParams.toString()}`
      );

      return this.wrapResponse(response.data);
    } catch (error) {
      return this.handleApiError(error as AxiosError<GHLErrorResponse>);
    }
  }

  /**
   * Update a shipping carrier
   * PUT /store/shipping-carrier/{shippingCarrierId}
   */
  async updateShippingCarrier(shippingCarrierId: string, updateData: GHLUpdateShippingCarrierRequest): Promise<GHLApiResponse<GHLUpdateShippingCarrierResponse>> {
    try {
      const payload = {
        ...updateData,
        altId: updateData.altId || this.config.locationId,
        altType: 'location' as const
      };

      const response: AxiosResponse<GHLUpdateShippingCarrierResponse> = await this.axiosInstance.put(
        `/store/shipping-carrier/${shippingCarrierId}`,
        payload
      );

      return this.wrapResponse(response.data);
    } catch (error) {
      return this.handleApiError(error as AxiosError<GHLErrorResponse>);
    }
  }

  /**
   * Delete a shipping carrier
   * DELETE /store/shipping-carrier/{shippingCarrierId}
   */
  async deleteShippingCarrier(shippingCarrierId: string, params: GHLDeleteShippingCarrierRequest): Promise<GHLApiResponse<GHLDeleteShippingCarrierResponse>> {
    try {
      const altId = params.altId || this.config.locationId;
      const queryParams = new URLSearchParams({
        altId,
        altType: 'location'
      });

      const response: AxiosResponse<GHLDeleteShippingCarrierResponse> = await this.axiosInstance.delete(
        `/store/shipping-carrier/${shippingCarrierId}?${queryParams.toString()}`
      );

      return this.wrapResponse(response.data);
    } catch (error) {
      return this.handleApiError(error as AxiosError<GHLErrorResponse>);
    }
  }

  /**
   * STORE SETTINGS API METHODS
   */

  /**
   * Create or update store settings
   * POST /store/store-setting
   */
  async createStoreSetting(settingData: GHLCreateStoreSettingRequest): Promise<GHLApiResponse<GHLCreateStoreSettingResponse>> {
    try {
      const payload = {
        ...settingData,
        altId: settingData.altId || this.config.locationId,
        altType: 'location' as const
      };

      const response: AxiosResponse<GHLCreateStoreSettingResponse> = await this.axiosInstance.post(
        '/store/store-setting',
        payload
      );

      return this.wrapResponse(response.data);
    } catch (error) {
      return this.handleApiError(error as AxiosError<GHLErrorResponse>);
    }
  }

  /**
   * Get store settings
   * GET /store/store-setting
   */
  async getStoreSetting(params: GHLGetStoreSettingRequest): Promise<GHLApiResponse<GHLGetStoreSettingResponse>> {
    try {
      const altId = params.altId || this.config.locationId;
      const queryParams = new URLSearchParams({
        altId,
        altType: 'location'
      });

      const response: AxiosResponse<GHLGetStoreSettingResponse> = await this.axiosInstance.get(
        `/store/store-setting?${queryParams.toString()}`
      );

      return this.wrapResponse(response.data);
    } catch (error) {
      return this.handleApiError(error as AxiosError<GHLErrorResponse>);
    }
  }

  /**
   * PRODUCTS API METHODS
   */

  /**
   * Create a new product
   * POST /products/
   */
  async createProduct(productData: GHLCreateProductRequest): Promise<GHLApiResponse<GHLCreateProductResponse>> {
    try {
      const response: AxiosResponse<GHLCreateProductResponse> = await this.axiosInstance.post(
        '/products/',
        productData
      );

      return this.wrapResponse(response.data);
    } catch (error) {
      return this.handleApiError(error as AxiosError<GHLErrorResponse>);
    }
  }

  /**
   * Update a product by ID
   * PUT /products/{productId}
   */
  async updateProduct(productId: string, updateData: GHLUpdateProductRequest): Promise<GHLApiResponse<GHLUpdateProductResponse>> {
    try {
      const response: AxiosResponse<GHLUpdateProductResponse> = await this.axiosInstance.put(
        `/products/${productId}`,
        updateData
      );

      return this.wrapResponse(response.data);
    } catch (error) {
      return this.handleApiError(error as AxiosError<GHLErrorResponse>);
    }
  }

  /**
   * Get a product by ID
   * GET /products/{productId}
   */
  async getProduct(productId: string, locationId?: string): Promise<GHLApiResponse<GHLGetProductResponse>> {
    try {
      const queryParams = new URLSearchParams({
        locationId: locationId || this.config.locationId
      });

      const response: AxiosResponse<GHLGetProductResponse> = await this.axiosInstance.get(
        `/products/${productId}?${queryParams.toString()}`
      );

      return this.wrapResponse(response.data);
    } catch (error) {
      return this.handleApiError(error as AxiosError<GHLErrorResponse>);
    }
  }

  /**
   * List products
   * GET /products/
   */
  async listProducts(params: GHLListProductsRequest): Promise<GHLApiResponse<GHLListProductsResponse>> {
    try {
      const queryParams = new URLSearchParams({
        locationId: params.locationId || this.config.locationId
      });

      if (params.limit) queryParams.append('limit', params.limit.toString());
      if (params.offset) queryParams.append('offset', params.offset.toString());
      if (params.search) queryParams.append('search', params.search);
      if (params.collectionIds?.length) queryParams.append('collectionIds', params.collectionIds.join(','));
      if (params.collectionSlug) queryParams.append('collectionSlug', params.collectionSlug);
      if (params.expand?.length) params.expand.forEach(item => queryParams.append('expand', item));
      if (params.productIds?.length) params.productIds.forEach(id => queryParams.append('productIds', id));
      if (params.storeId) queryParams.append('storeId', params.storeId);
      if (params.includedInStore !== undefined) queryParams.append('includedInStore', params.includedInStore.toString());
      if (params.availableInStore !== undefined) queryParams.append('availableInStore', params.availableInStore.toString());
      if (params.sortOrder) queryParams.append('sortOrder', params.sortOrder);

      const response: AxiosResponse<GHLListProductsResponse> = await this.axiosInstance.get(
        `/products/?${queryParams.toString()}`
      );

      return this.wrapResponse(response.data);
    } catch (error) {
      return this.handleApiError(error as AxiosError<GHLErrorResponse>);
    }
  }

  /**
   * Delete a product by ID
   * DELETE /products/{productId}
   */
  async deleteProduct(productId: string, locationId?: string): Promise<GHLApiResponse<GHLDeleteProductResponse>> {
    try {
      const queryParams = new URLSearchParams({
        locationId: locationId || this.config.locationId
      });

      const response: AxiosResponse<GHLDeleteProductResponse> = await this.axiosInstance.delete(
        `/products/${productId}?${queryParams.toString()}`
      );

      return this.wrapResponse(response.data);
    } catch (error) {
      return this.handleApiError(error as AxiosError<GHLErrorResponse>);
    }
  }

  /**
   * Bulk update products
   * POST /products/bulk-update
   */
  async bulkUpdateProducts(updateData: GHLBulkUpdateRequest): Promise<GHLApiResponse<GHLBulkUpdateResponse>> {
    try {
      const payload = {
        ...updateData,
        altId: updateData.altId || this.config.locationId,
        altType: 'location' as const
      };

      const response: AxiosResponse<GHLBulkUpdateResponse> = await this.axiosInstance.post(
        '/products/bulk-update',
        payload
      );

      return this.wrapResponse(response.data);
    } catch (error) {
      return this.handleApiError(error as AxiosError<GHLErrorResponse>);
    }
  }

  /**
   * Create a price for a product
   * POST /products/{productId}/price
   */
  async createPrice(productId: string, priceData: GHLCreatePriceRequest): Promise<GHLApiResponse<GHLCreatePriceResponse>> {
    try {
      const payload = {
        ...priceData,
        locationId: priceData.locationId || this.config.locationId
      };

      const response: AxiosResponse<GHLCreatePriceResponse> = await this.axiosInstance.post(
        `/products/${productId}/price`,
        payload
      );

      return this.wrapResponse(response.data);
    } catch (error) {
      return this.handleApiError(error as AxiosError<GHLErrorResponse>);
    }
  }

  /**
   * Update a price by ID
   * PUT /products/{productId}/price/{priceId}
   */
  async updatePrice(productId: string, priceId: string, updateData: GHLUpdatePriceRequest): Promise<GHLApiResponse<GHLUpdatePriceResponse>> {
    try {
      const payload = {
        ...updateData,
        locationId: updateData.locationId || this.config.locationId
      };

      const response: AxiosResponse<GHLUpdatePriceResponse> = await this.axiosInstance.put(
        `/products/${productId}/price/${priceId}`,
        payload
      );

      return this.wrapResponse(response.data);
    } catch (error) {
      return this.handleApiError(error as AxiosError<GHLErrorResponse>);
    }
  }

  /**
   * Get a price by ID
   * GET /products/{productId}/price/{priceId}
   */
  async getPrice(productId: string, priceId: string, locationId?: string): Promise<GHLApiResponse<GHLGetPriceResponse>> {
    try {
      const queryParams = new URLSearchParams({
        locationId: locationId || this.config.locationId
      });

      const response: AxiosResponse<GHLGetPriceResponse> = await this.axiosInstance.get(
        `/products/${productId}/price/${priceId}?${queryParams.toString()}`
      );

      return this.wrapResponse(response.data);
    } catch (error) {
      return this.handleApiError(error as AxiosError<GHLErrorResponse>);
    }
  }

  /**
   * List prices for a product
   * GET /products/{productId}/price
   */
  async listPrices(productId: string, params: GHLListPricesRequest): Promise<GHLApiResponse<GHLListPricesResponse>> {
    try {
      const queryParams = new URLSearchParams({
        locationId: params.locationId || this.config.locationId
      });

      if (params.limit) queryParams.append('limit', params.limit.toString());
      if (params.offset) queryParams.append('offset', params.offset.toString());
      if (params.ids) queryParams.append('ids', params.ids);

      const response: AxiosResponse<GHLListPricesResponse> = await this.axiosInstance.get(
        `/products/${productId}/price?${queryParams.toString()}`
      );

      return this.wrapResponse(response.data);
    } catch (error) {
      return this.handleApiError(error as AxiosError<GHLErrorResponse>);
    }
  }

  /**
   * Delete a price by ID
   * DELETE /products/{productId}/price/{priceId}
   */
  async deletePrice(productId: string, priceId: string, locationId?: string): Promise<GHLApiResponse<GHLDeletePriceResponse>> {
    try {
      const queryParams = new URLSearchParams({
        locationId: locationId || this.config.locationId
      });

      const response: AxiosResponse<GHLDeletePriceResponse> = await this.axiosInstance.delete(
        `/products/${productId}/price/${priceId}?${queryParams.toString()}`
      );

      return this.wrapResponse(response.data);
    } catch (error) {
      return this.handleApiError(error as AxiosError<GHLErrorResponse>);
    }
  }

  /**
   * List inventory
   * GET /products/inventory
   */
  async listInventory(params: GHLListInventoryRequest): Promise<GHLApiResponse<GHLListInventoryResponse>> {
    try {
      const queryParams = new URLSearchParams({
        altId: params.altId || this.config.locationId,
        altType: 'location'
      });

      if (params.limit) queryParams.append('limit', params.limit.toString());
      if (params.offset) queryParams.append('offset', params.offset.toString());
      if (params.search) queryParams.append('search', params.search);

      const response: AxiosResponse<GHLListInventoryResponse> = await this.axiosInstance.get(
        `/products/inventory?${queryParams.toString()}`
      );

      return this.wrapResponse(response.data);
    } catch (error) {
      return this.handleApiError(error as AxiosError<GHLErrorResponse>);
    }
  }

  /**
   * Update inventory
   * POST /products/inventory
   */
  async updateInventory(updateData: GHLUpdateInventoryRequest): Promise<GHLApiResponse<GHLUpdateInventoryResponse>> {
    try {
      const payload = {
        ...updateData,
        altId: updateData.altId || this.config.locationId,
        altType: 'location' as const
      };

      const response: AxiosResponse<GHLUpdateInventoryResponse> = await this.axiosInstance.post(
        '/products/inventory',
        payload
      );

      return this.wrapResponse(response.data);
    } catch (error) {
      return this.handleApiError(error as AxiosError<GHLErrorResponse>);
    }
  }

  /**
   * Get product store stats
   * GET /products/store/{storeId}/stats
   */
  async getProductStoreStats(storeId: string, params: GHLGetProductStoreStatsRequest): Promise<GHLApiResponse<GHLGetProductStoreStatsResponse>> {
    try {
      const queryParams = new URLSearchParams({
        altId: params.altId || this.config.locationId,
        altType: 'location'
      });

      if (params.search) queryParams.append('search', params.search);
      if (params.collectionIds) queryParams.append('collectionIds', params.collectionIds);

      const response: AxiosResponse<GHLGetProductStoreStatsResponse> = await this.axiosInstance.get(
        `/products/store/${storeId}/stats?${queryParams.toString()}`
      );

      return this.wrapResponse(response.data);
    } catch (error) {
      return this.handleApiError(error as AxiosError<GHLErrorResponse>);
    }
  }

  /**
   * Update product store status
   * POST /products/store/{storeId}
   */
  async updateProductStore(storeId: string, updateData: GHLUpdateProductStoreRequest): Promise<GHLApiResponse<GHLUpdateProductStoreResponse>> {
    try {
      const response: AxiosResponse<GHLUpdateProductStoreResponse> = await this.axiosInstance.post(
        `/products/store/${storeId}`,
        updateData
      );

      return this.wrapResponse(response.data);
    } catch (error) {
      return this.handleApiError(error as AxiosError<GHLErrorResponse>);
    }
  }

  /**
   * Create a product collection
   * POST /products/collections
   */
  async createProductCollection(collectionData: GHLCreateProductCollectionRequest): Promise<GHLApiResponse<GHLCreateCollectionResponse>> {
    try {
      const payload = {
        ...collectionData,
        altId: collectionData.altId || this.config.locationId,
        altType: 'location' as const
      };

      const response: AxiosResponse<GHLCreateCollectionResponse> = await this.axiosInstance.post(
        '/products/collections',
        payload
      );

      return this.wrapResponse(response.data);
    } catch (error) {
      return this.handleApiError(error as AxiosError<GHLErrorResponse>);
    }
  }

  /**
   * Update a product collection
   * PUT /products/collections/{collectionId}
   */
  async updateProductCollection(collectionId: string, updateData: GHLUpdateProductCollectionRequest): Promise<GHLApiResponse<GHLUpdateProductCollectionResponse>> {
    try {
      const payload = {
        ...updateData,
        altId: updateData.altId || this.config.locationId,
        altType: 'location' as const
      };

      const response: AxiosResponse<GHLUpdateProductCollectionResponse> = await this.axiosInstance.put(
        `/products/collections/${collectionId}`,
        payload
      );

      return this.wrapResponse(response.data);
    } catch (error) {
      return this.handleApiError(error as AxiosError<GHLErrorResponse>);
    }
  }

  /**
   * Get a product collection by ID
   * GET /products/collections/{collectionId}
   */
  async getProductCollection(collectionId: string): Promise<GHLApiResponse<GHLDefaultCollectionResponse>> {
    try {
      const response: AxiosResponse<GHLDefaultCollectionResponse> = await this.axiosInstance.get(
        `/products/collections/${collectionId}`
      );

      return this.wrapResponse(response.data);
    } catch (error) {
      return this.handleApiError(error as AxiosError<GHLErrorResponse>);
    }
  }

  /**
   * List product collections
   * GET /products/collections
   */
  async listProductCollections(params: GHLListProductCollectionsRequest): Promise<GHLApiResponse<GHLListCollectionResponse>> {
    try {
      const queryParams = new URLSearchParams({
        altId: params.altId || this.config.locationId,
        altType: 'location'
      });

      if (params.limit) queryParams.append('limit', params.limit.toString());
      if (params.offset) queryParams.append('offset', params.offset.toString());
      if (params.collectionIds) queryParams.append('collectionIds', params.collectionIds);
      if (params.name) queryParams.append('name', params.name);

      const response: AxiosResponse<GHLListCollectionResponse> = await this.axiosInstance.get(
        `/products/collections?${queryParams.toString()}`
      );

      return this.wrapResponse(response.data);
    } catch (error) {
      return this.handleApiError(error as AxiosError<GHLErrorResponse>);
    }
  }

  /**
   * Delete a product collection
   * DELETE /products/collections/{collectionId}
   */
  async deleteProductCollection(collectionId: string, params: GHLDeleteProductCollectionRequest): Promise<GHLApiResponse<GHLDeleteProductCollectionResponse>> {
    try {
      const queryParams = new URLSearchParams({
        altId: params.altId || this.config.locationId,
        altType: 'location'
      });

      const response: AxiosResponse<GHLDeleteProductCollectionResponse> = await this.axiosInstance.delete(
        `/products/collections/${collectionId}?${queryParams.toString()}`
      );

      return this.wrapResponse(response.data);
    } catch (error) {
      return this.handleApiError(error as AxiosError<GHLErrorResponse>);
    }
  }

  /**
   * List product reviews
   * GET /products/reviews
   */
  async listProductReviews(params: GHLListProductReviewsRequest): Promise<GHLApiResponse<GHLListProductReviewsResponse>> {
    try {
      const queryParams = new URLSearchParams({
        altId: params.altId || this.config.locationId,
        altType: 'location'
      });

      if (params.limit) queryParams.append('limit', params.limit.toString());
      if (params.offset) queryParams.append('offset', params.offset.toString());
      if (params.sortField) queryParams.append('sortField', params.sortField);
      if (params.sortOrder) queryParams.append('sortOrder', params.sortOrder);
      if (params.rating) queryParams.append('rating', params.rating.toString());
      if (params.startDate) queryParams.append('startDate', params.startDate);
      if (params.endDate) queryParams.append('endDate', params.endDate);
      if (params.productId) queryParams.append('productId', params.productId);
      if (params.storeId) queryParams.append('storeId', params.storeId);

      const response: AxiosResponse<GHLListProductReviewsResponse> = await this.axiosInstance.get(
        `/products/reviews?${queryParams.toString()}`
      );

      return this.wrapResponse(response.data);
    } catch (error) {
      return this.handleApiError(error as AxiosError<GHLErrorResponse>);
    }
  }

  /**
   * Get reviews count
   * GET /products/reviews/count
   */
  async getReviewsCount(params: GHLGetReviewsCountRequest): Promise<GHLApiResponse<GHLCountReviewsByStatusResponse>> {
    try {
      const queryParams = new URLSearchParams({
        altId: params.altId || this.config.locationId,
        altType: 'location'
      });

      if (params.rating) queryParams.append('rating', params.rating.toString());
      if (params.startDate) queryParams.append('startDate', params.startDate);
      if (params.endDate) queryParams.append('endDate', params.endDate);
      if (params.productId) queryParams.append('productId', params.productId);
      if (params.storeId) queryParams.append('storeId', params.storeId);

      const response: AxiosResponse<GHLCountReviewsByStatusResponse> = await this.axiosInstance.get(
        `/products/reviews/count?${queryParams.toString()}`
      );

      return this.wrapResponse(response.data);
    } catch (error) {
      return this.handleApiError(error as AxiosError<GHLErrorResponse>);
    }
  }

  /**
   * Update a product review
   * PUT /products/reviews/{reviewId}
   */
  async updateProductReview(reviewId: string, updateData: GHLUpdateProductReviewRequest): Promise<GHLApiResponse<GHLUpdateProductReviewsResponse>> {
    try {
      const payload = {
        ...updateData,
        altId: updateData.altId || this.config.locationId,
        altType: 'location' as const
      };

      const response: AxiosResponse<GHLUpdateProductReviewsResponse> = await this.axiosInstance.put(
        `/products/reviews/${reviewId}`,
        payload
      );

      return this.wrapResponse(response.data);
    } catch (error) {
      return this.handleApiError(error as AxiosError<GHLErrorResponse>);
    }
  }

  /**
   * Delete a product review
   * DELETE /products/reviews/{reviewId}
   */
  async deleteProductReview(reviewId: string, params: GHLDeleteProductReviewRequest): Promise<GHLApiResponse<GHLDeleteProductReviewResponse>> {
    try {
      const queryParams = new URLSearchParams({
        altId: params.altId || this.config.locationId,
        altType: 'location',
        productId: params.productId
      });

      const response: AxiosResponse<GHLDeleteProductReviewResponse> = await this.axiosInstance.delete(
        `/products/reviews/${reviewId}?${queryParams.toString()}`
      );

      return this.wrapResponse(response.data);
    } catch (error) {
      return this.handleApiError(error as AxiosError<GHLErrorResponse>);
    }
  }

  /**
   * Bulk update product reviews
   * POST /products/reviews/bulk-update
   */
  async bulkUpdateProductReviews(updateData: GHLBulkUpdateProductReviewsRequest): Promise<GHLApiResponse<GHLUpdateProductReviewsResponse>> {
    try {
      const payload = {
        ...updateData,
        altId: updateData.altId || this.config.locationId,
        altType: 'location' as const
      };

      const response: AxiosResponse<GHLUpdateProductReviewsResponse> = await this.axiosInstance.post(
        '/products/reviews/bulk-update',
        payload
      );

      return this.wrapResponse(response.data);
    } catch (error) {
      return this.handleApiError(error as AxiosError<GHLErrorResponse>);
    }
  }

  /**
   * PAYMENTS API METHODS
   */

  /**
   * Create white-label integration provider
   * POST /payments/integrations/provider/whitelabel
   */
  async createWhiteLabelIntegrationProvider(data: any): Promise<GHLApiResponse<any>> {
    try {
      const response: AxiosResponse<any> = await this.axiosInstance.post(
        '/payments/integrations/provider/whitelabel',
        data
      );

      return this.wrapResponse(response.data);
    } catch (error) {
      return this.handleApiError(error as AxiosError<GHLErrorResponse>);
    }
  }

  /**
   * List white-label integration providers
   * GET /payments/integrations/provider/whitelabel
   */
  async listWhiteLabelIntegrationProviders(params: Record<string, any>): Promise<GHLApiResponse<any>> {
    try {
      const queryParams = new URLSearchParams();
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          queryParams.append(key, value.toString());
        }
      });

      const response: AxiosResponse<any> = await this.axiosInstance.get(
        `/payments/integrations/provider/whitelabel?${queryParams.toString()}`
      );

      return this.wrapResponse(response.data);
    } catch (error) {
      return this.handleApiError(error as AxiosError<GHLErrorResponse>);
    }
  }

  /**
   * List orders
   * GET /payments/orders
   */
  async listOrders(params: Record<string, any>): Promise<GHLApiResponse<any>> {
    try {
      const queryParams = new URLSearchParams();
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          queryParams.append(key, value.toString());
        }
      });

      const response: AxiosResponse<any> = await this.axiosInstance.get(
        `/payments/orders?${queryParams.toString()}`
      );

      return this.wrapResponse(response.data);
    } catch (error) {
      return this.handleApiError(error as AxiosError<GHLErrorResponse>);
    }
  }

  /**
   * Get order by ID
   * GET /payments/orders/{orderId}
   */
  async getOrderById(orderId: string, params: Record<string, any>): Promise<GHLApiResponse<any>> {
    try {
      const queryParams = new URLSearchParams();
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined && value !== null && key !== 'orderId') {
          queryParams.append(key, value.toString());
        }
      });

      const response: AxiosResponse<any> = await this.axiosInstance.get(
        `/payments/orders/${orderId}?${queryParams.toString()}`
      );

      return this.wrapResponse(response.data);
    } catch (error) {
      return this.handleApiError(error as AxiosError<GHLErrorResponse>);
    }
  }

  /**
   * Create order fulfillment
   * POST /payments/orders/{orderId}/fulfillments
   */
  async createOrderFulfillment(orderId: string, data: any): Promise<GHLApiResponse<any>> {
    try {
      const response: AxiosResponse<any> = await this.axiosInstance.post(
        `/payments/orders/${orderId}/fulfillments`,
        data
      );

      return this.wrapResponse(response.data);
    } catch (error) {
      return this.handleApiError(error as AxiosError<GHLErrorResponse>);
    }
  }

  /**
   * List order fulfillments
   * GET /payments/orders/{orderId}/fulfillments
   */
  async listOrderFulfillments(orderId: string, params: Record<string, any>): Promise<GHLApiResponse<any>> {
    try {
      const queryParams = new URLSearchParams();
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined && value !== null && key !== 'orderId') {
          queryParams.append(key, value.toString());
        }
      });

      const response: AxiosResponse<any> = await this.axiosInstance.get(
        `/payments/orders/${orderId}/fulfillments?${queryParams.toString()}`
      );

      return this.wrapResponse(response.data);
    } catch (error) {
      return this.handleApiError(error as AxiosError<GHLErrorResponse>);
    }
  }

  /**
   * List transactions
   * GET /payments/transactions
   */
  async listTransactions(params: Record<string, any>): Promise<GHLApiResponse<any>> {
    try {
      const queryParams = new URLSearchParams();
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          queryParams.append(key, value.toString());
        }
      });

      const response: AxiosResponse<any> = await this.axiosInstance.get(
        `/payments/transactions?${queryParams.toString()}`
      );

      return this.wrapResponse(response.data);
    } catch (error) {
      return this.handleApiError(error as AxiosError<GHLErrorResponse>);
    }
  }

  /**
   * Get transaction by ID
   * GET /payments/transactions/{transactionId}
   */
  async getTransactionById(transactionId: string, params: Record<string, any>): Promise<GHLApiResponse<any>> {
    try {
      const queryParams = new URLSearchParams();
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined && value !== null && key !== 'transactionId') {
          queryParams.append(key, value.toString());
        }
      });

      const response: AxiosResponse<any> = await this.axiosInstance.get(
        `/payments/transactions/${transactionId}?${queryParams.toString()}`
      );

      return this.wrapResponse(response.data);
    } catch (error) {
      return this.handleApiError(error as AxiosError<GHLErrorResponse>);
    }
  }

  /**
   * List subscriptions
   * GET /payments/subscriptions
   */
  async listSubscriptions(params: Record<string, any>): Promise<GHLApiResponse<any>> {
    try {
      const queryParams = new URLSearchParams();
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          queryParams.append(key, value.toString());
        }
      });

      const response: AxiosResponse<any> = await this.axiosInstance.get(
        `/payments/subscriptions?${queryParams.toString()}`
      );

      return this.wrapResponse(response.data);
    } catch (error) {
      return this.handleApiError(error as AxiosError<GHLErrorResponse>);
    }
  }

  /**
   * Get subscription by ID
   * GET /payments/subscriptions/{subscriptionId}
   */
  async getSubscriptionById(subscriptionId: string, params: Record<string, any>): Promise<GHLApiResponse<any>> {
    try {
      const queryParams = new URLSearchParams();
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined && value !== null && key !== 'subscriptionId') {
          queryParams.append(key, value.toString());
        }
      });

      const response: AxiosResponse<any> = await this.axiosInstance.get(
        `/payments/subscriptions/${subscriptionId}?${queryParams.toString()}`
      );

      return this.wrapResponse(response.data);
    } catch (error) {
      return this.handleApiError(error as AxiosError<GHLErrorResponse>);
    }
  }

  /**
   * List coupons
   * GET /payments/coupon/list
   */
  async listCoupons(params: Record<string, any>): Promise<GHLApiResponse<any>> {
    try {
      const queryParams = new URLSearchParams();
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          queryParams.append(key, value.toString());
        }
      });

      const response: AxiosResponse<any> = await this.axiosInstance.get(
        `/payments/coupon/list?${queryParams.toString()}`
      );

      return this.wrapResponse(response.data);
    } catch (error) {
      return this.handleApiError(error as AxiosError<GHLErrorResponse>);
    }
  }

  /**
   * Create coupon
   * POST /payments/coupon
   */
  async createCoupon(data: any): Promise<GHLApiResponse<any>> {
    try {
      const response: AxiosResponse<any> = await this.axiosInstance.post(
        '/payments/coupon',
        data
      );

      return this.wrapResponse(response.data);
    } catch (error) {
      return this.handleApiError(error as AxiosError<GHLErrorResponse>);
    }
  }

  /**
   * Update coupon
   * PUT /payments/coupon
   */
  async updateCoupon(data: any): Promise<GHLApiResponse<any>> {
    try {
      const response: AxiosResponse<any> = await this.axiosInstance.put(
        '/payments/coupon',
        data
      );

      return this.wrapResponse(response.data);
    } catch (error) {
      return this.handleApiError(error as AxiosError<GHLErrorResponse>);
    }
  }

  /**
   * Delete coupon
   * DELETE /payments/coupon
   */
  async deleteCoupon(data: any): Promise<GHLApiResponse<any>> {
    try {
      const response: AxiosResponse<any> = await this.axiosInstance.delete(
        '/payments/coupon',
        { data }
      );

      return this.wrapResponse(response.data);
    } catch (error) {
      return this.handleApiError(error as AxiosError<GHLErrorResponse>);
    }
  }

  /**
   * Get coupon
   * GET /payments/coupon
   */
  async getCoupon(params: Record<string, any>): Promise<GHLApiResponse<any>> {
    try {
      const queryParams = new URLSearchParams();
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          queryParams.append(key, value.toString());
        }
      });

      const response: AxiosResponse<any> = await this.axiosInstance.get(
        `/payments/coupon?${queryParams.toString()}`
      );

      return this.wrapResponse(response.data);
    } catch (error) {
      return this.handleApiError(error as AxiosError<GHLErrorResponse>);
    }
  }

  /**
   * Create custom provider integration
   * POST /payments/custom-provider/provider
   */
  async createCustomProviderIntegration(locationId: string, data: any): Promise<GHLApiResponse<any>> {
    try {
      const queryParams = new URLSearchParams({ locationId });

      const response: AxiosResponse<any> = await this.axiosInstance.post(
        `/payments/custom-provider/provider?${queryParams.toString()}`,
        data
      );

      return this.wrapResponse(response.data);
    } catch (error) {
      return this.handleApiError(error as AxiosError<GHLErrorResponse>);
    }
  }

  /**
   * Delete custom provider integration
   * DELETE /payments/custom-provider/provider
   */
  async deleteCustomProviderIntegration(locationId: string): Promise<GHLApiResponse<any>> {
    try {
      const queryParams = new URLSearchParams({ locationId });

      const response: AxiosResponse<any> = await this.axiosInstance.delete(
        `/payments/custom-provider/provider?${queryParams.toString()}`
      );

      return this.wrapResponse(response.data);
    } catch (error) {
      return this.handleApiError(error as AxiosError<GHLErrorResponse>);
    }
  }

  /**
   * Get custom provider config
   * GET /payments/custom-provider/connect
   */
  async getCustomProviderConfig(locationId: string): Promise<GHLApiResponse<any>> {
    try {
      const queryParams = new URLSearchParams({ locationId });

      const response: AxiosResponse<any> = await this.axiosInstance.get(
        `/payments/custom-provider/connect?${queryParams.toString()}`
      );

      return this.wrapResponse(response.data);
    } catch (error) {
      return this.handleApiError(error as AxiosError<GHLErrorResponse>);
    }
  }

  /**
   * Create custom provider config
   * POST /payments/custom-provider/connect
   */
  async createCustomProviderConfig(locationId: string, data: any): Promise<GHLApiResponse<any>> {
    try {
      const queryParams = new URLSearchParams({ locationId });

      const response: AxiosResponse<any> = await this.axiosInstance.post(
        `/payments/custom-provider/connect?${queryParams.toString()}`,
        data
      );

      return this.wrapResponse(response.data);
    } catch (error) {
      return this.handleApiError(error as AxiosError<GHLErrorResponse>);
    }
  }

  /**
   * Disconnect custom provider config
   * POST /payments/custom-provider/disconnect
   */
  async disconnectCustomProviderConfig(locationId: string, data: any): Promise<GHLApiResponse<any>> {
    try {
      const queryParams = new URLSearchParams({ locationId });

      const response: AxiosResponse<any> = await this.axiosInstance.post(
        `/payments/custom-provider/disconnect?${queryParams.toString()}`,
        data
      );

      return this.wrapResponse(response.data);
    } catch (error) {
      return this.handleApiError(error as AxiosError<GHLErrorResponse>);
    }
  }

  // =============================================================================
  // INVOICES API METHODS
  // =============================================================================

  /**
   * Create invoice template
   * POST /invoices/template
   */
  async createInvoiceTemplate(templateData: CreateInvoiceTemplateDto): Promise<GHLApiResponse<CreateInvoiceTemplateResponseDto>> {
    try {
      const payload = {
        ...templateData,
        altId: templateData.altId || this.config.locationId,
        altType: 'location' as const
      };

      const response: AxiosResponse<CreateInvoiceTemplateResponseDto> = await this.axiosInstance.post(
        '/invoices/template',
        payload
      );

      return this.wrapResponse(response.data);
    } catch (error) {
      return this.handleApiError(error as AxiosError<GHLErrorResponse>);
    }
  }

  /**
   * List invoice templates
   * GET /invoices/template
   */
  async listInvoiceTemplates(params?: {
    altId?: string;
    altType?: 'location';
    status?: string;
    startAt?: string;
    endAt?: string;
    search?: string;
    paymentMode?: 'default' | 'live' | 'test';
    limit: string;
    offset: string;
  }): Promise<GHLApiResponse<ListTemplatesResponse>> {
    try {
      const queryParams = {
        altId: params?.altId || this.config.locationId,
        altType: 'location' as const,
        limit: params?.limit || '10',
        offset: params?.offset || '0',
        ...(params?.status && { status: params.status }),
        ...(params?.startAt && { startAt: params.startAt }),
        ...(params?.endAt && { endAt: params.endAt }),
        ...(params?.search && { search: params.search }),
        ...(params?.paymentMode && { paymentMode: params.paymentMode })
      };

      const response: AxiosResponse<ListTemplatesResponse> = await this.axiosInstance.get(
        '/invoices/template',
        { params: queryParams }
      );

      return this.wrapResponse(response.data);
    } catch (error) {
      return this.handleApiError(error as AxiosError<GHLErrorResponse>);
    }
  }

  /**
   * Get invoice template by ID
   * GET /invoices/template/{templateId}
   */
  async getInvoiceTemplate(templateId: string, params?: {
    altId?: string;
    altType?: 'location';
  }): Promise<GHLApiResponse<InvoiceTemplate>> {
    try {
      const queryParams = {
        altId: params?.altId || this.config.locationId,
        altType: 'location' as const
      };

      const response: AxiosResponse<InvoiceTemplate> = await this.axiosInstance.get(
        `/invoices/template/${templateId}`,
        { params: queryParams }
      );

      return this.wrapResponse(response.data);
    } catch (error) {
      return this.handleApiError(error as AxiosError<GHLErrorResponse>);
    }
  }

  /**
   * Update invoice template
   * PUT /invoices/template/{templateId}
   */
  async updateInvoiceTemplate(templateId: string, templateData: UpdateInvoiceTemplateDto): Promise<GHLApiResponse<UpdateInvoiceTemplateResponseDto>> {
    try {
      const payload = {
        ...templateData,
        altId: templateData.altId || this.config.locationId,
        altType: 'location' as const
      };

      const response: AxiosResponse<UpdateInvoiceTemplateResponseDto> = await this.axiosInstance.put(
        `/invoices/template/${templateId}`,
        payload
      );

      return this.wrapResponse(response.data);
    } catch (error) {
      return this.handleApiError(error as AxiosError<GHLErrorResponse>);
    }
  }

  /**
   * Delete invoice template
   * DELETE /invoices/template/{templateId}
   */
  async deleteInvoiceTemplate(templateId: string, params?: {
    altId?: string;
    altType?: 'location';
  }): Promise<GHLApiResponse<DeleteInvoiceTemplateResponseDto>> {
    try {
      const queryParams = {
        altId: params?.altId || this.config.locationId,
        altType: 'location' as const
      };

      const response: AxiosResponse<DeleteInvoiceTemplateResponseDto> = await this.axiosInstance.delete(
        `/invoices/template/${templateId}`,
        { params: queryParams }
      );

      return this.wrapResponse(response.data);
    } catch (error) {
      return this.handleApiError(error as AxiosError<GHLErrorResponse>);
    }
  }

  /**
   * Update invoice template late fees configuration
   * PATCH /invoices/template/{templateId}/late-fees-configuration
   */
  async updateInvoiceTemplateLateFeesConfiguration(templateId: string, configData: UpdateInvoiceLateFeesConfigurationDto): Promise<GHLApiResponse<UpdateInvoiceTemplateResponseDto>> {
    try {
      const payload = {
        ...configData,
        altId: configData.altId || this.config.locationId,
        altType: 'location' as const
      };

      const response: AxiosResponse<UpdateInvoiceTemplateResponseDto> = await this.axiosInstance.patch(
        `/invoices/template/${templateId}/late-fees-configuration`,
        payload
      );

      return this.wrapResponse(response.data);
    } catch (error) {
      return this.handleApiError(error as AxiosError<GHLErrorResponse>);
    }
  }

  /**
   * Update invoice template payment methods configuration
   * PATCH /invoices/template/{templateId}/payment-methods-configuration
   */
  async updateInvoiceTemplatePaymentMethodsConfiguration(templateId: string, configData: UpdatePaymentMethodsConfigurationDto): Promise<GHLApiResponse<UpdateInvoiceTemplateResponseDto>> {
    try {
      const payload = {
        ...configData,
        altId: configData.altId || this.config.locationId,
        altType: 'location' as const
      };

      const response: AxiosResponse<UpdateInvoiceTemplateResponseDto> = await this.axiosInstance.patch(
        `/invoices/template/${templateId}/payment-methods-configuration`,
        payload
      );

      return this.wrapResponse(response.data);
    } catch (error) {
      return this.handleApiError(error as AxiosError<GHLErrorResponse>);
    }
  }

  /**
   * Create invoice schedule
   * POST /invoices/schedule
   */
  async createInvoiceSchedule(scheduleData: CreateInvoiceScheduleDto): Promise<GHLApiResponse<CreateInvoiceScheduleResponseDto>> {
    try {
      const payload = {
        ...scheduleData,
        altId: scheduleData.altId || this.config.locationId,
        altType: 'location' as const
      };

      const response: AxiosResponse<CreateInvoiceScheduleResponseDto> = await this.axiosInstance.post(
        '/invoices/schedule',
        payload
      );

      return this.wrapResponse(response.data);
    } catch (error) {
      return this.handleApiError(error as AxiosError<GHLErrorResponse>);
    }
  }

  /**
   * List invoice schedules
   * GET /invoices/schedule
   */
  async listInvoiceSchedules(params?: {
    altId?: string;
    altType?: 'location';
    status?: string;
    startAt?: string;
    endAt?: string;
    search?: string;
    paymentMode?: 'default' | 'live' | 'test';
    limit: string;
    offset: string;
  }): Promise<GHLApiResponse<ListSchedulesResponse>> {
    try {
      const queryParams = {
        altId: params?.altId || this.config.locationId,
        altType: 'location' as const,
        limit: params?.limit || '10',
        offset: params?.offset || '0',
        ...(params?.status && { status: params.status }),
        ...(params?.startAt && { startAt: params.startAt }),
        ...(params?.endAt && { endAt: params.endAt }),
        ...(params?.search && { search: params.search }),
        ...(params?.paymentMode && { paymentMode: params.paymentMode })
      };

      const response: AxiosResponse<ListSchedulesResponse> = await this.axiosInstance.get(
        '/invoices/schedule',
        { params: queryParams }
      );

      return this.wrapResponse(response.data);
    } catch (error) {
      return this.handleApiError(error as AxiosError<GHLErrorResponse>);
    }
  }

  /**
   * Get invoice schedule by ID
   * GET /invoices/schedule/{scheduleId}
   */
  async getInvoiceSchedule(scheduleId: string, params?: {
    altId?: string;
    altType?: 'location';
  }): Promise<GHLApiResponse<GetScheduleResponseDto>> {
    try {
      const queryParams = {
        altId: params?.altId || this.config.locationId,
        altType: 'location' as const
      };

      const response: AxiosResponse<GetScheduleResponseDto> = await this.axiosInstance.get(
        `/invoices/schedule/${scheduleId}`,
        { params: queryParams }
      );

      return this.wrapResponse(response.data);
    } catch (error) {
      return this.handleApiError(error as AxiosError<GHLErrorResponse>);
    }
  }

  /**
   * Update invoice schedule
   * PUT /invoices/schedule/{scheduleId}
   */
  async updateInvoiceSchedule(scheduleId: string, scheduleData: UpdateInvoiceScheduleDto): Promise<GHLApiResponse<UpdateInvoiceScheduleResponseDto>> {
    try {
      const payload = {
        ...scheduleData,
        altId: scheduleData.altId || this.config.locationId,
        altType: 'location' as const
      };

      const response: AxiosResponse<UpdateInvoiceScheduleResponseDto> = await this.axiosInstance.put(
        `/invoices/schedule/${scheduleId}`,
        payload
      );

      return this.wrapResponse(response.data);
    } catch (error) {
      return this.handleApiError(error as AxiosError<GHLErrorResponse>);
    }
  }

  /**
   * Delete invoice schedule
   * DELETE /invoices/schedule/{scheduleId}
   */
  async deleteInvoiceSchedule(scheduleId: string, params?: {
    altId?: string;
    altType?: 'location';
  }): Promise<GHLApiResponse<DeleteInvoiceScheduleResponseDto>> {
    try {
      const queryParams = {
        altId: params?.altId || this.config.locationId,
        altType: 'location' as const
      };

      const response: AxiosResponse<DeleteInvoiceScheduleResponseDto> = await this.axiosInstance.delete(
        `/invoices/schedule/${scheduleId}`,
        { params: queryParams }
      );

      return this.wrapResponse(response.data);
    } catch (error) {
      return this.handleApiError(error as AxiosError<GHLErrorResponse>);
    }
  }

  /**
   * Update and schedule recurring invoice
   * POST /invoices/schedule/{scheduleId}/updateAndSchedule
   */
  async updateAndScheduleInvoiceSchedule(scheduleId: string): Promise<GHLApiResponse<UpdateAndScheduleInvoiceScheduleResponseDto>> {
    try {
      const response: AxiosResponse<UpdateAndScheduleInvoiceScheduleResponseDto> = await this.axiosInstance.post(
        `/invoices/schedule/${scheduleId}/updateAndSchedule`
      );

      return this.wrapResponse(response.data);
    } catch (error) {
      return this.handleApiError(error as AxiosError<GHLErrorResponse>);
    }
  }

  /**
   * Schedule an invoice schedule
   * POST /invoices/schedule/{scheduleId}/schedule
   */
  async scheduleInvoiceSchedule(scheduleId: string, scheduleData: ScheduleInvoiceScheduleDto): Promise<GHLApiResponse<ScheduleInvoiceScheduleResponseDto>> {
    try {
      const payload = {
        ...scheduleData,
        altId: scheduleData.altId || this.config.locationId,
        altType: 'location' as const
      };

      const response: AxiosResponse<ScheduleInvoiceScheduleResponseDto> = await this.axiosInstance.post(
        `/invoices/schedule/${scheduleId}/schedule`,
        payload
      );

      return this.wrapResponse(response.data);
    } catch (error) {
      return this.handleApiError(error as AxiosError<GHLErrorResponse>);
    }
  }

  /**
   * Manage auto payment for schedule invoice
   * POST /invoices/schedule/{scheduleId}/auto-payment
   */
  async autoPaymentInvoiceSchedule(scheduleId: string, paymentData: AutoPaymentScheduleDto): Promise<GHLApiResponse<AutoPaymentInvoiceScheduleResponseDto>> {
    try {
      const payload = {
        ...paymentData,
        altId: paymentData.altId || this.config.locationId,
        altType: 'location' as const
      };

      const response: AxiosResponse<AutoPaymentInvoiceScheduleResponseDto> = await this.axiosInstance.post(
        `/invoices/schedule/${scheduleId}/auto-payment`,
        payload
      );

      return this.wrapResponse(response.data);
    } catch (error) {
      return this.handleApiError(error as AxiosError<GHLErrorResponse>);
    }
  }

  /**
   * Cancel scheduled invoice
   * POST /invoices/schedule/{scheduleId}/cancel
   */
  async cancelInvoiceSchedule(scheduleId: string, cancelData: CancelInvoiceScheduleDto): Promise<GHLApiResponse<CancelInvoiceScheduleResponseDto>> {
    try {
      const payload = {
        ...cancelData,
        altId: cancelData.altId || this.config.locationId,
        altType: 'location' as const
      };

      const response: AxiosResponse<CancelInvoiceScheduleResponseDto> = await this.axiosInstance.post(
        `/invoices/schedule/${scheduleId}/cancel`,
        payload
      );

      return this.wrapResponse(response.data);
    } catch (error) {
      return this.handleApiError(error as AxiosError<GHLErrorResponse>);
    }
  }

  /**
   * Create or update text2pay invoice
   * POST /invoices/text2pay
   */
  async text2PayInvoice(invoiceData: Text2PayDto): Promise<GHLApiResponse<Text2PayInvoiceResponseDto>> {
    try {
      const payload = {
        ...invoiceData,
        altId: invoiceData.altId || this.config.locationId,
        altType: 'location' as const
      };

      const response: AxiosResponse<Text2PayInvoiceResponseDto> = await this.axiosInstance.post(
        '/invoices/text2pay',
        payload
      );

      return this.wrapResponse(response.data);
    } catch (error) {
      return this.handleApiError(error as AxiosError<GHLErrorResponse>);
    }
  }

  /**
   * Generate invoice number
   * GET /invoices/generate-invoice-number
   */
  async generateInvoiceNumber(params?: {
    altId?: string;
    altType?: 'location';
  }): Promise<GHLApiResponse<GenerateInvoiceNumberResponse>> {
    try {
      const queryParams = {
        altId: params?.altId || this.config.locationId,
        altType: 'location' as const
      };

      const response: AxiosResponse<GenerateInvoiceNumberResponse> = await this.axiosInstance.get(
        '/invoices/generate-invoice-number',
        { params: queryParams }
      );

      return this.wrapResponse(response.data);
    } catch (error) {
      return this.handleApiError(error as AxiosError<GHLErrorResponse>);
    }
  }

  /**
   * Get invoice by ID
   * GET /invoices/{invoiceId}
   */
  async getInvoice(invoiceId: string, params?: {
    altId?: string;
    altType?: 'location';
  }): Promise<GHLApiResponse<GetInvoiceResponseDto>> {
    try {
      const queryParams = {
        altId: params?.altId || this.config.locationId,
        altType: 'location' as const
      };

      const response: AxiosResponse<GetInvoiceResponseDto> = await this.axiosInstance.get(
        `/invoices/${invoiceId}`,
        { params: queryParams }
      );

      return this.wrapResponse(response.data);
    } catch (error) {
      return this.handleApiError(error as AxiosError<GHLErrorResponse>);
    }
  }

  /**
   * Update invoice
   * PUT /invoices/{invoiceId}
   */
  async updateInvoice(invoiceId: string, invoiceData: UpdateInvoiceDto): Promise<GHLApiResponse<UpdateInvoiceResponseDto>> {
    try {
      const payload = {
        ...invoiceData,
        altId: invoiceData.altId || this.config.locationId,
        altType: 'location' as const
      };

      const response: AxiosResponse<UpdateInvoiceResponseDto> = await this.axiosInstance.put(
        `/invoices/${invoiceId}`,
        payload
      );

      return this.wrapResponse(response.data);
    } catch (error) {
      return this.handleApiError(error as AxiosError<GHLErrorResponse>);
    }
  }

  /**
   * Delete invoice
   * DELETE /invoices/{invoiceId}
   */
  async deleteInvoice(invoiceId: string, params?: {
    altId?: string;
    altType?: 'location';
  }): Promise<GHLApiResponse<DeleteInvoiceResponseDto>> {
    try {
      const queryParams = {
        altId: params?.altId || this.config.locationId,
        altType: 'location' as const
      };

      const response: AxiosResponse<DeleteInvoiceResponseDto> = await this.axiosInstance.delete(
        `/invoices/${invoiceId}`,
        { params: queryParams }
      );

      return this.wrapResponse(response.data);
    } catch (error) {
      return this.handleApiError(error as AxiosError<GHLErrorResponse>);
    }
  }

  /**
   * Update invoice late fees configuration
   * PATCH /invoices/{invoiceId}/late-fees-configuration
   */
  async updateInvoiceLateFeesConfiguration(invoiceId: string, configData: UpdateInvoiceLateFeesConfigurationDto): Promise<GHLApiResponse<UpdateInvoiceResponseDto>> {
    try {
      const payload = {
        ...configData,
        altId: configData.altId || this.config.locationId,
        altType: 'location' as const
      };

      const response: AxiosResponse<UpdateInvoiceResponseDto> = await this.axiosInstance.patch(
        `/invoices/${invoiceId}/late-fees-configuration`,
        payload
      );

      return this.wrapResponse(response.data);
    } catch (error) {
      return this.handleApiError(error as AxiosError<GHLErrorResponse>);
    }
  }

  /**
   * Void invoice
   * POST /invoices/{invoiceId}/void
   */
  async voidInvoice(invoiceId: string, voidData: VoidInvoiceDto): Promise<GHLApiResponse<VoidInvoiceResponseDto>> {
    try {
      const payload = {
        ...voidData,
        altId: voidData.altId || this.config.locationId,
        altType: 'location' as const
      };

      const response: AxiosResponse<VoidInvoiceResponseDto> = await this.axiosInstance.post(
        `/invoices/${invoiceId}/void`,
        payload
      );

      return this.wrapResponse(response.data);
    } catch (error) {
      return this.handleApiError(error as AxiosError<GHLErrorResponse>);
    }
  }

  /**
   * Send invoice
   * POST /invoices/{invoiceId}/send
   */
  async sendInvoice(invoiceId: string, sendData: SendInvoiceDto): Promise<GHLApiResponse<SendInvoicesResponseDto>> {
    try {
      const payload = {
        ...sendData,
        altId: sendData.altId || this.config.locationId,
        altType: 'location' as const
      };

      const response: AxiosResponse<SendInvoicesResponseDto> = await this.axiosInstance.post(
        `/invoices/${invoiceId}/send`,
        payload
      );

      return this.wrapResponse(response.data);
    } catch (error) {
      return this.handleApiError(error as AxiosError<GHLErrorResponse>);
    }
  }

  /**
   * Record manual payment for invoice
   * POST /invoices/{invoiceId}/record-payment
   */
  async recordInvoicePayment(invoiceId: string, paymentData: RecordPaymentDto): Promise<GHLApiResponse<RecordPaymentResponseDto>> {
    try {
      const payload = {
        ...paymentData,
        altId: paymentData.altId || this.config.locationId,
        altType: 'location' as const
      };

      const response: AxiosResponse<RecordPaymentResponseDto> = await this.axiosInstance.post(
        `/invoices/${invoiceId}/record-payment`,
        payload
      );

      return this.wrapResponse(response.data);
    } catch (error) {
      return this.handleApiError(error as AxiosError<GHLErrorResponse>);
    }
  }

  /**
   * Update invoice last visited at
   * PATCH /invoices/stats/last-visited-at
   */
  async updateInvoiceLastVisitedAt(statsData: PatchInvoiceStatsLastViewedDto): Promise<GHLApiResponse<void>> {
    try {
      const response: AxiosResponse<void> = await this.axiosInstance.patch(
        '/invoices/stats/last-visited-at',
        statsData
      );

      return this.wrapResponse(response.data);
    } catch (error) {
      return this.handleApiError(error as AxiosError<GHLErrorResponse>);
    }
  }

  /**
   * Create new estimate
   * POST /invoices/estimate
   */
  async createEstimate(estimateData: CreateEstimatesDto): Promise<GHLApiResponse<EstimateResponseDto>> {
    try {
      const payload = {
        ...estimateData,
        altId: estimateData.altId || this.config.locationId,
        altType: 'location' as const
      };

      const response: AxiosResponse<EstimateResponseDto> = await this.axiosInstance.post(
        '/invoices/estimate',
        payload
      );

      return this.wrapResponse(response.data);
    } catch (error) {
      return this.handleApiError(error as AxiosError<GHLErrorResponse>);
    }
  }

  /**
   * Update estimate
   * PUT /invoices/estimate/{estimateId}
   */
  async updateEstimate(estimateId: string, estimateData: UpdateEstimateDto): Promise<GHLApiResponse<EstimateResponseDto>> {
    try {
      const payload = {
        ...estimateData,
        altId: estimateData.altId || this.config.locationId,
        altType: 'location' as const
      };

      const response: AxiosResponse<EstimateResponseDto> = await this.axiosInstance.put(
        `/invoices/estimate/${estimateId}`,
        payload
      );

      return this.wrapResponse(response.data);
    } catch (error) {
      return this.handleApiError(error as AxiosError<GHLErrorResponse>);
    }
  }

  /**
   * Delete estimate
   * DELETE /invoices/estimate/{estimateId}
   */
  async deleteEstimate(estimateId: string, deleteData: AltDto): Promise<GHLApiResponse<EstimateResponseDto>> {
    try {
      const payload = {
        ...deleteData,
        altId: deleteData.altId || this.config.locationId,
        altType: 'location' as const
      };

      const response: AxiosResponse<EstimateResponseDto> = await this.axiosInstance.delete(
        `/invoices/estimate/${estimateId}`,
        { data: payload }
      );

      return this.wrapResponse(response.data);
    } catch (error) {
      return this.handleApiError(error as AxiosError<GHLErrorResponse>);
    }
  }

  /**
   * Generate estimate number
   * GET /invoices/estimate/number/generate
   */
  async generateEstimateNumber(params?: {
    altId?: string;
    altType?: 'location';
  }): Promise<GHLApiResponse<GenerateEstimateNumberResponse>> {
    try {
      const queryParams = {
        altId: params?.altId || this.config.locationId,
        altType: 'location' as const
      };

      const response: AxiosResponse<GenerateEstimateNumberResponse> = await this.axiosInstance.get(
        '/invoices/estimate/number/generate',
        { params: queryParams }
      );

      return this.wrapResponse(response.data);
    } catch (error) {
      return this.handleApiError(error as AxiosError<GHLErrorResponse>);
    }
  }

  /**
   * Send estimate
   * POST /invoices/estimate/{estimateId}/send
   */
  async sendEstimate(estimateId: string, sendData: SendEstimateDto): Promise<GHLApiResponse<EstimateResponseDto>> {
    try {
      const payload = {
        ...sendData,
        altId: sendData.altId || this.config.locationId,
        altType: 'location' as const
      };

      const response: AxiosResponse<EstimateResponseDto> = await this.axiosInstance.post(
        `/invoices/estimate/${estimateId}/send`,
        payload
      );

      return this.wrapResponse(response.data);
    } catch (error) {
      return this.handleApiError(error as AxiosError<GHLErrorResponse>);
    }
  }

  /**
   * Create invoice from estimate
   * POST /invoices/estimate/{estimateId}/invoice
   */
  async createInvoiceFromEstimate(estimateId: string, invoiceData: CreateInvoiceFromEstimateDto): Promise<GHLApiResponse<CreateInvoiceFromEstimateResponseDto>> {
    try {
      const payload = {
        ...invoiceData,
        altId: invoiceData.altId || this.config.locationId,
        altType: 'location' as const
      };

      const response: AxiosResponse<CreateInvoiceFromEstimateResponseDto> = await this.axiosInstance.post(
        `/invoices/estimate/${estimateId}/invoice`,
        payload
      );

      return this.wrapResponse(response.data);
    } catch (error) {
      return this.handleApiError(error as AxiosError<GHLErrorResponse>);
    }
  }

  /**
   * List estimates
   * GET /invoices/estimate/list
   */
  async listEstimates(params?: {
    altId?: string;
    altType?: 'location';
    startAt?: string;
    endAt?: string;
    search?: string;
    status?: 'all' | 'draft' | 'sent' | 'accepted' | 'declined' | 'invoiced' | 'viewed';
    contactId?: string;
    limit: string;
    offset: string;
  }): Promise<GHLApiResponse<ListEstimatesResponseDto>> {
    try {
      const queryParams = {
        altId: params?.altId || this.config.locationId,
        altType: 'location' as const,
        limit: params?.limit || '10',
        offset: params?.offset || '0',
        ...(params?.startAt && { startAt: params.startAt }),
        ...(params?.endAt && { endAt: params.endAt }),
        ...(params?.search && { search: params.search }),
        ...(params?.status && { status: params.status }),
        ...(params?.contactId && { contactId: params.contactId })
      };

      const response: AxiosResponse<ListEstimatesResponseDto> = await this.axiosInstance.get(
        '/invoices/estimate/list',
        { params: queryParams }
      );

      return this.wrapResponse(response.data);
    } catch (error) {
      return this.handleApiError(error as AxiosError<GHLErrorResponse>);
    }
  }

  /**
   * Update estimate last visited at
   * PATCH /invoices/estimate/stats/last-visited-at
   */
  async updateEstimateLastVisitedAt(statsData: EstimateIdParam): Promise<GHLApiResponse<void>> {
    try {
      const response: AxiosResponse<void> = await this.axiosInstance.patch(
        '/invoices/estimate/stats/last-visited-at',
        statsData
      );

      return this.wrapResponse(response.data);
    } catch (error) {
      return this.handleApiError(error as AxiosError<GHLErrorResponse>);
    }
  }

  /**
   * List estimate templates
   * GET /invoices/estimate/template
   */
  async listEstimateTemplates(params?: {
    altId?: string;
    altType?: 'location';
    search?: string;
    limit: string;
    offset: string;
  }): Promise<GHLApiResponse<ListEstimateTemplateResponseDto>> {
    try {
      const queryParams = {
        altId: params?.altId || this.config.locationId,
        altType: 'location' as const,
        limit: params?.limit || '10',
        offset: params?.offset || '0',
        ...(params?.search && { search: params.search })
      };

      const response: AxiosResponse<ListEstimateTemplateResponseDto> = await this.axiosInstance.get(
        '/invoices/estimate/template',
        { params: queryParams }
      );

      return this.wrapResponse(response.data);
    } catch (error) {
      return this.handleApiError(error as AxiosError<GHLErrorResponse>);
    }
  }

  /**
   * Create estimate template
   * POST /invoices/estimate/template
   */
  async createEstimateTemplate(templateData: EstimateTemplatesDto): Promise<GHLApiResponse<EstimateTemplateResponseDto>> {
    try {
      const payload = {
        ...templateData,
        altId: templateData.altId || this.config.locationId,
        altType: 'location' as const
      };

      const response: AxiosResponse<EstimateTemplateResponseDto> = await this.axiosInstance.post(
        '/invoices/estimate/template',
        payload
      );

      return this.wrapResponse(response.data);
    } catch (error) {
      return this.handleApiError(error as AxiosError<GHLErrorResponse>);
    }
  }

  /**
   * Update estimate template
   * PUT /invoices/estimate/template/{templateId}
   */
  async updateEstimateTemplate(templateId: string, templateData: EstimateTemplatesDto): Promise<GHLApiResponse<EstimateTemplateResponseDto>> {
    try {
      const payload = {
        ...templateData,
        altId: templateData.altId || this.config.locationId,
        altType: 'location' as const
      };

      const response: AxiosResponse<EstimateTemplateResponseDto> = await this.axiosInstance.put(
        `/invoices/estimate/template/${templateId}`,
        payload
      );

      return this.wrapResponse(response.data);
    } catch (error) {
      return this.handleApiError(error as AxiosError<GHLErrorResponse>);
    }
  }

  /**
   * Delete estimate template
   * DELETE /invoices/estimate/template/{templateId}
   */
  async deleteEstimateTemplate(templateId: string, deleteData: AltDto): Promise<GHLApiResponse<EstimateTemplateResponseDto>> {
    try {
      const payload = {
        ...deleteData,
        altId: deleteData.altId || this.config.locationId,
        altType: 'location' as const
      };

      const response: AxiosResponse<EstimateTemplateResponseDto> = await this.axiosInstance.delete(
        `/invoices/estimate/template/${templateId}`,
        { data: payload }
      );

      return this.wrapResponse(response.data);
    } catch (error) {
      return this.handleApiError(error as AxiosError<GHLErrorResponse>);
    }
  }

  /**
   * Preview estimate template
   * GET /invoices/estimate/template/preview
   */
  async previewEstimateTemplate(params?: {
    altId?: string;
    altType?: 'location';
    templateId: string;
  }): Promise<GHLApiResponse<EstimateTemplateResponseDto>> {
    try {
      const queryParams = {
        altId: params?.altId || this.config.locationId,
        altType: 'location' as const,
        templateId: params?.templateId || ''
      };

      const response: AxiosResponse<EstimateTemplateResponseDto> = await this.axiosInstance.get(
        '/invoices/estimate/template/preview',
        { params: queryParams }
      );

      return this.wrapResponse(response.data);
    } catch (error) {
      return this.handleApiError(error as AxiosError<GHLErrorResponse>);
    }
  }

  /**
   * Create invoice
   * POST /invoices/
   */
  async createInvoice(invoiceData: CreateInvoiceDto): Promise<GHLApiResponse<CreateInvoiceResponseDto>> {
    try {
      const payload = {
        ...invoiceData,
        altId: invoiceData.altId || this.config.locationId,
        altType: 'location' as const
      };

      const response: AxiosResponse<CreateInvoiceResponseDto> = await this.axiosInstance.post(
        '/invoices/',
        payload
      );

      return this.wrapResponse(response.data);
    } catch (error) {
      return this.handleApiError(error as AxiosError<GHLErrorResponse>);
    }
  }

  /**
   * List invoices
   * GET /invoices/
   */
  async listInvoices(params?: {
    altId?: string;
    altType?: 'location';
    status?: string;
    startAt?: string;
    endAt?: string;
    search?: string;
    paymentMode?: 'default' | 'live' | 'test';
    contactId?: string;
    limit: string;
    offset: string;
    sortField?: 'issueDate';
    sortOrder?: 'ascend' | 'descend';
  }): Promise<GHLApiResponse<ListInvoicesResponseDto>> {
    try {
      const queryParams = {
        altId: params?.altId || this.config.locationId,
        altType: 'location' as const,
        limit: params?.limit || '10',
        offset: params?.offset || '0',
        ...(params?.status && { status: params.status }),
        ...(params?.startAt && { startAt: params.startAt }),
        ...(params?.endAt && { endAt: params.endAt }),
        ...(params?.search && { search: params.search }),
        ...(params?.paymentMode && { paymentMode: params.paymentMode }),
        ...(params?.contactId && { contactId: params.contactId }),
        ...(params?.sortField && { sortField: params.sortField }),
        ...(params?.sortOrder && { sortOrder: params.sortOrder })
      };

      const response: AxiosResponse<ListInvoicesResponseDto> = await this.axiosInstance.get(
        '/invoices/',
        { params: queryParams }
      );

      return this.wrapResponse(response.data);
    } catch (error) {
      return this.handleApiError(error as AxiosError<GHLErrorResponse>);
    }
  }

  // ========== MISSING PAYMENT ENDPOINTS ==========

  /**
   * Record a manual payment for an order
   * POST /payments/orders/{orderId}/record-payment
   */
  async recordOrderPayment(orderId: string, data: Record<string, any>): Promise<GHLApiResponse<any>> {
    try {
      const response: AxiosResponse<any> = await this.axiosInstance.post(
        `/payments/orders/${orderId}/record-payment`,
        data
      );
      return this.wrapResponse(response.data);
    } catch (error) {
      return this.handleApiError(error as AxiosError<GHLErrorResponse>);
    }
  }

  /**
   * Get notes for an order
   * GET /payments/orders/{orderId}/notes
   */
  async getOrderNotes(orderId: string, params?: Record<string, any>): Promise<GHLApiResponse<any>> {
    try {
      const queryParams = new URLSearchParams();
      if (params) {
        Object.entries(params).forEach(([key, value]) => {
          if (value !== undefined && value !== null && key !== 'orderId') {
            queryParams.append(key, value.toString());
          }
        });
      }
      const qs = queryParams.toString();
      const url = `/payments/orders/${orderId}/notes${qs ? '?' + qs : ''}`;
      const response: AxiosResponse<any> = await this.axiosInstance.get(url);
      return this.wrapResponse(response.data);
    } catch (error) {
      return this.handleApiError(error as AxiosError<GHLErrorResponse>);
    }
  }

  /**
   * Update custom payment provider capabilities
   * PUT /payments/custom-provider/capabilities
   */
  async updateCustomProviderCapabilities(data: Record<string, any>): Promise<GHLApiResponse<any>> {
    try {
      const response: AxiosResponse<any> = await this.axiosInstance.put(
        '/payments/custom-provider/capabilities',
        data
      );
      return this.wrapResponse(response.data);
    } catch (error) {
      return this.handleApiError(error as AxiosError<GHLErrorResponse>);
    }
  }

  /**
   * Migrate an order to a different payment source
   * POST /payments/orders/migrate-order-ps
   */
  async migrateOrderPaymentSource(data: Record<string, any>): Promise<GHLApiResponse<any>> {
    try {
      const response: AxiosResponse<any> = await this.axiosInstance.post(
        '/payments/orders/migrate-order-ps',
        data
      );
      return this.wrapResponse(response.data);
    } catch (error) {
      return this.handleApiError(error as AxiosError<GHLErrorResponse>);
    }
  }

}
