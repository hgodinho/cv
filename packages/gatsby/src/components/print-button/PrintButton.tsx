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
            className={tw("print-button", "print:hidden")}
            onClick={() => handlePrint(true)}
        >
            <FileDown className={tw("w-6", "h-6")} />
        </Button>
    );
}
