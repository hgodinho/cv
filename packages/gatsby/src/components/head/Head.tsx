import { tw } from "#root/lib";
import React from "react";
import { Seo } from "../seo";

export type HeadProps = {
    title: string;
};

export function Head({ title }: HeadProps) {
    return (
        <>
            <title>{title}</title>
            <Seo />
            <body
                className={tw(
                    // background
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
