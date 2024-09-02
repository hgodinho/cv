class Entity {
    constructor(header, values, config) {
        if (!header || !values)
            throw new Error("Entity requires header and values");
        if (!Array.isArray(header))
            throw new Error("Entity requires header to be an array");
        if (!Array.isArray(values))
            throw new Error("Entity requires values to be an array");
        if (header.length !== values.length)
            throw new Error(
                "Entity requires header and values to be the same length"
            );
        if (!config) throw new Error("Entity requires a config");

        this._header = header;
        this._values = values;
        this._config = config;

        const excluded = ["_id", "path"];

        header.forEach((key, index) => {
            let value = values[index];
            if (!excluded.includes(key)) {
                value = this.parseValue(values[index]);
            }
            if (typeof value !== "undefined") {
                this[key] = value;
            }
        });
    }

    parseValue(value) {
        if (value === "" || value === null) return undefined;
        if (value === "TRUE") return true;
        if (value === "FALSE") return false;
        if (!isNaN(value)) return Number(value);
        return this.parseString(value);
    }

    /**
     * Parses a string into an object, an array or a string.
     *
     * If the string contains no operators, returns the string as is.
     *
     * @param {string} str | String to be parsed.
     * @returns String | Object | Array | Parsed string, object or array.
     * @example
     * const entity = new Entity(["name", "age"], ["John", "25"]);
     * console.log(entity.parseString("name=John; age=25")); // { name: "John", age: 25 }
     *
     * const entity = new Entity(["name", "age"], ["John", "25"]);
     * console.log(entity.parseString("name=John; age=25 | name=Jane; age=30")); // [{ name: "John", age: 25 }, { name: "Jane", age: 30 }]
     */
    parseString(str) {
        // return early if the string is URL
        if (str.startsWith("http")) {
            return str;
        }

        const operators = ["=", "/", "|"];

        if (!operators.some((op) => str.includes(op))) {
            return str; // No operators found, return the string as is.
        }

        let data;

        if (str.includes(";") && str.includes("|") && str.includes("=")) {
            // this is a list of objects
            data = str.split("|").map((pair) => {
                return pair.split(";").reduce((acc, item) => {
                    const [key, value] = item
                        .split("=")
                        .map((item) => item.trim());
                    acc[key] = value;
                    return acc;
                }, {});
            });
        } else if (
            str.includes(";") &&
            str.includes("=") &&
            !str.includes("|")
        ) {
            // this is a single object
            data = str.split(";").reduce((acc, item) => {
                const [key, value] = item.split("=").map((item) => item.trim());
                acc[key] = value;
                return acc;
            }, {});
        } else if (
            str.includes("/") &&
            !str.includes(";") &&
            !str.includes("|")
        ) {
            // this is a single path pair
            data = str.trim();
        } else if (
            str.includes("|") &&
            str.includes("/") &&
            !str.includes(";")
        ) {
            // this is a list of path pairs
            data = str.split("|").map((pair) => pair.trim());
        } else if (
            str.includes("|") &&
            !str.includes("/") &&
            !str.includes(";")
        ) {
            // this is a list of strings
            return str.split("|").map((pair) => pair.trim());
        }

        if (typeof data === "string") {
            return `${this._config.url}/${this._config.namespace}/${data}`;
        } else if (Array.isArray(data)) {
            return data.map((item) => {
                if (typeof item === "string") {
                    return `${this._config.url}/${this._config.namespace}/${item}`;
                } else if (typeof item === "object") {
                    return item;
                }
            });
        } else if (typeof data === "object" && !Array.isArray(data)) {
            return data;
        }

        // if we get here, we return the string as is
        return str;
    }
}
