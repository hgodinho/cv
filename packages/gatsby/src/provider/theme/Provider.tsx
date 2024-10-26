import React, { useCallback, useEffect, useMemo, useState } from "react";

import { useViewPortSize } from "#root/lib";
import {
    ThemeContextState,
    ThemeContext,
    themeDefault,
    themeStateDefault,
} from "./";

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

    const middleHeight = useMemo(() => {
        const { isMobile, isTablet, isDesktop, height } = viewPort;
        if (height && isMobile) {
            return `${height - 116}px`;
        } else if (height && isTablet) {
            return `${height - 116}px`;
        } else if (height && isDesktop) {
            return `${height - 128}px`;
        }
        return "auto";
    }, [viewPort]);

    useEffect(() => {
        document.documentElement.style.setProperty(
            "--middle-height",
            middleHeight
        );
    }, [middleHeight]);

    return (
        <ThemeContext.Provider
            value={{
                ...themeDefault,
                state: {
                    viewPort,
                    collapsibles,
                    variant,
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
