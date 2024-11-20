import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { tw } from "#root/lib";

const buttonVariants = cva(
    [
        "flex",
        "p-2",
        "w-max",
        "gap-2",
        "whitespace-nowrap",
        "box-border",
        "border-inset",

        "text-sm",
        "font-medium",

        "ring-offset-zinc-100",
        "transition-colors",

        "focus-visible:outline-none",
        "focus-visible:ring-2",
        "focus-visible:ring-ring",
        "focus-visible:ring-offset-2",

        "disabled:pointer-events-none",
        "disabled:cursor-not-allowed",
        "disabled:opacity-50",

        "[&_svg]:pointer-events-none",
        "[&_svg]:size-4",
        "[&_svg]:shrink-0",
    ],
    {
        variants: {
            variant: {
                default: [
                    "focus:ring-zinc-500",
                    "disabled:bg-zinc-700",
                    "disabled:text-zinc-300",

                    "text-black",
                    "bg-zinc-300",
                    "dark:bg-zinc-400",

                    "border",
                    "border-2",
                    "dark:border-0",
                    "border-zinc-300",
                    "hover:border-zinc-950",
                    "hover:bg-transparent",
                    "hover:border-zinc-500",
                    "dark:hover:bg-zinc-200",

                    "focus:bg-zinc-200",
                ],
                destructive:
                    "bg-destructive text-destructive-foreground hover:bg-destructive/90",
                outline:
                    "border border-input hover:bg-accent hover:text-accent-foreground",
                secondary:
                    "bg-secondary text-secondary-foreground hover:bg-secondary/80",
                ghost: "hover:bg-accent hover:text-accent-foreground",
                link: "text-primary underline-offset-4 hover:underline",
            },
            size: {
                default: "",
                sm: "h-9 rounded-md px-3",
                lg: "h-11 rounded-md px-8",
                icon: "h-10 w-10",
            },
        },
        defaultVariants: {
            variant: "default",
            size: "default",
        },
    }
);

export interface ButtonProps
    extends React.ButtonHTMLAttributes<HTMLButtonElement>,
        VariantProps<typeof buttonVariants> {
    asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, variant, size, asChild = false, ...props }, ref) => {
        const Comp = asChild ? Slot : "button";
        return (
            <Comp
                className={tw(buttonVariants({ variant, size, className }))}
                ref={ref}
                {...props}
            />
        );
    }
);
Button.displayName = "Button";

export { Button, buttonVariants };
