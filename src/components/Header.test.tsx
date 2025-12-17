import { describe, it, afterEach, mock } from "node:test";
import assert from "node:assert";
import { render, screen, fireEvent, cleanup } from "@testing-library/react";
import { Header } from "./Header";

// Mock matchMedia for mobile check
const mockMatchMedia = (matches: boolean) => (query: string) => ({
    matches,
    media: query,
    onchange: null,
    addListener: () => { },
    removeListener: () => { },
    addEventListener: () => { },
    removeEventListener: () => { },
    dispatchEvent: () => true,
});

describe("Header", () => {
    afterEach(cleanup);

    it("renders Desktop Navigation and CTA", () => {
        // Mock desktop size
        window.matchMedia = mockMatchMedia(false);

        render(<Header />);

        // Logo
        assert.ok(screen.getByText("Providence"));
        assert.ok(screen.getByText("Baptist Church"));

        // Nav Links
        assert.ok(screen.getByText("Home"));
        assert.ok(screen.getByText("Services"));

        // CTA (visible on desktop)
        const ctaButtons = screen.getAllByText("Plan Your Visit");
        assert.ok(ctaButtons.length >= 1);
    });

    it("opens mobile menu on toggle", async () => {
        render(<Header />);

        const toggleBtn = screen.getByLabelText("Toggle menu");

        // Initially 1 (Desktop)
        assert.strictEqual(screen.getAllByText("Plan Your Visit").length, 1);

        // Open
        fireEvent.click(toggleBtn);
        assert.strictEqual(screen.getAllByText("Plan Your Visit").length, 2);

        // Close via toggle
        fireEvent.click(toggleBtn);
        assert.strictEqual(screen.getAllByText("Plan Your Visit").length, 1);
    });
});
