import {
    createContext,
    useContext,
    useState,
    useCallback,
    useEffect,
} from "react";

import { useViewPortSize } from "@/lib";

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
