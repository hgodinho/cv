import type {
    Graph,
    LinkObject,
    NodeObject,
    MetaEndpoint
} from "@hgod-in-cv/data/dist/types";

export type CVContextState = {
    selected?: NodeObject;
    connectedTo?: LinkObject[];
};

export type CVContextType = CVContextState & Partial<{
    headerRef: React.RefObject<HTMLHeadingElement>;
    graph: Graph;

    nodes: NodeObject[];
    links: LinkObject[];
    meta?: MetaEndpoint[];

    properties: Record<string, string>;
    classes: Record<string, string>;

    setSelected: (node: NodeObject) => void;
}>;
