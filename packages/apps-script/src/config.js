const CONFIG = {
    getProperty: (key) =>
        PropertiesService.getScriptProperties().getProperty(key),

    sheet: () => CONFIG.getProperty("sheet"),
};
