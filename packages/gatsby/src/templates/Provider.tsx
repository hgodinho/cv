import React, { useCallback } from "react";

import {
    CVProvider,
    NetworkSettingsProvider,
    ThemeProvider,
} from "#root/provider";
import { CVProviderProps } from "#root/types";
import { GatsbyBrowser, WrapPageElementBrowserArgs } from "gatsby";
import { PageContext } from "@hgod-in-cv/data/src/types";
import { NodeObject } from "react-force-graph-3d";
import {
    ClassView,
    Debug,
    Layout,
    NetworkView,
    OptionsView,
} from "#root/components";

export type ProviderProps = {
    element: React.ReactNode;
} & WrapPageElementBrowserArgs<Record<string, unknown>, PageContext>["props"];

export function Provider({
    element,
    ...props
}: ProviderProps & { element: React.ReactNode }) {
    if (!props.data || Object.keys(props.pageContext).length === 0) {
        console.log("Provider", { props });
        return element;
    }

    const selected = Object.values(props.data)[0] as NodeObject;

    return (
        <ThemeProvider>
            <CVProvider pageContext={props.pageContext} selected={selected}>
                <NetworkSettingsProvider>
                    <NetworkView />
                    <Layout>
                        <OptionsView />
                        <ClassView />
                        <Debug debug={false} />
                    </Layout>
                    {element}
                </NetworkSettingsProvider>
            </CVProvider>
        </ThemeProvider>
    );
}
