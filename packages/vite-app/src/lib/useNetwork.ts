import { useCallback, useRef, useEffect } from "react";
import { NodeObject, LinkObject } from "react-force-graph-3d";
import SpriteText from "three-spritetext";
import { useParams } from "#root/provider";

import { useFilterContext, useNetworkSettings, useTheme } from "#root/provider";

export type UseNetworkProps = {
    w?: number;
    h?: number;
    setSelected?: (node: NodeObject | null) => void;
};

export function useNetwork() {
    const ref = useRef();

    const { nodes, filteredNodes, links, filteredLinks, setSelected } =
        useFilterContext();

    const { id, type } = useParams();

    const settings = useNetworkSettings();

    const {
        state: {
            viewPort: { isTablet, isMobile, width, height },
        },
        colors,
    } = useTheme();

    const focusOnClick = useCallback(
        (node: NodeObject) => {
            const distance = isMobile ? 45 : isTablet ? 30 : 20;
            const distRatio =
                1 +
                distance /
                    Math.hypot(
                        node.x as number,
                        node.y as number,
                        node.z as number
                    );
            // @ts-ignore
            ref.current?.cameraPosition(
                {
                    // @ts-ignore
                    x: node.x * distRatio,
                    // @ts-ignore
                    y: node.y * distRatio,
                    // @ts-ignore
                    z: node.z * distRatio,
                },
                node,
                2500
            );
            setSelected && setSelected(node);
        },
        [ref, setSelected]
    );

    const nodeLabel = useCallback((node: NodeObject) => {
        if (node.hasOwnProperty("name")) {
            return node["name"];
        }
        return node.id;
    }, []);

    const linkLabel = useCallback((link: LinkObject) => {
        const sprite = new SpriteText(link.predicate, 1.5, "lightgrey");
        return sprite;
    }, []);

    // @ts-ignore
    const linkLabelPosition = useCallback((sprite, { start, end }) => {
        const middlePos = {
            x: start.x + (end.x - start.x) / 2,
            y: start.y + (end.y - start.y) / 2,
            z: start.z + (end.z - start.z) / 2,
        };
        Object.assign(sprite.position, middlePos);
    }, []);

    const color = useCallback(
        (node: NodeObject) => {
            return colors[node.type];
        },
        [colors]
    );

    useEffect(() => {
        const found = filteredNodes.find((node) => {
            const search = `${type}/${id}`;
            return node._id === search;
        });
        if (found) {
            focusOnClick(found);
        }
    }, [id, type]);

    return {
        ref,
        nodes,
        filteredNodes,
        filteredLinks,
        links,
        colors,
        width,
        height,
        ...settings,
        color,
        focusOnClick,
        nodeLabel,
        linkLabel,
        linkLabelPosition,
    };
}
