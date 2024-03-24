import { createContext, PropsWithChildren, useState, useMemo } from "react";
import { NodeObject, LinkObject } from "react-force-graph-3d";

import type { CVContextType } from "@/types";

export const CVContext = createContext<CVContextType>({
    data: {
        properties: [],
        config: {
            base: "",
            namespace: "",
            url: "",
            query: "",
        },
        data: {
            raw: { "@context": {}, "@graph": [] }
        },
    },
    nodes: [],
    links: [],
    selected: null,
    setSelected: () => { },
});

export function CVProvider({ children, data }: PropsWithChildren<{ data: CVContextType['data'] }>) {
    const [selected, setSelected] = useState<NodeObject | null>(null);

    const ld = data.data;

    const { nodes, links } = useMemo(() => {
        let nodes: NodeObject[] = [];
        if (ld?.compacted) {
            nodes = (ld?.compacted["@graph"] as NodeObject[]).map((node) => {
                console.log({ node });

                return {
                    "@context": ld?.compacted
                        ? ld?.compacted["@context"]
                        : undefined,
                    ...Object.fromEntries(
                        Object.entries(node).map(([k, v]) => {
                            return [k, v];
                        })
                    ),
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

    return (
        <CVContext.Provider value={{ data, selected, nodes, links, setSelected }}>{children}</CVContext.Provider>
    );
};