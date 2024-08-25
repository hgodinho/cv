// https://vike.dev/onRenderHtml
export { onRenderHtml };

import ReactDOMServer from "react-dom/server";
import { PageShell } from "./PageShell";
import { escapeInject, dangerouslySkipEscape } from "vike/server";
import type { OnRenderHtmlAsync } from "vike/types";
import { getPageDescription, getPageLocale } from "#root/lib";

const onRenderHtml: OnRenderHtmlAsync = async (
    pageContext
): ReturnType<OnRenderHtmlAsync> => {
    const { Page } = pageContext;

    // This onRenderHtml() hook only supports SSR, see https://vike.dev/render-modes for how to modify
    // onRenderHtml() to support SPA
    if (!Page)
        throw new Error(
            "onRenderHtml() hook expects pageContext.Page to be defined"
        );

    // Alternatively, we can use an HTML stream, see https://vike.dev/streaming
    const pageHtml = ReactDOMServer.renderToString(
        <PageShell pageContext={pageContext}>
            <Page />
        </PageShell>
    );

    // See https://vike.dev/head
    const desc = getPageDescription(pageContext);
    const locale = getPageLocale(pageContext);

    const documentHtml = escapeInject`<!DOCTYPE html>
    <html lang="${locale}">
        <head>
            <meta charset="UTF-8" />
            <link rel="icon" href="${
                import.meta.env.DEV
                    ? "http://localhost:3000/favicon-64.ico"
                    : "https://hgod.in/favicon-64.ico"
            }" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=4.0" />
            <meta name="description" content="${desc}" />
            <link
                href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap"
                rel="stylesheet"
            />
        </head>
        <body class="bg-black text-gray-300 text-lg text-wrap break-words box-border">
            <div id="app">${dangerouslySkipEscape(pageHtml)}</div>
        </body>
    </html>`;

    return {
        documentHtml,
        pageContext: {
            // We can add custom pageContext properties here, see https://vike.dev/pageContext#custom
        },
    };
};
