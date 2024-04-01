import * as jsonld from "jsonld";

export async function getJsonLD(data, context) {
    const expanded = await jsonld.default.expand(data);
    const compacted = await jsonld.default.compact(data, context);
    const flattened = await jsonld.default.flatten(data);
    const nquads = await jsonld.default.toRDF(data);
    return {
        raw: data,
        expanded,
        compacted,
        flattened,
        nquads,
    };
}
