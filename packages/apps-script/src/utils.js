/**
 * Get the access token
 */
function getToken() {
    const token = ScriptApp.getOAuthToken();
    console.log("access_token:", token);
    return token;
}

function stripTrailingSlash(str) {
    return str.endsWith("/") ? str.slice(0, -1) : str;
}

function parseDate(date) {
    return Utilities.formatDate(new Date(date), "GMT", "yyyy-MM-dd");
}

function getEntityMap() {
    return {
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#39;",
        "/": "&#x2F;",
        "`": "&#x60;",
        "=": "&#x3D;",
    };
}

const utils = {
    /**
     * Escape HTML entities.
     * @param {string} str | String to be escaped.
     * @returns | Escaped string.
     */
    sanitize: (str) => {
        const entityMap = getEntityMap();
        return String(str).replace(/[&<>"'`=\/]/g, (s) => entityMap[s]);
    },
    /**
     * Find a key by its value in an object.
     * @param {object} obj | Object to be searched.
     * @param {string} value | Value to be searched.
     * @returns | Key of the value.
     */
    findKeyByValue: (obj, value) => {
        for (const key in obj) {
            if (obj[key].includes(value)) {
                return key;
            }
        }
        return false; // Retorna false se a chave não for encontrada
    },
};
