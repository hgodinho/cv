import { createContext, useContext, useState, useCallback } from "react";

import { useViewPortSize } from "#root/lib";

export type ThemeContextState = {
    viewPort: {
        width?: number;
        height?: number;
        isMobile: boolean;
        isTablet: boolean;
        isDesktop: boolean;
    };
    collapsibles: {
        options: boolean;
        class: boolean;
    };
};

export type ThemeContextCallbacks = {
    toggleCollapsible: (key: keyof ThemeContextState["collapsibles"]) => void;
    collapsibleOn: (key: keyof ThemeContextState["collapsibles"]) => void;
    collapsibleOff: (key: keyof ThemeContextState["collapsibles"]) => void;
    closeCollapsibles: () => void;
};

export type ThemeContextType = {
    sizes: Record<string, number>;
    colors: Record<string, string>;
    state: ThemeContextState & ThemeContextCallbacks;
};

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

export const ThemeContext = createContext<ThemeContextType>(themeDefault);

export function useTheme() {
    const context = useContext(ThemeContext);
    return context;
}

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
    const viewPort = useViewPortSize();

    const [collapsibles, setCollapsibles] = useState<
        ThemeContextState["collapsibles"]
    >(themeStateDefault.collapsibles);

    const toggleCollapsible = useCallback(
        (key: keyof ThemeContextState["collapsibles"]) => {
            setCollapsibles((prev) => ({
                ...prev,
                [key]: !prev[key],
            }));
            if (viewPort.isMobile || viewPort.isTablet) {
                const other = key === "class" ? "options" : "class";
                setCollapsibles((prev) => ({
                    ...prev,
                    [other]: false,
                }));
            }
        },
        [collapsibles]
    );

    const collapsibleOn = useCallback(
        (key: keyof ThemeContextState["collapsibles"]) => {
            if (viewPort.isTablet || viewPort.isMobile) {
                const other = key === "class" ? "options" : "class";
                setCollapsibles((prev) => ({
                    ...prev,
                    [key]: true,
                    [other]: false,
                }));
            } else {
                setCollapsibles((prev) => ({
                    ...prev,
                    [key]: true,
                }));
            }
        },
        []
    );

    const collapsibleOff = useCallback(
        (key: keyof ThemeContextState["collapsibles"]) => {
            setCollapsibles((prev) => ({
                ...prev,
                [key]: false,
            }));
        },
        []
    );

    const closeCollapsibles = useCallback(() => {
        setCollapsibles((prev) => ({
            ...prev,
            options: false,
            class: false,
        }));
    }, []);

    return (
        <ThemeContext.Provider
            value={{
                ...themeDefault,
                state: {
                    viewPort,
                    collapsibles,
                    toggleCollapsible,
                    collapsibleOn,
                    collapsibleOff,
                    closeCollapsibles,
                },
            }}
        >
            {children}
        </ThemeContext.Provider>
    );
};
