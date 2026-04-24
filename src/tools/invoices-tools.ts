import { Tool } from '@modelcontextprotocol/sdk/types.js';
import { GHLApiClient } from '../clients/ghl-api-client.js';
import {
  // Invoice Template Types
  CreateInvoiceTemplateDto,
  CreateInvoiceTemplateResponseDto,
  UpdateInvoiceTemplateDto,
  UpdateInvoiceTemplateResponseDto,
  DeleteInvoiceTemplateResponseDto,
  ListTemplatesResponse,
  InvoiceTemplate,
  UpdateInvoiceLateFeesConfigurationDto,
  UpdatePaymentMethodsConfigurationDto,

  // Invoice Schedule Types
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

  // Invoice Types
  CreateInvoiceDto,
  CreateInvoiceResponseDto,
  UpdateInvoiceDto,
  UpdateInvoiceResponseDto,
  DeleteInvoiceResponseDto,
  GetInvoiceResponseDto,
  ListInvoicesResponseDto,
  VoidInvoiceDto,
  VoidInvoiceResponseDto,
  SendInvoiceDto,
  SendInvoicesResponseDto,
  RecordPaymentDto,
  RecordPaymentResponseDto,
  Text2PayDto,
  Text2PayInvoiceResponseDto,
  GenerateInvoiceNumberResponse,
  PatchInvoiceStatsLastViewedDto,

  // Estimate Types
  CreateEstimatesDto,
  EstimateResponseDto,
  UpdateEstimateDto,
  SendEstimateDto,
  CreateInvoiceFromEstimateDto,
  CreateInvoiceFromEstimateResponseDto,
  ListEstimatesResponseDto,
  EstimateIdParam,
  GenerateEstimateNumberResponse,
  EstimateTemplatesDto,
  EstimateTemplateResponseDto,
  ListEstimateTemplateResponseDto,
  AltDto
} from '../types/ghl-types.js';

export class InvoicesTools {
  private client: GHLApiClient;

  constructor(client: GHLApiClient) {
    this.client = client;
  }

