import React from "react";
import "./src/styles/global.css";
import { GatsbyBrowser } from "gatsby";
import { Template } from "./src/templates";
import { PageContext } from "@hgod-in-cv/data/src/types";

export const wrapPageElement: GatsbyBrowser<
    Record<string, unknown>,
    PageContext
>["wrapPageElement"] = ({ element, props }) => {
    return <Template {...props} element={element} />;
};
