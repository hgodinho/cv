import { SourceNodesArgs } from "gatsby";
import { NODE_TYPES } from "./constants";
import { LinkObject, NodeObject } from "react-force-graph-3d";

export type Graph = {
    nodes: NodeObject[];
    links: LinkObject[];
};

export type Properties = { list: string[] };

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

export type Certification = Base;

export type Article = Base;

export type CreativeWork = Base;

export type Chapter = Base;

export type Organization = Base;

export type Event = Base;

export type Role = Base;

export type UnionSchemaType =
    | Person
    | Place
    | Certification
    | Article
    | CreativeWork
    | Chapter
    | Organization
    | Event
    | Role;

export type NodeBuilderInput =
    | { type: typeof NODE_TYPES.Graph; data: Graph }
    | { type: typeof NODE_TYPES.Properties; data: Properties }
    | { type: typeof NODE_TYPES.Person; data: Person }
    | { type: typeof NODE_TYPES.Place; data: Place }
    | { type: typeof NODE_TYPES.Certification; data: Certification }
    | { type: typeof NODE_TYPES.Article; data: Article }
    | { type: typeof NODE_TYPES.CreativeWork; data: CreativeWork }
    | { type: typeof NODE_TYPES.Chapter; data: Chapter }
    | { type: typeof NODE_TYPES.Organization; data: Organization }
    | { type: typeof NODE_TYPES.Event; data: Event }
    | { type: typeof NODE_TYPES.Role; data: Role };

export type NodeBuilderArgs = {
    gatsbyApi: SourceNodesArgs;
    input: NodeBuilderInput;
    id: string;
};

export type PageQueryResponse = {
    graph: {
        nodes: NodeObject[];
        links: LinkObject[];
    };
    properties: {
        list: string[];
    };
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
