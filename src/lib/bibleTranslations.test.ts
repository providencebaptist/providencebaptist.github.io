import { describe, it } from "node:test";
import assert from "node:assert";
import { translateScripture } from "./bibleTranslations";

describe("translateScripture", () => {
    it("should return empty string for empty input", () => {
        assert.strictEqual(translateScripture(""), "");
    });

    it("should translate single book name", () => {
        assert.strictEqual(translateScripture("Juan 3:16"), "John 3:16");
    });

    it("should translate multiple book names", () => {
        assert.strictEqual(translateScripture("Lucas y Juan"), "Luke y John");
    });

    it("should not translate partial matches", () => {
        // e.g. "Juan" is in "Juanita" (if that was a book, but just testing boundary)
        // "Lucas" -> "Luke". "Lucasas" should stay "Lucasas".
        assert.strictEqual(translateScripture("Lucasas"), "Lucasas");
    });

    it("should handle books with numbers", () => {
        assert.strictEqual(translateScripture("1 Juan 1:1"), "1 John 1:1");
        assert.strictEqual(translateScripture("1 Reyes"), "1 Kings");
    });

    it("should keep original text if no match", () => {
        assert.strictEqual(translateScripture("Random Text"), "Random Text");
    });

    it("should translate all known books", () => {
        // Spot check a few
        assert.strictEqual(translateScripture("Génesis"), "Genesis");
        assert.strictEqual(translateScripture("Apocalipsis"), "Revelation");
        assert.strictEqual(translateScripture("Hechos"), "Acts");
        assert.strictEqual(translateScripture("Cantares"), "Song of Solomon");
    });

    it("should handle punctuation correctly", () => {
        assert.strictEqual(translateScripture("Juan, Lucas."), "John, Luke.");
    });
});
