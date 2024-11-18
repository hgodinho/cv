import { tw } from "#root/lib";
import React from "react";
import { Seo } from "../seo";
import { PageContext, UnionSchemaType } from "@hgod-in-cv/data/src/types";
import { cva } from "class-variance-authority";
import { Variant } from "#root/types";

export type HeadProps = {
    title: string;
    pageContext: PageContext;
    data?: UnionSchemaType;
} & Variant;

const bodyVariant = cva(["font-sans"], {
    variants: {
        variant: {
            default: [
                "default",
                "dark",
                "bg-zinc-950",
                "text-zinc-50",
            ],
            text: ["bg-zinc-50", "text-zinc-950"],
        },
        defaultVariants: {
            variant: "default",
        },
    },
});

export function Head({ title, data, variant, pageContext }: HeadProps) {
    return (
        <>
            <html lang={pageContext.locale} />
            <title>{title}</title>
            <Seo data={data} pageContext={pageContext} />
            <body className={tw(bodyVariant({ variant }))} />
        </>
    );
}
