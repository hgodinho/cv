import React, { useCallback, useEffect, useState } from "react";
import { useCVContext } from "../cv";
import { LinkObject, NodeObject } from "react-force-graph-3d";
import { FilterLinksFN, FilterNodesFN } from "./";
import { FilterContext } from "./Context";
import { useI18nContext } from "../i18n";

export function FilterProvider({ children }: React.PropsWithChildren<{}>) {
    const { locale } = useI18nContext();
    const cv = useCVContext();

    const [filteredNodes, setNodes] = useState<NodeObject[] | undefined>(cv.nodes);
    const [filteredLinks, setLinks] = useState<LinkObject[] | undefined>(cv.links);

    const filterNodes = useCallback(
        (filter: FilterNodesFN) => {
            setNodes(filter(filteredNodes, cv.nodes));
        },
        [cv.nodes, filteredNodes]
    );

    const filterLinks = useCallback(
        (filter: FilterLinksFN) => {
            setLinks(filter(filteredLinks, cv.links));
        },
        [cv.links, filteredLinks]
    );

    useEffect(() => {
        setNodes(cv.nodes);
        setLinks(cv.links);
    }, [locale])

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
