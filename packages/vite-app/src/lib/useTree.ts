import { useCallback, useMemo, useEffect } from "react";
import {
    ITreeViewOnNodeSelectProps,
    flattenTree,
    NodeId,
} from "react-accessible-treeview";

import { useFilterContext } from "@/provider";
import { alphaHex } from ".";

export function useTree() {
    const {
        data: { colors },
        nodes,
        filterNodes,
        filterLinks,
    } = useFilterContext();

    const { treeData, initialSelectedIds } = useMemo(() => {
        const lvls = {
            one: (type: string) => alphaHex(colors[type], 0.9),
            two: (type: string) => alphaHex(colors[type], 0.6),
        };

        const childrenObject = nodes.reduce((acc, cur) => {
            if (!acc.hasOwnProperty(cur.type)) {
                acc[cur.type] = {
                    name: cur.type,
                    id: cur.type,
                    metadata: {
                        color: lvls.one(cur.type),
                    },
                    children: [
                        {
                            name: cur.name,
                            id: cur.id,
                            metadata: {
                                ...cur,
                                color: lvls.two(cur.type),
                            },
                        },
                    ],
                };
            } else {
                acc[cur.type].children.push({
                    name: cur.name,
                    id: cur.id,
                    metadata: {
                        ...cur,
                        color: lvls.two(cur.type),
                    },
                });
            }
            return acc;
        }, {});

        const initialSelectedIds = nodes.reduce((acc, cur) => {
            if (!acc.includes(cur.type)) {
                acc.push(cur.type);
            }
            if (!acc.includes(cur.id)) {
                acc.push(cur.id);
            }
            return acc;
        }, []);

        return {
            initialSelectedIds: initialSelectedIds as NodeId[],
            treeData: flattenTree({
                name: "Filter",
                children: Object.values(childrenObject),
            }),
        };
    }, [nodes]);

    const onCheck = useCallback(
        (props: ITreeViewOnNodeSelectProps) => {
            filterNodes((filteredNodes, nodes) => {
                const nodesFiltered = nodes.filter((node) => {
                    // @ts-ignore
                    if (props.treeState?.selectedIds.has(node.id)) {
                        return true;
                    } else {
                        return false;
                    }
                });
                return nodesFiltered;
            });

            filterLinks((filteredLinks, links) => {
                const linksFiltered = links.filter((link) => {
                    if (
                        // @ts-ignore
                        props.treeState?.selectedIds.has(link.source.id) &&
                        // @ts-ignore
                        props.treeState?.selectedIds.has(link.target.id)
                    ) {
                        return true;
                    } else {
                        return false;
                    }
                });
                return linksFiltered;
            });
        },
        [filterNodes, filterLinks]
    );

    useEffect(() => {
        filterNodes((filteredNodes, nodes) => {
            return nodes;
        });
        filterLinks((filteredLinks, links) => {
            return links;
        });
    }, []);

    return {
        treeData,
        initialSelectedIds,
        colors,
        onCheck,
    };
}
