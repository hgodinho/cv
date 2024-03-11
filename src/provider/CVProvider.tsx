import { type JsonLDType } from "@/lib";
import { createContext, PropsWithChildren } from "react";

export type CVContextType = JsonLDType;

export const CVContext = createContext<CVContextType | null>(null);

export function CVProvider({ data, children }: PropsWithChildren<{ data: CVContextType }>) {
    return (
        <CVContext.Provider value={data}>{children}</CVContext.Provider>
    );
};