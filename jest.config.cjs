/** @type {import("@jest/types").Config.InitialOptions} */
module.exports = {
    transform: {
        "^.+\\.tsx?$": [
            "@swc/jest",
            {
                jsc: {
                    target: "es2020",
                },
            },
        ],
    },
    testMatch: ["<rootDir>/src/**/*.test.ts"],
    collectCoverage: true,
    errorOnDeprecated: true,
    resetMocks: true,
    moduleNameMapper: {
        "^(\\.{1,2}/.*)\\.js$": "$1",
    },
};
