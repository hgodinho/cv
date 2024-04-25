class App extends Sheet {
    constructor() {
        super(CONFIG.sheet(), {
            person: 22,
            place: 6,
            role: 11,
            certification: 34,
            creativeWork: 28,
            article: 33,
            chapter: 31,
            event: 15,
            organization: 16,
        });
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
            Object.entries(this.sheets).map(([name, columns]) => {
                return [
                    name,
                    this.findValuesFromSheet(name, `[${name}]`, columns),
                ];
            })
        );
    }
}
