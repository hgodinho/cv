import ForceGraph3d from "react-force-graph-3d";

import { useNetwork } from "@/lib";

// @ts-ignore
import { network } from '@/components/layout/grid.module.css'

export type NetworkViewProps = {
    width: number;
    height: number;
}

export function NetworkView({ width, height }: NetworkViewProps) {
    const {
        ref,
        filteredNodes,
        filteredLinks,
        color,
        focusOnClick,
        nodeLabel,
        linkLabel,
        linkLabelPosition
    } = useNetwork();


    return (
        <div className={`${network} m-auto`}>
            <ForceGraph3d
                ref={ref}
                graphData={{ nodes: filteredNodes, links: filteredLinks }}
                width={width - 10}
                height={height - 10}
                backgroundColor="black"
                showNavInfo={false}
                nodeOpacity={.95}
                nodeResolution={48}
                onNodeClick={focusOnClick}
                nodeLabel={nodeLabel}
                nodeColor={color}
                linkThreeObject={linkLabel}
                linkPositionUpdate={linkLabelPosition}
                linkThreeObjectExtend={true}
                linkCurvature={"curvature"}
                linkCurveRotation={"rotation"}
            />
        </div>
    );
}