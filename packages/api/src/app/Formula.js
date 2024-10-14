class Formula {
    /**
     * Formats a value as a formula
     * @param {string} value | value to be formatted
     * @returns | formula
     */
    formula(value) {
        return `=${value}`;
    }

    /**
     * Formats a value as an array formula
     * @param {string} value | value to be formatted
     * @returns | formula
     */
    arrayFormula(value) {
        return `=ARRAYFORMULA(${value})`;
    }

    /**
     * Sums a range of values
     * @param {Array} values | values to be summed
     * @returns | formula
     */
    sum(values) {
        return `SUM(${values.join(";")})`;
    }

    /**
     * Conditional
     * @param {string} condition | condition to be evaluated
     * @param {string} then | value if condition is true
     * @param {string} otherwise | value if condition is false
     * @returns | formula
     */
    if(condition, then, otherwise) {
        return `IF(${condition};${then};${otherwise})`;
    }

    /**
     * Not
     * @param {string} value | value to be negated
     * @returns | formula
     */
    not(value) {
        return `NOT(${value})`;
    }

    /**
     * Verifies if a value is blank
     * @param {string} value | value to be verified
     * @returns | formula
     */
    isBlank(value) {
        return `ISBLANK(${value})`;
    }

    /**
     * Transforms a value to Year
     * @param {string} value | value to be transformed
     * @returns | formula
     */
    year(value) {
        return `YEAR(${value})`;
    }

    /**
     * Transforms a value to Month
     * @param {string} value | value to be transformed
     * @returns | formula
     */
    month(value) {
        return `MONTH(${value})`;
    }

    /**
     * Transforms a value to Day
     * @param {string} value | value to be transformed
     * @returns | formula
     */
    day(value) {
        return `DAY(${value})`;
    }

    /**
     * Return empty string
     * @returns | formula
     */
    empty() {
        return `""`;
    }

    /**
     * Count the number of cells that are not empty
     * @param {string} value | value to be counted
     * @returns | formula
     */
    counta(value) {
        return `COUNTA(${value})`;
    }

    /**
     * Generates a URL
     * @param {string} type | type part of the URL
     * @param {string} name | name part of the URL
     * @param {string} url | URL part
     * @param {string} namespace | namespace part
     * @returns URL_GEN formula
     */
    URL(type, name, url, namespace) {
        return `URL_GEN(${type}; ${name}; ${url}; ${namespace})`;
    }

    /**
     * Generates an ID
     * @param {string} name | name part of the ID
     * @param {string} type | type part of the ID
     * @returns | ID_GEN formula
     */
    ID(name, type) {
        return `ID_GEN(${name}; ${type})`;
    }
}
