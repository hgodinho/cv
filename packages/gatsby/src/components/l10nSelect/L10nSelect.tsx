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
        "disabled:cursor-not-allowed",
        "rounded-none",
        "ring-offset-black",

        "placeholder:text-muted-foreground",

        "disabled:cursor-not-allowed",
        "disabled:opacity-50",
        "[&>span]:line-clamp-1",
    ],
    {
        variants: {
            variant: {
                default: [
                    "default",
                    "col-start-2",
                    "col-span-1",
                    "row-start-5",
                    "row-span-1",

                    "items-center",
                    "justify-between",
                ],
                pdf: [
                    "pdf",
                    "col-start-2",
                    "col-span-1",
                    "row-start-4",
                    "row-span-1",

                    "items-center",
                    "justify-between",
                ],
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
            <SelectValue>
                <span className={tw("fi", `fi-${locales[locale].icon}`)}></span>
            </SelectValue>
        </PrimitiveTrigger>
    );
};

export function L10NSelect({ variant, ...props }: TriggerProps) {
    const { locale, locales, setLocale } = useI18nContext();
    return (
        <Select
            name="locale-select"
            value={locale}
            onValueChange={(value) => {
                setLocale(value as any);
            }}
        >
            <Trigger
                {...props}
                variant={variant}
                locale={locale}
                locales={locales}
            />
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