  getTools(): Tool[] {
    return [
      // Invoice Template Tools
      {
        name: 'create_invoice_template',
        description: 'Create a new invoice template',
        inputSchema: {
          type: 'object',
          properties: {
            altId: { type: 'string', description: 'Location ID override (defaults to configured location)' },
            altType: { type: 'string', enum: ['location'], default: 'location' },
            name: { type: 'string', description: 'Template name' },
            title: { type: 'string', description: 'Default invoice title' },
            currency: { type: 'string', description: 'Currency code (for example USD)' },
            issueDate: { type: 'string', description: 'Default issue date (ISO 8601)' },
            dueDate: { type: 'string', description: 'Default due date (ISO 8601)' }
          },
          required: ['name']
        }
      },
      {
        name: 'list_invoice_templates',
        description: 'List invoice templates with optional filtering and pagination',
        inputSchema: {
          type: 'object',
          properties: {
            altId: { type: 'string', description: 'Location ID override' },
            limit: { type: 'string', description: 'Number of results to return', default: '10' },
            offset: { type: 'string', description: 'Pagination offset', default: '0' },
            status: { type: 'string', description: 'Filter by template status' },
            search: { type: 'string', description: 'Search term' },
            paymentMode: { type: 'string', enum: ['default', 'live', 'test'], description: 'Payment mode filter' }
          },
          required: ['limit', 'offset']
        }
      },
      {
        name: 'get_invoice_template',
        description: 'Get invoice template details by ID',
        inputSchema: {
          type: 'object',
          properties: {
            templateId: { type: 'string', description: 'Invoice template ID' },
            altId: { type: 'string', description: 'Location ID override' }
          },
          required: ['templateId']
        }
      },
      {
        name: 'update_invoice_template',
        description: 'Update an existing invoice template',
        inputSchema: {
          type: 'object',
          properties: {
            templateId: { type: 'string', description: 'Invoice template ID' },
            altId: { type: 'string', description: 'Location ID override' },
            name: { type: 'string', description: 'Template name' },
            title: { type: 'string', description: 'Default invoice title' },
            currency: { type: 'string', description: 'Currency code' }
          },
          required: ['templateId']
        }
      },
      {
        name: 'delete_invoice_template',
        description: 'Delete an invoice template',
        inputSchema: {
          type: 'object',
          properties: {
            templateId: { type: 'string', description: 'Invoice template ID' },
            altId: { type: 'string', description: 'Location ID override' }
          },
          required: ['templateId']
        }
      },
      {
        name: 'update_invoice_template_late_fees',
        description: 'Update the late fee configuration for an invoice template',
        inputSchema: {
          type: 'object',
          properties: {
            templateId: { type: 'string', description: 'Invoice template ID' },
            lateFeesConfiguration: { type: 'object', description: 'Late fee configuration payload' },
            altId: { type: 'string', description: 'Location ID override' }
          },
          required: ['templateId', 'lateFeesConfiguration']
        }
      },
      {
        name: 'update_invoice_template_payment_methods',
        description: 'Update payment methods for an invoice template',
        inputSchema: {
          type: 'object',
          properties: {
            templateId: { type: 'string', description: 'Invoice template ID' },
            paymentMethods: { type: 'object', description: 'Payment methods configuration payload' },
            altId: { type: 'string', description: 'Location ID override' }
          },
          required: ['templateId', 'paymentMethods']
        }
      },

      // Invoice Schedule Tools
      {
        name: 'create_invoice_schedule',
        description: 'Create a new invoice schedule',
        inputSchema: {
          type: 'object',
          properties: {
            altId: { type: 'string', description: 'Location ID override' },
            name: { type: 'string', description: 'Schedule name' },
            templateId: { type: 'string', description: 'Invoice template ID' },
            contactId: { type: 'string', description: 'Contact ID' },
            frequency: { type: 'string', description: 'Schedule frequency description' }
          },
          required: ['name', 'templateId', 'contactId']
        }
      },
      {
        name: 'list_invoice_schedules',
        description: 'List invoice schedules with pagination',
        inputSchema: {
          type: 'object',
          properties: {
            altId: { type: 'string', description: 'Location ID override' },
            limit: { type: 'string', description: 'Number of results to return', default: '10' },
            offset: { type: 'string', description: 'Pagination offset', default: '0' },
            status: { type: 'string', description: 'Filter by status' },
            search: { type: 'string', description: 'Search term' }
          },
          required: ['limit', 'offset']
        }
      },
      {
        name: 'get_invoice_schedule',
        description: 'Get invoice schedule details by ID',
        inputSchema: {
          type: 'object',
          properties: {
            scheduleId: { type: 'string', description: 'Invoice schedule ID' },
            altId: { type: 'string', description: 'Location ID override' }
          },
          required: ['scheduleId']
        }
      },
      {
        name: 'update_invoice_schedule',
        description: 'Update an invoice schedule configuration',
        inputSchema: {
          type: 'object',
          properties: {
            scheduleId: { type: 'string', description: 'Invoice schedule ID' },
            scheduleData: { type: 'object', description: 'Payload matching UpdateInvoiceScheduleDto' }
          },
          required: ['scheduleId', 'scheduleData']
        }
      },
      {
        name: 'delete_invoice_schedule',
        description: 'Delete an invoice schedule',
        inputSchema: {
          type: 'object',
          properties: {
            scheduleId: { type: 'string', description: 'Invoice schedule ID' },
            altId: { type: 'string', description: 'Location ID override' }
          },
          required: ['scheduleId']
        }
      },
      {
        name: 'schedule_invoice_schedule',
        description: 'Schedule an invoice schedule to start sending invoices',
        inputSchema: {
          type: 'object',
          properties: {
            scheduleId: { type: 'string', description: 'Invoice schedule ID' },
            scheduleData: { type: 'object', description: 'Payload matching ScheduleInvoiceScheduleDto' }
          },
          required: ['scheduleId', 'scheduleData']
        }
      },
      {
        name: 'auto_payment_invoice_schedule',
        description: 'Configure automatic payments for an invoice schedule',
        inputSchema: {
          type: 'object',
          properties: {
            scheduleId: { type: 'string', description: 'Invoice schedule ID' },
            paymentData: { type: 'object', description: 'Auto payment configuration payload' }
          },
          required: ['scheduleId', 'paymentData']
        }
      },
      {
        name: 'cancel_invoice_schedule',
        description: 'Cancel a scheduled invoice sequence',
        inputSchema: {
          type: 'object',
          properties: {
            scheduleId: { type: 'string', description: 'Invoice schedule ID' },
            cancelData: { type: 'object', description: 'Cancellation payload matching CancelInvoiceScheduleDto' }
          },
          required: ['scheduleId', 'cancelData']
        }
      },

      // Invoice Management Tools
      {
        name: 'create_invoice',
        description: 'Create a new invoice',
        inputSchema: {
          type: 'object',
          properties: {
            altId: { type: 'string', description: 'Location ID override' },
            contactId: { type: 'string', description: 'Contact ID for the invoice' },
            currency: { type: 'string', description: 'Currency code (for example USD)' },
            title: { type: 'string', description: 'Invoice title' },
            issueDate: { type: 'string', description: 'Issue date (ISO 8601)' },
            dueDate: { type: 'string', description: 'Due date (ISO 8601)' },
            invoiceItems: { type: 'array', items: { type: 'object' }, description: 'List of invoice items' }
          },
          required: ['contactId', 'currency', 'invoiceItems']
        }
      },
      {
        name: 'list_invoices',
        description: 'List invoices with optional filtering',
        inputSchema: {
          type: 'object',
          properties: {
            altId: { type: 'string', description: 'Location ID override' },
            limit: { type: 'string', description: 'Number of results to return', default: '10' },
            offset: { type: 'string', description: 'Pagination offset', default: '0' },
            status: { type: 'string', description: 'Filter by status' },
            startAt: { type: 'string', description: 'Filter start date (ISO 8601)' },
            endAt: { type: 'string', description: 'Filter end date (ISO 8601)' },
            search: { type: 'string', description: 'Search term' },
            paymentMode: { type: 'string', enum: ['default', 'live', 'test'], description: 'Payment mode filter' },
            contactId: { type: 'string', description: 'Filter by contact ID' },
            sortField: { type: 'string', enum: ['issueDate'], description: 'Sort field' },
            sortOrder: { type: 'string', enum: ['ascend', 'descend'], description: 'Sort order' }
          },
          required: ['limit', 'offset']
        }
      },
      {
        name: 'get_invoice',
        description: 'Get invoice details by ID',
        inputSchema: {
          type: 'object',
          properties: {
            invoiceId: { type: 'string', description: 'Invoice ID' },
            altId: { type: 'string', description: 'Location ID override' }
          },
          required: ['invoiceId']
        }
      },
      {
        name: 'update_invoice',
        description: 'Update an invoice by ID',
        inputSchema: {
          type: 'object',
          properties: {
            invoiceId: { type: 'string', description: 'Invoice ID' },
            invoiceData: { type: 'object', description: 'Payload matching UpdateInvoiceDto' }
          },
          required: ['invoiceId', 'invoiceData']
        }
      },
      {
        name: 'delete_invoice',
        description: 'Delete an invoice',
        inputSchema: {
          type: 'object',
          properties: {
            invoiceId: { type: 'string', description: 'Invoice ID' },
            altId: { type: 'string', description: 'Location ID override' }
          },
          required: ['invoiceId']
        }
      },
      {
        name: 'void_invoice',
        description: 'Void an invoice',
        inputSchema: {
          type: 'object',
          properties: {
            invoiceId: { type: 'string', description: 'Invoice ID' },
            voidData: { type: 'object', description: 'Payload matching VoidInvoiceDto' }
          },
          required: ['invoiceId', 'voidData']
        }
      },
      {
        name: 'send_invoice',
        description: 'Send an invoice to a customer',
        inputSchema: {
          type: 'object',
          properties: {
            invoiceId: { type: 'string', description: 'Invoice ID' },
            altId: { type: 'string', description: 'Location ID override' },
            userId: { type: 'string', description: 'User ID initiating the send action' },
            action: { type: 'string', enum: ['sms_and_email', 'send_manually', 'email', 'sms'], description: 'Delivery action' },
            liveMode: { type: 'boolean', description: 'Send in live mode or test mode' },
            emailTo: { type: 'string', description: 'Email address to send to' },
            subject: { type: 'string', description: 'Email subject' },
            message: { type: 'string', description: 'Email message body' }
          },
          required: ['invoiceId']
        }
      },
      {
        name: 'record_invoice_payment',
        description: 'Record a manual payment against an invoice',
        inputSchema: {
          type: 'object',
          properties: {
            invoiceId: { type: 'string', description: 'Invoice ID' },
            paymentData: { type: 'object', description: 'Payment payload matching RecordPaymentDto' }
          },
          required: ['invoiceId', 'paymentData']
        }
      },
      {
        name: 'text2pay_invoice',
        description: 'Create or update a text-to-pay invoice link',
        inputSchema: {
          type: 'object',
          properties: {
            text2PayData: { type: 'object', description: 'Payload matching Text2PayDto' }
          },
          required: ['text2PayData']
        }
      },
      {
        name: 'update_invoice_last_visited',
        description: 'Mark an invoice as viewed by providing the invoice ID',
        inputSchema: {
          type: 'object',
          properties: {
            invoiceId: { type: 'string', description: 'Invoice ID' }
          },
          required: ['invoiceId']
        }
      },

      // Estimate Tools
      {
        name: 'create_estimate',
        description: 'Create a new estimate',
        inputSchema: {
          type: 'object',
          properties: {
            altId: { type: 'string', description: 'Location ID' },
            contactId: { type: 'string', description: 'Contact ID' },
            title: { type: 'string', description: 'Estimate title' },
            currency: { type: 'string', description: 'Currency code' },
            issueDate: { type: 'string', description: 'Issue date' },
            validUntil: { type: 'string', description: 'Valid until date' }
          },
          required: ['contactId', 'title']
        }
      },
      {
        name: 'list_estimates',
        description: 'List all estimates',
        inputSchema: {
          type: 'object',
          properties: {
            altId: { type: 'string', description: 'Location ID' },
            limit: { type: 'string', description: 'Number of results per page', default: '10' },
            offset: { type: 'string', description: 'Offset for pagination', default: '0' },
            status: { type: 'string', enum: ['all', 'draft', 'sent', 'accepted', 'declined', 'invoiced', 'viewed'], description: 'Filter by status' },
            contactId: { type: 'string', description: 'Filter by contact ID' },
            search: { type: 'string', description: 'Search term' }
          },
          required: ['limit', 'offset']
        }
      },
      {
        name: 'update_estimate',
        description: 'Update an estimate by ID',
        inputSchema: {
          type: 'object',
          properties: {
            estimateId: { type: 'string', description: 'Estimate ID' },
            estimateData: { type: 'object', description: 'Payload matching UpdateEstimateDto' }
          },
          required: ['estimateId', 'estimateData']
        }
      },
      {
        name: 'delete_estimate',
        description: 'Delete an estimate',
        inputSchema: {
          type: 'object',
          properties: {
            estimateId: { type: 'string', description: 'Estimate ID' },
            altId: { type: 'string', description: 'Location ID override' }
          },
          required: ['estimateId']
        }
      },
      {
        name: 'send_estimate',
        description: 'Send an estimate to a customer',
        inputSchema: {
          type: 'object',
          properties: {
            estimateId: { type: 'string', description: 'Estimate ID' },
            altId: { type: 'string', description: 'Location ID override' },
            emailTo: { type: 'string', description: 'Email address to send to' },
            subject: { type: 'string', description: 'Email subject' },
            message: { type: 'string', description: 'Email message body' }
          },
          required: ['estimateId']
        }
      },
      {
        name: 'create_invoice_from_estimate',
        description: 'Create an invoice from an estimate',
        inputSchema: {
          type: 'object',
          properties: {
            estimateId: { type: 'string', description: 'Estimate ID' },
            invoiceData: { type: 'object', description: 'Payload matching CreateInvoiceFromEstimateDto' }
          },
          required: ['estimateId', 'invoiceData']
        }
      },
      {
        name: 'update_estimate_last_visited',
        description: 'Mark an estimate as viewed',
        inputSchema: {
          type: 'object',
          properties: {
            estimateId: { type: 'string', description: 'Estimate ID' }
          },
          required: ['estimateId']
        }
      },

      // Utility Tools
      {
        name: 'generate_invoice_number',
        description: 'Generate a unique invoice number',
        inputSchema: {
          type: 'object',
          properties: {
            altId: { type: 'string', description: 'Location ID override' }
          }
        }
      },
      {
        name: 'generate_estimate_number',
        description: 'Generate a unique estimate number',
        inputSchema: {
          type: 'object',
          properties: {
            altId: { type: 'string', description: 'Location ID override' }
          }
        }
      },

      // Estimate Template Tools
      {
        name: 'list_estimate_templates',
        description: 'List estimate templates with pagination',
        inputSchema: {
          type: 'object',
          properties: {
            altId: { type: 'string', description: 'Location ID override' },
            limit: { type: 'string', description: 'Number of results to return', default: '10' },
            offset: { type: 'string', description: 'Pagination offset', default: '0' },
            search: { type: 'string', description: 'Search term' }
          },
          required: ['limit', 'offset']
        }
      },
      {
        name: 'create_estimate_template',
        description: 'Create a new estimate template',
        inputSchema: {
          type: 'object',
          properties: {
            templateData: { type: 'object', description: 'Payload matching EstimateTemplatesDto' }
          },
          required: ['templateData']
        }
      },
      {
        name: 'update_estimate_template',
        description: 'Update an estimate template',
        inputSchema: {
          type: 'object',
          properties: {
            templateId: { type: 'string', description: 'Estimate template ID' },
            templateData: { type: 'object', description: 'Payload matching EstimateTemplatesDto' }
          },
          required: ['templateId', 'templateData']
        }
      },
      {
        name: 'delete_estimate_template',
        description: 'Delete an estimate template',
        inputSchema: {
          type: 'object',
          properties: {
            templateId: { type: 'string', description: 'Estimate template ID' },
            altId: { type: 'string', description: 'Location ID override' }
          },
          required: ['templateId']
        }
      },
      {
        name: 'preview_estimate_template',
        description: 'Preview an estimate template',
        inputSchema: {
          type: 'object',
          properties: {
            templateId: { type: 'string', description: 'Estimate template ID' },
            altId: { type: 'string', description: 'Location ID override' }
          },
          required: ['templateId']
        }
      }
    ];
  }


