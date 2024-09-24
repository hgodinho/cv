import { NetworkSettingsCallbacks, NetworkSettingsType } from "./";

export const defaultSettings: NetworkSettingsType = {
    nodeRelSize: 4,
    nodeResolution: 48,
    nodeOpacity: 0.95,
    linkDirectionalArrowLength: 2,
    linkDirectionalArrowRelPos: 0.8,
    linkWidth: 0.2,
    linkOpacity: 0.3,
};

export const defaultCallbacks: NetworkSettingsCallbacks = {
    changeValue: () => { },
};
