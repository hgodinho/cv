import { LinkObject, LOCALES, NodeObject } from "@hgod-in-cv/data/src/types";
import { HTMLAttributes } from "react";

export type EntityViewProps<T> = {
    variant?: "default" | "pdf";
    data: T;
    nodes: NodeObject[];
    links: LinkObject[];
    locale: LOCALES;
} & HTMLAttributes<HTMLElement>;
