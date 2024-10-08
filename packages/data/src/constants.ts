export const CACHE_KEYS = {
    Timestamp: `timestamp`,
} as const;

/**
 * The IDs for your errors can be arbitrary (since they are scoped to your plugin), but it's good practice to have a system for them.
 * For example, you could start all third-party API errors with 1000x, all transformation errors with 2000x, etc.
 */
export const ERROR_CODES = {
    GraphQLSourcing: `10000`,
} as const;

export const ENDPOINTS = {
    Person: "Person",
    Intangible: "Intangible",
    Place: "Place",
    Credential: "Credential",
    CreativeWork: "CreativeWork",
    Event: "Event",
    Organization: "Organization",
} as const;

export const NODE_TYPES = {
    Meta: "Meta",
    Locales: "Locales",
    Graph: "Graph",
    Properties: "Properties",
    Classes: "Classes",
    ...ENDPOINTS,
} as const;
