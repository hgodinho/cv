function logTest(title, message) {
    console.log(`${title}: ${message}`);
}

function errorTest(title, expected, received = undefined) {
    console.error(`Failed: ${title}`);
    console.error("Expected:", expected);
    console.error("Received:", received);
}

function test(title, callback) {
    const time = new Date();
    console.log(`${title}`);
    callback();
    const elapsed = new Date() - time;
    if (elapsed > 360000) {
        errorTest(
            "done",
            `${elapsed}ms (${elapsed / 1000}s${
                elapsed > 60000 ? ` ${elapsed / 60000}m` : ""
            }) elapsed`
        );
        return;
    }

    logTest(
        "done",
        `${elapsed}ms (${elapsed / 1000}s${
            elapsed > 60000 ? ` ${elapsed / 60000}m` : ""
        }) elapsed`
    );
}

function expect(toBeExpected, actual) {
    return {
        toBe(expected) {
            if (JSON.stringify(actual) === JSON.stringify(expected)) {
                return logTest(toBeExpected, "Pass");
            }
            return errorTest(toBeExpected, expected, actual);
        },
        toBeString() {
            if (typeof actual === "string") {
                return logTest(toBeExpected, "Pass");
            }
            return errorTest(toBeExpected, "string", typeof actual);
        },
        toBeNumber() {
            if (typeof actual === "number") {
                return logTest(toBeExpected, "Pass");
            }
            return errorTest(toBeExpected, "number", typeof actual);
        },
        toBeBoolean() {
            if (typeof actual === "boolean") {
                return logTest(toBeExpected, "Pass");
            }
            return errorTest(toBeExpected, "boolean", typeof actual);
        },
        toBeTruthy() {
            if (actual) {
                return logTest(toBeExpected, "Pass");
            }
            return errorTest(toBeExpected, "Truthy", actual);
        },
        toBeFalsy() {
            if (!actual) {
                return logTest(toBeExpected, "Pass");
            }
            return errorTest(toBeExpected, "Falsy", actual);
        },
        toInclude(expected) {
            if (actual.includes(expected)) {
                return logTest(toBeExpected, "Pass");
            }
            return errorTest(toBeExpected, expected, actual);
        },
        toBeObject() {
            if (typeof actual === "object") {
                return logTest(toBeExpected, "Pass");
            }
            return errorTest(toBeExpected, "object", typeof actual);
        },
        toBeArray(of = undefined) {
            if (Array.isArray(actual)) {
                if (typeof of === "undefined") {
                    logTest(toBeExpected, "Pass");
                } else {
                    // verify if the itens of the array is 'of' specific type
                    actual.map((item, i) => {
                        if (typeof item === of) {
                            logTest(toBeExpected, `type of=${of} Pass`);
                        } else {
                            errorTest(
                                toBeExpected,
                                `type of actual[${i}] doesn't match type '${of}'`
                            );
                        }
                    });
                }
            } else {
                errorTest(
                    toBeExpected,
                    `Fail: Expected array, but received ${typeof actual}`
                );
            }
        },
        toEqual(expected) {
            if (JSON.stringify(actual) === JSON.stringify(expected)) {
                return logTest(toBeExpected, "Pass");
            }
            return errorTest(
                toBeExpected,
                `Fail: Expected ${JSON.stringify(
                    expected
                )}, but received ${JSON.stringify(actual)}`
            );
        },
        toThrow() {
            let error = false;
            try {
                actual();
            } catch (e) {
                error = true;
            }
            if (error) {
                return logTest(toBeExpected, "Pass");
            }
            return errorTest(
                toBeExpected,
                "Fail: Expected function to throw an error"
            );
        },
    };
}

function mockRequest(path = "", options = undefined) {
    let queryString = "";
    let parameter = {};
    let parameters = {};

    if (options) {
        const params = Object.entries(options).map(([key, value]) => {
            // parameters
            parameters[key] = Array.isArray(value) ? value : [value];

            // parameter
            parameter[key] = Array.isArray(value) ? value[0] : value;

            return `${key}=${
                Array.isArray(value)
                    ? JSON.stringify(value.join(","))
                    : JSON.stringify(value)
            }`;
        });
        queryString = params.join("&");
    }
    return {
        queryString,
        parameter,
        parameters,
        pathInfo: path,
    };
}
