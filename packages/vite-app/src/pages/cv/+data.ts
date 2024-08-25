import { JsonLDType } from "#root/types";
import { LinkObject, NodeObject } from "react-force-graph-3d";
import { PageContext } from "vike/types";
import fetch from "node-fetch";

export async function data(pageContext: PageContext) {
    const mode = import.meta.env.MODE;
    const base = `${
        mode === "development" ? "http://localhost:3000" : "https://hgod.in"
    }`;

    const { type, id } = pageContext.routeParams;

    const fetchData = async () => {
        try {
            return await fetch(`${base}/henrique-godinho.jsonld`).then((res) =>
                res.json()
            );
        } catch (e) {
            throw e;
        }
    };

    const data = (await fetchData()) as {
        ld: JsonLDType;
        properties: string[];
    };

    /**
     * Create nodes and links from the JSON-LD data
     */
    let nodes: NodeObject[] = [];
    if (data.ld.compacted) {
        nodes = (data.ld.compacted["@graph"] as NodeObject[]).map((node) => {
            return {
                "@context": data.ld.compacted
                    ? data.ld.compacted["@context"]
                    : undefined,
                ...node,
            };
        });
    }

    let links: LinkObject[] = [];
    if (data.ld.nquads) {
        links = (data.ld.nquads as unknown as Array<any>).reduce(
            (acc, link) => {
                const foundSubject = nodes?.find(
                    (n) => n.id === link.subject.value
                );
                const foundObject = nodes?.find(
                    (n) => n.id === link.object.value
                );
                if (foundObject && foundSubject) {
                    // return only relations between two classes, excluding properties
                    const linkNode = {
                        subject: link.subject.value,
                        object: link.object.value,
                        predicate: link.predicate.value.replace(
                            "http://schema.org/",
                            ""
                        ),
                        value: 10,
                        source: foundSubject,
                        target: foundObject,
                        // curvature: 0.5,
                        // rotation: Math.PI / Math.random() * 2,
                    };
                    acc.push(linkNode);
                }
                return acc;
            },
            []
        );
    }

    const defaultSelected = nodes.find((node) => {
        return `${type}/${id}` === node._id;
    }) as NodeObject;

    const defaultConnectedTo: LinkObject[] = links.filter((link) => {
        return link.object === defaultSelected.id;
    });

    return {
        properties: data.properties,
        nodes,
        links,
        defaultSelected,
        defaultConnectedTo,
    };
}
