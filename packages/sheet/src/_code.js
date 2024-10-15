function onEditValue(e) {
    lastUpdate(e);
    translateValues(e);
}

function lastUpdate(e) {
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("🏠");
    const cell = sheet.getRange("E4");
    const date = new Date();
    cell.setValue(Utilities.formatDate(date, "GMT-3", "yyyy-MM-dd HH:mm:ss"));
}

function translateValues(e) {
    const sheet = e.range.getSheet();
    const allowedSheets = [
        "person",
        "place",
        "intangible",
        "credential",
        "creativeWork",
        "event",
        "organization",
    ];
    const editedSheetName = sheet.getName();
    // return if the sheet is not allowed
    if (!allowedSheets.includes(editedSheetName)) return;

    const configSheet =
        SpreadsheetApp.getActiveSpreadsheet().getSheetByName("config");
    const pt_brID = configSheet.getRange("L4").getValue();
    const enID = configSheet.getRange("L5").getValue();
    const esID = configSheet.getRange("L6").getValue();

    const pt_brSheet = SpreadsheetApp.openById(pt_brID);
    const enSheet = SpreadsheetApp.openById(enID);
    const esSheet = SpreadsheetApp.openById(esID);

    const editedRange = e.range;
    const editedValue = editedRange.getValue();
    const editedA1Notation = editedRange.getA1Notation();

    const pt_brRange = pt_brSheet
        .getSheetByName(editedSheetName)
        .getRange(editedA1Notation);
    const enRange = enSheet
        .getSheetByName(editedSheetName)
        .getRange(editedA1Notation);
    const esRange = esSheet
        .getSheetByName(editedSheetName)
        .getRange(editedA1Notation);

    const editedTime = new Date();

    const pt_brValue = pt_brRange.getValue();
    const enValue = enRange.getValue();
    const esValue = esRange.getValue();

    if (pt_brValue !== editedValue) pt_brRange.setValue(editedValue);
    if (enValue !== editedValue) enRange.setValue(editedValue);
    if (esValue !== editedValue) esRange.setValue(editedValue);

    pt_brRange.setNote(
        `Original value: ${editedValue} | Last update: ${editedTime.toLocaleDateString(
            "pt-BR"
        )} at ${editedTime.toLocaleTimeString("pt-BR")}`
    );
    esRange.setNote(
        `Original value: ${editedValue} | Last update: ${editedTime.toLocaleDateString(
            "pt-BR"
        )} at ${editedTime.toLocaleTimeString("pt-BR")}`
    );
}
