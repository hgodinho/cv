import {
    createContext,
    PropsWithChildren,
    useMemo,
    useEffect,
    useRef,
    useContext,
    useReducer,
    useCallback,
} from "react";
import { NodeObject, LinkObject } from "react-force-graph-3d";
import { useNavigate } from "react-router-dom";
import { FilterProvider } from ".";
import { JsonLDType } from "@/types";

export type CVContextTypeData = {
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
    selected: NodeObject | null;
};

export type CVContextType = {
    headerRef: React.RefObject<HTMLHeadingElement>;
    data: CVContextTypeData;
    nodes: NodeObject[];
    links: LinkObject[];
    setSelected: (node: NodeObject | null) => void;
};

export const defaultData = {
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
    selected: null,
};

export const defaultCVContext: CVContextType = {
    headerRef: { current: null },
    data: defaultData,
    nodes: [],
    links: [],
    setSelected: () => {},
};

export const CVContext = createContext<CVContextType>(defaultCVContext);

export function CVProvider({ children }: PropsWithChildren<{}>) {
    const [data, setState] = useReducer(
        (s: CVContextTypeData, a: Partial<CVContextTypeData>) => ({
            ...s,
            ...a,
        }),
        defaultData
    );

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await fetch("/henrique-godinho.jsonld").then(
                    (res) => res.json()
                );
                setState(data);
            } catch (e) {
                console.error(e);
            }
        };
        fetchData();
    }, []);

    const setSelected = useCallback((node: NodeObject | null) => {
        setState({ selected: node });
    }, []);

    const ld = data.data;

    const headerRef = useRef<HTMLHeadingElement>(null);

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

    const navigate = useNavigate();

    useEffect(() => {
        const path = data.selected?.id
            ?.toString()
            .split(data.config.base)
            .pop();
        if (path) {
            navigate(path);
            headerRef.current?.focus();
        }
    }, [data.selected, navigate]);

    return (
        <CVContext.Provider
            value={{
                ...defaultCVContext,
                data: {
                    ...defaultCVContext.data,
                    ...data,
                },
                headerRef,
                nodes,
                links,
                setSelected,
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
