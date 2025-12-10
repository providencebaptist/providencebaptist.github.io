import { describe, it } from "node:test";
import assert from "node:assert";
import { cn } from "./utils";

describe("cn", () => {
    it("should merge classes", () => {
        assert.strictEqual(cn("c1", "c2"), "c1 c2");
    });

    it("should handle conditional classes", () => {
        const trueCondition = true;
        const falseCondition = false;
        assert.strictEqual(cn("c1", trueCondition && "c2", falseCondition && "c3"), "c1 c2");
    });

    it("should merge tailwind classes correctly", () => {
        // p-4 should override p-2
        // But tailwind-merge logic depends on the library.
        // Usually "p-2 p-4" -> "p-4"
        assert.strictEqual(cn("p-2", "p-4"), "p-4");
    });

    it("should handle arrays of classes", () => {
        assert.strictEqual(cn(["c1", "c2"]), "c1 c2");
    });

    it("should handle objects", () => {
        assert.strictEqual(cn({ c1: true, c2: false }), "c1");
    });

    it("should handle empty inputs", () => {
        assert.strictEqual(cn(), "");
    });
});
