/** @type {import('eslint').Linter.Config} */
module.exports = {
    root: true,
    extends: ["eslint:recommended", "plugin:@typescript-eslint/recommended", "prettier"],
    plugins: ["simple-import-sort"],
    env: {
        es6: true,
        node: true,
        jest: true,
    },
    rules: {
        "@typescript-eslint/explicit-function-return-type": "off",
        "@typescript-eslint/no-empty-function": "off",
        "@typescript-eslint/no-use-before-define": "off",
        "@typescript-eslint/no-explicit-any": "off",
        "no-console": "off",
        "no-empty": ["error", { allowEmptyCatch: true }],
        "simple-import-sort/imports": "warn",
        "simple-import-sort/exports": "warn",
        "sort-imports": "off",
    },
    overrides: [
        {
            files: "*.js",
            rules: {
                "simple-import-sort/imports": "off",
                "simple-import-sort/exports": "off",
            },
        },
    ],
};
