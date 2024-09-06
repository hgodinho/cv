class App {
    constructor(endpoints = [], lang = "en") {
        this.configSheet = new Sheet(CONFIG.sheet());
        this.setup();
        this.setupEndpoints(endpoints);
        this.setupL10n(lang);
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

    setupL10n(lang) {
        this.lang = lang;
        this.l10n = {
            sheets: this.configSheet
                .findValuesFromSheet("config", "l10n", 4)
                .values.reduce((acc, [lang, name, id, principal]) => {
                    acc[lang] = {
                        lang,
                        name,
                        id,
                        principal,
                        sheet: principal || !id ? false : new Sheet(id),
                    };
                    return acc;
                }, {}),
            labels: {
                en: {
                    classes: this.configSheet.findValuesFromSheet(
                        "l10n",
                        "classes",
                        2
                    ).values,
                    properties: this.configSheet.findValuesFromSheet(
                        "l10n",
                        "properties",
                        2
                    ).values,
                },
            },
        };
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

    getL10nConfig() {
        if (typeof this.l10nConfig === "undefined") {
            this.l10nConfig = this.configSheet
                .findValuesFromSheet("config", "l10n", 4)
                .values.reduce((acc, [lang, name, id, principal]) => {
                    acc.push({ lang, name, id, principal });
                    return acc;
                }, []);
        }
        return this.l10nConfig;
    }

    getEndpointsConfig() {
        if (typeof this.endpointsConfig === "undefined") {
            this.endpointsConfig = this.configSheet.findValuesFromSheet(
                "config",
                "endpoints",
                2
            ).values;
        }
        return this.endpointsConfig;
    }

    getApiConfig() {
        if (typeof this.apiConfig === "undefined") {
            this.apiConfig = this.configSheet
                .findValuesFromSheet("config", "api", 2)
                .values.reduce((acc, [key, value]) => {
                    acc[key] = value;
                    return acc;
                }, {});
        }
        return this.apiConfig;
    }

    verifyL10n(callbackOnFail = undefined, callbackOnFinish = undefined) {
        Object.entries(this.l10n.sheets).forEach(
            ([lang, { sheet, principal, ...rest }]) => {
                if (!sheet) {
                    // do nothing if the sheet is principal
                    return;
                }

                Object.keys(this.endpoints).forEach((name) => {
                    if (!sheet.hasSheet(name)) {
                        if (!callbackOnFail) {
                            throw new Error(
                                `Sheet ${name} not found for language ${lang} at spreadsheet ${spreadsheet.getId()}`
                            );
                        }
                        callbackOnFail({
                            name,
                            lang,
                            spreadsheet: sheet,
                        });
                    } else {
                        if (callbackOnFinish) {
                            callbackOnFinish({
                                name,
                                lang,
                                spreadsheet: sheet,
                            });
                        }
                    }
                });
            }
        );
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
                    data = new Entity({
                        header,
                        values,
                        endpoints: this.getEndpointsConfig(),
                        i18n: this.i18n,
                    });
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
                (row) =>
                    new Entity({
                        header,
                        values: row,
                        endpoints: this.endpointsConfig(),
                        i18n: this.i18n,
                    })
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
