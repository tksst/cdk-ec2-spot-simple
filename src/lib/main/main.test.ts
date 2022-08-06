import { main } from "./main.js";

describe("main()", () => {
    it("print message", () => {
        let consoleMessage: unknown;

        const log = jest.spyOn(console, "log").mockImplementation((message: unknown) => {
            consoleMessage = message;
        });
        main();
        expect(consoleMessage).toBe("This is a template for Node.js CLI or Library project in TypeScript.");
        log.mockRestore();
    });
});
