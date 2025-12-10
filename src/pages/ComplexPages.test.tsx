import { describe, it } from "node:test";
import assert from "node:assert";
import { screen } from "@testing-library/react";
import { renderWithProviders } from "../test-utils";
import { Routes, Route } from "react-router-dom";
import Contact from "./Contact";
import Sermons from "./Sermons";
import Livestream from "./Livestream";
import SermonDetail from "./SermonDetail";

describe("Complex Pages", () => {
    it("renders Contact form", async () => {
        renderWithProviders(<Contact />);
        assert.ok(screen.getAllByText(/Contact/i).length > 0);
        // Check for some form elements
        assert.ok(screen.getByLabelText(/First Name/i));
    });

    it("renders Sermons page", async () => {
        renderWithProviders(<Sermons />);
        assert.ok(screen.getAllByText(/Sermons/i).length > 0);
    });

    it("renders Livestream page", () => {
        renderWithProviders(<Livestream />);
        assert.ok(screen.getAllByText(/Livestream/i).length > 0);
    });

    it("renders SermonDetail page", () => {
        renderWithProviders(
            <Routes>
                <Route path="/sermons/:id" element={<SermonDetail />} />
            </Routes>,
            { route: '/sermons/123' }
        );
        // It might fetch data. Verify it renders the structure or loading state.
        // It usually renders a "Back to Sermons" link or similar.
        assert.ok(screen.getAllByText(/Sermons/i).length > 0);
    });
});
