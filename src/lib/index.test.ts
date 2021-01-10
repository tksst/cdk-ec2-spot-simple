import { main } from ".";

describe("main()", () => {
    it("print message", () => {
        const log = jest.spyOn(console, "log").mockReturnValue();
        main();
        expect(log).nthCalledWith(1, "This is a template for Node.js CLI or Library project in TypeScript.");
        log.mockRestore();
    });
});
