import { createContext, useContext, useState, useCallback } from "react";
import { CVContextType, defaultCVContext, useCVContext } from ".";
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
    filterNodes: () => {},
    filteredLinks: [],
    filterLinks: () => {},
});

export function FilterProvider({ children }: React.PropsWithChildren<{}>) {
    const cv = useCVContext();

    const { nodes, links } = cv;

    const [filteredNodes, setNodes] = useState<NodeObject[]>(nodes);
    const [filteredLinks, setLinks] = useState<LinkObject[]>(links);

    const filterNodes = useCallback(
        (filter: FilterNodesFN) => {
            setNodes(filter(filteredNodes, nodes));
        },
        [nodes, filteredNodes]
    );

    const filterLinks = useCallback(
        (filter: FilterLinksFN) => {
            setLinks(filter(filteredLinks, links));
        },
        [links, filteredLinks]
    );

    return (
        <FilterContext.Provider
            value={{
                ...cv,
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

export function useFilterContext() {
    const context = useContext(FilterContext);
    return context;
}
