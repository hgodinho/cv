import React, { useCallback, useReducer } from "react";

import {
    defaultSettings,
    NetworkSettingsType,
    NetworkSettingsContext,
} from "./";

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
