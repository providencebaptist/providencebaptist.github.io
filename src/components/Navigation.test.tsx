import { describe, it } from "node:test";
import assert from "node:assert";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { renderWithProviders } from "../test-utils";
import Navigation from "./Navigation";

// Navigation often uses useIsMobile and interactions.
// We should test desktop and mobile view.

describe("Navigation", () => {
    it("renders Desktop Navigation", async () => {
        // Desktop view
        window.matchMedia = (query) => ({
            matches: false,
            media: query,
            onchange: null,
            addListener: () => { },
            removeListener: () => { },
            addEventListener: () => { },
            removeEventListener: () => { },
            dispatchEvent: () => { },
        });

        renderWithProviders(<Navigation />);
        assert.ok(screen.getByText("Providence Baptist Church"));

        // Check for visible triggers
        // Note: "Home" link is the logo/text, not a separate word "Home" in desktop usually? 
        // Checking NavLink to "/".
        // The triggers:
        assert.ok(screen.getAllByText("About").length > 0); // "About" trigger
        assert.ok(screen.getAllByText("Connect").length > 0); // "Connect" trigger
        assert.ok(screen.getAllByText("Sermons").length > 0); // "Sermons" trigger
        assert.ok(screen.getByText("Give"));
        assert.ok(screen.getByText("Watch Live"));
    });

    it("renders Mobile Navigation Trigger", async () => {
        // Mobile view
        Object.defineProperty(window, 'innerWidth', { writable: true, configurable: true, value: 500 });
        window.dispatchEvent(new Event('resize'));

        window.matchMedia = (query) => ({
            matches: true,
            media: query,
            onchange: null,
            addListener: () => { },
            removeListener: () => { },
            addEventListener: () => { },
            removeEventListener: () => { },
            dispatchEvent: () => { },
        });

        renderWithProviders(<Navigation />);

        // Wait for any effects
        await new Promise(r => setTimeout(r, 100));

        const hamburger = await screen.findByTestId("mobile-menu-trigger");
        assert.ok(hamburger);

        await act(async () => {
            fireEvent.click(hamburger);
        });

        // Now mobile menu should be open
        // Check for links that appear in mobile menu
        const aboutLink = await screen.findByText("About", {}, { timeout: 2000 });
        assert.ok(aboutLink);

        // Check for specific mobile menu items that might be rendered
        // The component renders "About" as a section header.
        assert.ok(screen.getByText("Connect"));
        assert.ok(screen.getByText("Sermons"));
    });
});
