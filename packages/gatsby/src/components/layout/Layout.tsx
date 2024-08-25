import React from "react";

import { tw } from "#root/lib";

export function Layout({
    children,
    ...props
}: React.PropsWithChildren<React.HTMLAttributes<HTMLDivElement>>) {
    return (
        <div
            {...props}
            className={tw(
                "layout-view3",
                "grid",
                "grid-cols-layout",
                "grid-rows-layout",
                "relative",

                // tablet
                "md:grid-cols-layout-md",
                "md:grid-rows-layout-md",

                // desktop
                "lg:grid-cols-layout-lg",
                "lg:grid-rows-layout-lg"
            )}
        >
            {children}
        </div>
    );
}
