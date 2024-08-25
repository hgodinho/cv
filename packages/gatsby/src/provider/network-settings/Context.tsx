import { NetworkSettingsCallbacks, NetworkSettingsType } from "#root/types";
import { createContext } from "react";
import { defaultCallbacks, defaultSettings } from "./defaultContext";

export const NetworkSettingsContext = createContext<{
    settings: NetworkSettingsType;
    callbacks: NetworkSettingsCallbacks;
}>({ settings: defaultSettings, callbacks: defaultCallbacks });
