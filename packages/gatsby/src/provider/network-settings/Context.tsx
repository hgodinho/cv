import { createContext } from "react";
import {
    NetworkSettingsCallbacks,
    NetworkSettingsType,
} from "./";
import {
    defaultCallbacks,
    defaultSettings,
} from "./defaultContext";

export const NetworkSettingsContext = createContext<{
    settings: NetworkSettingsType;
    callbacks: NetworkSettingsCallbacks;
}>({ settings: defaultSettings, callbacks: defaultCallbacks });
