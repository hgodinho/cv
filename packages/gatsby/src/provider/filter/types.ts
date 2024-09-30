import { LinkObject, NodeObject } from "react-force-graph-3d";
import { CVContextType } from "../cv/types";

export type FilterNodesFN = (
    filteredNodes?: NodeObject[],
    nodes?: NodeObject[]
) => NodeObject[];

export type FilterLinksFN = (
    filteredLinks?: LinkObject[],
    links?: LinkObject[]
) => LinkObject[];

export type FilterContextType = CVContextType & {
    filteredNodes?: NodeObject[];
    filterNodes: (callback: FilterNodesFN) => void;
    filteredLinks?: LinkObject[];
    filterLinks: (callback: FilterLinksFN) => void;
};
