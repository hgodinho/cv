import { CVContextType } from "#root/types";

export const defaultCVContext: CVContextType = {
    headerRef: { current: null },
    nodes: [],
    links: [],
    properties: [],
    selected: {
        id: "",
        _id: "",
        "@context": "",
        name: "",
    },
    connectedTo: [],
    setSelected: () => { },
};