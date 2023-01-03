/* eslint import/no-extraneous-dependencies: 0 */

import { binOptions } from "@tksst/typescript-starter-configs/tsup-config.mjs";
import { defineConfig } from "tsup";

export default defineConfig({
    ...binOptions,
    outDir: "dist/lambda/",
    format: ["cjs"],
    entry: ["src/lambda/index.ts"],
});
