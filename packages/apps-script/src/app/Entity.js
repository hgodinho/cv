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

        header.forEach((key, index) => {
            const value = this.parseValue(values[index]);
            if (value !== undefined && key !== "number") {
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

        const operators = ["=", ";", "|"];

        if (!operators.some((op) => str.includes(op))) {
            return str; // No operators found, return the string as is.
        }

        let data;
        if (str.includes(";") && str.includes("|") && str.includes("=")) {
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
            data = str.split(";").reduce((acc, item) => {
                const [key, value] = item.split("=").map((item) => item.trim());
                acc[key] = value;
                return acc;
            }, {});
        } else if (
            str.includes("=") &&
            !str.includes(";") &&
            !str.includes("|")
        ) {
            data = str.trim();
        } else if (
            str.includes("|") &&
            str.includes("=") &&
            !str.includes(";")
        ) {
            data = str.split("|").map((pair) => pair.trim());
        } else if (
            str.includes("|") &&
            !str.includes("=") &&
            !str.includes(";")
        ) {
            return str.split("|").map((pair) => pair.trim());
        }

        if (typeof data === "string") {
            return this._config.query + data;
        } else if (Array.isArray(data)) {
            return data.map((item) => {
                if (typeof item === "string") {
                    return this._config.query + item;
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

    toJsonLd() {
        if (!this.type) throw new Error("Entity requires a type");
        if (!this.id) throw new Error("Entity requires a id");
        const json = {
            "@context": "https://schema.org/",
            "@type": this.type,
            "@id": this.id,
        };
        this._header.forEach((key, index) => {
            if (this[key] && key !== "id" && key !== "type") {
                json[key] = this[key];
            }
        });
        return json;
    }
}
