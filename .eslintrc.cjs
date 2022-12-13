/** @type {import('eslint').Linter.Config} */

module.exports = {
    root: true,
    env: {
        // Your project environment settings here.
        // See ESLint document of "Specifying Environments":
        // https://eslint.org/docs/user-guide/configuring/language-options#specifying-environments

        // example:
        es2022: true,
        node: true,
        jest: true,
    },
    parserOptions: {
        // Your project environment settings here.
        // See ESLint document of "Specifying Parser Options":
        // https://eslint.org/docs/latest/user-guide/configuring/language-options#specifying-parser-options

        // example:
        sourceType: "module",
        ecmaVersion: "latest",
    },
    extends: "@tksst",
    rules: {
        "no-new": "off",
    },
};
