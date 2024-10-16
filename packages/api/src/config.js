const CONFIG = {
    getProperty: (key) =>
        PropertiesService.getScriptProperties().getProperty(key),

    sheet: () => CONFIG.getProperty("sheet"),
};

const ENDPOINTS = {
    person: "Person",
    place: "Place",
    event: "Event",
    organization: "Organization",
    credential: "Credential",
    creativeWork: "CreativeWork",
    intangible: "Intangible",
};
