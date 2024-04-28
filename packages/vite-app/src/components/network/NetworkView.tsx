import { tw, useNetwork } from "#root/lib";
import { ClientOnly } from "vike-react/ClientOnly";

export function NetworkView() {
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
                "active:cursor-grabbing"
            )}
        >
            <ClientOnly
                load={() => import("react-force-graph-3d")}
                fallback={<div>Loading...</div>}
            >
                {(ForceGraph3d) => (
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
                )}
            </ClientOnly>
        </div>
    );
}
