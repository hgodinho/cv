class App {
    constructor(endpoints = []) {
        this.configSheet = new Sheet(CONFIG.sheet());
        this.setup();
        this.setupEndpoints(endpoints);
    }

    setup() {
        if (typeof this.config === "undefined") {
            this.setupConfig();
        }
    }

    setupConfig() {
        this.getApiConfig();
        this.getProperties();
    }

    setupEndpoints(endpoints) {
        this.endpoints = endpoints.reduce((acc, name) => {
            const { values } = this.configSheet.findValuesFromSheet(
                "🏠",
                name,
                2,
                undefined,
                false
            );
            acc[name] = values.reduce((acc, [key, value]) => {
                acc[key] = value;
                return acc;
            }, {});
            return acc;
        }, {});
    }

    setupRawData() {
        this.rawData = Object.fromEntries(
            Object.entries(this.endpoints).map(
                ([name, { meta, total, ...rest }]) => {
                    return [
                        name,
                        this.configSheet.findValuesFromSheet(
                            name,
                            name,
                            meta,
                            total
                        ),
                    ];
                }
            )
        );
    }

    getApiConfig() {
        if (typeof this.config === "undefined") {
            this.config = this.configSheet
                .findValuesFromSheet("config", "api", 2)
                .values.reduce((acc, [key, value]) => {
                    acc[key] = value;
                    return acc;
                }, {});
        }
        return this.config;
    }

    getAbout() {
        return this.configSheet
            .findValuesFromSheet("config", "about", 2)
            .values.reduce((acc, [key, value]) => {
                acc[key] = value;
                return acc;
            }, {});
    }

    getProperties() {
        if (typeof this.properties === "undefined") {
            this.properties = this.configSheet
                .findValuesFromSheet("config", "properties", 2)
                .values.map(([name, order]) => name);
        }
        return this.properties;
    }

    getRawPropertiesMeta(endpoint) {
        const { values } = this.configSheet.findValuesFromSheet(
            "meta",
            endpoint,
            6
        );
        return values;
    }

    getPropertiesMeta(endpoint, filter = undefined) {
        return this.getRawPropertiesMeta(endpoint).reduce(
            (acc, [className, property, type, i18n, url, obs]) => {
                if (
                    typeof filter !== "undefined" &&
                    !filter({ className, property, type, i18n, url, obs })
                ) {
                    return acc;
                }

                if (className && obs) {
                    if (obs.trim().startsWith("+")) {
                        const search = obs.trim().split("+").pop().trim();
                        const foundValues = this.getPropertiesMeta(
                            search,
                            filter
                        );
                        acc = { ...acc, ...foundValues };
                        return acc;
                    }
                }
                if (property) {
                    acc[property] = {
                        class: className,
                        property,
                        type,
                        i18n,
                        url,
                        obs,
                    };
                }
                return acc;
            },
            this.getDefaultPropertiesMeta()
        );
    }

    getDefaultPropertiesMeta() {
        return {
            _id: { class: "Thing", property: "_id", type: "string" },
            path: { class: "Thing", property: "path", type: "string" },
        };
    }

    getRowByQuery(sheetName, query) {
        try {
            const sheet = this.configSheet
                .getSpreadsheet()
                .getSheetByName(sheetName);
            const finder = sheet.createTextFinder(query);
            const ranges = finder.findAll();

            let data;

            for (const range of ranges) {
                const value = range.getValue();
                if (value === query) {
                    const row = range.getRow();
                    const header = this.getMetaHeader(sheetName);
                    const values = sheet
                        .getRange(row, 2, 1, sheet.getLastColumn() - 1)
                        .getValues()[0];
                    data = new Entity(header, values, this.getApiConfig());
                }
            }

            if (!data) {
                throw new Error(
                    `No row found with id ${id} at sheet ${sheetName}`
                );
            }

            return data;
        } catch (error) {
            throw new Error(error);
        }
    }

    getEntityList(sheetName) {
        try {
            const { header, values } = this.configSheet.findValuesFromSheet(
                sheetName,
                sheetName,
                this.endpoints[sheetName].meta,
                this.endpoints[sheetName].total
            );
            return values.map(
                (row) => new Entity(header, row, this.getApiConfig())
            );
        } catch (error) {
            throw new Error(error);
        }
    }

    getMetaHeader(sheetName) {
        try {
            return this.configSheet.findValuesFromSheet(
                sheetName,
                sheetName,
                this.endpoints[sheetName].meta
            ).header;
        } catch (error) {
            throw new Error(error);
        }
    }
}
