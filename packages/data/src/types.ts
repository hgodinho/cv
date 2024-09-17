import { LinkObject, NodeObject } from "react-force-graph-3d";

import { NODE_TYPES } from "./constants";
import { JsonLdArray } from "jsonld/jsonld-spec";
import jsonld from "jsonld";

export type Locale = {
    lang: string;
    name: string;
    icon: string;
    principal: boolean;
};

export type LOCALES = "en" | "pt_br" | "es";

export type Locales = Record<LOCALES, Locale[]>;

export type JsonLD = {
    raw: jsonld.JsonLdDocument;
    expanded: JsonLdArray;
    compacted: jsonld.NodeObject;
    flattened: jsonld.NodeObject;
    nquads: Awaited<ReturnType<typeof jsonld.toRDF>>;
};

export type Graph = {
    nodes: Record<LOCALES, NodeObject[]>;
    links: Record<LOCALES, LinkObject[]>;
};

export type Properties = Record<LOCALES, string[]>;

export type Base = {
    "@context": string;
    "@id": string;
    type: string;
    _id: string;
    name: string;
    [x: string]: unknown;
};

export type Person = Base;

export type Place = Base;

export type Credential = Base;

export type Intangible = Base;

export type CreativeWork = Base;

export type Organization = Base;

export type Event = Base;

export type UnionSchemaType =
    | Person
    | Place
    | Intangible
    | Credential
    | CreativeWork
    | Organization
    | Event;

export type NodeType = keyof typeof NODE_TYPES | LOCALES;

export interface NodeInput {
    type: NodeType;
    data: any;
}

export interface NodeBuilderArgs {
    gatsbyApi: any;
    id: string;
    input: NodeInput;
}

// export type NodeBuilderInput =
//     | { type: typeof NODE_TYPES.Locales; data: Locales }
//     | { type: typeof NODE_TYPES.Graph; data: Graph }
//     | { type: typeof NODE_TYPES.Properties; data: Properties }
//     | { type: LOCALES; data: NodeObject[] }
//     | { type: typeof NODE_TYPES.Person; data: Person }
//     | { type: typeof NODE_TYPES.Place; data: Place }
//     | { type: typeof NODE_TYPES.Credential; data: Credential }
//     | { type: typeof NODE_TYPES.Intangible; data: Intangible }
//     | { type: typeof NODE_TYPES.CreativeWork; data: CreativeWork }
//     | { type: typeof NODE_TYPES.Organization; data: Organization }
//     | { type: typeof NODE_TYPES.Event; data: Event };

// export type NodeBuilderArgs = {
//     gatsbyApi: SourceNodesArgs;
//     input: NodeBuilderInput;
//     id: string;
// };

export type PageQueryResponse = {
    graph: Graph;
    properties: Properties;
    locales: Locales;
    site: {
        siteMetadata: {
            title: string;
            siteUrl: string;
            description: string;
        };
    };
};

export type PageContext = {
    id: string;
    name: string;
    type: string;
    properties: string[];
    nodes: NodeObject[];
    links: LinkObject[];
    site: {
        title: string;
        siteUrl: string;
        description: string;
    };
};
