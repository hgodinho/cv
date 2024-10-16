import React, { useState } from "react";
import { I18nContext } from "./";
import { usePageContext } from "../page";
import { LOCALES } from "@hgod-in-cv/data/src/types";

export function I18nProvider({ children }: React.PropsWithChildren<{}>) {
    const { pageContext } = usePageContext();

    const [locale, setLocale] = useState<LOCALES>(
        pageContext?.locale || "pt_br"
    );

    return (
        <I18nContext.Provider
            value={{
                locale,
                locales: pageContext?.locales || {
                    en: {
                        lang: "en",
                        name: "English",
                        icon: "🇺🇸",
                        principal: false,
                    },
                    es: {
                        lang: "es",
                        name: "Español",
                        icon: "🇪🇸",
                        principal: false,
                    },
                    pt_br: {
                        lang: "pt-br",
                        name: "Português",
                        icon: "🇧🇷",
                        principal: true,
                    },
                },
                setLocale,
            }}
        >
            {children}
        </I18nContext.Provider>
    );
}
