class Entity {
    constructor({ header, values, endpoints, i18n, recursive = true }) {
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
        if (!endpoints) throw new Error("Entity requires endpoints");
        if (!i18n)
            throw new Error("Entity requires an instantiated I18n class");

        this.i18n = i18n;
        this._header = header;
        this._values = values;
        this._endpoints = endpoints;
        this.recursive = recursive;

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
     */
    parseString(str) {
        // return early if the string is URL
        if (str.startsWith("http")) {
            return str;
        }

        const operators = ["=", "/", "|", ["#", "-"]];

        if (
            !operators.some((op) => {
                if (Array.isArray(op)) {
                    return op.every((subOp) => str.includes(subOp));
                }
                return str.includes(op);
            })
        ) {
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
            str.includes("#") &&
            str.includes("-") &&
            !str.includes(";") &&
            !str.includes("|")
        ) {
            // this is a single id
            data = str.trim();
        } else if (
            str.includes("|") &&
            str.includes("#") &&
            str.includes("-") &&
            !str.includes(";")
        ) {
            // this is probably list of ids
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
            if (this.getRecursive()) {
                const entity = this.i18n.getEntityById(
                    this.getTypeById(data),
                    data,
                    false
                );
                return entity["@id"];
            }
            return data;
        } else if (Array.isArray(data)) {
            return data.map((item) => {
                if (typeof item === "string") {
                    if (this.getRecursive()) {
                        const entity = this.i18n.getEntityById(
                            this.getTypeById(item),
                            item,
                            false
                        );
                        return entity["@id"];
                    }
                    return item;
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

    setProperty(key, value) {
        this[key] = value;
    }

    setI18n(i18n) {
        this.i18n = i18n;
    }

    getTypeById(id) {
        const idType = this._endpoints.find(([name, slug]) => {
            return id.includes(slug);
        });
        if (!idType) return false;
        return idType[0];
    }

    getRecursive() {
        return this.recursive;
    }
}
