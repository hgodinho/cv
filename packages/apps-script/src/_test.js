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
        mock = mockRequest("cv/en/country/brazil");
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
    const app = new App(["person", "place", "intangible", "credential"]);
    const entity = new Entity({
        header: ["_id", "type", "data", "date"],
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
}

function test_App() {
    const app = new App(["person", "place", "intangible", "credential"]);

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
        expect("properties", properties).toBeArray();
    });

    test("App.setupRawData", () => {
        app.setupRawData();
        expect("rawData", app.rawData).toBeObject();
    });

    test("App.getRawPropertiesMeta", () => {
        const meta = app.getRawPropertiesMeta("person");
        // console.log({ meta });
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

    test_App_I18n();
}

function test_App_I18n() {
    const app = new App(["person"], "en");

    test("App.getL10nConfig", () => {
        const l10n = app.getL10nConfig();
        expect("l10n", l10n).toBeObject();
    });

    test("App.getEndpointsConfig", () => {
        const endpoints = app.getEndpointsConfig();
        expect("endpoints", endpoints).toBeArray();
    });

    test("App.setupL10n", () => {
        app.setupL10n("en");
        expect("app.lang", app.lang).toBe("en");
        expect("app.l10n", app.l10n).toBeObject();
        expect("app.l10n.sheets", app.l10n.sheets).toBeObject();
        expect("app.l10n.labels", app.l10n.labels).toBeObject();
    });

    test("App.verifyL10n", () => {
        app.verifyL10n(({ name, lang, spreadsheet }) => {
            // console.log({
            //     name,
            //     lang,
            //     spreadsheet,
            // });
        });
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

    test("Sheet.getOffset", () => {
        expect("number", sheet.getOffset("place")).toBe(13);
    });

    test("Sheet.getTotalRows", () => {
        expect("number", sheet.getTotalRows("place")).toBe(7);
    });

    test("Sheet.getRowById", () => {
        expect(
            "row is array",
            sheet.getRowById("person", "#prs-2")
        ).toBeArray();
        expect("row is array", sheet.getRowById("place", "#plc-3")).toBeArray();
    });

    test("Sheet.getHeader", () => {
        expect("header is array", sheet.getHeader("person")).toBeArray();
    });

    test("Sheet.findValuesFromSheet", () => {
        const values = sheet.findValuesFromSheet("place", "place");
        expect("object", values).toBeObject();
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

function test_I18n() {
    const app = new App(["person", "place", "intangible", "credential"]);

    const i18n = new I18n(app.getL10nConfig());

    test("I18n.getEntityById", () => {
        i18n.setLocale("es");
        const data = i18n.getEntityById("place", "#plc-7");
        // console.log({ data });
        expect("data is object", data).toBeObject();
    });

    test("I18n.getEntities", () => {
        i18n.setLocale("pt-br");
        const data = i18n.getEntities("place");
        // console.log({ data });
        expect("data is array", data).toBeArray();
    });
}
