import React from "react";

import {
    PageProvider,
    CVProvider,
    NetworkSettingsProvider,
    ThemeProvider,
    I18nProvider,
    FilterProvider,
} from "#root/provider";
import { WrapPageElementBrowserArgs } from "gatsby";
import { PageContext } from "@hgod-in-cv/data/src/types";
import {
    ClassView,
    Debug,
    Layout,
    NetworkView,
    OptionsView,
} from "#root/components";

export type ProviderProps = WrapPageElementBrowserArgs<
    Record<string, unknown>,
    PageContext
>["props"] & {
    element: React.ReactNode;
};

export function Template({ element, ...props }: ProviderProps) {
    console.log("Template", { props });

    return (
        <ThemeProvider>
            <PageProvider {...props}>
                <CVProvider>
                    <I18nProvider>
                        <FilterProvider>
                            <NetworkSettingsProvider>
                                <NetworkView />
                                <Layout>
                                    <OptionsView />
                                    <ClassView />
                                    <Debug debug={false} />
                                    {element}
                                </Layout>
                            </NetworkSettingsProvider>
                        </FilterProvider>
                    </I18nProvider>
                </CVProvider>
            </PageProvider>
        </ThemeProvider>
    );
}
