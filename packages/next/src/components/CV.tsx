"use client";

import React from "react";
import { CVProvider } from "@/provider";
import { NetworkView } from "./NetworkView";
import { JsonLDType } from "@/lib";
import { ClassView } from "./ClassView";

export function CV({ data }: { data: JsonLDType }) {
    return (
        <CVProvider data={data}>
            <NetworkView w={1000} h={600} />
            {/* <ClassView /> */}
        </CVProvider>
    )
}