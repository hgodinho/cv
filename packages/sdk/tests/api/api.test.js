const { fetchData } = require("../../dist");

// teste a função fetchData

describe("fetchData", () => {
    it("fetchData", async () => {
        jest.spyOn(global, "fetch").mockImplementation(
            jest.fn(() =>
                Promise.resolve({
                    status: 200,
                    json: () => Promise.resolve({ status: 200, data: 100 }),
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
            route: "route",
            apiToken: "1234",
        }

        const response = await fetchData(apiConfig, reporter.info, reporter.success);
        expect(response).toEqual(100);
    });

    it("should call pre and after callbacks", async () => {
        jest.spyOn(global, "fetch").mockImplementation(
            jest.fn(() =>
                Promise.resolve({
                    status: 200,
                    json: () => Promise.resolve({ status: 200, data: 100 }),
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
            route: "route",
            apiToken: "1234",
        }

        const pre = jest.fn();
        const after = jest.fn();

        await fetchData(apiConfig, pre, after);
        expect(pre).toHaveBeenCalled();
        expect(after).toHaveBeenCalled();
    });

    it("should throw error for status 403", () => {
        jest.spyOn(global, "fetch").mockImplementation(
            jest.fn(() =>
                Promise.resolve({
                    status: 403,
                    json: () => Promise.resolve(),
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
            route: "route",
            apiToken: "1234",
        }

        expect(fetchData(apiConfig, reporter.info, reporter.success)).rejects.toThrowError();
    })

    it("should throw error for status 404", () => {
        jest.spyOn(global, "fetch").mockImplementation(
            jest.fn(() =>
                Promise.resolve({
                    status: 404,
                    json: () => Promise.resolve(),
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
            route: "route",
            apiToken: "1234",
        }

        expect(fetchData(apiConfig, reporter.info, reporter.success)).rejects.toThrowError();
    });

    it("should throw error for other status", () => {
        jest.spyOn(global, "fetch").mockImplementation(
            jest.fn(() =>
                Promise.resolve({
                    status: 500,
                    json: () => Promise.resolve(),
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
            route: "route",
            apiToken: "1234",
        }

        expect(fetchData(apiConfig, reporter.info, reporter.success)).rejects.toThrowError();
    });
});