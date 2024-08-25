import React from "react";
import "./src/styles/global.css";
import { GatsbyBrowser } from "gatsby";
import { Provider } from "./src/templates/Provider";
import { PageContext } from "@hgod-in-cv/data/src/types";

export const wrapPageElement: GatsbyBrowser<
    Record<string, unknown>,
    PageContext
>["wrapPageElement"] = ({ element, props }) => {
    return <Provider {...props} element={element} />;
};
