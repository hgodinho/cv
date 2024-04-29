class App extends Sheet {
    constructor(endpoints = []) {
        super(CONFIG.sheet(), endpoints);
        this.setup();
    }

    setup() {
        if (typeof this.config === "undefined") {
            this.setupConfig();
        }
    }

    setupConfig() {
        this.config = this.getApiConfig();
        this.properties = this.getProperties();
    }

    setupRawData() {
        this.rawData = Object.fromEntries(
            Object.entries(this.sheets).map(([name, { metadata, items }]) => {
                return [
                    name,
                    this.findValuesFromSheet(
                        name,
                        `[${name}]`,
                        metadata,
                        items
                    ),
                ];
            })
        );
    }
}
