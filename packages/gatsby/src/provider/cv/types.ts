import type {
    Graph,
    LinkObject,
    NodeObject,
} from "@hgod-in-cv/data/dist/types";

export type CVContextState = {
    selected?: NodeObject;
    connectedTo?: LinkObject[];
};

export type CVContextType = CVContextState & {
    headerRef: React.RefObject<HTMLHeadingElement>;
    graph: Graph;

    nodes: NodeObject[];
    links: LinkObject[];

    properties: Record<string, string>;

    setSelected: (node: NodeObject) => void;
};
