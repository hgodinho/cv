import { useCallback, useMemo, useEffect } from "react";
import {
    ITreeViewOnNodeSelectProps,
    flattenTree,
    NodeId,
} from "react-accessible-treeview";

import { useFilterContext, useTheme } from "#root/provider";
import { alphaHex } from ".";
import type { TreeViewProps } from "#root/components";

export function useTree() {
    const { nodes, filteredNodes, setSelected, filterNodes, filterLinks } =
        useFilterContext();

    const { colors } = useTheme();

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
                children: Object.values(childrenObject),
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
