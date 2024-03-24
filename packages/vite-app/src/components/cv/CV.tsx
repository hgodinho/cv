import React from "react";

import { CVContextType } from "@/types";
import { useViewPortSize } from "@/lib";
import { CVProvider } from "@/provider";
import { Layout, ClassView, TreeView, NetworkView } from "@/components";

export function CV({ data }: { data: CVContextType['data'] }) {
    const dimensions = useViewPortSize();
    return (
        <CVProvider data={data}>
            <div className="flex flex-col h-full">
                <NetworkView {...dimensions} />
                <Layout>
                    <TreeView />
                    <ClassView />
                </Layout>
            </div>
        </CVProvider>
    )
}