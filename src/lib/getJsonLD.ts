import * as jsonld from "jsonld";
import { JsonLdArray } from "jsonld/jsonld-spec";

export type JsonLDType = {
    raw: Record<string, any>;
    expanded: JsonLdArray;
    compacted: jsonld.NodeObject;
    flattened: jsonld.NodeObject;
    nquads: object;
};

export async function getJsonLD(
    data: jsonld.JsonLdDocument,
    context?: jsonld.ContextDefinition
): Promise<JsonLDType> {
    const expanded = await jsonld.expand(data);
    const compacted = await jsonld.compact(data, context);
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
