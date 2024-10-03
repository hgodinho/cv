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
    L10NSelect,
    Layout,
    NetworkView,
    OptionsView,
    Seo,
} from "#root/components";

export type ProviderProps = WrapPageElementBrowserArgs<
    Record<string, unknown>,
    PageContext
>["props"] & {
    element: React.ReactNode;
};

export function Template({ element, ...props }: ProviderProps) {
    return (
        <ThemeProvider>
            <PageProvider {...props}>
                <I18nProvider>
                    <CVProvider>
                        <FilterProvider>
                            <NetworkSettingsProvider>
                                <NetworkView />
                                <Layout>
                                    <OptionsView />
                                    <ClassView />
                                    <Debug debug={false} />
                                    <L10NSelect />
                                    {element}
                                </Layout>
                            </NetworkSettingsProvider>
                            <Seo />
                        </FilterProvider>
                    </CVProvider>
                </I18nProvider>
            </PageProvider>
        </ThemeProvider>
    );
}
