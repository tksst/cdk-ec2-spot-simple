/* eslint import/no-extraneous-dependencies: 0 */

import { binOptions } from "@tksst/typescript-starter-configs/tsup-config.mjs";
import { defineConfig } from "tsup";

export default defineConfig({
    ...binOptions,
    entry: ["src/bin/index.ts"],
});
