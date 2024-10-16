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
