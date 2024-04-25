function test(title, callback) {
    console.log(`${title}`);
    callback();
    logTest("done", new Date());
}

function expect(toBeExpected, actual) {
    return {
        toBe(expected) {
            if (actual === expected) {
                logTest(toBeExpected, "Pass");
            } else {
                errorTest(
                    toBeExpected,
                    `Fail: Expected ${JSON.stringify(
                        expected
                    )}, but received ${JSON.stringify(actual)}`
                );
            }
        },
        toBeString() {
            if (typeof actual === "string") {
                logTest(toBeExpected, "Pass");
            } else {
                errorTest(
                    toBeExpected,
                    `Fail: Expected string, but received ${typeof actual}`
                );
            }
        },
        toBeNumber() {
            if (typeof actual === "number") {
                logTest(toBeExpected, "Pass");
            } else {
                errorTest(
                    toBeExpected,
                    `Fail: Expected number, but received ${typeof actual}`
                );
            }
        },
        toBeBoolean() {
            if (typeof actual === "boolean") {
                logTest(toBeExpected, "Pass");
            } else {
                errorTest(
                    toBeExpected,
                    `Fail: Expected boolean, but received ${typeof actual}`
                );
            }
        },
        toBeObject() {
            if (typeof actual === "object") {
                logTest(toBeExpected, "Pass");
            } else {
                errorTest(
                    toBeExpected,
                    `Fail: Expected object, but received ${typeof actual}`
                );
            }
        },
        toBeArray() {
            if (Array.isArray(actual)) {
                logTest(toBeExpected, "Pass");
            } else {
                errorTest(
                    toBeExpected,
                    `Fail: Expected array, but received ${typeof actual}`
                );
            }
        },
        toEqual(expected) {
            if (JSON.stringify(actual) === JSON.stringify(expected)) {
                logTest(toBeExpected, "Pass");
            } else {
                errorTest(
                    toBeExpected,
                    `Fail: Expected ${JSON.stringify(
                        expected
                    )}, but received ${JSON.stringify(actual)}`
                );
            }
        },
        toThrow() {
            let error = false;
            try {
                actual();
            } catch (e) {
                error = true;
            }
            if (error) {
                logTest(toBeExpected, "Pass");
            } else {
                errorTest(
                    toBeExpected,
                    "Fail: Expected function to throw an error"
                );
            }
        },
    };
}

function mockRequest(path = "", parameter = undefined) {
    let queryString = "";
    if (parameter) {
        queryString = Object.entries(parameter).reduce((acc, [key, value]) => {
            if (acc.length > 0) {
                acc += "&";
            }
            acc += `${key}=${value}`;
            return acc;
        }, "");
    }
    return {
        queryString,
        parameter,
        pathInfo: path,
    };
}
