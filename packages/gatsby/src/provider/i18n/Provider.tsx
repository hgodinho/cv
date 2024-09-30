import React, { useMemo, useState } from "react";
import { I18nContext, I18nProviderType } from "./";
import { usePageContext } from "../page";
import { LOCALES } from "@hgod-in-cv/data/src/types";

export function I18nProvider({ children }: React.PropsWithChildren<{}>) {
    const { pageContext } = usePageContext();

    const [locale, setLocale] = useState<LOCALES>(
        pageContext?.locale || "pt_br"
    );

    const i18n: I18nProviderType = useMemo(() => {
        return {
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
        };
    }, [locale, pageContext?.locales]);

    return <I18nContext.Provider value={i18n}>{children}</I18nContext.Provider>;
}
