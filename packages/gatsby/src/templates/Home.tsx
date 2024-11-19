import React from "react";

import { PageProps, Link } from "gatsby";
import { PageContext } from "@hgod-in-cv/data/src/types";
import {
    Heading,
    Head as PrimitiveHead,
    VariantSelector,
} from "#root/components";
import { tw } from "#root/lib";
import { useI18nContext } from "#root/provider";

export type CreativeWorkPage = PageProps<{}, PageContext>;

export default function ({ data, pageContext }: CreativeWorkPage) {
    const { locale } = useI18nContext();
    const { site } = pageContext;

    return (
        <section
            className={tw(
                "col-start-2",
                "md:col-start-3",
                "row-start-4",
                "row-span-1",
                "z-10",
                "flex",
                "flex-col",
                "gap-4"
            )}
        >
            <header className={tw("mb-4")}>
                <Heading level={1} className={tw()}>
                    {site.locales[locale].title}
                </Heading>
                <p
                    className={tw("text-xl")}
                    dangerouslySetInnerHTML={{
                        __html: site.locales[locale].description,
                    }}
                />
            </header>
            <VariantSelector />
        </section>
    );
}

export const Head = ({ pageContext, data }: CreativeWorkPage) => {
    const { locale } = useI18nContext();
    return (
        <PrimitiveHead
            title={`@${pageContext.site.locales[locale].title}`}
            pageContext={pageContext}
            variant="home"
        />
    );
};
