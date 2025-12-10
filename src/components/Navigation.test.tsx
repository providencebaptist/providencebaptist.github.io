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

        // Find hamburger. It has <Menu /> icon. 
        // We can find by role button.
        // It's the button with className lg:hidden.
        // Or better, it's the button that is visible. 
        // Since we are mocking matchMedia, checking visibility might be tricky in jsdom without real layout.
        // But we can check for the button.
        // The button contains <Menu /> or <X />.
        // Let's assume there is at least one button.

        const buttons = screen.getAllByRole("button");
        const hamburger = buttons.find(b => b.querySelector('svg'));

        if (hamburger) {
            fireEvent.click(hamburger);
            // Now mobile menu should be open
            // Check for links that appear in mobile menu
            assert.ok(await screen.findByText("About PBC"));
            assert.ok(await screen.findByText("History"));
        } else {
            throw new Error("Hamburger menu not found");
        }
    });
});
