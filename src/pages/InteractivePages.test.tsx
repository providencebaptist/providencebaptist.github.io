import { describe, it, afterEach, beforeEach, mock } from "node:test";
import assert from "node:assert";
import { screen, fireEvent, cleanup, act, waitFor } from "@testing-library/react";
import { renderWithProviders } from "../test-utils";
import Contact from "./Contact";
import Livestream from "./Livestream";

describe("Interactive Pages", () => {

    beforeEach(() => {
        cleanup();
    });

    afterEach(() => {
        cleanup();
        mock.reset();
    });

    it("renders Contact form", async () => {
        await act(async () => {
            renderWithProviders(<Contact />);
        });

        assert.ok(screen.getAllByText(/Contact/i).length > 0);
        assert.ok(screen.getByLabelText(/First Name/i));
        assert.ok(screen.getByLabelText(/Last Name/i));
        assert.ok(screen.getByLabelText(/Email/i));
        assert.ok(screen.getByLabelText(/Message/i));

        // Find send button
        assert.ok(screen.getByText(/Send Message/i));
    });

    it("renders Livestream page and interactions", async () => {
        await act(async () => {
            renderWithProviders(<Livestream />);
        });

        assert.ok(screen.getAllByText(/Livestream/i).length > 0); // Might be in SEO title only if not on page text?
        // Page text says "Watch Live"
        assert.ok(screen.getAllByText(/Watch Live/i).length > 0);

        // Find "Watch Live Now" button and click it to open modal
        const watchButton = screen.getByText("Watch Live Now");
        assert.ok(watchButton);

        await act(async () => {
            fireEvent.click(watchButton);
        });

        // Check if Iframe dialog appears
        // The dialog title is "Live Stream"
        // Use findBy because Dialog animation/state might be async
        const dialogTitle = await screen.findByText("Live Stream");
        assert.ok(dialogTitle);

        // Clean up by closing (optional for test but good practice)
        // Usually clicking outside or pressing escape.
    });
});
