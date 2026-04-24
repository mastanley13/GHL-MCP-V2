/**
 * LocationKeyManager — resolves which API key and location ID to use
 * for a given tool call. Supports:
 *   - Agency-level API key (GHL_AGENCY_API_KEY / GHL_API_KEY)
 *   - Per-location PIT keys (GOLF_PLACE_API_KEY, STRATEGIXAI_API_KEY, etc.)
 *   - Runtime overrides via tool call arguments (apiKey, locationId)
 */

export interface ResolvedAuth {
  apiKey: string;
  locationId: string;
}

export interface LocationEntry {
  apiKey: string;
  locationId: string;
  label: string;
}

export class LocationKeyManager {
  private agencyKey: string;
  private defaultLocationId: string;
  private locations: Map<string, LocationEntry> = new Map();

  constructor() {
    this.agencyKey = process.env.GHL_AGENCY_API_KEY || process.env.GHL_API_KEY || '';
    this.defaultLocationId = process.env.GHL_LOCATION_ID || '';

    // Register known per-location PIT keys from env
    this.registerFromEnv('GOLF_PLACE', 'Golf Place');
    this.registerFromEnv('STRATEGIXAI', 'StrategixAI');

    console.log(`[LocationKeyManager] Agency key: ${this.agencyKey ? 'set' : 'MISSING'}`);
    console.log(`[LocationKeyManager] Default location: ${this.defaultLocationId}`);
    console.log(`[LocationKeyManager] Registered locations: ${this.locations.size}`);
  }

  private registerFromEnv(prefix: string, label: string): void {
    const apiKey = process.env[`${prefix}_API_KEY`];
    const locationId = process.env[`${prefix}_LOCATION_ID`];
    if (apiKey && locationId) {
      this.locations.set(locationId, { apiKey, locationId, label });
      console.log(`[LocationKeyManager]   ${label}: ${locationId}`);
    }
  }

  /**
   * Resolve which API key + locationId to use for a request.
   * Priority:
   *   1. Explicit overrides in args (apiKey / locationId)
   *   2. If locationId matches a registered PIT key, use that
   *   3. Fall back to agency key + default location
   */
  resolve(args?: Record<string, any>): ResolvedAuth {
    // 1. Explicit override
    if (args?.apiKey) {
      return {
        apiKey: args.apiKey,
        locationId: args.locationId || this.defaultLocationId
      };
    }

    // 2. Location-specific PIT key
    const locId = args?.locationId || args?.altId || this.defaultLocationId;
    const entry = this.locations.get(locId);
    if (entry) {
      return { apiKey: entry.apiKey, locationId: entry.locationId };
    }

    // 3. Agency / default
    return { apiKey: this.agencyKey, locationId: locId || this.defaultLocationId };
  }

  /** List all registered locations */
  getLocations(): LocationEntry[] {
    return Array.from(this.locations.values());
  }
}
