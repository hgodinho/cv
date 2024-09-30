export type ThemeContextType = {
    sizes: Record<string, number>;
    colors: Record<string, string>;
    state: ThemeContextState & ThemeContextCallbacks;
};

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
