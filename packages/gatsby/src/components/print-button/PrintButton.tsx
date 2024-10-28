import React from "react";
import { Button } from "#root/components";
import { tw } from "#root/lib";
import { FileDown } from "lucide-react";
import { useTheme } from "#root/provider";

export function PrintButton() {
    const {
        state: {
            viewPort: { handlePrint },
        },
    } = useTheme();

    return (
        <Button
            className={tw(
                "col-start-2",
                "row-start-2",
                "lg:col-start-2",
                "lg:row-start-2",

                "print:hidden",

                "flex",
                "p-2",
                "w-max"
            )}
            onClick={() => handlePrint(true)}
        >
            <FileDown className={tw("w-6", "h-6")} />
        </Button>
    );
}
