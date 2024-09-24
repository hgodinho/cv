import { CVContextType } from "./";

export const defaultCVContext: CVContextType = {
    headerRef: { current: null },

    graph: {
        nodes: {
            pt_br: [],
            en: [],
            es: [],
        },
        links: {
            pt_br: [],
            en: [],
            es: [],
        },
    },
    nodes: [],
    links: [],
    properties: {},
    selected: {
        id: "",
        _id: "",
        "@context": "",
        name: "",
    },
    connectedTo: [],
    setSelected: () => { },
};
