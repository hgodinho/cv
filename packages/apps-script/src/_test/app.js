function test_App() {
    const app = new App(["person", "place", "intangible", "credential"], "en");

    test("App.configSheet must be object", () => {
        expect("object", app.configSheet).toBeObject();
    });

    test("App.setupEndpoints", () => {
        expect("object", app.endpoints).toBeObject();
    });

    test("App.getApiConfig", () => {
        const api = app.getApiConfig();
        expect("api", api).toBe({
            url: "https://hgod.in",
            namespace: "cv",
            version: "v1",
        });
    });

    test("App.getProperties", () => {
        const properties = app.getProperties();
        expect("properties", properties).toBeObject();
    });

    test("App.setupRawData", () => {
        app.setupRawData();
        expect("rawData", app.rawData).toBeObject();
    });

    test("App.getRawPropertiesMeta", () => {
        const meta = app.getRawPropertiesMeta("person");
        expect("meta", meta).toBeArray();
    });

    test("App.getPropertiesMeta", () => {
        const meta = app.getPropertiesMeta("person");
        expect("meta", meta).toBeObject();
    });

    test("App.getPropertiesMeta with filter", () => {
        const meta = app.getPropertiesMeta("person", ({ i18n }) => i18n);
        expect("meta", meta).toBeObject();
    });

    test("App.getL10nConfig", () => {
        const l10n = app.getL10nConfig();
        expect("l10n", l10n).toBeObject();
    });

    test("App.getEndpointsConfig", () => {
        const endpoints = app.getEndpointsConfig();
        expect("endpoints", endpoints).toBeArray();
    });

    // test("App.verifyL10n", () => {
    //     app.verifyL10n(({ name, lang, spreadsheet }) => {
    //         // console.log({
    //         //     name,
    //         //     lang,
    //         //     spreadsheet,
    //         // });
    //     });
    // });
}
