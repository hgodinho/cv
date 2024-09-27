import { LinkObject, NodeObject } from "react-force-graph-3d";

import { NODE_TYPES } from "./constants";
import { JsonLdArray } from "jsonld/jsonld-spec";
import jsonld from "jsonld";

export { NodeObject, LinkObject };

export type Locale = {
    lang: string;
    name: string;
    icon: string;
    principal: boolean;
};

export type LOCALES = "en" | "pt_br" | "es";

export type Locales = Record<LOCALES, Locale>;

export type JsonLD = {
    raw: jsonld.JsonLdDocument;
    expanded: JsonLdArray;
    compacted: jsonld.NodeObject;
    flattened: jsonld.NodeObject;
    nquads: Awaited<ReturnType<typeof jsonld.toRDF>>;
};

export type Nodes = Record<LOCALES, NodeObject[]>;

export type Links = Record<LOCALES, LinkObject[]>;

export type Graph = {
    nodes: Nodes;
    links: Links;
};

export type Properties = Record<LOCALES, [string, string]>;
export type Classes = Record<LOCALES, [string, string]>;

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

export type PageQueryResponse = {
    graph: Graph;
    properties: Properties;
    classes: Classes;
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
    properties: Properties;
    classes: Classes;
    graph: Graph;
    // locale: LOCALES;
    locales: Locales;
    site: {
        title: string;
        siteUrl: string;
        description: string;
    };
};
