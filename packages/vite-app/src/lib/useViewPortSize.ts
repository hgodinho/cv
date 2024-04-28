import { useState, useEffect, useMemo } from "react";
import theme from "../../tailwind.config";

function getWindowDimensions() {
    const breakpoints = useMemo(() => {
        const {
            theme: {
                screens: { sm, md, lg, xl },
            },
        } = theme as unknown as {
            theme: {
                screens: {
                    sm: string | number;
                    md: string | number;
                    lg: string | number;
                    xl: string | number;
                };
            };
        };
        return {
            sm: parseInt(sm as string),
            md: parseInt(md as string),
            lg: parseInt(lg as string),
            xl: parseInt(xl as string),
        };
    }, []);

    const { width, height, isDesktop, isMobile, isTablet } = useMemo(() => {
        if (typeof window !== "undefined") {
            const { innerWidth, innerHeight } = window;
            return {
                width: innerWidth,
                height: innerHeight,
                isMobile: innerWidth <= breakpoints.sm && innerWidth >= 0,
                isTablet:
                    innerWidth <= breakpoints.lg &&
                    innerWidth >= breakpoints.md,
                isDesktop: innerWidth >= breakpoints.lg,
            };
        } else {
            // default to mobile for ssr
            return {
                width: 480,
                height: 800,
                isMobile: true,
                isTablet: false,
                isDesktop: false,
            };
        }
    }, [breakpoints]);

    return {
        width,
        height,
        isDesktop,
        isMobile,
        isTablet,
        breakpoints,
    };
}

export function useViewPortSize() {
    const [windowDimensions, setWindowDimensions] = useState(
        getWindowDimensions()
    );

    useEffect(() => {
        function handleResize() {
            setWindowDimensions(getWindowDimensions());
        }
        if (typeof window !== "undefined")
            window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    return windowDimensions;
}
