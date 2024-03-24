import { useContext } from "react";
import ForceGraph3d from "react-force-graph-3d";

import { CVContext } from "@/provider";
import { useNetwork } from "@/lib";

import { network } from '@/components/layout/grid.module.css'

export type NetworkViewProps = {
    width: number;
    height: number;
}

export function NetworkView({ width, height }: NetworkViewProps) {
    const { data, setSelected } = useContext(CVContext);

    const {
        ref,
        nodes,
        links,
        focusOnClick,
        nodeLabel,
        linkLabel,
        linkLabelPosition
    } = useNetwork({ w: width, h: height, ld: data.data, setSelected });

    return (
        <div className={`${network} m-auto`}>
            <ForceGraph3d
                ref={ref}
                graphData={{ nodes, links }}
                width={width - 10}
                height={height - 10}
                nodeAutoColorBy={'type'}
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