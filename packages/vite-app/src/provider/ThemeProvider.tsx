import {
    createContext,
    useContext,
    useState,
    useCallback,
    useEffect,
} from "react";

import { useViewPortSize } from "#root/lib";

export type ThemeContextType = {
    sizes: Record<string, number>;
    viewPort: {
        width: number;
        height: number;
        isMobile: boolean;
        isTablet: boolean;
        isDesktop: boolean;
    };
    collapsibles: {
        options: boolean;
        class: boolean;
    };
    colors: Record<string, string>;
    toggleCollapsible: (key: keyof ThemeContextType["collapsibles"]) => void;
    collapsibleOn: (key: keyof ThemeContextType["collapsibles"]) => void;
    collapsibleOff: (key: keyof ThemeContextType["collapsibles"]) => void;
};

export const themeDefault: ThemeContextType = {
    sizes: {
        icon: 16,
    },
    viewPort: {
        width: 0,
        height: 0,
        isMobile: false,
        isTablet: false,
        isDesktop: false,
    },
    collapsibles: {
        options: false,
        class: false,
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
    toggleCollapsible: () => {},
    collapsibleOn: () => {},
    collapsibleOff: () => {},
};

export const ThemeContext = createContext<ThemeContextType>(themeDefault);

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
    const viewPort = useViewPortSize();

    const [collapsibles, setCollapsibles] = useState<
        ThemeContextType["collapsibles"]
    >({
        options: true,
        class: false,
    });

    const toggleCollapsible = useCallback(
        (key: keyof ThemeContextType["collapsibles"]) => {
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
        (key: keyof ThemeContextType["collapsibles"]) => {
            setCollapsibles((prev) => ({
                ...prev,
                [key]: true,
            }));

            if (viewPort.isMobile) {
                const other = key === "class" ? "options" : "class";
                setCollapsibles((prev) => ({
                    ...prev,
                    [other]: false,
                }));
            }
        },
        []
    );

    const collapsibleOff = useCallback(
        (key: keyof ThemeContextType["collapsibles"]) => {
            setCollapsibles((prev) => ({
                ...prev,
                [key]: false,
            }));
        },
        []
    );

    return (
        <ThemeContext.Provider
            value={{
                ...themeDefault,
                viewPort,
                collapsibles,
                toggleCollapsible,
                collapsibleOn,
                collapsibleOff,
            }}
        >
            {children}
        </ThemeContext.Provider>
    );
};

export function useTheme() {
    const context = useContext(ThemeContext);
    return context;
}
