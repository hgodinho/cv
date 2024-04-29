class Sheet {
    constructor(id, sheets) {
        this.setupSpreadsheet(id, sheets);
    }

    /**
     *                                     d8b  .d888 d8b
     *                                     Y8P d88P"  Y8P
     *                                         888
     * .d8888b  88888b.   .d88b.   .d8888b 888 888888 888  .d8888b
     * 88K      888 "88b d8P  Y8b d88P"    888 888    888 d88P"
     * "Y8888b. 888  888 88888888 888      888 888    888 888
     *      X88 888 d88P Y8b.     Y88b.    888 888    888 Y88b.
     *  88888P' 88888P"   "Y8888   "Y8888P 888 888    888  "Y8888P
     *          888
     *          888
     *          888
     */
    getApiConfig() {
        return this.findValuesFromSheet("config", "[api]", 2).values.reduce(
            (acc, [key, value]) => {
                acc[key] = value;
                return acc;
            },
            {}
        );
    }

    getAbout() {
        return this.findValuesFromSheet("config", "[about]", 2).values.reduce(
            (acc, [key, value]) => {
                acc[key] = value;
                return acc;
            },
            {}
        );
    }

    getProperties() {
        return this.findValuesFromSheet("config", "[properties]", 2).values.map(
            ([name, order]) => name
        );
    }

    getMetaHeader(sheetName) {
        return this.findValuesFromSheet(
            sheetName,
            `[${sheetName}]`,
            this.sheets[sheetName].metadata
        ).header;
    }

    getEntityById(sheetName, id) {
        const sheet = this.getSpreadsheet().getSheetByName(sheetName);

        const finder = sheet.createTextFinder(id);
        const ranges = finder.findAll();

        let data;
        for (const range of ranges) {
            const value = range.getValue();
            if (value === id) {
                const row = range.getRow();
                const header = this.getMetaHeader(sheetName);
                const values = sheet
                    .getRange(row, 2, 1, sheet.getLastColumn() - 1)
                    .getValues()[0];
                data = new Entity(header, values, this.getApiConfig());
            }
        }

        if (!data) {
            throw new Error(`No row found with id ${id}`);
        }

        return data;
    }

    getEntityList(sheetName) {
        const { header, values } = this.findValuesFromSheet(
            sheetName,
            `[${sheetName}]`,
            this.sheets[sheetName].metadata
        );

        return values.map(
            (row) => new Entity(header, row, this.getApiConfig())
        );
    }

    /**
     *                                             d8b
     *                                             Y8P
     *
     *  .d88b.   .d88b.  88888b.   .d88b.  888d888 888  .d8888b
     * d88P"88b d8P  Y8b 888 "88b d8P  Y8b 888P"   888 d88P"
     * 888  888 88888888 888  888 88888888 888     888 888
     * Y88b 888 Y8b.     888  888 Y8b.     888     888 Y88b.
     *  "Y88888  "Y8888  888  888  "Y8888  888     888  "Y8888P
     *      888
     * Y8b d88P
     *  "Y88P"
     */
    findValueFromSheet(sheetName, key, columns) {
        const sheet = this.getSpreadsheet().getSheetByName(sheetName);
        const finder = sheet.createTextFinder(key);
        const range = finder.findNext();
        const dataColumn = range.getColumn();
        let dataRow = range.getRow();

        const sheetTotalRows = sheet
            .getRange(dataRow, dataColumn + columns - 1)
            .getValue();

        let totalRows;

        if (rows == "auto") {
            totalRows = sheetTotalRows;
        } else if (rows == "append") {
            totalRows = 1;
            dataRow = dataRow + sheetTotalRows;
        } else {
            totalRows = rows || 1;
        }

        const header = sheet.getRange(dataRow + 1, dataColumn, 1, columns);

        let values = undefined;

        if (totalRows > 0)
            values = sheet.getRange(
                dataRow + 2,
                dataColumn,
                totalRows,
                columns
            );

        return { header, values, sheetName, key };
    }

    findValuesFromSheet(sheetName, key, columns, rows = "auto") {
        const { header, values, ...rest } = this.findRangeFromSheet({
            sheetName,
            key,
            columns,
            rows,
        });

        return {
            header: header ? header.getValues()[0] : [],
            values: typeof values !== "undefined" ? values.getValues() : [],
            ...rest,
        };
    }

    findRangeFromSheet({ sheetName, key, rows = "auto", columns }) {
        const sheet = this.getSpreadsheet().getSheetByName(sheetName);
        const finder = sheet.createTextFinder(key);

        const range = finder.findNext();
        if (!range)
            throw new Error(`No row found with key ${key} in ${sheetName}`);
        const dataColumn = range.getColumn();
        let dataRow = range.getRow();

        const sheetTotalRows = sheet
            .getRange(dataRow, dataColumn + columns - 1)
            .getValue();

        let totalRows;

        if (rows == "auto") {
            totalRows = sheetTotalRows;
        } else if (rows == "append") {
            totalRows = 1;
            dataRow = dataRow + sheetTotalRows;
        } else {
            totalRows = rows || 1;
        }

        const header = sheet.getRange(dataRow + 1, dataColumn, 1, columns);

        let values = undefined;

        if (totalRows > 0)
            values = sheet.getRange(
                dataRow + 2,
                dataColumn,
                totalRows,
                columns
            );

        return { header, values, sheetName, key };
    }

    /**
     *
     *  .d8888b .d88b.  888d888 .d88b.
     * d88P"   d88""88b 888P"  d8P  Y8b
     * 888     888  888 888    88888888
     * Y88b.   Y88..88P 888    Y8b.
     *  "Y8888P "Y88P"  888     "Y8888
     */
    setupSpreadsheet(id, sheets) {
        if (id) {
            this.id = id;
            this.spreadsheet = SpreadsheetApp.openById(id);
        }
        if (sheets) {
            this.sheets = sheets.reduce((acc, endpoint) => {
                const { values, header } = this.findValuesFromSheet(
                    "dashboard",
                    `[${endpoint}]`,
                    2
                );
                acc[endpoint] = values.reduce((acc, row) => {
                    acc[row[0]] = row[1];
                    return acc;
                }, {});
                return acc;
            }, {});
        }
    }

    hasSheet(name) {
        const sheet = this.getSpreadsheet().getSheetByName(name);
        if (!sheet) return false;
        return true;
    }

    getSpreadsheet() {
        if (!this.spreadsheet) {
            this.setupSpreadsheet(this.id);
        }
        return this.spreadsheet;
    }

    getSheet(sheetName) {
        return this.getSpreadsheet().getSheetByName(sheetName);
    }

    getId() {
        return this.spreadsheet.getId();
    }

    getUrl() {
        return this.spreadsheet.getUrl();
    }

    getLastUpdate() {
        if (!this.id) {
            throw new Error("No spreadsheet id");
        }
        return DriveApp.getFileById(this.id).getLastUpdated();
    }
}
