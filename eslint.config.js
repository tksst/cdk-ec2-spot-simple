const { preset } = require("@tksst/eslint-config");

module.exports = [
    ...preset.typeScript({ jsIsCjs: true }),
    {
        languageOptions: {
            parserOptions: {
                project: "./tsconfig.lint-and-lambda.json",
            },
        },
        rules: {
            "no-new": "off",
        },
    },
];
