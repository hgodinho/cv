function test_Api() {
    let mock = mockRequest("cv/v1");
    let api = new Api(mock);

    test("Api.parsePath cv/v1", () => {
        api.parsePath({ pathInfo: "cv/v1" });
        expect("locale", api.locale).toBe(undefined);
        expect("endpoint", api.endpoint).toBe("schema");
        expect("slug", api.slug).toBe(undefined);
    });

    test("Api.parsePath cv/v1/schema", () => {
        api.parsePath({ pathInfo: "cv/v1/schema" });
        expect("locale", api.locale).toBe(undefined);
        expect("endpoint", api.endpoint).toBe("schema");
        expect("slug", api.slug).toBe(undefined);
    });

    test("Api.parsePath cv/v1/en/properties", () => {
        api.parsePath({ pathInfo: "cv/v1/en/properties" });
        expect("locale", api.locale).toBe("en");
        expect("endpoint", api.endpoint).toBe("properties");
        expect("slug", api.slug).toBe(undefined);
    });

    test("Api.parsePath cv/v1/en/person/henrique-godinho", () => {
        api.parsePath({ pathInfo: "cv/v1/en/person/henrique-godinho" });
        expect("locale", api.locale).toBe("en");
        expect("endpoint", api.endpoint).toBe("person");
        expect("slug", api.slug).toBe("henrique-godinho");
    });

    test("Api.parsePath cv/v1/pt_br/pessoa/henrique-godinho", () => {
        api.parsePath({ pathInfo: "cv/v1/pt_br/pessoa/henrique-godinho" });
        expect("locale", api.locale).toBe("pt_br");
        expect("endpoint", api.endpoint).toBe("person");
        expect("slug", api.slug).toBe("henrique-godinho");
    });

    test("Api.parsePath cv/v1/en/banana/henrique-godinho", () => {
        expect("toThrow", () =>
            api.parsePath({ pathInfo: "cv/v1/en/banana/henrique-godinho" })
        ).toThrow();
    });

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

    test("Api.getResponse locales endpoint", () => {
        mock = mockRequest("cv/v1/locales");
        api = new Api(mock);

        const response = api.getResponse();
        expect("response is object", response.data).toBeArray();
    });

    test("Api.getResponse properties endpoint en locale", () => {
        mock = mockRequest("cv/v1/en/properties");
        api = new Api(mock);

        const response = api.getResponse();
        expect("response data is array", response.data).toBeArray();
    });

    test("Api.getResponse properties endpoint pt_br locale", () => {
        mock = mockRequest("cv/v1/pt_br/properties");
        api = new Api(mock);

        const response = api.getResponse();
        expect("response data is array", response.data).toBeArray();
    });

    test("Api.getResponse ld-graph endpoint en locale", () => {
        mock = mockRequest("cv/v1/en/ld-graph");
        api = new Api(mock);

        const response = api.getResponse();
        expect("response status is 200", response.status).toEqual(200);
        expect("response data is object", response.data).toBeObject();
        expect("response graph is array", response.data["@graph"]).toBeArray(
            "object"
        );
    });

    test("Api.getResponse ld-graph endpoint pt_br locale", () => {
        mock = mockRequest("cv/v1/pt_br/ld-graph");
        api = new Api(mock);

        const response = api.getResponse();
        expect("response status is 200", response.status).toEqual(200);
        expect("response data is object", response.data).toBeObject();
        expect("response graph is array", response.data["@graph"]).toBeArray(
            "object"
        );
        response.data["@graph"].forEach((item) => {
            expect("@id includes pt_br locale", item["@id"]).toInclude("pt_br");
        });
    });

    test("Api.getResponse about endpoint", () => {
        mock = mockRequest("cv/v1/en/about");
        api = new Api(mock);

        const response = api.getResponse();
        expect("response 200", response.status).toEqual(200);
        expect("response data is object", response.data).toBeObject();
    });

    test("Api.getResponse credential meta endpoint en locale", () => {
        mock = mockRequest("cv/v1/en/place/meta");
        api = new Api(mock);

        const response = api.getResponse();
        expect("response 200", response.status).toEqual(200);
        expect("response data is array", response.data).toBeObject();
    });

    test("Api.getResponse credential meta endpoint pt_br locale", () => {
        mock = mockRequest("cv/v1/pt_br/lugar/meta");
        api = new Api(mock);

        const response = api.getResponse();
        expect("response 200", response.status).toEqual(200);
        expect("response data is array", response.data).toBeObject();
    });

    test("Api.getResponse credential list endpoint en locale", () => {
        mock = mockRequest("cv/v1/en/credential");
        api = new Api(mock);

        const response = api.getResponse();
        expect("response 200", response.status).toEqual(200);
        expect("response data is array", response.data).toBeArray("object");
    });

    test("Api.getResponse credential list endpoint pt_br locale", () => {
        mock = mockRequest("cv/v1/pt_br/credencial");
        api = new Api(mock);

        const response = api.getResponse();
        expect("response 200", response.status).toEqual(200);
        expect("response data is array", response.data).toBeArray("object");
    });

    test("Api.getResponse credential get endpoint", () => {
        mock = mockRequest(
            "cv/v1/en/educational-occupational-credential/mestrado-profissional-em-ciencia-da-informacao"
        );
        api = new Api(mock);

        const response = api.getResponse();
        expect("response 200", response.status).toEqual(200);
        expect("response data is object", response.data).toBeObject();
    });

    test("Api.getResponse place get endpoint", () => {
        mock = mockRequest("cv/v1/en/country/brazil");
        api = new Api(mock);

        const response = api.getResponse();
        expect("response 200", response.status).toEqual(200);
        expect("response data is object", response.data).toBeObject();
    });

    test("Api.getResponse place get endpoint pt_br", () => {
        mock = mockRequest("cv/v1/pt_br/pais/brasil");
        api = new Api(mock);

        const response = api.getResponse();

        expect("response 200", response.status).toEqual(200);
        expect("response data is object", response.data).toBeObject();
    });
}
