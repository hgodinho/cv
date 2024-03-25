import { useCallback, useRef, useEffect, useContext } from "react";
import { NodeObject, LinkObject } from "react-force-graph-3d";
import SpriteText from "three-spritetext";
import { useLocation } from "react-router-dom";

import { CVContext } from "@/provider";

export type UseNetworkProps = {
    w?: number;
    h?: number;
    setSelected?: (node: NodeObject | null) => void;
};

export function useNetwork() {
    const ref = useRef();

    const { nodes, links, setSelected } = useContext(CVContext);

    const location = useLocation();

    const focusOnClick = useCallback(
        (node: NodeObject) => {
            const distance = 25;
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

    useEffect(() => {
        if (location.pathname === "/cv") {
            const search = location.search;
            if (search) {
                const found = nodes.find((node) =>
                    (node.id as string).includes(search)
                );
                if (
                    typeof found !== "undefined" &&
                    (found.id as string).includes(search)
                ) {
                    focusOnClick(found);
                }
            }
        }
    }, [location]);

    return {
        ref,
        nodes,
        links,
        focusOnClick,
        nodeLabel,
        linkLabel,
        linkLabelPosition,
    };
}
