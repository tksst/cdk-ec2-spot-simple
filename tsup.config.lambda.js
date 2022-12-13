/* eslint import/no-extraneous-dependencies: 0 */

import { binOptions } from "@tksst/typescript-starter-configs/tsup-config.mjs";
import { defineConfig } from "tsup";

export default defineConfig({
    ...binOptions,
    outDir: "dist/lib/lambda/",
    format: ["cjs"],
    entry: ["src/lib/lambda/index.ts"],
});
