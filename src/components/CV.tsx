"use client";

import React from "react";
import { CVProvider, type CVContextType } from "@/provider";
import { SVGView } from "./SVGView";
import { JsonLdDocument } from "jsonld";

export type CVType = JsonLdDocument;

export function CV({ data }: { data: CVContextType }) {
    return (
        <CVProvider data={data}>
            <SVGView w={1000} h={1000} />
        </CVProvider>
    )
}