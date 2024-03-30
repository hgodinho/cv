import { createContext, useContext, useState, useCallback } from "react";
import { CVContextType, defaultCVContext, CVContext } from ".";
import type { NodeObject, LinkObject } from "react-force-graph-3d";

export type FilterNodesFN = (
    filteredNodes: NodeObject[],
    nodes: NodeObject[]
) => NodeObject[];

export type FilterLinksFN = (
    filteredLinks: LinkObject[],
    links: LinkObject[]
) => LinkObject[];

export type FilterContextType = CVContextType & {
    filteredNodes: NodeObject[];
    filterNodes: (callback: FilterNodesFN) => void;
    filteredLinks: LinkObject[];
    filterLinks: (callback: FilterLinksFN) => void;
};

export const FilterContext = createContext<FilterContextType>({
    ...defaultCVContext,
    filteredNodes: [],
    filterNodes: () => { },
    filteredLinks: [],
    filterLinks: () => { },
});

export function FilterProvider({ children }: React.PropsWithChildren<{}>) {
    const context = useContext(CVContext);

    const [filteredNodes, setNodes] = useState<NodeObject[]>(context.nodes);
    const [filteredLinks, setLinks] = useState<LinkObject[]>(context.links);

    const filterNodes = useCallback(
        (filter: FilterNodesFN) => {
            setNodes(filter(filteredNodes, context.nodes));
        },
        [context.nodes]
    );

    const filterLinks = useCallback(
        (filter: FilterLinksFN) => {
            setLinks(filter(filteredLinks, context.links));
        },
        [context.links]
    );

    return (
        <FilterContext.Provider
            value={{
                ...context,
                filteredNodes,
                filterNodes,
                filteredLinks,
                filterLinks,
            }}
        >
            {children}
        </FilterContext.Provider>
    );
}
