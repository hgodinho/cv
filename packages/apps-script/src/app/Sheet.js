class Sheet {
    constructor(id) {
        this.setupSpreadsheet(id);
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

    findValuesFromSheet(
        sheetName,
        key,
        columns = undefined,
        rows = "auto",
        header
    ) {
        const {
            header: headerValues,
            values,
            ...rest
        } = this.findRangeFromSheet({
            sheetName,
            key,
            columns,
            rows,
            header,
        });

        return {
            header: headerValues ? headerValues.getValues()[0] : [],
            values: typeof values !== "undefined" ? values.getValues() : [],
            ...rest,
        };
    }

    findRangeFromSheet({
        sheetName,
        key,
        rows = "auto",
        columns = undefined,
        header,
    }) {
        key = `[${key}]`; // add brackets to key
        if (typeof header === "undefined") header = true;

        const sheet = this.getSheet(sheetName);

        const finder = sheet.createTextFinder(key);

        const range = finder.findNext();
        if (!range)
            throw new Error(
                `No row found with key=${key} in sheetName=${sheetName}`
            );
        const dataColumn = range.getColumn();
        let dataRow = range.getRow();

        columns =
            typeof columns === "undefined"
                ? sheet.getLastColumn() - 1
                : columns;

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

        let head = null;
        let offset = 1;
        if (header) {
            head = sheet.getRange(dataRow + offset, dataColumn, 1, columns);
        } else {
            offset = 0;
        }

        let values = undefined;
        if (totalRows > 0)
            values = sheet.getRange(
                dataRow + offset + 1,
                dataColumn,
                totalRows,
                columns
            );

        return { header: head, values, sheetName, key, total: totalRows };
    }

    getValueFromSheet(sheetName, range) {
        const sheet = this.getSheet(sheetName);
        return sheet.getRange(range).getValue();
    }

    getOffset(sheetName) {
        const sheet = this.getSheet(sheetName);
        const finder = sheet.createTextFinder("offset");
        const range = finder.findNext();
        const offset = sheet.getRange(range.getRow(), range.getColumn() + 1);
        return offset.getValue();
    }

    getTotalRows(sheetName) {
        const { total } = this.findRangeFromSheet({
            sheetName,
            key: sheetName,
        });
        return total;
    }

    getRowById(sheetName, id) {
        const sheet = this.getSheet(sheetName);
        const offset = this.getOffset(sheetName);
        const total = this.getTotalRows(sheetName);
        const range = sheet.getRange(offset + 1, 2, total);

        let row;
        range.getValues().forEach((data, i) => {
            if (data[0] === id) {
                row = i + offset + 1;
            }
        });
        if (!row) {
            throw new Error(`No row found with id ${id} at sheet ${sheetName}`);
        }
        const rangeRow = sheet.getRange(row, 2, 1, sheet.getLastColumn() - 1);
        const valuesRow = rangeRow.getValues();

        return valuesRow[0];
    }

    getRowByQuery(sheetName, query) {
        const sheet = this.getSheet(sheetName);
        const finder = sheet.createTextFinder(query);
        const ranges = finder.findAll();

        for (const range of ranges) {
            const value = range.getValue();
            if (value === query) {
                const row = range.getRow();
                const values = sheet
                    .getRange(row, 2, 1, sheet.getLastColumn() - 1)
                    .getValues()[0];
                return values;
            }
        }
    }

    getHeader(sheetName) {
        const { header } = this.findValuesFromSheet(sheetName, sheetName);
        return header;
    }

    /**
     *
     *  .d8888b .d88b.  888d888 .d88b.
     * d88P"   d88""88b 888P"  d8P  Y8b
     * 888     888  888 888    88888888
     * Y88b.   Y88..88P 888    Y8b.
     *  "Y8888P "Y88P"  888     "Y8888
     */
    setupSpreadsheet(id) {
        if (id) {
            this.id = id;
            this.spreadsheet = SpreadsheetApp.openById(id);
        }
    }

    hasSheet(name) {
        const sheet = this.getSpreadsheet().getSheetByName(name);
        if (!sheet) return false;
        return true;
    }

    createSheet(name) {
        return this.getSpreadsheet().insertSheet(name);
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
