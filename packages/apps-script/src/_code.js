function doGet(e) {
    const app = new App();

    console.log("doGet", { e, JSON: app.getJsonLd() });

    return ContentService.createTextOutput(app.getJsonLd()).setMimeType(
        ContentService.MimeType.JSON
    );
}
