import { useState, useEffect, useCallback } from "react";
import { theme } from "#root/styles";

const breakpoints = (() => {
    const {
        screens: { sm, md, lg, xl },
    } = theme;
    return {
        sm: parseInt(sm as string),
        md: parseInt(md as string),
        lg: parseInt(lg as string),
        xl: parseInt(xl as string),
    };
})();

export function useViewPortSize() {
    const getWindowDimensions = useCallback(() => {
        const { width, height, isDesktop, isMobile, isTablet, isPrint } =
            (() => {
                if (typeof window !== "undefined") {
                    const { innerWidth, innerHeight } = window;
                    return {
                        width: innerWidth,
                        height: innerHeight,
                        isMobile:
                            innerWidth <= breakpoints.sm && innerWidth >= 0,
                        isTablet:
                            innerWidth <= breakpoints.lg &&
                            innerWidth >= breakpoints.md,
                        isDesktop: innerWidth >= breakpoints.lg,
                        isPrint: window.matchMedia("print").matches,
                    };
                } else {
                    // default to mobile for ssg
                    return {
                        width: 480,
                        height: 800,
                        isMobile: true,
                        isTablet: false,
                        isDesktop: false,
                        isPrint: false,
                    };
                }
            })();

        return {
            width,
            height,
            isDesktop,
            isMobile,
            isTablet,
            isPrint,
            breakpoints,
        };
    }, []);

    const [windowDimensions, setWindowDimensions] = useState(
        (() => {
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
                    isPrint: window.matchMedia("print").matches,
                };
            } else {
                // default to mobile for ssg
                return {
                    width: 480,
                    height: 800,
                    isMobile: true,
                    isTablet: false,
                    isDesktop: false,
                    isPrint: false,
                };
            }
        })()
    );

    const handlePrint = useCallback(
        (trueForPrint: boolean) => {
            setWindowDimensions({
                ...windowDimensions,
                isPrint: trueForPrint,
            });
        },
        [windowDimensions]
    );

    useEffect(() => {
        function handleResize() {
            setWindowDimensions(getWindowDimensions());
        }
        if (typeof window !== "undefined") {
            window.addEventListener("resize", handleResize);
            window.addEventListener("beforeprint", () => handlePrint(true));
            window.addEventListener("afterprint", () => handlePrint(false));
        }
        return () => {
            window.removeEventListener("resize", handleResize);
            window.removeEventListener("beforeprint", () => handlePrint(true));
            window.removeEventListener("afterprint", () => handlePrint(false));
        };
    }, []);

    useEffect(() => {
        if (windowDimensions.isPrint) {
            window.print();
        }
    }, [windowDimensions.isPrint]);

    return { windowDimensions, setWindowDimensions, handlePrint };
}
