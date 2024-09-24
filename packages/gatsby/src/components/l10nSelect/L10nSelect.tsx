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
            {/* <SelectTrigger
                className={tw(
                    "col-start-2",
                    "col-span-1",
                    "row-start-5",
                    "row-span-1",
                    "z-10",
                    // "pl-1",
                    // "justify-center",
                    // "items-center",
                    "focus:outline-none",
                    "focus:ring-4",
                    "focus:ring-inset",
                    // "text-black",
                    // "disabled:bg-black/40",
                    // "focus:ring-gray-500",
                    // "bg-gray-300",
                    // "hover:bg-gray-100",
                    // "focus:bg-gray-300",
                    "disabled:cursor-not-allowed",
                    "ring-offset-0",
                    "border-0",
                    "rounded-none"
                )}
            >
                <SelectValue>
                    <span
                        className={tw(
                            "fi",
                            `fi-${locales[locale].icon}`,
                            "text-xs"
                        )}
                    ></span>
                </SelectValue>
            </SelectTrigger> */}
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
