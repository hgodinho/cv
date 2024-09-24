import { Locales, LOCALES } from "@hgod-in-cv/data/src/types";

export type I18nProviderType = {
    locale: LOCALES;
    locales: Locales;
    setLocale: (locale: LOCALES) => void;
};
