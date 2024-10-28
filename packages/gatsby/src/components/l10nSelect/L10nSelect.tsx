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
import { cva } from "class-variance-authority";
import { Variant } from "#root/types";

export type L10NSelectProps = Variant;

interface TriggerProps {
    locale: LOCALES;
    locales: Locales;
    variant: "default" | "pdf";
}

const triggerVariants = cva(
    [
        "l10n-select-trigger",
        "flex",
        "z-10",
        "w-8",
        "h-8",
        "disabled:cursor-not-allowed",
        "rounded-none",
        "ring-offset-black",

        "bg-gray-300",
        "hover:bg-gray-100",
        "focus:bg-gray-300",

        "disabled:cursor-not-allowed",
        "disabled:opacity-50",
        "[&>span]:line-clamp-1",

        "items-center",
        "justify-center",
    ],
    {
        variants: {
            variant: {
                default: ["default"],
                pdf: ["pdf"],
            },
        },
        defaultVariants: {
            variant: "default",
        },
    }
);

export const Trigger: React.FC<TriggerProps> = ({
    locale,
    variant,
    locales,
}) => {
    return (
        <PrimitiveTrigger className={tw(triggerVariants({ variant }))}>
            <SelectValue className={tw("w-full", "h-full")}>
                <span
                    className={tw("fi", `fi-${locales[locale].icon}`, "fis")}
                ></span>
            </SelectValue>
        </PrimitiveTrigger>
    );
};

export function L10NSelect({ variant }: L10NSelectProps) {
    const { locale, locales, setLocale } = useI18nContext();
    return (
        <Select
            name="locale-select"
            value={locale}
            onValueChange={(value) => {
                setLocale(value as any);
            }}
        >
            <Trigger variant={variant} locale={locale} locales={locales} />
            <SelectContent
                className={tw(
                    "rounded-none",
                    "min-w-0",
                    "bg-slate-300/90",
                    "text-black"
                )}
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
