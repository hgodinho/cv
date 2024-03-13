import { useCallback, useRef, useState } from "react";
import { JsonLDType } from "./getJsonLD";
import { NodeObject, LinkObject } from "react-force-graph-3d";
import SpriteText from "three-spritetext";

export type UseNetworkProps = {
    w: number;
    h: number;
    ld: JsonLDType | null;
    setSelected?: (node: NodeObject | null) => void;
};

export function useNetwork({ w, h, ld, setSelected }: UseNetworkProps) {
    const ref = useRef();

    const nodes: NodeObject[] = !ld?.flattened
        ? []
        : (ld?.flattened as unknown as Array<any>).map((node) => {
              return {
                  id: node["@id"],
                  group: [...node["@type"]]
                      .pop()
                      .replace("http://schema.org/", ""),
                  ...node,
              };
          });

    const links: LinkObject[] =
        ld?.nquads &&
        (ld?.nquads as unknown as Array<any>).reduce((acc, node) => {
            const foundSubject = nodes?.find(
                (n) => n.id === node.subject.value
            );
            const foundObject = nodes?.find((n) => n.id === node.object.value);
            if (foundObject && foundSubject) {
                // return only relations between two classes, excluding properties
                const link = {
                    source: node.subject.value,
                    target: node.object.value,
                    predicate: node.predicate.value.replace(
                        "http://schema.org/",
                        ""
                    ),
                    value: 1,
                };
                acc.push(link);
            }
            return acc;
        }, []);

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
        if (node.hasOwnProperty("http://schema.org/name")) {
            // @ts-ignore
            return node["http://schema.org/name"][0]["@value"];
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
