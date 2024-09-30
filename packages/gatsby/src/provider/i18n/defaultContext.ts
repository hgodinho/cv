import { LOCALES } from "@hgod-in-cv/data/src/types";
import { I18nProviderType } from "./";

export const defaultI18nContext: I18nProviderType = {
    locale: "en",
    locales: {
        en: {
            lang: "en",
            name: "English",
            icon: "🇺🇸",
            principal: false,
        },
        pt_br: {
            lang: "pt-br",
            name: "Português",
            icon: "🇧🇷",
            principal: true,
        },
        es: {
            lang: "es",
            name: "Español",
            icon: "🇪🇸",
            principal: false,
        },
    },
    setLocale: function (locale: LOCALES): void {
        throw new Error("Function not implemented.");
    },
};
