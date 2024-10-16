import React from "react";

import { PageProps } from "gatsby";
import { PageContext } from "@hgod-in-cv/data/src/types";
import { Head as PrimitiveHead } from "#root/components";

export type CreativeWorkPage = PageProps<{}, PageContext>;

export default function ({ data, pageContext }: CreativeWorkPage) {
    return null;
}

export const Head = ({ pageContext, data }: CreativeWorkPage) => {
    return (
        <PrimitiveHead
            title={`@${pageContext.site.title}`}
            pageContext={pageContext}
        />
    );
};
