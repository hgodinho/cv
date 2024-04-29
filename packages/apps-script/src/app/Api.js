class Api {
    constructor(e) {
        this.setup(e);
    }

    setup(e) {
        // Set the request object
        this.request = e;

        // Set the app object
        this.app = new App();

        // Set the config object
        this.config = this.app.getApiConfig();

        if (
            typeof e.pathInfo === "undefined" ||
            !e.pathInfo.startsWith(this.getBase(false))
        ) {
            this.error = this.createResponse({
                status: 400,
                error: `The path must have namespace and version [cv/v1].`,
            });
            return;
        }

        // Set the slash character
        this.slashChar = "&#x2F;";

        // Set the endpoints
        this.defaultEndpoints = ["schema", "properties", "about", "ld-graph"];
        this.endpoints = [
            ...this.defaultEndpoints,
            ...Object.keys(this.app.sheets),
        ];

        // Set the path, parameter, and query string
        const prePath = sanitize(e.pathInfo.replace(this.getBase(false), ""));
        this.path = prePath.startsWith(this.slashChar)
            ? prePath.slice(this.slashChar.length)
            : prePath;

        this.parameter = e.parameter;

        this.queryString = e.queryString;

        // Set the known paths
        this.knownPaths = ["schema", ...Object.keys(this.getSchema())];
    }

    getResponse() {
        // at first we check if there is an error, if so we return it
        if (this.error) {
            return this.error;
        }

        const path = this.path;

        // return schema if no path is provided
        if (path === "" || path === this.slashChar) {
            return this.createResponse({ status: 200, data: this.getSchema() });
        }

        const [endpoint, slug] = path.split(this.slashChar);

        // return 404 if the endpoint is unknown
        if (!this.endpoints.includes(endpoint)) {
            return this.createResponse({
                status: 404,
                error: `Unknown endpoint: ${endpoint}`,
            });
        }

        if (typeof slug === "undefined" || slug === null || slug === "") {
            switch (endpoint) {
                // return the schema for the endpoints
                case "schema":
                    return this.createResponse({
                        status: 200,
                        data: this.getSchema(),
                    });

                // return the about endpoint
                case "about":
                    return this.createResponse({
                        status: 200,
                        data: this.app.getAbout(),
                    });

                // return the properties from all endpoints
                case "properties":
                    return this.createResponse({
                        status: 200,
                        data: this.app.getProperties(),
                    });

                // return the linked data graph
                case "ld-graph":
                    return this.createResponse({
                        status: 200,
                        data: this.getGraphData(),
                    });

                // return list for the endpoint
                default:
                    return this.createResponse({
                        status: 200,
                        data: this.prepareResponse(
                            this.app.getEntityList(endpoint),
                            endpoint
                        ),
                    });
            }
        }

        // return data for the endpoint based on the slug
        try {
            const data = this.app.getEntityById(
                endpoint,
                `${endpoint}/${slug}`
            );
            return this.createResponse({
                status: 200,
                data: this.prepareResponse(data, endpoint),
            });
        } catch (error) {
            return this.createResponse({
                status: 404,
                error: error.message,
            });
        }
    }

    response() {
        return ContentService.createTextOutput(
            JSON.stringify(this.getResponse())
        ).setMimeType(ContentService.MimeType.JSON);
    }

    prepareResponse(data, endpoint) {
        if (Array.isArray(data)) {
            return data.map((item) => this.prepareResponse(item, endpoint));
        } else if (typeof data === "object") {
            const schema = this.getClassSchema(endpoint);
            return Object.keys(schema).reduce(
                (acc, key) => {
                    if (data[key]) {
                        acc[key] = data[key];
                    }
                    return acc;
                },
                {
                    "@context": "https://schema.org",
                    "@type": data["type"],
                }
            );
        }
    }

    createResponse({ status, data = null, error = null }) {
        const response = { status };
        if (data) {
            response["data"] = data;
        }
        if (error) {
            response["error"] = error;
        }
        return response;
    }

    getGraphData() {
        if (typeof this.app.rawData === "undefined") {
            this.app.setupRawData();
        }
        const json = {
            "@context": "https://schema.org/",
            "@graph": [],
        };

        Object.entries(this.app.rawData).forEach(
            ([key, { header, values, sheetName }]) => {
                values.forEach((row) => {
                    const data = this.prepareResponse(
                        new Entity(header, row, this.config),
                        sheetName
                    );
                    json["@graph"].push(data);
                });
            }
        );

        return json;
    }

    getSchema() {
        return Object.fromEntries(
            this.endpoints.map((e) => {
                switch (e) {
                    case "schema":
                        return [
                            e,
                            {
                                type: "object",
                            },
                        ];

                    case "about":
                        return [e, ""];

                    case "ld-graph":
                        return [
                            e,
                            {
                                type: "object",
                                properties: {
                                    "@context": {
                                        type: "string",
                                        format: "uri",
                                    },
                                    "@graph": {
                                        type: "array",
                                        items: {
                                            type: "object",
                                            properties: {
                                                "@id": {
                                                    type: "string",
                                                    format: "uri",
                                                },
                                                "@type": {
                                                    type: "string",
                                                },
                                            },
                                        },
                                    },
                                },
                            },
                        ];

                    case "properties":
                        return [
                            e,
                            {
                                type: "array",
                                items: {
                                    type: "string",
                                },
                            },
                        ];

                    default:
                        return [
                            e,
                            {
                                type: "object",
                                properties: this.getClassSchema(e),
                            },
                        ];
                }
            })
        );
    }

    getClassSchema(className) {
        const { values } = this.app.findValuesFromSheet(
            "meta",
            `[${className}]`,
            5
        );

        const oneOf = {
            oneOf: [
                { type: "string" },
                { type: "number" },
                { type: "object" },
                { type: "array" },
            ],
        };

        const properties = values.reduce(
            (acc, [cName, property, type, uri, obs], i) => {
                if (i === 0) {
                    if (obs) {
                        if (obs.trim().startsWith("+")) {
                            const find = obs.trim().split("+").pop().trim();
                            const findValues = this.getClassSchema(find);
                            acc = { ...acc, ...findValues };
                        }
                    }
                    return acc; // skip class name
                }
                acc[property] = oneOf;
                return acc;
            },
            {
                _id: {
                    type: "string",
                },
                "@id": {
                    type: "string",
                },
                "@type": {
                    type: "string",
                },
            }
        );

        return properties;
    }

    getUrl() {
        return `${this.config.url}/${this.getBase()}`;
    }

    getBase(slash = true) {
        return `${this.config.namespace}/${this.config.version}${
            slash ? "/" : ""
        }`;
    }
}
