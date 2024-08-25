import React, { useCallback, useState } from "react";
import { useCVContext } from "../cv";
import { LinkObject, NodeObject } from "react-force-graph-3d";
import { FilterLinksFN, FilterNodesFN } from "#root/types";
import { FilterContext } from "./Context";

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
