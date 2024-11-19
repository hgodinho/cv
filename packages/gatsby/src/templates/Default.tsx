import React from "react";

import { PageProps } from "gatsby";
import { PageContext } from "@hgod-in-cv/data/src/types";
import { Head as PrimitiveHead } from "#root/components";
import { useI18nContext } from "#root/provider";

export type CreativeWorkPage = PageProps<{}, PageContext>;

export default function ({ data, pageContext }: CreativeWorkPage) {
    return null;
}

export const Head = ({ pageContext, data }: CreativeWorkPage) => {
    const { locale } = useI18nContext();
    return (
        <PrimitiveHead
            title={`@${pageContext.site.locales[locale].title}`}
            pageContext={pageContext}
            variant="default"
        />
    );
};
