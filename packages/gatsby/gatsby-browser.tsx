import React from "react";
import { GatsbyBrowser } from "gatsby";
import { Template } from "./src/templates";
import { PageContext } from "@hgod-in-cv/data/src/types";

import "./src/styles/global.css";
import "/node_modules/flag-icons/css/flag-icons.min.css";

export const wrapPageElement: GatsbyBrowser<
    Record<string, unknown>,
    PageContext
>["wrapPageElement"] = ({ element, props }) => {
    return <Template {...props} element={element} />;
};