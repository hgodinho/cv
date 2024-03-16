function parseDate(date) {
    return Utilities.formatDate(new Date(date), "GMT", "yyyy-MM-dd");
}

function test(title, callback) {
    console.log(`${title}`);
    callback();
    console.log("done", new Date());
}

function expect(actual) {
    return {
        toBe(expected) {
            if (actual === expected) {
                console.log("Pass");
            } else {
                console.log(
                    `Fail: Expected ${JSON.stringify(
                        expected
                    )}, but received ${JSON.stringify(actual)}`
                );
            }
        },
        toEqual(expected) {
            if (JSON.stringify(actual) === JSON.stringify(expected)) {
                console.log("Pass");
            } else {
                console.log(
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
                console.log("Pass");
            } else {
                console.log("Fail: Expected function to throw an error");
            }
        },
    };
}
