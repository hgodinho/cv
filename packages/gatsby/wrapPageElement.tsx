import React from "react";
import { GatsbyBrowser } from "gatsby";
import { Template } from "./src/templates";
import { PageContext } from "@hgod-in-cv/data/src/types";

const wrapPageElement: GatsbyBrowser<
    Record<string, unknown>,
    PageContext
>["wrapPageElement"] = ({ element, props }) => {
    return (
        <>
            <link rel="preconnect" href="https://fonts.googleapis.com" />
            <link
                rel="preconnect"
                href="https://fonts.gstatic.com"
                crossOrigin="anonymous"
            />
            <link
                href="https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&family=JetBrains+Mono:ital,wght@0,100..800;1,100..800&display=swap"
                rel="stylesheet"
            />
            <Template
                {...props}
                variant={props.path.includes("print") ? "pdf" : "default"}
                element={element}
            />
        </>
    );
};

export default wrapPageElement;
