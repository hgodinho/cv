import { ThemeContextCallbacks, ThemeContextState, ThemeContextType } from "./";

export const themeStateDefault: ThemeContextState & ThemeContextCallbacks = {
    viewPort: {
        windowDimensions: {
            width: 480,
            height: 800,
            isMobile: false,
            isTablet: false,
            isDesktop: false,
            isPrint: false,
        },
        handlePrint: () => { },
        setWindowDimensions: () => { }
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
        Person: "#fff8f3",

        Place: "#33cbdc",
        Country: "#53c2cf",
        City: "#609fa6",

        Intangible: "#f4b9ee",
        Thing: "#deaeda",
        Language: "#ceb4cc",
        ComputerLanguage: "#c68ec0",
        EducationalOccupationalProgram: "#db7fd2",
        Rating: "#f08ffa",
        AggregateRating: "#d7abff",
        Occupation: "#ff63ba",
        Role: "#cd7cff",
        OrganizationRole: "#d5c1ff",

        Credential: "#ff7348",
        EducationalOccupationalCredential: "#ffb399",

        CreativeWork: "#37aeff",
        ScholarlyArticle: "#14fdff",
        Chapter: "#49e6ff",
        Course: "#78caff",
        VisualArtwork: "#b9e0ff",
        Website: "#8ac5ff",
        SoftwareApplication: "#c5f2ff",

        Event: "#ffd52d",
        EventSeries: "#fff421",
        ExhibitionEvent: "#fff27a",

        Organization: "#d3fead",
        EducationalOrganization: "#a7ff7d",
        CollegeOrUniversity: "#45ff8f",
        Project: "#1affb4",
    },
    state: themeStateDefault,
};
