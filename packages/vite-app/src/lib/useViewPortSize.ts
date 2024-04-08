import { useState, useEffect, useMemo } from "react";
import theme from "../../tailwind.config";

function getWindowDimensions() {
    const { innerWidth: width, innerHeight: height } = window;
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

    return {
        width,
        height,
        isMobile: width <= breakpoints.sm && width >= 0,
        isTablet: width <= breakpoints.lg && width >= breakpoints.md,
        isDesktop: width >= breakpoints.lg,
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

        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    return windowDimensions;
}
