import { build } from "esbuild";

await build({
    logLevel: "info",
    entryPoints: ["./src/lambda/index.ts"],
    bundle: true,
    sourcemap: true,
    target: "node16",
    platform: "node",
    tsconfig: "tsconfig.lint-and-lambda.json",
    minify: true,
    outfile: "dist/lambda/index.js",
});
