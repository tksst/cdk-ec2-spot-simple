/** @type {import('@jest/types/build/Config').InitialOptions} */
module.exports = {
    transform: {
        "^.+\\.tsx?$": [
            "esbuild-jest",
            {
                sourcemap: true,
                target: "node14",
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
