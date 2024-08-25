import React from "react";

import {
    CVProvider,
    NetworkSettingsProvider,
    ThemeProvider,
} from "#root/provider";
import {
    ClassView,
    Debug,
    Layout,
    NetworkView,
    OptionsView,
} from "#root/components";
import { CVProviderProps } from "#root/types";

export type PageShellProps = CVProviderProps;

export function PageShell({ children, selected, pageContext }: CVProviderProps) {
    return (
        // <ThemeProvider>
        //     <CVProvider selected={selected} context={context}>
        //         <NetworkSettingsProvider>
        <>
            {children}
        </>
        //         </NetworkSettingsProvider>
        //     </CVProvider>
        // </ThemeProvider>
    );
}
