import { createContext, useContext, useReducer, useCallback } from "react";

export type NetworkSettingsType = {
    nodeRelSize: number;
    nodeResolution: number;
    nodeOpacity: number;

    linkDirectionalArrowLength: number;
    linkDirectionalArrowRelPos: number;
    linkWidth: number;
    linkOpacity: number;
    linkDirectionalParticles?: number;
    linkDirectionalParticleSpeed?: number;
    linkDirectionalParticleWidth?: number;
    linkDirectionalParticleResolution?: number;
};

const defaultSettings: NetworkSettingsType = {
    nodeRelSize: 4,
    nodeResolution: 48,
    nodeOpacity: 0.95,
    linkDirectionalArrowLength: 2,
    linkDirectionalArrowRelPos: 0.8,
    linkWidth: 0.2,
    linkOpacity: 0.3,
};

export type NetworkSettingsCallbacks = {
    changeValue: (key: keyof NetworkSettingsType, value: number) => void;
};

const defaultCallbacks: NetworkSettingsCallbacks = {
    changeValue: () => {},
};

export const NetworkSettingsContext = createContext<{
    settings: NetworkSettingsType;
    callbacks: NetworkSettingsCallbacks;
}>({ settings: defaultSettings, callbacks: defaultCallbacks });

export function NetworkSettingsProvider({
    children,
}: React.PropsWithChildren<{}>) {
    const [state, setState] = useReducer(
        (
            state: NetworkSettingsType,
            newState: Partial<NetworkSettingsType>
        ) => ({
            ...state,
            ...newState,
        }),
        defaultSettings
    );

    const changeValue = useCallback(
        (key: keyof NetworkSettingsType, value: number) => {
            setState({ [key]: value });
        },
        []
    );

    const value = {
        settings: state,
        callbacks: {
            changeValue,
        },
    };

    return (
        <NetworkSettingsContext.Provider value={value}>
            {children}
        </NetworkSettingsContext.Provider>
    );
}

export function useNetworkSettings() {
    const context = useContext(NetworkSettingsContext);
    return context;
}
