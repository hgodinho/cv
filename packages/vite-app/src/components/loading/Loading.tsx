import { tw } from "#root/lib";
import { Loader, Compass, Hexagon } from "react-feather";

export function Loading({
    variant = "spinner",
}: {
    variant?: "spinner" | "compass"  | "hexagon";
}) {
    const props = {
        size: 32,
        className: tw("animate-spin-slow"),
    };

    return (
        <div className={tw("self-center", "justify-self-center")}>
            {(() => {
                switch (variant) {
                    case "compass":
                        return <Compass {...props} />;

                    case "hexagon":
                        return <Hexagon {...props} />;

                    case "spinner":
                    default:
                        return <Loader {...props} />;
                }
            })()}
        </div>
    );
}
