import { tw, useNetwork } from "#root/lib";
import ForceGraph3d from "react-force-graph-3d";

function NetworkView() {
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
        <div
            className={tw(
                "absolute",
                "z-10",
                "cursor-grab",
                "active:cursor-grabbing",
                "w-full",
                "h-full",
                "grid"
            )}
        >
            {typeof width !== "undefined" && typeof height !== "undefined" ? (
                <ForceGraph3d
                    ref={ref}
                    graphData={{
                        nodes: filteredNodes,
                        links: filteredLinks,
                    }}
                    showNavInfo={false}
                    width={width - 2}
                    height={height - 2}
                    backgroundColor="black"
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
    );
}

export default NetworkView;
