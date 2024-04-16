import React from "react";

import {
    CVProvider,
    type CVContextType,
    NetworkSettingsProvider,
    ThemeProvider,
} from "@/provider";
import {
    Layout,
    ClassView,
    OptionsView,
    NetworkView,
    Debug,
} from "@/components";

export function CV({ data }: { data: CVContextType["data"] }) {
    return (
        <ThemeProvider>
            <CVProvider data={data}>
                <NetworkSettingsProvider>
                    <NetworkView />
                    <Layout>
                        <OptionsView />
                        <ClassView />
                        <Debug debug={false} />
                    </Layout>
                </NetworkSettingsProvider>
            </CVProvider>
        </ThemeProvider>
    );
}
