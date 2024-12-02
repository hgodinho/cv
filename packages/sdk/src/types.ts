import jsonld from "jsonld";
import type { JsonLdArray } from "jsonld/jsonld-spec.js";

export type JsonLD = {
    raw: jsonld.NodeObject;
    expanded: JsonLdArray;
    compacted: Promise<jsonld.NodeObject>;
    flattened: jsonld.NodeObject;
    nquads: Awaited<ReturnType<typeof jsonld.toRDF>>;
};
