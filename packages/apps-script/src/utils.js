/**
 * Get the access token
 */
function getToken() {
    console.log("access_token:", ScriptApp.getOAuthToken());
}

function parseDate(date) {
    return Utilities.formatDate(new Date(date), "GMT", "yyyy-MM-dd");
}

function logTest(title, message) {
    console.log(`${title}: ${message}`);
}

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
                logTest(
                    toBeExpected,
                    `Fail: Expected ${JSON.stringify(
                        expected
                    )}, but received ${JSON.stringify(actual)}`
                );
            }
        },
        toEqual(expected) {
            if (JSON.stringify(actual) === JSON.stringify(expected)) {
                logTest(toBeExpected, "Pass");
            } else {
                logTest(
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
                logTest(
                    toBeExpected,
                    "Fail: Expected function to throw an error"
                );
            }
        },
    };
}
