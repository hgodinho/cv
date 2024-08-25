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

export const NODE_TYPES = {
    Graph: "Graph",
    Person: "Person",
    Place: "Place",
    Certification: "Certification",
    Article: "Article",
    CreativeWork: "CreativeWork",
    Chapter: "Chapter",
    Organization: "Organization",
    Event: "Event",
    Role: "Role",
    Properties: "Properties",
} as const;
