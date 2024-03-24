import * as jsonld from "jsonld";
import { JsonLdArray } from "jsonld/jsonld-spec";
import { NodeObject, LinkObject } from "react-force-graph-3d";

export type CVContextType = {
    data: {
        properties: string[];
        config: {
            base: string;
            namespace: string;
            url: string;
            query: string;
        };
        data: JsonLDType;
    };
    selected: NodeObject | null;
    nodes: NodeObject[];
    links: LinkObject[];
    setSelected: (node: NodeObject | null) => void;
};

export type JsonLDType = {
    raw: Record<string, any>;
    expanded?: JsonLdArray;
    compacted?: jsonld.NodeObject;
    flattened?: jsonld.NodeObject;
    nquads?: object;
};
