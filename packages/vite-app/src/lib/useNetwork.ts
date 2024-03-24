import { useCallback, useRef } from "react";
import { NodeObject, LinkObject } from "react-force-graph-3d";
import SpriteText from "three-spritetext";

export type UseNetworkProps = {
    w?: number;
    h?: number;
    setSelected?: (node: NodeObject | null) => void;
};

export function useNetwork({ setSelected }: UseNetworkProps) {
    const ref = useRef();

    const focusOnClick = useCallback(
        (node: NodeObject) => {
            const distance = 20;
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
                3000
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
        const sprite = new SpriteText(link.predicate);
        sprite.color = "lightgrey";
        sprite.textHeight = 1.5;
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

    return {
        ref,
        focusOnClick,
        nodeLabel,
        linkLabel,
        linkLabelPosition,
    };
}
