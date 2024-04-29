/**
 * Get the access token
 */
function getToken() {
    console.log("access_token:", ScriptApp.getOAuthToken());
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

/**
 * Escape HTML entities.
 * @param {string} str | String to be escaped.
 * @returns | Escaped string.
 */
function sanitize(str) {
    const entityMap = getEntityMap();
    return String(str).replace(/[&<>"'`=\/]/g, (s) => entityMap[s]);
}
