/**
 * Domain-specific API client barrel exports.
 * Each domain module re-exports the GHLApiClient for use by its
 * corresponding tool module, making dependencies explicit.
 * 
 * Future refactoring: extract each domain's methods into its own
 * class that the main GHLApiClient delegates to.
 */
export { GHLApiClient } from '../ghl-api-client.js';
