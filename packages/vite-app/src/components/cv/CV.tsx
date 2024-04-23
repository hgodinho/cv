import React from "react";

import {
    CVProvider,
    NetworkSettingsProvider,
    ThemeProvider,
} from "#root/provider";

import {
    Layout,
    ClassView,
    OptionsView,
    NetworkView,
    Debug,
} from "#root/components";

export function CV() {
    return (
        <ThemeProvider>
            <CVProvider>
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
