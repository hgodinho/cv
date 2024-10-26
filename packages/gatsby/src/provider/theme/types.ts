import { Variant } from "#root/types";

export type ThemeContextType = {
    sizes: Record<string, number>;
    colors: Record<string, string>;
    state: ThemeContextState & ThemeContextCallbacks & Variant;
};

export type ThemeContextState = {
    viewPort: {
        windowDimensions: {
            width: number;
            height: number;
            isMobile: boolean;
            isTablet: boolean;
            isDesktop: boolean;
            isPrint: boolean;
        };
        handlePrint: (trueForPrint: boolean) => void;
        setWindowDimensions: React.Dispatch<
            React.SetStateAction<
                ThemeContextState["viewPort"]["windowDimensions"]
            >
        >;
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
