function doGet(e) {
    const api = new Api(e);
    return api.response();
}

function createL10nSheets() {
    const app = new App([
        "person",
        "place",
        "intangible",
        "credential",
        "creativeWork",
        "event",
        "organization",
    ]);
    const f = new Formula();
    Object.entries(app.l10n.sheets).forEach(
        ([lang, { name, id, principal }]) => {
            if (!principal) {
                const spreadsheet = new Sheet(id);
                if (!spreadsheet.hasSheet("l10n")) {
                    const sheet = spreadsheet.createSheet("l10n");
                    const propertiesRange = sheet.getRange(
                        2,
                        2,
                        app.l10n.labels.en.properties.length + 2,
                        2
                    );
                    propertiesRange.setValues([
                        ["[properties]", f.formula(f.counta("C4:C"))],
                        ["value", "label"],
                        ...app.l10n.labels.en.properties,
                    ]);

                    const classesRange = sheet.getRange(
                        2,
                        5,
                        app.l10n.labels.en.classes.length + 2,
                        2
                    );
                    classesRange.setValues([
                        ["[classes]", f.formula(f.counta("F4:F"))],
                        ["value", "label"],
                        ...app.l10n.labels.en.classes,
                    ]);
                }
            }
        }
    );
    // console.log(app.l10n);
}

function L10nData() {
    const sheet = new Sheet(CONFIG.sheet());
    const endpoints = sheet
        .findValuesFromSheet("config", "endpoints", 2)
        .values.map(([key, value]) => {
            return key;
        });

    const app = new App(endpoints);
    const f = new Formula();

    app.verifyL10n(({ name, lang, spreadsheet }) => {
        // filter out the properties that are not meant to be translated
        const meta = app.getPropertiesMeta(name, ({ i18n }) => i18n);

        const toBeTranslated = app.getEntityList(name).map((entity) => {
            const toInclude = ["_id", "path", "@id"];
            const values = Object.entries(entity)
                .map(([key, value]) => {
                    if (meta[key]) {
                        return [key, value];
                    }
                    if (toInclude.includes(key)) {
                        return [key, value];
                    }
                    return false;
                })
                .filter(Boolean);
            return Object.fromEntries(values);
        });

        const header = Object.entries(meta).reduce((acc, [key, options]) => {
            acc.push(options.property);
            return acc;
        }, []);

        const offset = 4;
        const defaultValues = (index) => ({
            path: f.formula(f.ID(`F${index + offset}`, `D${index + offset}`)),
            "@id": f.formula(
                f.URL(
                    `D${index + offset}`,
                    `F${index + offset}`,
                    `"${app.config.url}"`,
                    `"${app.config.namespace}"`
                )
            ),
        });

        const readyForTranslation = toBeTranslated.reduce(
            (acc, data, index) => {
                const values = Object.entries(meta).map(([key, options]) => {
                    if (defaultValues(index).hasOwnProperty(key)) {
                        return defaultValues(index)[key];
                    }
                    if (data.hasOwnProperty(key)) {
                        return data[key];
                    }
                    return "";
                });
                acc.push(values);
                return acc;
            },
            []
        );

        readyForTranslation.unshift(header);
        readyForTranslation.unshift([
            `[${name}]`,
            ...Array(header.length - 2).fill(""),
            f.formula(f.counta("C4:C")),
        ]);

        const l10nSheet = spreadsheet.createSheet(name);
        const range = l10nSheet.getRange(
            2,
            2,
            readyForTranslation.length,
            readyForTranslation[0].length
        );
        range.setValues(readyForTranslation);
    });
}
