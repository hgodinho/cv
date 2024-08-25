import { CVContextState, CVProviderProps } from "#root/types";
import React, { useCallback, useEffect, useReducer, useRef } from "react";
import { LinkObject, NodeObject } from "react-force-graph-3d";
import { CVContext } from "./Context";
import { defaultCVContext } from "./defaultContext";

import { navigate } from "gatsby";
import { FilterProvider } from "../filter";

export function CVProvider({
    children,
    selected,
    pageContext,
}: CVProviderProps) {
    const { nodes, links, properties } = pageContext;
    // Reference to the header element
    const headerRef = useRef<HTMLHeadingElement>(null);

    const [state, setState] = useReducer(
        (state: CVContextState, partial: Partial<CVContextState>) => {
            return { ...state, ...partial };
        },
        {
            selected,
            connectedTo: [],
        }
    );

    const filterNodes = useCallback(
        (search: string) =>
            nodes.find((node) => {
                return search === node._id;
            }),
        [nodes]
    );

    // const setSelected = useCallback((selected: NodeObject) => {
    //     setState({ selected });
    // }, []);

    // const setConnectedTo = useCallback((connectedTo: LinkObject[]) => {
    //     setState({ connectedTo });
    // }, []);

    // useEffect(() => {
    //     const found = filterNodes(`${type}/${id}`);
    //     if (found) {
    //         const connectedTo = links.filter((link) => {
    //             return link.object === found.id;
    //         });
    //         setState({ selected: found, connectedTo });
    //     }
    // }, [type, id]);

    /**
     * Navigate to the selected node
     */
    // useEffect(() => {
    //     const path = state.selected ? `/${state.selected._id}` : false;
    //     console.log({ selected: state.selected, path });
    //     if (path) {
    //         navigate(path);
    //         headerRef.current?.focus();
    //     }
    // }, [state.selected, navigate]);

    useEffect(() => {
        console.log("CVProvider", {
            selected,
            nodes,
            links,
            properties,
        });
    }, [selected, nodes, links, properties]);

    return (
        <CVContext.Provider
            value={{
                ...defaultCVContext,
                headerRef,
                properties,
                nodes,
                links,
                selected,
                // connectedTo,
            }}
        >
            <FilterProvider>{children}</FilterProvider>
        </CVContext.Provider>
    );
}
