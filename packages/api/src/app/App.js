class App {
    constructor(endpoints = [], locale) {
        this.configSheet = new Sheet(CONFIG.sheet());
        this.setupConfig();
        this.setupEndpoints(endpoints);

        if (locale) {
            this.setupI18n(locale);
        }
    }

    setupConfig() {
        this.getApiConfig();
    }

    setupI18n(locale) {
        this.locale = locale;
        this.i18n = new I18n(this.getL10nConfig(), locale);
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

    getL10nConfig() {
        if (typeof this.l10nConfig !== "undefined") {
            return this.l10nConfig;
        }

        this.l10nConfig = this.configSheet
            .findValuesFromSheet("config", "l10n", 5)
            .values.reduce((acc, [lang, name, id, icon, principal]) => {
                acc.push({ lang, name, id, icon, principal });
                return acc;
            }, []);
        return this.l10nConfig;
    }

    getEndpointsConfig() {
        if (typeof this.endpointsConfig !== "undefined") {
            return this.endpointsConfig;
        }

        this.endpointsConfig = this.configSheet.findValuesFromSheet(
            "config",
            "endpoints",
            2
        ).values;
        return this.endpointsConfig;
    }

    getApiConfig() {
        if (typeof this.apiConfig !== "undefined") {
            return this.apiConfig;
        }

        this.apiConfig = this.configSheet
            .findValuesFromSheet("config", "api", 2)
            .values.reduce((acc, [key, value]) => {
                acc[key] = value;
                return acc;
            }, {});
        return this.apiConfig;
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
        return this.i18n?.getLabels("properties");
    }

    getClasses() {
        return this.i18n?.getLabels("classes");
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
            const i18n = this.i18n;
            const entity = i18n.getEntityByQuery(sheetName, query);
            if (!entity) {
                throw new Error(
                    `No row found with query ${query} at sheet ${sheetName}`
                );
            }
            return entity;
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
}
