import {
    createContext,
    PropsWithChildren,
    useMemo,
    useEffect,
    useState,
    useRef,
    useContext,
    useReducer,
    useCallback,
} from "react";
import { NodeObject, LinkObject } from "react-force-graph-3d";
import { FilterProvider } from ".";
import { JsonLDType } from "#root/types";
import { usePageContext } from ".";
import { navigate } from "vike/client/router";

export type CVContextTypeData = {
    name: string;
    properties: string[];
    config: {
        base: string;
        namespace: string;
        url: string;
        query: string;
    };
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

export function useCVContext() {
    const context = useContext(CVContext);
    return context;
}

export function CVProvider({ children }: PropsWithChildren<{}>) {
    /**
     * Get the JSON-LD data from the page context
     */
    const { ld, properties, api } = usePageContext();

    /**
     * State to store the selected node
     */
    const [selected, setSelected] = useState<NodeObject | null>(null);

    // Reference to the header element
    const headerRef = useRef<HTMLHeadingElement>(null);

    /**
     * Create nodes and links from the JSON-LD data
     */
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

    /**
     * Navigate to the selected node
     */
    useEffect(() => {
        const path = selected ? `/${api.namespace}/${selected._id}` : false;
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
                    ...defaultData,
                    properties,
                    selected,
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
