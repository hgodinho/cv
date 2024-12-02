import type { LinkObject, NodeObject } from "react-force-graph-3d";

export { NodeObject, LinkObject };

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
} as const;

export const META_TYPES = {
    Classes: "Classes",
    Properties: "Properties",
    Locales: "Locales",
    Meta: "Meta",
} as const;

export type FetchProps = {
    apiBase: string;
    apiId: string;
    apiToken: string;
    route?: string;
};

export type Locale = {
    lang: LOCALES;
    name: string;
    icon: string;
    principal: boolean;
};

export type LOCALES = "en" | "pt_br" | "es";

export type Locales = Record<LOCALES, Locale>;

export type Nodes<T> = Record<LOCALES, T[]>;

export type Links<T> = Record<LOCALES, T[]>;

export type Graph<Node, Link> = {
    nodes: Node;
    links: Link;
};

export type Properties = Record<LOCALES, [string, string][]>;
export type Classes = Record<LOCALES, [string, string][]>;

export type Base<T = UnionSchemaType | UnionSchemaType[] | string | string[]> =
    {
        "@context": string;
        "@id": string;
        _id: string;
        _context: string;
        type: string;
        name: string;
        [x: string]: T | string;
    };

export type Person<T = unknown> = Base<T>;

export type Place<T = unknown> = Base<T>;

export type Credential<T = unknown> = Base<T>;

export type Intangible<T = unknown> = Base<T>;

export type CreativeWork<T = unknown> = Base<T>;

export type Organization<T = unknown> = Base<T>;

export type Event<T = unknown> = Base<T>;

export type UnionSchemaType =
    | Person
    | Place
    | Intangible
    | Credential
    | CreativeWork
    | Organization
    | Event;

export type NodeType =
    | keyof typeof NODE_TYPES
    | keyof typeof META_TYPES
    | LOCALES;

export interface NodeInput {
    type: NodeType;
    data: any;
}

export interface NodeBuilderArgs {
    gatsbyApi: any;
    id: string;
    input: NodeInput;
}

export type Meta = {
    title: string;
    type: string;
    description: string;
    allowed_types: string[];
};

export type MetaEndpoint = {
    endpoint: string;
    type: string;
    meta: Meta;
};

export type PageQueryResponse<Node, Link> = {
    graph: Graph<Node, Link>;
    properties: Properties;
    classes: Classes;
    locales: Locales;
    meta: Record<LOCALES, MetaEndpoint[]>;
    site: {
        siteMetadata: {
            siteUrl: string;
            textSlug: string;
            locales: Record<LOCALES, { title: string; description: string }>;
        };
    };
};

export type PageContext<Node, Link> = {
    id: string;
    name: string;
    type: string;
    properties: Properties;
    classes: Classes;
    graph: Graph<Node, Link>;
    meta: Record<LOCALES, MetaEndpoint[]>;
    locale: LOCALES;
    locales: Locales;
    site: {
        siteUrl: string;
        textSlug: string;
        locales: Record<LOCALES, { title: string; description: string }>;
    };
};

export type Connection = {
    source: UnionSchemaType;
    target: UnionSchemaType;
    predicate: string;
};

export type Reporter = {
    info: (message: string) => void;
    warn: (message: string) => void;
    error: (message: string) => void;
    success: (message: string) => void;
};
