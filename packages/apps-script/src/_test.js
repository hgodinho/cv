function test_Entity() {
    const entity = new Entity(
        ["id", "type", "data", "date"],
        [
            1,
            "Person",
            "fruta=banana; sabor=doce | fruta=limão; sabor=cítrico",
            "2021-01-01",
        ],
        {
            base: "https://hgod.in",
            namespace: "cv",
            url: "https://hgod.in/cv",
            query: "https://hgod.in/cv?",
        }
    );

    test("Entity", () => {
        console.log(entity);
    });

    test("Entity._header", () => {
        console.log(entity._header);
    });

    test("Entity._values", () => {
        console.log(entity._values);
    });

    test("Entity.id", () => {
        console.log(entity.id);
    });

    test("Entity.data", () => {
        console.log(entity.data);
    });

    test("Entity.parseString", () => {
        expect(
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

        expect(entity.parseString("fruta=banana; sabor=doce")).toEqual({
            fruta: "banana",
            sabor: "doce",
        });

        expect(entity.parseString("fruta=banana")).toBe(
            "https://hgod.in/cv?fruta=banana"
        );

        expect(entity.parseString("banana")).toBe("banana");

        expect(entity.parseString("https://hgod.in/cv/?person=1")).toBe(
            "https://hgod.in/cv/?person=1"
        );

        expect(
            entity.parseString(
                "certification=1 | certification=2 | certification=3"
            )
        ).toEqual([
            "https://hgod.in/cv?certification=1",
            "https://hgod.in/cv?certification=2",
            "https://hgod.in/cv?certification=3",
        ]);

        expect(entity.parseString("Godinho | Lopes | Costa")).toEqual([
            "Godinho",
            "Lopes",
            "Costa",
        ]);
    });

    // test("Entity.toJsonLd", () => {
    //     console.log(entity.toJsonLd());
    // });
}

function test_App() {
    const app = new App();

    test("App", () => {
        console.log(app);
    });

    test("App.setup", () => {
        console.log(app.setup());
    });

    test("App.setupRawData", () => {
        console.log(app.rawData);
    });

    test("App.setupData", () => {
        console.log(app.data);
    });

    test("App.getJsonLd", () => {
        console.log(app.getJsonLd());
    });

    test("App.getJsonLd", () => {
        console.log(app.getJsonLd(false));
    });
}

function test_Sheet() {
    const sheet = new Sheet(CONFIG.sheet());

    test("Sheet", () => {
        console.log(sheet);
    });

    test("Sheet.hasSheet", () => {
        console.log(sheet.hasSheet("config"));
    });

    test("Sheet.getSpreadsheet", () => {
        console.log(sheet.getSpreadsheet());
    });

    test("Sheet.getSheet", () => {
        console.log(sheet.getSheet("config"));
    });

    test("Sheet.getId", () => {
        console.log(sheet.getId());
    });

    test("Sheet.getUrl", () => {
        console.log(sheet.getUrl());
    });

    test("Sheet.getLastUpdate", () => {
        console.log(sheet.getLastUpdate());
    });

    test("Sheet.findRangeFromSheet", () => {
        console.log(
            sheet.findRangeFromSheet({
                sheetName: "place",
                key: "place",
                columns: 5,
            })
        );
    });

    test("Sheet.findValuesFromSheet", () => {
        console.log(sheet.findValuesFromSheet("place", "place", 5));
    });
}
