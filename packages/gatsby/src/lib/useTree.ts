import { useCallback, useEffect, useMemo } from "react";
import {
    flattenTree,
    ITreeViewOnNodeSelectProps,
    NodeId,
} from "react-accessible-treeview";

import type { TreeViewProps } from "#root/components";
import { useFilterContext, useI18nContext, useTheme } from "#root/provider";
import { getType } from "@hgod-in-cv/data/dist/utils";
import { NodeObject } from "react-force-graph-3d";
import { alphaHex } from ".";

export function useTree() {
    const {
        graph: { nodes },
        selected,
        filteredNodes,
        setSelected,
        filterNodes,
        filterLinks,
    } = useFilterContext();

    const { locale } = useI18nContext();

    const { colors } = useTheme();

    const { treeData, initialSelectedIds } = useMemo(() => {
        const lvls = {
            one: (type: string) => alphaHex(colors[type], 0.9),
            two: (type: string) => alphaHex(colors[type], 0.6),
        };

        const childrenObject = nodes[locale].reduce((acc, cur) => {
            const type = getType(cur);

            if (!acc.hasOwnProperty(type)) {
                if (type === cur._type) {
                    acc[type] = {
                        name: type,
                        id: type,
                        metadata: {
                            color: lvls.one(type),
                        },
                        children: [
                            {
                                name: cur.name,
                                id: cur.id,
                                metadata: {
                                    ...cur,
                                    color: lvls.two(type),
                                },
                            },
                        ],
                    };
                } else {
                    acc[type] = {
                        name: type,
                        id: type,
                        metadata: {
                            color: lvls.one(type),
                        },
                        children: [
                            {
                                name: cur._type,
                                id: cur._type,
                                metadata: {
                                    color: lvls.two(type),
                                },
                                children: [
                                    {
                                        name: cur.name,
                                        id: cur.id,
                                        metadata: {
                                            ...cur,
                                            color: lvls.two(type),
                                        },
                                    },
                                ],
                            },
                        ],
                    };
                }
            } else {
                if (type === cur._type) {
                    acc[type].children.push({
                        name: cur.name,
                        id: cur.id,
                        metadata: {
                            ...cur,
                            color: lvls.two(type),
                        },
                    });
                } else {
                    const found = acc[type].children.find(
                        (child: NodeObject) => child.id === cur._type
                    );
                    if (found) {
                        found.children.push({
                            name: cur.name,
                            id: cur.id,
                            metadata: {
                                ...cur,
                                color: lvls.two(type),
                            },
                        });
                    } else {
                        acc[type].children.push({
                            name: cur._type,
                            id: cur._type,
                            metadata: {
                                color: lvls.two(type),
                            },
                            children: [
                                {
                                    name: cur.name,
                                    id: cur.id,
                                    metadata: {
                                        ...cur,
                                        color: lvls.two(type),
                                    },
                                },
                            ],
                        });
                    }
                }
            }

            return acc;
        }, {});

        const initialSelectedIds = nodes[locale].reduce((acc, cur) => {
            if (cur.type && !acc.includes(cur.type)) {
                acc.push(cur.type);
            }
            if (cur.id && !acc.includes(cur.id)) {
                acc.push(cur.id);
            }
            return acc;
        }, []);

        return {
            initialSelectedIds: initialSelectedIds as NodeId[],
            treeData: flattenTree({
                name: "Filter",
                children: Object.values(childrenObject || {}),
            }),
        };
    }, [nodes]);

    const onCheck = useCallback(
        (props: ITreeViewOnNodeSelectProps, mode: TreeViewProps["mode"]) => {
            if (mode === "link") {
                // this is a hack to make sure the selected node is the last one
                if (props.element.id !== props.treeState?.lastUserSelect) {
                    return;
                }
                const found = filteredNodes.find(
                    (node) => node.id === props.element.id
                );
                if (found) {
                    setSelected(found);
                }
                return;
            }

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
        [filteredNodes]
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
