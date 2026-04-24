# GHL API Client Domain Map

This documents which methods in `ghl-api-client.ts` belong to each domain.
Use this as a guide for future extraction into separate classes.

## Contacts (lines ~561-1700)
- createContact, getContact, updateContact, deleteContact, searchContacts
- getDuplicateContact, upsertContact, getContactsByBusiness, getContactAppointments
- addContactTags, removeContactTags, bulkUpdateContactTags
- getContactTasks, createContactTask, getContactTask, updateContactTask, deleteContactTask
- getContactNotes, createContactNote, getContactNote, updateContactNote, deleteContactNote
- addContactFollowers, removeContactFollowers
- addContactToCampaign, removeContactFromCampaign, removeContactFromAllCampaigns
- addContactToWorkflow, removeContactFromWorkflow

## Conversations (lines ~777-1000)
- searchConversations, getConversation, createConversation, updateConversation, deleteConversation
- getConversationMessages, getMessage, sendMessage, sendSMS, sendEmail

## Blog (lines ~1008-1180)
- getBlogSites, getBlogPosts, createBlogPost, updateBlogPost
- getBlogAuthors, getBlogCategories, checkUrlSlugExists

## Opportunities (lines ~1783-2060)
- searchOpportunities, getPipelines, getOpportunity, createOpportunity
- updateOpportunity, updateOpportunityStatus, upsertOpportunity, deleteOpportunity
- addOpportunityFollowers, removeOpportunityFollowers

## Calendars (lines ~2069-2440)
- getCalendarGroups, createCalendarGroup, getCalendars, createCalendar
- getCalendar, updateCalendar, deleteCalendar
- getCalendarEvents, getBlockedSlots, getFreeSlots
- createAppointment, getAppointment, updateAppointment, deleteAppointment

## Emails (lines ~2375-2500)
- getEmailCampaigns, createEmailTemplate, getEmailTemplates, updateEmailTemplate, deleteEmailTemplate

## Locations (lines ~2500-3500)
- searchLocations, getLocation, createLocation, updateLocation, deleteLocation
- Location tags, custom fields, custom values, templates, timezones

## SaaS API (lines ~3500-3800)
- saasPublic*, saas* methods

## Social Media (lines ~3900-4300)
- Social post CRUD, accounts, CSV operations, OAuth, analytics

## Media (lines ~4400-4500)
- getMediaFiles, uploadMediaFile, deleteMediaFile

## Objects & Associations (lines ~4500-5000)
- CRUD for custom objects, records, associations

## Payments (lines ~6800-7350+)
- Integration providers, orders, fulfillments, transactions
- Subscriptions, coupons, custom providers
- recordOrderPayment, getOrderNotes, updateCustomProviderCapabilities, migrateOrderPaymentSource

## Invoices (lines ~7500-8300+)
- Templates, schedules, CRUD, send, void, record payment

## Products & Store
- Products, prices, inventory, collections, reviews
- Shipping zones, rates, carriers, store settings
