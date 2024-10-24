import { tw } from "#root/lib";
import React from "react";

export type EntryListProps = {};

export function EntryList({
    children,
}: React.PropsWithChildren<EntryListProps>) {
    return <ul>{children}</ul>;
}

export function EntryListItem({
    children,
}: React.PropsWithChildren<EntryListProps>) {
    return (
        <li className={tw("flex", "flex-col", "gap-1", "mb-2")}>{children}</li>
    );
}
