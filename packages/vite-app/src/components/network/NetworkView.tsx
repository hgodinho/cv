import ForceGraph3d from "react-force-graph-3d";

import { useNetwork } from "@/lib";

import styles from "@/components/layout/grid.module.css";

export type NetworkViewProps = {
    width: number;
    height: number;
};

export function NetworkView({ width, height }: NetworkViewProps) {
    const {
        ref,
        filteredNodes,
        filteredLinks,

        settings,

        color,
        focusOnClick,
        nodeLabel,
        linkLabel,
        linkLabelPosition,
    } = useNetwork();

    return (
        <div className={`${styles.network} m-auto`}>
            <ForceGraph3d
                ref={ref}
                graphData={{ nodes: filteredNodes, links: filteredLinks }}
                showNavInfo={false}
                width={width - 10}
                height={height - 10}
                backgroundColor="black"
                nodeLabel={nodeLabel}
                nodeColor={color}
                onNodeClick={focusOnClick}
                linkThreeObject={linkLabel}
                linkPositionUpdate={linkLabelPosition}
                linkThreeObjectExtend={true}
                {...settings}
            />
        </div>
    );
}
