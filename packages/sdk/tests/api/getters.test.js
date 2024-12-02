const {
    getLocales,
    getGraph,
    getProperties,
    getClasses,
    processNodes,
    processLinks,
    getMeta,
} = require("../../dist");

jest.spyOn(global, "fetch").mockImplementation(
    jest.fn(() =>
        Promise.resolve({
            status: 200,
            json: () => Promise.resolve({ data: 100 }),
        })
    )
);

const reporter = {
    info: jest.fn(),
    success: jest.fn(),
};

const apiConfig = {
    apiBase: "https://api.hgod.in",
    apiId: "1234",
    apiToken: "1234",
};

const graph = {
    pt_br: {
        compacted: {
            "@context": "context",
            "@graph": [
                {
                    "@id": "1234",
                    id: "1234",
                    _id: "1234",
                    path: "path",
                    name: "name",
                    type: "Class",
                    birthDate: "2021-09-09",
                    endDate: "2021-09-09",
                    dateCreated: "2021-09-09",
                    dateModified: "2021-09-09",
                    datePublished: "2021-09-09",
                    auditDate: "2021-09-09",
                    sameAs: ["https://ola.mundo"],
                },
                {
                    "@id": "hello",
                    id: "hello",
                    _id: "hello",
                    path: "path",
                    name: "name",
                },
            ],
        },
        nquads: [
            {
                subject: {
                    value: "1234",
                },
                predicate: {
                    value: "name",
                },
                object: {
                    value: "hello",
                },
            },
        ],
    },
};

let nodes = {};

afterAll(() => {
    jest.restoreAllMocks();
});

describe("getLocales", () => {
    test("should return locales", async () => {
        fetch.mockReturnValue(
            Promise.resolve({
                status: 200,
                json: () =>
                    Promise.resolve({
                        status: 200,
                        data: [{ id: "1234", name: "hello" }],
                    }),
            })
        );

        const locales = await getLocales(apiConfig, reporter);
        expect(reporter.info).toHaveBeenCalled();
        expect(reporter.success).toHaveBeenCalled();
        expect(locales).toHaveLength(1);
    });
});

describe("getGraph", () => {
    test("should return graph", async () => {
        fetch.mockReturnValue(
            Promise.resolve({
                status: 200,
                json: () =>
                    Promise.resolve({
                        status: 200,
                        data: {
                            "@context": "context",
                            id: "1234",
                            name: "hello",
                        },
                    }),
            })
        );

        const graph = await getGraph("pt_br", apiConfig, reporter);
        expect(reporter.info).toHaveBeenCalled();
        expect(reporter.success).toHaveBeenCalled();
        expect(fetch).toHaveBeenCalled();
    });
});

describe("getProperties", () => {
    test("should return properties", async () => {
        fetch.mockReturnValue(
            Promise.resolve({
                status: 200,
                json: () =>
                    Promise.resolve({
                        status: 200,
                        data: ["prop1", "prop2"],
                    }),
            })
        );

        const properties = await getProperties("pt_br", apiConfig, reporter);
        expect(reporter.info).toHaveBeenCalled();
        expect(reporter.success).toHaveBeenCalled();
        expect(properties).toHaveLength(2);
    });
});

describe("getClasses", () => {
    test("should return classes", async () => {
        fetch.mockReturnValue(
            Promise.resolve({
                status: 200,
                json: () =>
                    Promise.resolve({
                        status: 200,
                        data: ["prop1", "prop2"],
                    }),
            })
        );

        const classes = await getClasses("pt_br", apiConfig, reporter);
        expect(reporter.info).toHaveBeenCalled();
        expect(reporter.success).toHaveBeenCalled();
        expect(classes).toHaveLength(2);
    });
});

describe("getMeta", () => {
    test("should return meta", async () => {
        fetch.mockReturnValue(
            Promise.resolve({
                status: 200,
                json: () =>
                    Promise.resolve({
                        status: 200,
                        data: {
                            title: "title",
                            "@id": "id",
                            id: "id",
                        },
                    }),
            })
        );

        const meta = await getMeta("pt_br", "pessoa", apiConfig, reporter);
        expect(reporter.info).toHaveBeenCalled();
        expect(reporter.success).toHaveBeenCalled();
        expect(meta).toHaveProperty("title");
        expect(meta).toHaveProperty("@id");
        expect(meta).toHaveProperty("id");
    });
});

describe("processNodes", () => {
    test("should process nodes", async () => {
        nodes = await processNodes(graph);
        expect(reporter.info).toHaveBeenCalled();
        expect(reporter.success).toHaveBeenCalled();
        expect(nodes.pt_br).toHaveLength(2);
        expect(nodes.pt_br[0]).toHaveProperty("path");
        expect(nodes.pt_br[0]).toHaveProperty("@id");
        expect(nodes.pt_br[0]).toHaveProperty("_id");
        expect(nodes.pt_br[0]).toHaveProperty("name");
        expect(nodes.pt_br[0]).toHaveProperty("type");
        expect(nodes.pt_br[0]).toHaveProperty("@type");
        expect(nodes.pt_br[0]).toHaveProperty("birthDate");
        expect(nodes.pt_br[0].birthDate).toBe("09/09/2021");
        expect(nodes.pt_br[0]).toHaveProperty("endDate");
        expect(nodes.pt_br[0].endDate).toBe("09/09/2021");
        expect(nodes.pt_br[0]).toHaveProperty("dateCreated");
        expect(nodes.pt_br[0].dateCreated).toBe("09/09/2021");
        expect(nodes.pt_br[0]).toHaveProperty("dateModified");
        expect(nodes.pt_br[0].dateModified).toBe("09/09/2021");
        expect(nodes.pt_br[0]).toHaveProperty("datePublished");
        expect(nodes.pt_br[0].datePublished).toBe("09/09/2021");
        expect(nodes.pt_br[0]).toHaveProperty("auditDate");
        expect(nodes.pt_br[0].auditDate).toBe("09/09/2021");
        expect(nodes.pt_br[0]).toHaveProperty("sameAs");
        expect(nodes.pt_br[0].sameAs).toHaveLength(1);
    });
});

describe("processLinks", () => {
    test("should process links", async () => {
        const links = await processLinks(graph, nodes);
        expect(reporter.info).toHaveBeenCalled();
        expect(reporter.success).toHaveBeenCalled();
        expect(links.pt_br).toHaveLength(1);
        expect(links.pt_br[0]).toHaveProperty("source");
        expect(links.pt_br[0].source).toMatchObject(nodes.pt_br[0]);
        expect(links.pt_br[0]).toHaveProperty("target");
        expect(links.pt_br[0].target).toMatchObject(nodes.pt_br[1]);
        expect(links.pt_br[0]).toHaveProperty("subject");
        expect(links.pt_br[0]).toHaveProperty("object");
        expect(links.pt_br[0]).toHaveProperty("predicate");
    });
});
