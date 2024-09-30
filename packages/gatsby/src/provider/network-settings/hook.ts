import { useContext } from "react";
import { NetworkSettingsContext } from "./Context";

export function useNetworkSettings() {
    const context = useContext(NetworkSettingsContext);
    return context;
}
