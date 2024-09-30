import { useCallback, useEffect, useMemo } from "react";
import {
    flattenTree,
    ITreeViewOnNodeSelectProps,
    NodeId,
} from "react-accessible-treeview";

import type { TreeViewProps } from "#root/components";
import { useFilterContext, useI18nContext, useTheme } from "#root/provider";
import { getType } from "@hgod-in-cv/data/dist/utils";
import { LinkObject, NodeObject } from "react-force-graph-3d";

export function useTree() {
    const {
        graph,
        selected,
        classes,
        filteredNodes,
        setSelected,
        filterNodes,
        filterLinks,
    } = useFilterContext();

    const { locale } = useI18nContext();

    const { colors } = useTheme();

    const { treeData, initialSelectedIds } = useMemo(() => {
        const childrenObject = graph?.nodes[locale].reduce((acc, cur) => {
            const type = getType(cur);

            if (!acc.hasOwnProperty(type)) {
                if (type === cur._type) {
                    acc[type] = {
                        name: classes?.[type],
                        id: type,
                        metadata: {
                            color: colors[cur._type],
                        },
                        children: [
                            {
                                name: cur.name,
                                id: cur.id,
                                metadata: {
                                    ...cur,
                                    color: colors[cur._type],
                                },
                            },
                        ],
                    };
                } else {
                    acc[type] = {
                        name: classes?.[type],
                        id: type,
                        metadata: {
                            color: colors[cur._type],
                        },
                        children: [
                            {
                                name: classes?.[cur._type],
                                id: cur._type,
                                metadata: {
                                    color: colors[cur._type],
                                },
                                children: [
                                    {
                                        name: cur.name,
                                        id: cur.id,
                                        metadata: {
                                            ...cur,
                                            color: colors[cur._type],
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
                            color: colors[cur._type],
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
                                color: colors[cur._type],
                            },
                        });
                    } else {
                        acc[type].children.push({
                            name: classes?.[cur._type],
                            id: cur._type,
                            metadata: {
                                color: colors[cur._type],
                            },
                            children: [
                                {
                                    name: cur.name,
                                    id: cur.id,
                                    metadata: {
                                        ...cur,
                                        color: colors[cur._type],
                                    },
                                },
                            ],
                        });
                    }
                }
            }

            return acc;
        }, {});

        const initialSelectedIds = graph?.nodes[locale].reduce((acc, cur) => {
            const type = getType(cur);
            if (type && !acc.includes(type)) {
                acc.push(type);
            }
            if (cur._type && !acc.includes(cur._type)) {
                acc.push(cur._type);
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
    }, [graph?.nodes, locale]);

    const onCheck = useCallback(
        (props: ITreeViewOnNodeSelectProps, mode: TreeViewProps["mode"]) => {
            if (mode === "link") {
                // this is a hack to make sure the selected node is the last one
                if (props.element.id !== props.treeState?.lastUserSelect) {
                    return;
                }
                const found = filteredNodes?.find(
                    (node) => node.id === props.element.id
                );
                if (found) {
                    setSelected && setSelected(found);
                }
                return;
            }

            filterNodes((filteredNodes, nodes) => {
                const nodesFiltered = nodes?.filter((node) => {
                    // @ts-ignore
                    if (props.treeState?.selectedIds.has(node.id)) {
                        return true;
                    } else {
                        return false;
                    }
                });
                return nodesFiltered as NodeObject[];
            });

            filterLinks((filteredLinks, links) => {
                const linksFiltered = links?.filter((link) => {
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
                return linksFiltered as LinkObject[];
            });
        },
        [filteredNodes]
    );

    useEffect(() => {
        filterNodes((filteredNodes, nodes) => {
            return nodes as NodeObject[];
        });
        filterLinks((filteredLinks, links) => {
            return links as LinkObject[];
        });
    }, []);

    return {
        treeData,
        initialSelectedIds,
        colors,
        onCheck,
    };
}
