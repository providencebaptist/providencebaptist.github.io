import { describe, it, afterEach } from "node:test";
import assert from "node:assert";
import { render, screen, fireEvent, waitFor, act, cleanup } from "@testing-library/react";
import { renderWithProviders } from "../test-utils";
import Navigation from "./Navigation";

// Mock dispatchEvent return type
const mockDispatchEvent = () => true;

// Navigation often uses useIsMobile and interactions.
// We should test desktop and mobile view.

describe("Navigation", () => {
    afterEach(() => {
        cleanup();
    });

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
            dispatchEvent: mockDispatchEvent,
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

    // Note: Mobile navigation and scroll tests are currently disabled due to JSDOM environment issues with matchMedia/resize and scroll events.
    // They should be tested in E2E tests.
});
