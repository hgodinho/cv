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
        Person: "#009EFF",
        Place: "#FF8C00",
        Country: "#FFA333",
        City: "#FFB65C",
        Intangible: "#FF42E5",
        OrganizationRole: "#FF70EC",
        Language: "#FF99F1",
        AggregateRating: "#FFC2F7",
        ComputerLanguage: "#FFEBFC",
        Credential: "#00B55E",
        EducationalOccupationalCredential: "#00E074",
        CreativeWork: "#FF6300",
        Chapter: "#FF8133",
        ScholarlyArticle: "#FF9A5C",
        Website: "#FFB485",
        Event: "#ADAD00",
        EventSeries: "#E0E000",
        Organization: "#D98086",
        EducationalOrganization: "#E3A1A5",
        CollegeOrUniversity: "#ECC0C3",
    },
    state: themeStateDefault,
};
