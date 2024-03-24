import { useCallback, useRef, useMemo } from "react";
import { NodeObject, LinkObject } from "react-force-graph-3d";
import SpriteText from "three-spritetext";

import { JsonLDType } from "@/types";

export type UseNetworkProps = {
    ld: JsonLDType | null;
    w?: number;
    h?: number;
    setSelected?: (node: NodeObject | null) => void;
};

export function useNetwork({ ld, setSelected }: UseNetworkProps) {
    if (!ld) throw new Error("ld must be defined");

    const ref = useRef();

    const { nodes, links } = useMemo(() => {
        let nodes: NodeObject[] = [];
        if (ld?.compacted) {
            nodes = (ld?.compacted["@graph"] as NodeObject[]).map((node) => {
                return {
                    "@context": ld?.compacted
                        ? ld?.compacted["@context"]
                        : undefined,
                    ...node,
                };
            });
        }
        let links: LinkObject[] = [];
        if (ld?.nquads) {
            links = (ld?.nquads as unknown as Array<any>).reduce(
                (acc, node) => {
                    const foundSubject = nodes?.find(
                        (n) => n.id === node.subject.value
                    );
                    const foundObject = nodes?.find(
                        (n) => n.id === node.object.value
                    );
                    if (foundObject && foundSubject) {
                        // return only relations between two classes, excluding properties
                        const link = {
                            source: node.subject.value,
                            target: node.object.value,
                            predicate: node.predicate.value.replace(
                                "http://schema.org/",
                                ""
                            ),
                            value: 10,
                            // curvature: Math.random(),
                            // rotation: Math.random(),
                        };
                        acc.push(link);
                    }
                    return acc;
                },
                []
            );
        }
        return { nodes, links };
    }, [ld]);

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
        nodes,
        links,
        focusOnClick,
        nodeLabel,
        linkLabel,
        linkLabelPosition,
    };
}
