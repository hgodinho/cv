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

    test("Sheet.getValueFromSheet", () => {
        expect("value", sheet.getValueFromSheet("🏠", "B2")).toBe(
            "curriculum-vitae"
        );
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

    test("Sheet.getRowByQuery", () => {
        const values = sheet.getRowByQuery("place", "country/brazil");
        expect("object", values).toBeArray();
    });
}
