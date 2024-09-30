import { tw } from "#root/lib";
import { useI18nContext } from "#root/provider";
import React from "react";
import { Trigger as PrimitiveTrigger } from "@radix-ui/react-select";

import {
    Select,
    SelectContent,
    SelectItem,
    SelectValue,
} from "#root/components";
import { Locales, LOCALES } from "@hgod-in-cv/data/src/types";

interface TriggerProps {
    locale: LOCALES;
    locales: Locales;
}

export const Trigger: React.FC<TriggerProps> = ({ locale, locales }) => {
    return (
        <PrimitiveTrigger
            className={tw(
                "trigger",
                "flex",
                "col-start-2",
                "col-span-1",
                "row-start-5",
                "row-span-1",
                "z-10",

                "disabled:cursor-not-allowed",
                "border-0",
                "rounded-none",

                "items-center",
                "justify-between",
                "border",

                "ring-offset-background",

                "placeholder:text-muted-foreground",

                "disabled:cursor-not-allowed",
                "disabled:opacity-50",
                "[&>span]:line-clamp-1"
            )}
        >
            <SelectValue>
                <span
                    className={tw("fi", `fi-${locales[locale].icon}`)}
                ></span>
            </SelectValue>
        </PrimitiveTrigger>
    );
};

export function L10NSelect() {
    const { locale, locales, setLocale } = useI18nContext();
    return (
        <Select
            value={locale}
            onValueChange={(value) => {
                setLocale(value as any);
            }}
        >
            <Trigger locale={locale} locales={locales} />
            <SelectContent
                className={tw("rounded-none", "min-w-0", "bg-black/90")}
            >
                {Object.values(locales).map((locale) => (
                    <SelectItem key={locale.lang} value={locale.lang}>
                        <span className={tw("fi", `fi-${locale.icon}`)}></span>
                    </SelectItem>
                ))}
            </SelectContent>
        </Select>
    );
}
