function test_Entity() {
    const app = new App(["person", "place", "intangible", "credential"]);
    const entity = new Entity({
        header: ["_id", "type", "data", "date"],
        defaultValues: [
            "person/teste",
            "Person",
            "fruta=banana; sabor=doce | fruta=limão; sabor=cítrico",
            "2021-01-01",
        ],
        values: [
            "person/teste",
            "Person",
            "fruta=banana; sabor=doce | fruta=limão; sabor=cítrico",
            "2021-01-01",
        ],
        endpoints: app.getEndpointsConfig(),
        i18n: new I18n(app.getL10nConfig()),
    });

    test("Entity", () => {
        expect("Entity", entity).toBeObject();
    });

    test("Entity._header", () => {
        expect("_header is array", entity._header).toBeArray();
    });

    test("Entity._values", () => {
        expect("_values is array", entity._values).toBeArray();
    });

    test("Entity._id", () => {
        expect("_id", entity._id).toBe("person/teste");
    });

    test("Entity.data", () => {
        expect("data is object", entity.data).toBeObject();
    });

    test("Entity.getTypeById", () => {
        const type = entity.getTypeById("prs-2");
        expect("type", type).toBe("person");
    });

    test("Entity.parseString", () => {
        expect(
            "object",
            entity.parseString("fruta=banana; sabor=doce")
        ).toEqual({
            fruta: "banana",
            sabor: "doce",
        });

        expect(
            "array<object>",
            entity.parseString(
                "fruta=banana; sabor=doce | fruta=limão; sabor=cítrico"
            )
        ).toEqual([
            {
                fruta: "banana",
                sabor: "doce",
            },
            {
                fruta: "limão",
                sabor: "cítrico",
            },
        ]);

        expect("path", entity.parseString("#prs-1")).toBe(
            "https://hgod.in/cv/en/person/henrique-godinho"
        );

        expect("single string", entity.parseString("banana")).toBe("banana");

        expect("url", entity.parseString("https://hgod.in/cv/?person=1")).toBe(
            "https://hgod.in/cv/?person=1"
        );

        const arrayPath = entity.parseString("#cdt-2 | #cdt-3 | #cdt-4");
        expect("array<path>", arrayPath).toEqual([
            "https://hgod.in/cv/en/educational-occupational-credential/pos-graduacao-em-comunicacao-e-design-digital",
            "https://hgod.in/cv/en/educational-occupational-credential/bacharelado-em-artes-visuais-pintura-gravura-e-escultura",
            "https://hgod.in/cv/en/educational-occupational-credential/extensao-universitaria-em-transmedia-storytelling",
        ]);

        expect(
            "simple array",
            entity.parseString("Godinho | Lopes | Costa")
        ).toEqual(["Godinho", "Lopes", "Costa"]);
    });

    test("Entity.getEntity", () => {
        const test = entity.getEntity();
        expect("Entity", test).toBeObject();
    });
}
