/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
    preset: "ts-jest",
    testEnvironment: "node",
    extensionsToTreatAsEsm: [".ts"],
    moduleNameMapper: {
        "^@/(.*)$": "<rootDir>/src/$1",
        "^@test/(.*)$": "<rootDir>/test/$1",
    },
    transform: {
        "^.+\\.ts?$": [
            "ts-jest",
            {
                useESM: true,
            },
        ],
    },
};
