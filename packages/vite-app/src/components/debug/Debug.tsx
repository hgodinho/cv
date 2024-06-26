import { tw } from "@/lib";
import { useTheme } from "@/provider";

export type Debug = {
    debug?: boolean;
};

export function Debug({ debug = true }: Debug) {
    const { viewPort } = useTheme();

    if (debug && import.meta.env.DEV) {
        return (
            <div
                className={tw(
                    "z-50",
                    "col-start-1",
                    "col-span-3",
                    "mt-4",
                    "grid",
                    "grid-cols-4",
                    "grid-row-3",
                    "gap-1",
                    "p-2",
                    "border",
                    "border-dotted",
                    "w-full",
                    "text-sm",
                    "bg-red-950/50",

                    // tablet
                    "md:col-span-5",
                    "md:grid-cols-5"
                )}
            >
                {Object.entries(viewPort).map(([key, value]) => (
                    <fieldset key={key} className={tw()}>
                        <legend>{key}</legend>
                        {JSON.stringify(value)}
                    </fieldset>
                ))}
            </div>
        );
    }
}
