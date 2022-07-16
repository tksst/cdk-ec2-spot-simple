/** @type {import('@jest/types/build/Config').InitialOptions} */
module.exports = {
    preset: "ts-jest",
    testMatch: ["<rootDir>/src/**/*.test.ts"],
    collectCoverage: true,
    errorOnDeprecated: true,
    resetMocks: true,
    moduleNameMapper: {
        "^(\\.{1,2}/.*)\\.js$": "$1",
    },
};
