import type { PageContext } from "vike/types";

export function getPageTitle(pageContext: PageContext): string {
    const title =
        // Title defined statically by /pages/some-page/+title.js (or by `export default { title }` in /pages/some-page/+config.js)
        // The setting 'pageContext.config.title' is a custom setting we defined at ./+config.ts
        pageContext.config.title || "hgod.in";
    return title;
}

export function getPageDescription(pageContext: PageContext): string {
    const description =
        // description defined statically by /pages/some-page/+description.js (or by `export default { description }` in /pages/some-page/+config.js)
        // The setting 'pageContext.config.description' is a custom setting we defined at ./+config.ts
        pageContext.config.description ||
        "curriculum vitae de henrique godinho";
    return description;
}

export function getPageLocale(pageContext: PageContext): string {
    return pageContext.config.locale || "pt-br";
}
