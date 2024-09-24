import { ThemeContextCallbacks, ThemeContextState, ThemeContextType } from "./";

export const themeStateDefault: ThemeContextState & ThemeContextCallbacks = {
    viewPort: {
        isMobile: false,
        isTablet: false,
        isDesktop: false,
    },
    collapsibles: {
        options: false,
        class: false,
    },
    toggleCollapsible: () => { },
    collapsibleOn: () => { },
    collapsibleOff: () => { },
    closeCollapsibles: () => { },
};

export const themeDefault: ThemeContextType = {
    sizes: {
        icon: 16,
    },
    colors: {
        Person: "#A2E8F4",
        Country: "#9CA6C9",
        City: "#D4B8D1",
        Place: "#4F4A8C",
        OrganizationRole: "#6E102A",
        Role: "#FCFDFF",
        Certification: "#AB66D9",
        CreativeWork: "#9578A4",
        Project: "#F1BCFF",
        Article: "#52AAF2",
        ScholarlyArticle: "#D3D3D3",
        Chapter: "#145A8E",
        ExhibitionEvent: "#778899",
        Event: "#B96481",
        Organization: "#F2CFE5",
    },
    state: themeStateDefault,
};
