function test_All() {
    test_Api();
    test_Entity();
    test_App();
    test_Sheet();
    test_Utils();
}

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
            api.getClassSchema("credential")
        ).toBeObject();
    });

    test("Api.getParameter", () => {
        const mock = mockRequest("cv/v1", {
            id: "string",
            type: "string",
            data: "object",
            date: ["string", "date"],
        });
        api = new Api(mock);
        const getParameter = api.getParameter();
        expect("parameter is object", getParameter).toBe({
            id: "string",
            type: "string",
            data: "object",
            date: "string",
        });
    });

    test("Api.getParameters", () => {
        const mock = mockRequest("cv/v1", {
            id: "string",
            type: "string",
            data: "object",
            date: ["string", "date"],
        });
        api = new Api(mock);
        const getParameters = api.getParameters();
        expect("parameters is object", getParameters).toBeObject();
    });

    test("Api.getParametersByName", () => {
        const mock = mockRequest("cv/v1", {
            id: "string",
            type: "string",
            data: "object",
            date: ["string", "date"],
        });
        api = new Api(mock);
        const getParametersByName = api.getParametersByName("id");
        expect("parameters is object", getParametersByName).toBeObject();
    });

    test("Api.getParameterByName", () => {
        const mock = mockRequest("cv/v1", {
            id: "string",
            type: "string",
            data: "object",
            date: ["string", "date"],
        });
        api = new Api(mock);
        const getParametersByName = api.getParameterByName("date");
        expect("parameter is string", getParametersByName).toBe("string");
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

    test("Api.getResponse credential list endpoint", () => {
        mock = mockRequest("cv/v1/credential");
        api = new Api(mock);

        const response = api.getResponse();
        expect("response data is array", response.data).toBeArray("object");
    });

    test("Api.getResponse credential get endpoint", () => {
        mock = mockRequest(
            "cv/v1/educational-occupational-credential/mestrado-profissional-em-ciencia-da-informacao"
        );
        api = new Api(mock);

        const response = api.getResponse();
        expect("response 200", response.status).toEqual(200);
        expect("response data is object", response.data).toBeObject();
    });

    test("Api.getResponse place get endpoint", () => {
        mock = mockRequest("cv/v1/country/brasil");
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
            "https://hgod.in/cv/fruta/banana"
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
            "https://hgod.in/cv/certification/1",
            "https://hgod.in/cv/certification/2",
            "https://hgod.in/cv/certification/3",
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
    const app = new App(["person", "place", "intangible", "credential"]);

    test("App.configSheet must be object", () => {
        expect("object", app.configSheet).toBeObject();
    });

    test("setupEndpoints", () => {
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
        expect("properties", properties).toBeArray();
    });

    test("App.getRawPropertiesMeta", () => {
        const meta = app.getRawPropertiesMeta("person");
        // console.log({ meta });
        expect("meta", meta).toBeArray();
    });

    test("App.getPropertiesMeta", () => {
        const meta = app.getPropertiesMeta("person");
        // console.log({ meta });
        expect("meta", meta).toBeObject();
    });
}

function test_Sheet() {
    const sheet = new Sheet(CONFIG.sheet());

    test("Sheet.hasSheet", () => {
        expect("boolean", sheet.hasSheet("person")).toBe(true);
    });

    test("Sheet.getSpreadsheet", () => {
        expect("object", sheet.getSpreadsheet()).toBeObject();
    });

    test("Sheet.getSheet", () => {
        expect("object", sheet.getSheet("config")).toBeObject();
    });

    test("Sheet.getId", () => {
        expect("id", sheet.getId()).toBe(CONFIG.sheet());
    });

    test("Sheet.getUrl", () => {
        expect("url", sheet.getUrl()).toBe(
            "https://docs.google.com/spreadsheets/d/1pmMKdp68v8NXFyyBlvnpKQ2bePqVjzrdWvi3wuRxCWI/edit"
        );
    });

    test("Sheet.findRangeFromSheet", () => {
        expect(
            "object",
            sheet.findRangeFromSheet({
                sheetName: "place",
                key: "place",
            })
        ).toBeObject();
    });

    test("Sheet.findValuesFromSheet", () => {
        expect(
            "object",
            sheet.findValuesFromSheet("place", "place")
        ).toBeObject();
    });
}

function test_Utils() {
    const mock = mockRequest("cv/v1", {
        id: "string",
        type: "string",
        data: "object",
        date: ["string", "date"],
    });
    test("mockRequest", () => {
        expect("object", mock).toBe({
            queryString: `id="string"&type="string"&data="object"&date="string,date"`,
            parameter: {
                id: "string",
                type: "string",
                data: "object",
                date: "string",
            },
            parameters: {
                id: ["string"],
                type: ["string"],
                data: ["object"],
                date: ["string", "date"],
            },
            pathInfo: "cv/v1",
        });
    });
}
