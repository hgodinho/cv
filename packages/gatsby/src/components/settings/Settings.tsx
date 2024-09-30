import React, { useState, useEffect } from "react";

import { Label, Slider, Switch, Scroll } from "#root/components";
import { tw } from "#root/lib";
import { useNetworkSettings } from "#root/provider";

export type SettingsProps = {
    hidden: boolean;
};

export function Settings({ hidden = false }: SettingsProps) {
    const {
        settings,
        callbacks: { changeValue },
    } = useNetworkSettings();

    const [particles, setParticles] = useState<boolean>(false);

    useEffect(() => {
        changeValue("linkDirectionalParticles", particles ? 1 : 0);
    }, [particles]);

    return (
        <div
            className={tw(
                "sticky",
                "top-8",
                "flex",
                "flex-col",
                "p-2",
                "border-b-2",
                "h-72",
                "bg-black/45",
                "z-10",
                hidden ? "hidden" : undefined
            )}
        >
            <Scroll>
                <fieldset>
                    <Label as="legend" className={tw()}>
                        Nós
                    </Label>
                    <div className={tw("ml-4")}>
                        <Slider
                            id="nodeOpacity"
                            label="Opacidade dos nós"
                            min={0.1}
                            max={1}
                            step={0.01}
                            defaultValue={[settings.nodeOpacity]}
                            value={[settings.nodeOpacity]}
                            onValueChange={(value) => {
                                changeValue("nodeOpacity", value[0]);
                            }}
                        />
                        <Slider
                            id="nodeRelSize"
                            label="Tamanho dos nós"
                            min={2}
                            max={12}
                            step={0.5}
                            defaultValue={[settings.nodeRelSize]}
                            value={[settings.nodeRelSize]}
                            onValueChange={(value) => {
                                changeValue("nodeRelSize", value[0]);
                            }}
                        />
                        <Slider
                            id="nodeResolution"
                            label="Resolução dos nós"
                            min={1}
                            max={24}
                            step={1}
                            defaultValue={[settings.nodeResolution]}
                            value={[settings.nodeResolution]}
                            onValueChange={(value) => {
                                changeValue("nodeResolution", value[0]);
                            }}
                        />
                    </div>
                </fieldset>
                <fieldset>
                    <Label className={tw()}>Links</Label>
                    <div className={tw("ml-4")}>
                        <Switch
                            label="Partículas nos links?"
                            checked={particles}
                            onCheckedChange={setParticles}
                        />
                        {!particles ? null : (
                            <div className={tw("ml-4")}>
                                <Slider
                                    id="linkDirectionalParticleSpeed"
                                    label="Velocidade da partícula"
                                    min={0}
                                    max={0.02}
                                    step={0.001}
                                    defaultValue={[
                                        settings.linkDirectionalParticleSpeed ??
                                        1,
                                    ]}
                                    value={[
                                        settings.linkDirectionalParticleSpeed ??
                                        1,
                                    ]}
                                    onValueChange={(value) => {
                                        changeValue(
                                            "linkDirectionalParticleSpeed",
                                            value[0]
                                        );
                                    }}
                                />
                                <Slider
                                    id="linkDirectionalParticleWidth"
                                    label="Tamanho da partícula"
                                    min={1}
                                    max={3}
                                    step={0.05}
                                    defaultValue={[
                                        settings.linkDirectionalParticleWidth ??
                                        1,
                                    ]}
                                    value={[
                                        settings.linkDirectionalParticleWidth ??
                                        1,
                                    ]}
                                    onValueChange={(value) => {
                                        changeValue(
                                            "linkDirectionalParticleWidth",
                                            value[0]
                                        );
                                    }}
                                />
                                <Slider
                                    id="linkDirectionalParticleResolution"
                                    label="Resolução da partícula"
                                    min={2}
                                    max={8}
                                    step={1}
                                    defaultValue={[
                                        settings.linkDirectionalParticleResolution ??
                                        1,
                                    ]}
                                    value={[
                                        settings.linkDirectionalParticleResolution ??
                                        1,
                                    ]}
                                    onValueChange={(value) => {
                                        changeValue(
                                            "linkDirectionalParticleResolution",
                                            value[0]
                                        );
                                    }}
                                />
                            </div>
                        )}
                        <Slider
                            id="linkWidth"
                            label="Espessura do link"
                            min={0.1}
                            max={3}
                            step={0.05}
                            defaultValue={[settings.linkWidth]}
                            value={[settings.linkWidth]}
                            onValueChange={(value) => {
                                changeValue("linkWidth", value[0]);
                            }}
                        />
                        <Slider
                            id="linkDirectionalArrowLength"
                            label="Indicador de direção do link"
                            min={0}
                            max={3}
                            step={0.05}
                            defaultValue={[settings.linkDirectionalArrowLength]}
                            value={[settings.linkDirectionalArrowLength]}
                            onValueChange={(value) => {
                                changeValue(
                                    "linkDirectionalArrowLength",
                                    value[0]
                                );
                            }}
                        />
                        <Slider
                            id="linkOpacity"
                            label="Opacidade do link"
                            min={0.1}
                            max={1}
                            step={0.01}
                            defaultValue={[settings.linkOpacity]}
                            value={[settings.linkOpacity]}
                            onValueChange={(value) => {
                                changeValue("linkOpacity", value[0]);
                            }}
                        />
                    </div>
                </fieldset>
            </Scroll>
        </div>
    );
}
