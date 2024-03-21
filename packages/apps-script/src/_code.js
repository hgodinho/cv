function doGet(e) {
    const app = new App();
    const json = app.getJsonLd();

    console.log("doGet", { e, json });

    return ContentService.createTextOutput(json).setMimeType(
        ContentService.MimeType.JSON
    );
}
