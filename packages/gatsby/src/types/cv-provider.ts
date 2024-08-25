import { PropsWithChildren } from "react";
import { LinkObject, NodeObject } from "react-force-graph-3d";

export type CVContextState = {
    selected: NodeObject;
    connectedTo: LinkObject[];
};

export type CVContextType = CVContextState & {
    headerRef: React.RefObject<HTMLHeadingElement>;
    nodes: NodeObject[];
    links: LinkObject[];
    properties: string[];

    setSelected: (node: NodeObject) => void;
};

export type CVProviderProps = PropsWithChildren<{
    selected: NodeObject;

    pageContext: {
        nodes: NodeObject[];
        links: LinkObject[];
        properties: string[];
    };
}>;
