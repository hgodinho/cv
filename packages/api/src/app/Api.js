class Api {
    constructor(e) {
        // Set the slash character
        this.slashChar = "&#x2F;";
        this.setup(e);
    }

    _endpoints() {
        return [
            "person",
            "place",
            "intangible",
            "credential",
            "creativeWork",
            "event",
            "organization",
        ];
    }

    _defaultEndpoints() {
        return [
            "schema",
            "properties",
            "classes",
            "about",
            "ld-graph",
            "locales",
        ];
    }

    setup(e) {
        // Set the request object
        this.request = e;

        // Set the endpoints
        this.defaultEndpoints = this._defaultEndpoints();

        this.endpoints = [...this.defaultEndpoints, ...this._endpoints()];

        // Set the app object
        this.app = new App(this._endpoints());

        this.parsePath(e);

        this.parameter = e.parameter;

        this.parameters = e.parameters;

        this.queryString = e.queryString;
    }

    parsePath(e) {
        if (
            typeof e.pathInfo === "undefined" ||
            !e.pathInfo.startsWith(this.getBase(false))
        ) {
            this.error = this.createResponse({
                status: 400,
                error: `The path must have namespace and version [cv/v1].`,
            });
            throw new Error(this.error.message);
        }

        let prePath = utils.sanitize(
            e.pathInfo.replace(this.getBase(false), "")
        );

        // Set the path, parameter, and query string
        if (prePath.startsWith(this.slashChar)) {
            prePath = prePath.slice(this.slashChar.length);
        }

        prePath = prePath.split(this.slashChar).filter(Boolean);

        if (prePath.length === 0 || prePath[0] === "schema") {
            this.endpoint = "schema";
            return;
        }

        if (prePath[0] === "locales") {
            this.endpoint = "locales";
            return;
        }

        const [locale, endpoint, slug] = prePath;

        const l10n = this.app.getL10nConfig().map((l) => l.lang);

        if (!l10n.includes(locale)) {
            this.error = this.createResponse({
                status: 400,
                error: `The locale ${locale} is not supported.`,
            });
            throw new Error(this.error.message);
        }

        this.locale = locale;

        this.app.setupI18n(locale);

        if (!this.defaultEndpoints.includes(endpoint)) {
            this.endpoint =
                this.app.i18n.getAliasedTranslatedEndpoint(endpoint);
        } else {
            this.endpoint = endpoint;
        }

        if (!this.endpoint) {
            this.error = this.createResponse({
                status: 400,
                error: `The endpoint ${endpoint} is not supported.`,
            });
            throw new Error(this.error.message);
        }
        this.endpointAlias = endpoint;

        if (slug) {
            this.slug = slug;
        }
    }

    getParameters() {
        return this.parameters;
    }

    getParameter() {
        return this.parameter;
    }

    getParametersByName(name) {
        return this.parameters[name];
    }

    getParameterByName(name) {
        return this.parameter[name];
    }

    getResponse() {
        // at first we check if there is an error, if so we return it
        if (this.error) {
            return this.error;
        }

        const endpoint = this.endpoint
            ? this.endpoint.toLowerCase()
            : undefined;

        if (!endpoint) {
            return this.createResponse({
                status: 200,
                data: this.getSchema(),
            });
        }

        const slug = this.slug;

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

                // return the classes from all endpoints
                case "classes":
                    return this.createResponse({
                        status: 200,
                        data: this.app.getClasses(),
                    });

                // return the linked data graph
                case "ld-graph":
                    return this.createResponse({
                        status: 200,
                        data: this.getGraphData(),
                    });

                case "locales":
                    return this.createResponse({
                        status: 200,
                        data: this.app.getL10nConfig(),
                    });

                // return list for the endpoint
                // TODO add pagination support
                default:
                    return this.createResponse({
                        status: 200,
                        data: this.prepareResponse(
                            this.app.i18n.getEntities(endpoint),
                            endpoint
                        ),
                    });
            }
        }

        // return data for the endpoint based on the slug
        try {
            if ("meta" === slug) {
                return this.createResponse({
                    status: 200,
                    data: this.app.i18n.getEntitiesMeta(endpoint),
                });
            }

            const data = this.app.getRowByQuery(
                endpoint,
                `${this.endpointAlias}/${slug}`
            );
            return this.createResponse({
                status: 200,
                data: this.prepareResponse(data, endpoint),
            });
        } catch (error) {
            return this.createResponse({
                status: 400,
                error: `Error: ${error.message}`,
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
            return Object.entries(schema).reduce(
                (acc, [key, schema]) => {
                    if (data[key]) {
                        if (
                            Object.keys(this.getInternalSchema()).includes(key)
                        ) {
                            acc[key] = data[key];
                            return acc;
                        }
                        acc[key] = Array.isArray(data[key])
                            ? data[key]
                            : data[key].toString();
                    }
                    return acc;
                },
                {
                    "@context": "https://schema.org",
                    "@type": data["type"],
                    "@id": data["id"],
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
            response["message"] = error;
        }
        return response;
    }

    getGraphData() {
        const json = {
            "@context": "https://schema.org/",
            "@graph": [],
        };

        this._endpoints().forEach((endpoint) => {
            const entities = this.app.i18n.getEntities(endpoint);
            json["@graph"].push(...entities);
        });

        return json;
    }

    getInternalSchema() {
        return {
            _id: {
                type: "string",
            },
            id: {
                type: "string",
            },
            "@id": {
                type: "string",
            },
            "@type": {
                type: "string",
            },
            path: {
                type: "string",
            },
        };
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
                                    type: "array",
                                    items: {
                                        type: "string",
                                    },
                                },
                            },
                        ];

                    case "classes":
                        return [
                            e,
                            {
                                type: "array",
                                items: {
                                    type: "array",
                                    items: {
                                        type: "string",
                                    },
                                },
                            },
                        ];

                    case "locales":
                        return [
                            e,
                            {
                                type: "array",
                                items: {
                                    type: "object",
                                    properties: {
                                        lang: {
                                            type: "string",
                                        },
                                        name: {
                                            type: "string",
                                        },
                                        id: {
                                            type: "string",
                                        },
                                        icon: {
                                            type: "string",
                                        },
                                        principal: {
                                            type: "string",
                                        },
                                    },
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

    isDateSchema(schema) {
        if (schema.hasOwnProperty("oneOf")) {
            return schema.oneOf[0].format === "date-time";
        }
        return schema.format === "date-time";
    }

    getClassSchema(className) {
        const values = this.app.getRawPropertiesMeta(className);

        const oneOf = {
            oneOf: [
                { type: "string" },
                { type: "number" },
                { type: "object" },
                { type: "array" },
            ],
        };

        const date = {
            oneOf: [
                {
                    type: "string",
                    format: "date-time",
                },
                {
                    type: "array",
                    items: {
                        type: "string",
                        format: "date-time",
                    },
                },
            ],
        };

        const properties = values.reduce(
            (acc, [cName, property, type, i18n, uri, obs], i) => {
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
                if (Object.keys(this.getInternalSchema()).includes(property)) {
                    return acc; // skip internalSchema properties
                }

                if (type.includes("Date")) {
                    acc[property] = date;
                } else {
                    acc[property] = oneOf;
                }

                return acc;
            },
            this.getInternalSchema()
        );

        return properties;
    }

    getUrl() {
        return `${this.app.apiConfig.url}/${this.getBase()}`;
    }

    getBase(slash = true) {
        return `${this.app.apiConfig.namespace}/${this.app.apiConfig.version}${
            slash ? "/" : ""
        }`;
    }
}
