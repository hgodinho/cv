import React from "react";
import { CVProvider } from "@/provider";
import { NetworkView } from "./NetworkView";
import { JsonLDType } from "@/lib";
import { ClassView } from "./ClassView";
import { Grid } from "./Grid";
import { TreeView } from "./TreeView";
import { useViewPortSize } from "@/lib";

export function CV({ data }: { data: JsonLDType }) {

    const dimensions = useViewPortSize();

    console.log({ dimensions })

    return (
        <CVProvider data={data}>
            <Grid h={dimensions.height}>
                <NetworkView w={dimensions.width} h={dimensions.height} />
                <TreeView />
                <ClassView />
            </Grid>
        </CVProvider>
    )
}