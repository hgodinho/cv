import jsonld from "jsonld";
import { JsonLD } from "./types";

async function getJsonLD(data: jsonld.NodeObject): Promise<JsonLD> {
    const context = await fetch(
        "https://raw.githubusercontent.com/schemaorg/schemaorg/refs/heads/main/data/releases/25.0/schemaorgcontext.jsonld"
    ).then((response) => response.json());

    const expanded = await jsonld.expand(data);
    const compacted = jsonld.compact(data, context);
    const flattened = await jsonld.flatten(data);
    const nquads = await jsonld.toRDF(data);

    return {
        raw: data,
        expanded,
        compacted,
        flattened,
        nquads,
    };
}

export { getJsonLD };
