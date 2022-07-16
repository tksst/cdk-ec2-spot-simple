/**
 * These codes are licensed under CC0.
 * http://creativecommons.org/publicdomain/zero/1.0/deed.ja
 */

// This file is derived from
// https://github.com/matzkoh/typescript-npm-starter
// That says it is licensed under MIT.

import { describe, expect, it, jest } from "@jest/globals";

import { main } from "./main.js";

describe("main()", () => {
    it("print message", () => {
        const log = jest.spyOn(console, "log").mockReturnValue();
        main();
        expect(log).nthCalledWith(1, "This is a template for Node.js CLI or Library project in TypeScript.");
        log.mockRestore();
    });
});
