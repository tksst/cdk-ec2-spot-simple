/** @type {import('eslint').Linter.Config} */

const commonRule = {
    "no-console": "off",
    "no-empty": ["error", { allowEmptyCatch: true }],
    "simple-import-sort/imports": "warn",
    "simple-import-sort/exports": "warn",
    "sort-imports": "off",
    "import/prefer-default-export": "off",
};

module.exports = {
    root: true,
    env: {
        es6: true,
        node: true,
        jest: true,
    },
    plugins: ["simple-import-sort"],
    overrides: [
        {
            files: "*.js",
            extends: ["eslint:recommended", "airbnb-base", "prettier"],
            rules: {
                ...commonRule,
            },
        },
        {
            files: "*.ts",
            extends: [
                "eslint:recommended",
                "plugin:@typescript-eslint/recommended",
                "airbnb-base",
                "airbnb-typescript/base",
                "prettier",
            ],
            parserOptions: {
                project: "./tsconfig.json",
            },
            rules: {
                "@typescript-eslint/explicit-function-return-type": "off",
                "@typescript-eslint/no-empty-function": "off",
                "@typescript-eslint/no-use-before-define": "off",
                "@typescript-eslint/no-explicit-any": "off",
                ...commonRule,
            },
        },
    ],
};
