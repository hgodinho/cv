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
        };
        this.setup();
    }

    setup() {
        this.setupConfig();
        this.setupRawData();
        this.setupData();
    }

    setupConfig() {
        const { header, values } = this.spreadsheet.findValuesFromSheet(
            "config",
            "[uri]",
            4
        );
        this.config = Object.fromEntries(
            header.map((key, index) => [key, values[0][index]])
        );
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
            "@context": "https://schema.org",
            "@graph": [],
        };

        Object.entries(this.data).forEach(([name, entities]) => {
            entities.forEach((entity) => {
                json["@graph"].push(entity.toJsonLd());
            });
        });

        if (!stringify) return json;
        return JSON.stringify(json);
    }
}
