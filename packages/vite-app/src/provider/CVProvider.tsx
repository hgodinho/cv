import {
    createContext,
    PropsWithChildren,
    useState,
    useMemo,
    useCallback,
    useEffect,
    useRef,
    useContext,
} from "react";
import * as jsonld from "jsonld";
import { JsonLdArray } from "jsonld/jsonld-spec";
import { NodeObject, LinkObject } from "react-force-graph-3d";
import { useNavigate } from "react-router-dom";
import { FilterProvider } from ".";

export type FilterValue = {
    filterValue: (value: string) => string;
};

export type CVContextType = {
    headerRef: React.RefObject<HTMLHeadingElement>;
    data: {
        name: string;
        properties: string[];
        config: {
            base: string;
            namespace: string;
            url: string;
            query: string;
        };
        data: JsonLDType;
        colors: Record<string, string>;
    };
    selected: NodeObject | null;
    nodes: NodeObject[];
    links: LinkObject[];
    setSelected: (node: NodeObject | null) => void;
} & FilterValue;

export type JsonLDType = {
    raw: Record<string, any>;
    expanded?: JsonLdArray;
    compacted?: jsonld.NodeObject;
    flattened?: jsonld.NodeObject;
    nquads?: object;
};

export const defaultCVContext: CVContextType = {
    headerRef: { current: null },
    data: {
        name: "hgod.in",
        properties: [],
        config: {
            base: "",
            namespace: "",
            url: "",
            query: "",
        },
        data: {
            raw: { "@context": {}, "@graph": [] },
        },
        colors: {},
    },
    nodes: [],
    links: [],
    selected: null,
    setSelected: () => {},
    filterValue: () => "",
};

export const CVContext = createContext<CVContextType>(defaultCVContext);

export function CVProvider({
    children,
    data,
}: PropsWithChildren<{ data: CVContextType["data"] }>) {
    const ld = data.data;

    const headerRef = useRef<HTMLHeadingElement>(null);

    const [selected, setSelected] = useState<NodeObject | null>(null);

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
        return { nodes, links };
    }, [ld]);

    const filterValue = useCallback((value: string) => {
        if (value.includes(data.config.base)) {
            return value.replace(data.config.base, "");
        }
        return value;
    }, []);

    const navigate = useNavigate();

    useEffect(() => {
        const path = selected?.id?.toString().split(data.config.base).pop();
        if (path) {
            navigate(path);
            headerRef.current?.focus();
        }
    }, [selected, navigate]);

    return (
        <CVContext.Provider
            value={{
                ...defaultCVContext,
                data: {
                    ...defaultCVContext.data,
                    ...data,
                },
                headerRef,
                selected,
                nodes,
                links,
                setSelected,
                filterValue,
            }}
        >
            <FilterProvider>{children}</FilterProvider>
        </CVContext.Provider>
    );
}

export function useCVContext() {
    const context = useContext(CVContext);
    return context;
}
