import { PageProviderType } from "./";
import { PageContext } from "@hgod-in-cv/data/src/types";


export const defaultPageContext: Partial<PageProviderType> = {
    pageContext: {
        properties: {
            en: ["", ""],
            pt_br: ["", ""],
            es: ["", ""],
        },
        classes: {
            en: ["", ""],
            pt_br: ["", ""],
            es: ["", ""],
        },
        graph: {
            nodes: {
                en: [],
                pt_br: [],
                es: [],
            },
            links: {
                en: [],
                pt_br: [],
                es: [],
            },
        },
        id: "",
        name: "",
        type: "",
        locales: {
            en: {
                lang: "",
                name: "",
                icon: "",
                principal: false
            },
            pt_br: {
                lang: "",
                name: "",
                icon: "",
                principal: false
            },
            es: {
                lang: "",
                name: "",
                icon: "",
                principal: false
            },
        },
        site: {
            title: "",
            siteUrl: "",
            description: ""
        },
        locale: "en"
    },
    path: "",
    uri: "",
    children: undefined,
    data: {},
};
