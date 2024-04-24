class App {
    constructor() {
        this.spreadsheet = new Sheet(CONFIG.sheet());
        this.sheets = {
            person: [22],
            place: [6],
            organization: [16],
            event: [15],
            certification: [34],
            creativeWork: [28],
            role: [11],
        };
        this.setup();
    }

    setup() {
        this.setupConfig();
        this.setupRawData();
        this.setupData();
        this.setupColors();
    }

    setupColors() {
        const { values } = this.spreadsheet.findValuesFromSheet(
            "config",
            "[classes]",
            2
        );

        this.colors = values.reduce((acc, [name, color]) => {
            acc[name] = color;
            return acc;
        }, {});
    }

    setupConfig() {
        const { header, values } = this.spreadsheet.findValuesFromSheet(
            "config",
            "[uri]",
            2
        );
        this.config = Object.fromEntries(values);
        const { header: propHeader, values: propValues } =
            this.spreadsheet.findValuesFromSheet("config", "[properties]", 2);

        const orderedProps = new Map();
        for (const [name, order] of propValues) {
            if (order) {
                orderedProps.set(name, order);
            }
        }

        propValues.sort((a, b) => {
            const orderA = orderedProps.get(a[0]) || Infinity;
            const orderB = orderedProps.get(b[0]) || Infinity;
            return orderA - orderB;
        });

        this.properties = propValues.reduce((acc, [name, order]) => {
            acc.push(name);
            return acc;
        }, []);
    }

    setupRawData() {
        this.rawData = Object.fromEntries(
            Object.entries(this.sheets).map(([name, [columns]]) => {
                return [
                    name,
                    this.spreadsheet.findValuesFromSheet(name, name, columns),
                ];
            })
        );
    }

    setupData() {
        this.data = Object.fromEntries(
            Object.entries(this.rawData).map(([name, { header, values }]) => {
                return [
                    name,
                    values.map((row) => new Entity(header, row, this.config)),
                ];
            })
        );
    }

    getJsonLd(stringify = true) {
        const json = {
            properties: this.properties,
            config: this.config,
            colors: this.colors,
            data: {
                "@context": "https://schema.org",
                "@graph": [],
            },
        };

        Object.entries(this.data).forEach(([name, entities]) => {
            entities.forEach((entity) => {
                json.data["@graph"].push(entity.toJsonLd());
            });
        });

        if (!stringify) return json;
        return JSON.stringify(json);
    }
}
