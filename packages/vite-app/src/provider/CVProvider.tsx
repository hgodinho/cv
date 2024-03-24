import { createContext, PropsWithChildren, useState } from "react";
import { NodeObject } from "react-force-graph-3d";

import type { CVContextType } from "@/types";

export const CVContext = createContext<CVContextType>({
    data: {
        properties: [],
        config: {
            base: "",
            namespace: "",
            url: "",
            query: "",
        },
        data: {
            raw: { "@context": {}, "@graph": [] }
        },
    },
    selected: null,
    setSelected: () => { },
});

export function CVProvider({ children, data }: PropsWithChildren<{ data: CVContextType['data'] }>) {
    const [selected, setSelected] = useState<NodeObject | null>(null);
    return (
        <CVContext.Provider value={{ data, selected, setSelected }}>{children}</CVContext.Provider>
    );
};