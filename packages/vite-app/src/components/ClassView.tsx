import { useContext, useState, useEffect } from "react";
import * as CollapsiblePrimitive from "@radix-ui/react-collapsible";
import { CVContext } from "@/provider";
import { Fields } from "./Fields";

export function ClassView() {

    const [open, setOpen] = useState(false);

    const { selected } = useContext(CVContext);

    useEffect(() => {
        if (selected) setOpen(true);
    }, [selected]);

    return (
        <CollapsiblePrimitive.Root
            className="class-view z-10 h-full"
            style={{
                gridArea: "class",
            }}
            open={open}
            onOpenChange={() => setOpen(!open)}
        >
            <CollapsiblePrimitive.Trigger className="class-view-trigger bg-slate-800">{!open ? "+ info" : "- info"}</CollapsiblePrimitive.Trigger>
            <CollapsiblePrimitive.Content className="class-view-content p-4 h-full overflow-y-auto text-wrap" style={{
                backgroundColor: selected ? `${selected.color}70` : "var(--slate-800/70)",
            }}>
                {
                    !selected
                        ? <div className="">Select a class to view more info</div>
                        : <Fields data={selected} />
                }
            </CollapsiblePrimitive.Content>
        </CollapsiblePrimitive.Root>
    )
}