export async function onBeforeRender() {
    return {
        pageContext: {
            api: {
                name: "hgod.in",
                base: "https://hgod.in",
                namespace: "cv",
                version: "v1",
            },
        },
    };
}
