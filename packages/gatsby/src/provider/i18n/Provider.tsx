import React, { useEffect, useMemo, useState } from "react";
import { I18nContext, I18nProviderType } from "./";
import { usePageContext } from "../page";
import { LOCALES } from "@hgod-in-cv/data/src/types";
import { useCVContext } from "../cv";

export function I18nProvider({ children }: React.PropsWithChildren<{}>) {
    const {
        pageContext: { locales },
    } = usePageContext();

    const [locale, setLocale] = useState<LOCALES>("pt_br");

    const i18n: I18nProviderType = useMemo(() => {
        return {
            locale,
            locales,
            setLocale,
        };
    }, [locale, locales]);

    return <I18nContext.Provider value={i18n}>{children}</I18nContext.Provider>;
}
