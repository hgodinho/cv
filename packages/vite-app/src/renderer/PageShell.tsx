import React from "react";
import type { PageContext } from "vike/types";

import {
    PageContextProvider,
    CVProvider,
    NetworkSettingsProvider,
    ThemeProvider,
} from "#root/provider";

import { Layout, NetworkView } from "#root/components";

import "./index.css";

export function PageShell({
    children,
    pageContext,
}: {
    children: React.ReactNode;
    pageContext: PageContext;
}) {
    return (
        <React.StrictMode>
            <PageContextProvider pageContext={pageContext}>
                <ThemeProvider>
                    <CVProvider>
                        <NetworkSettingsProvider>
                            <NetworkView />
                            <Layout>{children}</Layout>
                        </NetworkSettingsProvider>
                    </CVProvider>
                </ThemeProvider>
            </PageContextProvider>
        </React.StrictMode>
    );
}
