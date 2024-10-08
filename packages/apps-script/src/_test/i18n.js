function test_I18n() {
    const app = new App(["person", "place", "intangible", "credential"]);

    test("I18n.getEntityById", () => {
        const i18n = new I18n(app.getL10nConfig());
        i18n.setLocale("es");
        const data = i18n.getEntityById("place", "#plc-7");
        expect("data is object", data).toBeObject();
    });

    test("I18n.getEntityByQuery", () => {
        const i18n = new I18n(app.getL10nConfig(), "pt_br");
        const data = i18n.getEntityByQuery("place", "pais/brasil");
        expect("data is object", data).toBeObject();
    });

    test("I18n.getEntities", () => {
        const i18n = new I18n(app.getL10nConfig());
        i18n.setLocale("pt_br");
        const data = i18n.getEntities("place");
        expect("data is array", data).toBeArray();
    });

    test("I18n.getEntitiesMeta en", () => {
        const i18n = new I18n(app.getL10nConfig());
        const data = i18n.getEntitiesMeta("place");
        expect("data is object", data).toBeObject();
    });

    test("I18n.getEntitiesMeta pt_br", () => {
        const i18n = new I18n(app.getL10nConfig(), "pt_br");
        const data = i18n.getEntitiesMeta("place");
        expect("data is object", data).toBeObject();
    });

    test("I18n.getAliasedTranslatedEndpoint", () => {
        const i18n = new I18n(app.getL10nConfig());

        expect(
            "banana",
            i18n.getAliasedTranslatedEndpoint("banana")
        ).toBeFalsy();

        expect("person", i18n.getAliasedTranslatedEndpoint("person")).toBe(
            "person"
        );

        expect(
            "pessoa",
            (() => {
                i18n.setLocale("pt_br");
                return i18n.getAliasedTranslatedEndpoint("pessoa");
            })()
        ).toBe("person");

        expect(
            "persona",
            (() => {
                i18n.setLocale("es");
                return i18n.getAliasedTranslatedEndpoint("persona");
            })()
        ).toBe("person");
    });
}
