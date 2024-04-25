class Sheet {
    constructor(id, sheets) {
        this.setupSpreadsheet(id, sheets);
    }

    setupSpreadsheet(id, sheets) {
        if (id) {
            this.id = id;
            this.spreadsheet = SpreadsheetApp.openById(id);
        }
        if (sheets) {
            this.sheets = sheets;
        }
    }

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

        return { header, values };
    }

    findValuesFromSheet(sheetName, key, columns) {
        const { header, values } = this.findRangeFromSheet({
            sheetName,
            key,
            columns,
            rows: "auto",
        });

        return {
            header: header ? header.getValues()[0] : [],
            values: typeof values !== "undefined" ? values.getValues() : [],
        };
    }

    findRangeFromSheet({ sheetName, key, rows = "auto", columns }) {
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

        return { header, values };
    }

    getApiConfig() {
        return this.findValuesFromSheet("config", "[api]", 2).values.reduce(
            (acc, [key, value]) => {
                acc[key] = value;
                return acc;
            },
            {}
        );
    }

    getMetaHeader(sheetName) {
        return this.findValuesFromSheet(
            sheetName,
            `[${sheetName}]`,
            this.sheets[sheetName]
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
            this.sheets[sheetName]
        );

        return values.map(
            (row) => new Entity(header, row, this.getApiConfig())
        );
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
