import {
    createContext,
    PropsWithChildren,
    useReducer,
    useEffect,
    useRef,
    useContext,
    useCallback,
} from "react";
import { NodeObject, LinkObject } from "react-force-graph-3d";
import { FilterProvider } from ".";
import { usePageContext, useParams, useData } from ".";
import { navigate } from "vike/client/router";

export type CVContextState = {
    selected: NodeObject;
    connectedTo: LinkObject[];
};

export type CVContextType = CVContextState & {
    headerRef: React.RefObject<HTMLHeadingElement>;
    nodes: NodeObject[];
    links: LinkObject[];
    properties: string[];

    setSelected: (node: NodeObject) => void;
};

export const defaultCVContext: CVContextType = {
    headerRef: { current: null },
    nodes: [],
    links: [],
    properties: [],
    selected: {
        id: "",
        _id: "",
        "@context": "",
        name: "",
    },
    connectedTo: [],
    setSelected: () => { },
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
    const { api } = usePageContext();
    const { type, id } = useParams();
    const data = useData();

    console.log({ data })
    const { nodes, links, properties, defaultSelected, defaultConnectedTo } =
        data;

    // Reference to the header element
    const headerRef = useRef<HTMLHeadingElement>(null);

    const [state, setState] = useReducer(
        (state: CVContextState, partial: Partial<CVContextState>) => {
            return { ...state, ...partial };
        },
        { selected: defaultSelected, connectedTo: defaultConnectedTo }
    );

    const filterNodes = useCallback(
        (search: string) =>
            nodes.find((node) => {
                return search === node._id;
            }),
        [nodes, id, type]
    );

    const setSelected = useCallback((selected: NodeObject) => {
        setState({ selected });
    }, []);

    const setConnectedTo = useCallback((connectedTo: LinkObject[]) => {
        setState({ connectedTo });
    }, []);

    useEffect(() => {
        const found = filterNodes(`${type}/${id}`);
        if (found) {
            const connectedTo = links.filter((link) => {
                return link.object === found.id;
            });
            setState({ selected: found, connectedTo });
        }
    }, [type, id]);

    /**
     * Navigate to the selected node
     */
    useEffect(() => {
        const path = state.selected
            ? `/${api.namespace}/${state.selected._id}`
            : false;

        if (path) {
            navigate(path);
            headerRef.current?.focus();
        }
    }, [state.selected, navigate]);

    return (
        <CVContext.Provider
            value={{
                ...defaultCVContext,
                headerRef,
                properties,
                nodes,
                links,
                selected: state.selected,
                connectedTo: state.connectedTo,
                setSelected,
            }}
        >
            <FilterProvider>{children}</FilterProvider>
        </CVContext.Provider>
    );
}
