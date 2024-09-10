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

    getEntityById(sheetName, id, recursive = true) {
        const entity = new Entity({
            header: this.sheets[this.defaultLocale].getHeader(sheetName),
            values: this.sheets[this.defaultLocale].getRowById(sheetName, id),
            endpoints: this.sheets[this.defaultLocale].findValuesFromSheet(
                "config",
                "endpoints",
                2
            ).values,
            i18n: this,
            recursive,
        });

        if (this.locale === this.defaultLocale) {
            return entity;
        }

        const header = this.sheets[this.locale].getHeader(sheetName);
        const translations = this.sheets[this.locale].getRowById(sheetName, id);

        header.forEach((key, index) => {
            entity.setProperty(key, translations[index]);
        });

        return entity;
    }

    getEntities(sheetName) {
        const config = this.sheets.en
            .findValuesFromSheet("config", "api", 2)
            .values.reduce((acc, [key, value]) => {
                acc[key] = value;
                return acc;
            }, {});

        const { header, values } = this.sheets[
            this.defaultLocale
        ].findValuesFromSheet(sheetName, sheetName);

        const entities = values.map((row) => {
            return new Entity({
                header,
                values: row,
                endpoints: this.sheets[this.defaultLocale].findValuesFromSheet(
                    "config",
                    "endpoints",
                    2
                ).values,
                i18n: this,
            });
        });

        if (this.locale === this.defaultLocale) {
            return entities;
        }

        const translations = this.sheets[this.locale].findValuesFromSheet(
            sheetName,
            sheetName
        );

        entities.forEach((entity, i) => {
            translations.header.forEach((key, index) => {
                if (entity._id !== translations.values[i][0]) return;
                entity.setProperty(key, translations.values[i][index]);
            });
        });

        return entities;
    }

    setLocale(locale) {
        this.locale = locale;
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
}
