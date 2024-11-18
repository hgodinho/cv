import React from "react";

import { tw, useNetwork } from "#root/lib";
import { cva } from "class-variance-authority";
import ForceGraph3d from "react-force-graph-3d";
import type { Variant } from "#root/types";

export type NetworkViewProps = {
} & Variant;

const networkVariant = cva(
    ["net-view", "z-10", "cursor-grab", "active:cursor-grabbing"],
    {
        variants: {
            variant: {
                default: [
                    "default",
                    "absolute",
                    "w-full",
                    "h-full",
                ],
            },
            defaultVariants: {
                variant: "default",
            },
        },
    }
);

export function NetworkView({ variant }: NetworkViewProps) {
    const {
        ref,
        filteredNodes,
        filteredLinks,
        width,
        height,
        settings,

        color,
        focusOnClick,
        nodeLabel,
        linkLabel,
        linkLabelPosition,
    } = useNetwork();

    return (
        variant === "default" && (
            <div className={tw(networkVariant({ variant: "default" }))}>
                {typeof width !== "undefined" &&
                    typeof height !== "undefined" ? (
                    <ForceGraph3d
                        ref={ref}
                        graphData={{
                            nodes: filteredNodes || [],
                            links: filteredLinks || []
                        }}
                        showNavInfo={false}
                        width={width - 2}
                        height={height - 2}
                        backgroundColor={"black"}
                        nodeLabel={nodeLabel}
                        nodeColor={color}
                        onNodeClick={focusOnClick}
                        linkThreeObject={linkLabel}
                        linkPositionUpdate={linkLabelPosition}
                        linkSource="subject"
                        linkTarget="object"
                        linkThreeObjectExtend={true}
                        {...settings}
                    />
                ) : null}
            </div>
        )
    );
}
