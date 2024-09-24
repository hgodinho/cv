import { CVContextState, CVContextType } from "./types";
import React, {
    useCallback,
    useEffect,
    useMemo,
    useReducer,
    useRef,
} from "react";
import { LinkObject, NodeObject } from "react-force-graph-3d";
import { CVContext } from "./Context";
import { defaultCVContext } from "./defaultContext";

import { navigate } from "gatsby";
import { FilterProvider } from "../filter";
import { usePageContext } from "../page";
import { LOCALES, Properties } from "@hgod-in-cv/data/src/types";
import { I18nProviderType, useI18nContext } from "../i18n";

export function CVProvider({ children }: React.PropsWithChildren<{}>) {
    const {
        pageContext: { graph, properties: pageProperties },
        location: { pathname },
        data,
    } = usePageContext();

    const { locale } = useI18nContext();

    const { nodes, links, properties } = useMemo(() => {
        return {
            nodes: graph.nodes[locale],
            links: graph.links[locale],
            properties: pageProperties[locale].reduce((acc, [key, label]) => {
                acc[key] = label;
                return acc;
            }, {} as Record<string, string>),
        };
    }, [locale, graph, pageProperties]);

    // Reference to the header element
    const headerRef = useRef<HTMLHeadingElement>(null);

    const [state, setState] = useReducer(
        (state: CVContextState, partial: Partial<CVContextState>) => {
            return { ...state, ...partial };
        },
        {
            selected: Object.values(data)[0] as NodeObject,
            connectedTo: [],
        }
    );

    const getNodeByID = useCallback(
        (id: string, locale: LOCALES = "en") =>
            graph.nodes[locale].find((node) => {
                return id === node._id;
            }),
        [graph.nodes]
    );

    const setSelected = useCallback(
        (selected: NodeObject) => {
            if (selected.path !== state.selected?.path) {
                setState({ selected });
            }
        },
        [state.selected]
    );

    const setConnectedTo = useCallback((connectedTo: LinkObject[]) => {
        setState({ connectedTo });
    }, []);

    useEffect(() => {
        const selected = Object.values(data)[0] as NodeObject;
        if (selected) {
            const connectedTo = links.filter((link) => {
                // @ts-ignore
                return link.target?._id === selected._id;
            });
            // setSelected(selected);
            // setConnectedTo(connectedTo);
            setState({ selected, connectedTo });
        }
    }, [data]);

    useEffect(() => {
        if (state.selected && state.selected.locale !== locale) {
            const found = nodes.find(
                (node) => node._id === state.selected?._id
            );
            if (found) {
                const url = `/${locale}/${found.path}`;
                if (!pathname.includes(url)) {
                    console.log("I18nProvider found", {
                        url,
                        locale,
                        pathname,
                        found,
                    });
                    navigate(url);
                }
            }
        }
    }, [locale, nodes, state.selected]);

    useEffect(() => {
        console.log({ selected: state.selected });
    }, [state.selected]);

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

    const cv: CVContextType = {
        ...defaultCVContext,
        headerRef,
        graph,
        properties,
        nodes,
        links,
        selected: state.selected,
        connectedTo: state.connectedTo,
        setSelected,
    };

    return <CVContext.Provider value={cv}>{children}</CVContext.Provider>;
}
