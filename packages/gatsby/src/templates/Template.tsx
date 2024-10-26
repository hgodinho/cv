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
    VariantSwitch,
} from "#root/components";

export type ProviderProps = WrapPageElementBrowserArgs<
    Record<string, unknown>,
    PageContext
>["props"] & {
    variant: "default" | "pdf";
    element: React.ReactNode;
};

export function Template({ element, variant, ...props }: ProviderProps) {
    return (
        <ThemeProvider variant={variant}>
            <PageProvider {...props}>
                <I18nProvider>
                    <CVProvider>
                        <FilterProvider>
                            <NetworkSettingsProvider>
                                <Layout variant={variant}>
                                    <NetworkView variant={variant} />
                                    {variant === "default" && (
                                        <>
                                            <OptionsView />
                                            <ClassView />
                                        </>
                                    )}
                                    {element}
                                    <Debug debug={false} />
                                    <L10NSelect variant={variant} />
                                    <VariantSwitch variant={variant} />
                                </Layout>
                            </NetworkSettingsProvider>
                        </FilterProvider>
                    </CVProvider>
                </I18nProvider>
            </PageProvider>
        </ThemeProvider>
    );
}
