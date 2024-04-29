function test_Api() {
    let mock = mockRequest("cv/v1");
    let api = new Api(mock);

    test("Api.getBase", () => {
        expect("base: cv/v1/", api.getBase()).toBe("cv/v1/");
    });

    test("Api.getUrl", () => {
        expect("url: https://hgod.in/cv/v1/", api.getUrl()).toBe(
            "https://hgod.in/cv/v1/"
        );
    });

    test("Api.getClassSchema", () => {
        api = new Api(mock);

        expect(
            "schema is object",
            api.getClassSchema("certification")
        ).toBeObject();
    });

    test("Api.getResponse no path", () => {
        api = new Api(mock);

        const response = api.getResponse();
        expect("response is object", response).toBeObject();
    });

    test("Api.getResponse schema endpoint", () => {
        mock = mockRequest("cv/v1/schema");
        api = new Api(mock);

        const response = api.getResponse();
        expect("response is object", response).toBeObject();
    });

    test("Api.getResponse properties endpoint", () => {
        mock = mockRequest("cv/v1/properties");
        api = new Api(mock);

        const response = api.getResponse();
        expect("response data is array", response.data).toBeArray();
    });

    test("Api.getResponse certification list endpoint", () => {
        mock = mockRequest("cv/v1/certification");
        api = new Api(mock);

        const response = api.getResponse();
        expect("response data is array", response.data).toBeArray("object");
    });

    test("Api.getResponse certification get endpoint", () => {
        mock = mockRequest(
            "cv/v1/certification/mestrado-profissional-em-ciencia-da-informacao"
        );
        api = new Api(mock);

        const response = api.getResponse();
        expect("response data is object", response.data).toBeObject();
    });

    test("Api.getResponse place get endpoint", () => {
        mock = mockRequest("cv/v1/place/brasil");
        api = new Api(mock);

        const response = api.getResponse();
        expect("response data is object", response.data).toBeObject();
    });

    test("Api.getResponse about endpoint", () => {
        mock = mockRequest("cv/v1/about");
        api = new Api(mock);

        const response = api.getResponse();
        expect("response data is object", response.data).toBeObject();
    });

    test("Api.getResponse ld-graph endpoint", () => {
        mock = mockRequest("cv/v1/ld-graph");
        api = new Api(mock);

        const response = api.getResponse();
        expect("response status is 200", response.status).toEqual(200);
        expect("response data is object", response.data).toBeObject();
        expect("response graph is array", response.data["@graph"]).toBeArray(
            "object"
        );
        console.warn(response.data["@graph"]);
    });
}

function test_Entity() {
    const entity = new Entity(
        ["_id", "type", "data", "date"],
        [
            "person/teste",
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

    test("Entity._id", () => {
        console.log(entity._id);
    });

    test("Entity.data", () => {
        console.log(entity.data);
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

        expect("path", entity.parseString("fruta/banana")).toBe(
            "https://hgod.in/cv?fruta/banana"
        );

        expect("single string", entity.parseString("banana")).toBe("banana");

        expect("url", entity.parseString("https://hgod.in/cv/?person=1")).toBe(
            "https://hgod.in/cv/?person=1"
        );

        expect(
            "array<path>",
            entity.parseString(
                "certification/1 | certification/2 | certification/3"
            )
        ).toEqual([
            "https://hgod.in/cv?certification/1",
            "https://hgod.in/cv?certification/2",
            "https://hgod.in/cv?certification/3",
        ]);

        expect(
            "simple array",
            entity.parseString("Godinho | Lopes | Costa")
        ).toEqual(["Godinho", "Lopes", "Costa"]);
    });

    // test("Entity.toJsonLd", () => {
    //     console.log(entity.toJsonLd());
    // });
}

function test_App() {
    const app = new App(["person", "place", "role", "certification"]);

    test("App", () => {
        // console.log(app);
    });

    test("App.setupRawData", () => {
        app.setupRawData();
    });
}

function test_Sheet() {
    const sheet = new Sheet(CONFIG.sheet(), [
        "person",
        "place",
        "role",
        "certification",
        "creativeWork",
        "article",
        "chapter",
        "event",
        "organization",
    ]);

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

    test("Sheet.getEntityById", () => {
        console.log(sheet.getEntityById("place", "place/sao-paulo"));
    });
}
