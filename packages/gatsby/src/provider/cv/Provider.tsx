import { CVContextState, CVContextType } from "./types";
import React, {
    useCallback,
    useEffect,
    useMemo,
    useReducer,
    useRef,
} from "react";
import { NodeObject } from "react-force-graph-3d";
import { CVContext } from "./Context";
import { defaultCVContext } from "./defaultContext";

import { usePageContext } from "../page";
import { useI18nContext } from "../i18n";

export function CVProvider({ children }: React.PropsWithChildren<{}>) {
    const context = usePageContext();

    const { locale, setLocale } = useI18nContext();

    const { nodes, links, properties, classes, meta } = useMemo(() => {
        return {
            nodes: context.pageContext?.graph.nodes[locale],
            links: context.pageContext?.graph.links[locale],
            meta: context.pageContext?.meta?.[locale],
            properties: context.pageContext?.properties[locale].reduce(
                (acc, [key, label]) => {
                    acc[key] = label;
                    return acc;
                },
                {} as Record<string, string>
            ),
            classes: context.pageContext?.classes[locale].reduce(
                (acc, [key, label]) => {
                    acc[key] = label;
                    return acc;
                },
                {} as Record<string, string>
            ),
        };
    }, [
        locale,
        context.pageContext?.graph,
        context.pageContext?.properties,
        context.pageContext?.classes,
    ]);

    // Reference to the header element
    const headerRef = useRef<HTMLHeadingElement>(null);

    const [state, setState] = useReducer(
        (state: CVContextState, partial: Partial<CVContextState>) => {
            return { ...state, ...partial };
        },
        {
            selected: Object.values(context.data || {})[0] as NodeObject,
            connectedTo: [],
        }
    );

    const setSelected = useCallback(
        (selected: NodeObject) => {
            if (selected.path !== state.selected?.path) {
                setState({ selected });
            }
        },
        [state.selected]
    );

    useEffect(() => {
        const selected = Object.values(context.data || {})[0] as NodeObject;
        if (
            (selected && selected.id !== state.selected?.id) ||
            (selected && selected._id !== state.selected?._id)
        ) {
            const connectedTo = links?.filter((link) => {
                // @ts-ignore
                return link.target?._id === selected._id;
            });
            setState({ selected, connectedTo });
            setLocale(selected.locale);
        }
        context.setNavigating(false);
    }, [context.data, links]);

    useEffect(() => {
        if (
            context.path?.includes(
                `/${context.pageContext?.site.textSlug ?? "text"}`
            )
        ) {
            context.setNavigating(true);
            context.navigate(
                `/${locale}/${context.pageContext?.site.textSlug ?? "text"}`
            );
        }
        if (state.selected && state.selected.locale !== locale) {
            const found = nodes?.find(
                (node) => node._id === state.selected?._id
            );
            if (found && !context.navigating) {
                const url = `/${locale}/${found.path}`;
                if (!context.location?.pathname.includes(url)) {
                    context.setNavigating(true);
                    context.navigate(url);
                    headerRef.current?.focus();
                }
            }
        }
    }, [
        locale,
        nodes,
        state.selected,
        context.path,
        context.navigating,
        context.pageContext?.site.textSlug,
    ]);

    const cv: CVContextType = {
        ...defaultCVContext,
        headerRef,
        graph: context.pageContext?.graph,
        properties,
        classes,
        nodes,
        links,
        meta,
        selected: state.selected,
        connectedTo: state.connectedTo,
        setSelected,
    };

    return <CVContext.Provider value={cv}>{children}</CVContext.Provider>;
}
