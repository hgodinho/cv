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

export type NetworkSettingsCallbacks = {
    changeValue: (key: keyof NetworkSettingsType, value: number) => void;
};
