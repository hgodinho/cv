class I18n {
    constructor(sheets, locale = "en") {
        this.defaultLocale = "en";
        this.setLocale(locale);
        this.setupSheets(sheets);
    }

    setupSheets(sheets) {
        this.sheets = sheets.reduce((acc, sheet) => {
            acc[sheet.lang] = new Sheet(sheet.id);
            return acc;
        }, {});
    }

    getEntitiesMeta(sheetName) {
        return this.sheets[this.locale]
            .findValuesFromSheet(sheetName, "meta", 2)
            .values.reduce((acc, [key, value]) => {
                if (key === "allowed_types") {
                    acc["allowed_types"] = [value];
                } else if (key === "") {
                    acc["allowed_types"].push(value);
                } else {
                    acc[key] = value;
                }
                return acc;
            }, {});
    }

    getEntityById(sheetName, id, recursive = true) {
        try {
            const entity = new Entity({
                header: this.sheets[this.locale].getHeader(sheetName),
                defaultValues: this.sheets[this.defaultLocale].getRowById(
                    sheetName,
                    id
                ),
                values: this.sheets[this.locale].getRowById(sheetName, id),
                endpoints: this.sheets[this.defaultLocale].findValuesFromSheet(
                    "config",
                    "endpoints",
                    2
                ).values,
                i18n: this,
                recursive,
            });

            return entity.getEntity();
        } catch (error) {
            throw new Error(
                `No entity found with id "${id}" at sheet "${sheetName}" - ${error.message}`
            );
        }
    }

    getEntityByQuery(sheetName, query) {
        const row = this.sheets[this.locale].getRowByQuery(sheetName, query);
        const id = row[0];
        const entity = this.getEntityById(sheetName, id);
        if (entity) {
            return entity;
        }
    }

    getEntities(sheetName) {
        const { header, values } = this.sheets[this.locale].findValuesFromSheet(
            sheetName,
            sheetName
        );

        try {
            const entities = values
                .map((row) => {
                    if (!row[0]) {
                        return false;
                    }
                    return new Entity({
                        header,
                        defaultValues: this.sheets[
                            this.defaultLocale
                        ].getRowById(sheetName, row[0]),
                        values: row,
                        endpoints: this.sheets[
                            this.defaultLocale
                        ].findValuesFromSheet("config", "endpoints", 2).values,
                        i18n: this,
                    }).getEntity();
                })
                .filter(Boolean);

            return entities;
        } catch (error) {
            throw new Error(
                `No entities found at sheet "${sheetName}" - ${error.message}`
            );
        }
    }

    getLabels(labels) {
        return this.sheets[this.locale].findValuesFromSheet("l10n", labels, 2)
            .values;
    }

    getLastUpdated() {
        return this.sheets[this.locale].getValueFromSheet("🏠", "E4");
    }

    getAliasedTranslatedEndpoint(query) {
        let lastKey;
        const search = Object.entries(
            this.sheets[this.locale]
                .findValuesFromSheet("l10n", "endpoints", 2)
                .values.reduce((acc, [key, value]) => {
                    if (key) {
                        acc[key] = [value];
                        lastKey = key;
                    } else {
                        acc[lastKey].push(value);
                    }
                    return acc;
                }, {})
        ).find(([key, alias]) => {
            if (alias.includes(query)) {
                return true;
            }
        });
        if (search) {
            return search[0];
        }
        return false;
    }

    setLocale(locale) {
        this.locale = locale;
    }
}
