import React from "react";

import { useViewPortSize } from "@/lib";
import { CVProvider, type CVContextType } from "@/provider";
import { Layout, ClassView, OptionsView, NetworkView } from "@/components";

export function CV({ data }: { data: CVContextType["data"] }) {
    const dimensions = useViewPortSize();
    return (
        <CVProvider data={data}>
            <div className="flex flex-col h-full">
                <NetworkView {...dimensions} />
                <Layout>
                    <OptionsView />
                    <ClassView />
                </Layout>
            </div>
        </CVProvider>
    );
}
