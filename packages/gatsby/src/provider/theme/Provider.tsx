import React, { useCallback, useEffect, useMemo, useState } from "react";

import { useViewPortSize } from "#root/lib";
import {
    ThemeContextState,
    ThemeContext,
    themeDefault,
    themeStateDefault,
} from "./";
import { Variant } from "#root/types";

export type ThemeProviderProps = Variant & {};

export const ThemeProvider = ({
    children,
    variant,
}: React.PropsWithChildren<ThemeProviderProps>) => {
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
            if (
                viewPort.windowDimensions.isMobile ||
                viewPort.windowDimensions.isTablet
            ) {
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
            if (
                viewPort.windowDimensions.isTablet ||
                viewPort.windowDimensions.isMobile
            ) {
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
        const { isMobile, isTablet, isDesktop, height } =
            viewPort.windowDimensions;
        if (height && isMobile) {
            return `${height - (variant === "default" ? 116 : 96)}px`;
        } else if (height && isTablet) {
            return `${height - (variant === "default" ? 116 : 96)}px`;
        } else if (height && isDesktop) {
            return `${height - (variant === "default" ? 116 : 96)}px`;
        }
        return "auto";
    }, [viewPort, variant]);

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
