import { LinkObject, LOCALES, NodeObject } from "@hgod-in-cv/data/src/types";
import { HTMLAttributes } from "react";
import type { Variant } from "#root/types";

export type EntityViewProps<T> = {
    data: T;
    nodes: NodeObject[];
    links: LinkObject[];
    locale: LOCALES;
} & Partial<Variant> & HTMLAttributes<HTMLElement>;