  async handleToolCall(name: string, args: any): Promise<any> {
    const input = args ?? {};

    switch (name) {
      case 'create_invoice_template':
        return this.client.createInvoiceTemplate(input as CreateInvoiceTemplateDto);

      case 'list_invoice_templates':
        return this.client.listInvoiceTemplates(input);

      case 'get_invoice_template':
        if (!input.templateId) {
          throw new Error('templateId is required');
        }
        return this.client.getInvoiceTemplate(input.templateId, input);

      case 'update_invoice_template': {
        const { templateId, ...updateData } = input;
        if (!templateId) {
          throw new Error('templateId is required');
        }
        return this.client.updateInvoiceTemplate(templateId, updateData as UpdateInvoiceTemplateDto);
      }

      case 'delete_invoice_template': {
        const { templateId, ...deleteParams } = input;
        if (!templateId) {
          throw new Error('templateId is required');
        }
        return this.client.deleteInvoiceTemplate(templateId, deleteParams);
      }

      case 'update_invoice_template_late_fees': {
        const { templateId, lateFeesConfiguration, ...rest } = input;
        if (!templateId) {
          throw new Error('templateId is required');
        }
        if (!lateFeesConfiguration) {
          throw new Error('lateFeesConfiguration is required');
        }
        const payload = { lateFeesConfiguration, ...rest } as UpdateInvoiceLateFeesConfigurationDto;
        return this.client.updateInvoiceTemplateLateFeesConfiguration(templateId, payload);
      }

      case 'update_invoice_template_payment_methods': {
        const { templateId, paymentMethods, ...rest } = input;
        if (!templateId) {
          throw new Error('templateId is required');
        }
        if (!paymentMethods) {
          throw new Error('paymentMethods is required');
        }
        const payload = { paymentMethods, ...rest } as UpdatePaymentMethodsConfigurationDto;
        return this.client.updateInvoiceTemplatePaymentMethodsConfiguration(templateId, payload);
      }

      case 'create_invoice_schedule':
        return this.client.createInvoiceSchedule(input as CreateInvoiceScheduleDto);

      case 'list_invoice_schedules':
        return this.client.listInvoiceSchedules(input);

      case 'get_invoice_schedule':
        if (!input.scheduleId) {
          throw new Error('scheduleId is required');
        }
        return this.client.getInvoiceSchedule(input.scheduleId, input);

      case 'update_invoice_schedule': {
        const { scheduleId, scheduleData } = input;
        if (!scheduleId) {
          throw new Error('scheduleId is required');
        }
        if (!scheduleData) {
          throw new Error('scheduleData is required');
        }
        return this.client.updateInvoiceSchedule(scheduleId, scheduleData as UpdateInvoiceScheduleDto);
      }

      case 'delete_invoice_schedule': {
        const { scheduleId, ...deleteParams } = input;
        if (!scheduleId) {
          throw new Error('scheduleId is required');
        }
        return this.client.deleteInvoiceSchedule(scheduleId, deleteParams);
      }

      case 'schedule_invoice_schedule': {
        const { scheduleId, scheduleData } = input;
        if (!scheduleId) {
          throw new Error('scheduleId is required');
        }
        if (!scheduleData) {
          throw new Error('scheduleData is required');
        }
        return this.client.scheduleInvoiceSchedule(scheduleId, scheduleData as ScheduleInvoiceScheduleDto);
      }

      case 'auto_payment_invoice_schedule': {
        const { scheduleId, paymentData } = input;
        if (!scheduleId) {
          throw new Error('scheduleId is required');
        }
        if (!paymentData) {
          throw new Error('paymentData is required');
        }
        return this.client.autoPaymentInvoiceSchedule(scheduleId, paymentData as AutoPaymentScheduleDto);
      }

      case 'cancel_invoice_schedule': {
        const { scheduleId, cancelData } = input;
        if (!scheduleId) {
          throw new Error('scheduleId is required');
        }
        if (!cancelData) {
          throw new Error('cancelData is required');
        }
        return this.client.cancelInvoiceSchedule(scheduleId, cancelData as CancelInvoiceScheduleDto);
      }

      case 'create_invoice':
        return this.client.createInvoice(input as CreateInvoiceDto);

      case 'list_invoices':
        return this.client.listInvoices(input);

      case 'get_invoice':
        if (!input.invoiceId) {
          throw new Error('invoiceId is required');
        }
        return this.client.getInvoice(input.invoiceId, input);

      case 'update_invoice': {
        const { invoiceId, invoiceData } = input;
        if (!invoiceId) {
          throw new Error('invoiceId is required');
        }
        if (!invoiceData) {
          throw new Error('invoiceData is required');
        }
        return this.client.updateInvoice(invoiceId, invoiceData as UpdateInvoiceDto);
      }

      case 'delete_invoice': {
        const { invoiceId, ...deleteParams } = input;
        if (!invoiceId) {
          throw new Error('invoiceId is required');
        }
        return this.client.deleteInvoice(invoiceId, deleteParams);
      }

      case 'void_invoice': {
        const { invoiceId, voidData } = input;
        if (!invoiceId) {
          throw new Error('invoiceId is required');
        }
        if (!voidData) {
          throw new Error('voidData is required');
        }
        return this.client.voidInvoice(invoiceId, voidData as VoidInvoiceDto);
      }

      case 'send_invoice': {
        const { invoiceId, ...sendData } = input;
        if (!invoiceId) {
          throw new Error('invoiceId is required');
        }
        return this.client.sendInvoice(invoiceId, sendData as SendInvoiceDto);
      }

      case 'record_invoice_payment': {
        const { invoiceId, paymentData } = input;
        if (!invoiceId) {
          throw new Error('invoiceId is required');
        }
        if (!paymentData) {
          throw new Error('paymentData is required');
        }
        return this.client.recordInvoicePayment(invoiceId, paymentData as RecordPaymentDto);
      }

      case 'text2pay_invoice': {
        const { text2PayData } = input;
        if (!text2PayData) {
          throw new Error('text2PayData is required');
        }
        return this.client.text2PayInvoice(text2PayData as Text2PayDto);
      }

      case 'update_invoice_last_visited': {
        const { invoiceId } = input;
        if (!invoiceId) {
          throw new Error('invoiceId is required');
        }
        const payload: PatchInvoiceStatsLastViewedDto = { invoiceId };
        return this.client.updateInvoiceLastVisitedAt(payload);
      }

      case 'create_estimate':
        return this.client.createEstimate(input as CreateEstimatesDto);

      case 'list_estimates':
        return this.client.listEstimates(input);

      case 'update_estimate': {
        const { estimateId, estimateData } = input;
        if (!estimateId) {
          throw new Error('estimateId is required');
        }
        if (!estimateData) {
          throw new Error('estimateData is required');
        }
        return this.client.updateEstimate(estimateId, estimateData as UpdateEstimateDto);
      }

      case 'delete_estimate': {
        const { estimateId, altId } = input;
        if (!estimateId) {
          throw new Error('estimateId is required');
        }
        const deleteData = (altId ? { altId, altType: 'location' as const } : {}) as AltDto;
        return this.client.deleteEstimate(estimateId, deleteData);
      }

      case 'send_estimate': {
        const { estimateId, ...sendData } = input;
        if (!estimateId) {
          throw new Error('estimateId is required');
        }
        return this.client.sendEstimate(estimateId, sendData as SendEstimateDto);
      }

      case 'create_invoice_from_estimate': {
        const { estimateId, invoiceData } = input;
        if (!estimateId) {
          throw new Error('estimateId is required');
        }
        if (!invoiceData) {
          throw new Error('invoiceData is required');
        }
        return this.client.createInvoiceFromEstimate(estimateId, invoiceData as CreateInvoiceFromEstimateDto);
      }

      case 'update_estimate_last_visited': {
        const { estimateId } = input;
        if (!estimateId) {
          throw new Error('estimateId is required');
        }
        const payload: EstimateIdParam = { estimateId };
        return this.client.updateEstimateLastVisitedAt(payload);
      }

      case 'generate_invoice_number':
        return this.client.generateInvoiceNumber(input);

      case 'generate_estimate_number':
        return this.client.generateEstimateNumber(input);

      case 'list_estimate_templates':
        return this.client.listEstimateTemplates(input);

      case 'create_estimate_template': {
        const { templateData } = input;
        if (!templateData) {
          throw new Error('templateData is required');
        }
        return this.client.createEstimateTemplate(templateData as EstimateTemplatesDto);
      }

      case 'update_estimate_template': {
        const { templateId, templateData } = input;
        if (!templateId) {
          throw new Error('templateId is required');
        }
        if (!templateData) {
          throw new Error('templateData is required');
        }
        return this.client.updateEstimateTemplate(templateId, templateData as EstimateTemplatesDto);
      }

      case 'delete_estimate_template': {
        const { templateId, altId } = input;
        if (!templateId) {
          throw new Error('templateId is required');
        }
        const deleteData = (altId ? { altId, altType: 'location' as const } : {}) as AltDto;
        return this.client.deleteEstimateTemplate(templateId, deleteData);
      }

      case 'preview_estimate_template':
        if (!input.templateId) {
          throw new Error('templateId is required');
        }
        return this.client.previewEstimateTemplate(input);

      default:
        throw new Error(`Unknown invoices tool: ${name}`);
    }
  }


  getToolDefinitions(): Tool[] { return this.getTools(); }
  async executeTool(name: string, args: any): Promise<any> { return this.handleToolCall(name, args); }
}
