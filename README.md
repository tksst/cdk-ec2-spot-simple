# typescript-starter-template

A template project for javascript library (for browsers or Node.js) and/or executable for Node.js.

## npm scripts

### `npm run lint`

- Static analysis of code with [ESLint](https://eslint.org/)
- Code format checking with [Prettier](https://prettier.io)
- Type checking of TypeScript with [tsc](https://www.typescriptlang.org/docs/handbook/compiler-options.html)

### `npm run fix`

(if modifiable) Code fixes by ESLint and Prettier

### `npm run build`

- Build library entry points for both ESM and CJS by [tsup](https://tsup.egoist.sh/)
- Build an executable that runs in ESM mode by tsup

### `npm run watch`

Watching mode of `build`

### `npm test`

Testing by [Jest](https://jestjs.io/)

## Note on testing with Jest

Currently, ESM support in Jest is experimental. Therefore, for this project, Jest is set up in the traditional CJS mode. However, this does not allow us to use external ESM libraries. To run Jest in ESM mode, do the following:

### 1. Enable VM Module

Execute node with --experimental-vm-modules on testing by jest.
On package.json npm scripts:

```json
"test:unit": "NODE_OPTIONS=--experimental-vm-modules npx jest"
```

If you run it on windows, you can use [cross-env](https://github.com/kentcdodds/cross-env):

```json
"test:unit": "cross-env NODE_OPTIONS=--experimental-vm-modules npx jest"
```

### 2. Modify jest.config.cjs

Tell Jest to run the `.ts` file as an ESM.

Modify jest.config.cjs like this:

```javascript
module.exports = {
  ...require("@tksst/typescript-starter/jest.config.cjs"),
  extensionsToTreatAsEsm: [".ts"]
};
```

Note that it seems that @swc/jest automatically detects the ESM mode and changes the output format.

## Note about ts-node or something

This template does not mention [ts-node](https://typestrong.org/ts-node/), [esbuild-register](https://github.com/egoist/esbuild-register), [tsx](https://github.com/esbuild-kit/tsx) or other similar software.

The current versions of them do not act in the same way as the official TypeScript compiler.

ts-node and esbuild-register have a different import resolution mechanism from the tsc and will not run if you use `.js` extension in the import statement.

tsx is somewhat better than these, but I saw that it does not work well when importing CommonJs from ESM.

## License

These codes are licensed under CC0.

[![CC0](http://i.creativecommons.org/p/zero/1.0/88x31.png "CC0")](https://creativecommons.org/publicdomain/zero/1.0/deed)
