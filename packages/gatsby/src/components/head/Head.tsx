import { tw } from "#root/lib";
import React from "react";
import { Seo } from "../seo";
import { PageContext, UnionSchemaType } from "@hgod-in-cv/data/src/types";
import { cva } from "class-variance-authority";

export type HeadProps = {
    title: string;
    pageContext: PageContext;
    variant: "default" | "pdf";
    data?: UnionSchemaType;
};

const bodyVariant = cva(["font-sans"], {
    variants: {
        variant: {
            default: [
                "default",
                "dark",
                "bg-zinc-950",
                "text-zinc-50",
            ],
            pdf: ["bg-zinc-50", "text-zinc-950"],
        },
        defaultVariants: {
            variant: "default",
        },
    },
});

export function Head({ title, data, variant, pageContext }: HeadProps) {
    return (
        <>
            <title>{title}</title>
            <Seo data={data} pageContext={pageContext} />
            <body className={tw(bodyVariant({ variant }))} />
        </>
    );
}
