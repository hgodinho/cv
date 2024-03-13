import { type JsonLDType } from "@/lib";
import { createContext, PropsWithChildren, useState, useEffect } from "react";
import { NodeObject } from "react-force-graph-3d";

export type CVContextType = {
    data: JsonLDType
    selected: NodeObject | null;
    setSelected: (node: NodeObject | null) => void;
}

export const CVContext = createContext<CVContextType>({
    data: {
        raw: {}
    },
    selected: null,
    setSelected: () => { },
});

export function CVProvider({ children, data }: PropsWithChildren<{ data: JsonLDType }>) {
    const [selected, setSelected] = useState<NodeObject | null>(null);

    return (
        <CVContext.Provider value={{ data, selected, setSelected }}>{children}</CVContext.Provider>
    );
};