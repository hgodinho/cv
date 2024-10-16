import { useCallback, useEffect, useState, useRef } from "react";
import { NodeObject, LinkObject } from "react-force-graph-3d";
import SpriteText from "three-spritetext";

import {
    useFilterContext,
    useI18nContext,
    useNetworkSettings,
    usePageContext,
    useTheme,
} from "#root/provider";

export type UseNetworkProps = {
    w?: number;
    h?: number;
    setSelected?: (node: NodeObject | null) => void;
};

export function useNetwork() {
    const ref = useRef();
    const { navigate } = usePageContext();

    const { locale } = useI18nContext();
    const { filteredNodes, filteredLinks, selected, properties, setSelected } =
        useFilterContext();

    const [loaded, setLoaded] = useState(false);

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
            if (selected?.path !== node.path) {
                navigate(`/${locale}/${node.path}`);
            }
        },
        [ref, selected, isMobile, isTablet, locale]
    );

    const nodeLabel = useCallback((node: NodeObject) => {
        if (node.hasOwnProperty("name")) {
            return node["name"];
        }
        return node.id;
    }, []);

    const linkLabel = useCallback(
        (link: LinkObject) => {
            const sprite = new SpriteText(
                properties?.[link.predicate].toLowerCase(),
                2,
                "lightgrey"
            );
            return sprite;
        },
        [properties]
    );

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
            return colors[node._type];
        },
        [colors]
    );

    useEffect(() => {
        const found = filteredNodes?.find((node) => {
            return node._id === selected?._id;
        });

        if (found) {
            focusOnClick(found);
        }
    }, [selected]);

    useEffect(() => {
        if (ref.current) {
            setLoaded(true);
        }
    }, [ref]);

    useEffect(() => {
        if (selected && loaded) {
            const found = filteredNodes?.find((node) => {
                return node._id === selected._id;
            });
            if (found) {
                setTimeout(() => focusOnClick(found), 2000);
                setLoaded(false);
            }
        }
    }, [loaded]);

    return {
        ref,
        filteredNodes,
        filteredLinks,
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
