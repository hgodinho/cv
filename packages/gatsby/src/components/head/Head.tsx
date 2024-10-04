import { tw } from "#root/lib";
import React from "react";
import { Seo } from "../seo";
import { PageContext, UnionSchemaType } from "@hgod-in-cv/data/src/types";

export type HeadProps = {
    title: string;
    pageContext: PageContext;
    data: UnionSchemaType;
};

export function Head({ title, data, pageContext }: HeadProps) {
    return (
        <>
            <title>{title}</title>
            <Seo data={data} pageContext={pageContext} />
            <body
                className={tw(
                    // background
                    "dark",
                    "bg-zinc-50",
                    "dark:bg-zinc-950",

                    // typography
                    "text-zinc-950",
                    "dark:text-zinc-50"
                )}
            />
        </>
    );
}
