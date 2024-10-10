import React from "react";
import { GatsbyBrowser } from "gatsby";
import { Template } from "./src/templates";
import { PageContext } from "@hgod-in-cv/data/src/types";

const wrapPageElement: GatsbyBrowser<
    Record<string, unknown>,
    PageContext
>["wrapPageElement"] = ({ element, props }) => {
    return <Template {...props} element={element} />;
};

export default wrapPageElement;
