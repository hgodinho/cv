import { useContext } from "react";
import { CVContext } from "@/provider";
import React from "react";
import { useNetwork } from "@/lib/useNetwork";
import ForceGraph3d from "react-force-graph-3d";

export type NetworkViewProps = {
    w: number;
    h: number;
}

export function NetworkView({ w, h }: NetworkViewProps) {
    const { data, setSelected } = useContext(CVContext);

    const {
        ref,
        nodes,
        links,
        focusOnClick,
        nodeLabel,
        linkLabel,
        linkLabelPosition
    } = useNetwork({ w, h, ld: data, setSelected });

    return (
        // <div className="absolute -z-10">
        <ForceGraph3d
            ref={ref}
            // @ts-ignore
            graphData={{ nodes, links }}
            width={w}
            height={h}
            nodeAutoColorBy={'group'}
            backgroundColor="black"
            onNodeClick={focusOnClick}
            linkThreeObject={linkLabel}
            nodeLabel={nodeLabel}
            linkThreeObjectExtend={true}
            linkPositionUpdate={linkLabelPosition}
        />
        // </div>
    );
}