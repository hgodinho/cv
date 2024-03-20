"use client";
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
        <div className="force-graph" style={{
            gridColumnStart: 1,
            gridColumnEnd: 4,
            gridRowStart: 1,
            gridRowEnd: 4,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
        }}>
            <ForceGraph3d
                ref={ref}
                graphData={{ nodes, links }}
                width={w - 10}
                height={h - 10}
                nodeAutoColorBy={'group'}
                backgroundColor="black"
                showNavInfo={false}
                onNodeClick={focusOnClick}
                nodeLabel={nodeLabel}
                linkThreeObject={linkLabel}
                linkPositionUpdate={linkLabelPosition}
                linkThreeObjectExtend={true}
                linkCurvature={"curvature"}
                linkCurveRotation={"rotation"}
            />
        </div>
    );
}