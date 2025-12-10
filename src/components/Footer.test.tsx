import { describe, it } from "node:test";
import assert from "node:assert";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { Footer } from "./Footer";

// We can just use the exported component. 
// Note: importing via { Footer } works because it's a named export (line 5) 
// but it also has execute default export (line 82).

describe("Footer", () => {
    it("renders footer content", () => {
        render(
            <MemoryRouter>
                <Footer />
            </MemoryRouter>
        );

        assert.ok(screen.getByText("Providence Baptist Church"));
        assert.ok(screen.getByText(/Service Times/));
        assert.ok(screen.getByText(/Contact Us/));
    });
});
