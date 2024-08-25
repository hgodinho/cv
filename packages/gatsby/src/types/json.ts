import { JsonLdArray } from "jsonld/jsonld-spec";
import * as jsonld from "jsonld";

export type JsonLDType = {
    raw: Record<string, any>;
    expanded?: JsonLdArray;
    compacted?: jsonld.NodeObject;
    flattened?: jsonld.NodeObject;
    nquads?: object;
};
