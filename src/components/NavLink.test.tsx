import { describe, it } from "node:test";
import assert from "node:assert";
import { render, screen } from "@testing-library/react";
import { NavLink } from "./NavLink";
import { BrowserRouter, MemoryRouter } from "react-router-dom";

describe("NavLink", () => {
    it("renders with default classes", () => {
        render(
            <BrowserRouter>
                <NavLink to="/test" className="default-class">Test Link</NavLink>
            </BrowserRouter>
        );
        const link = screen.getByText("Test Link");
        assert.ok(link.className.includes("default-class"));
    });

    it("applies active class when active", () => {
        render(
            <MemoryRouter initialEntries={["/active"]}>
                <NavLink to="/active" activeClassName="active-class" className="default-class">Active Link</NavLink>
            </MemoryRouter>
        );
        const link = screen.getByText("Active Link");
        assert.ok(link.className.includes("active-class"));
        assert.ok(link.className.includes("default-class"));
    });

    it("does not apply active class when inactive", () => {
        render(
            <MemoryRouter initialEntries={["/other"]}>
                <NavLink to="/active" activeClassName="active-class" className="default-class">Inactive Link</NavLink>
            </MemoryRouter>
        );
        const link = screen.getByText("Inactive Link");
        assert.ok(!link.className.includes("active-class"));
        assert.ok(link.className.includes("default-class"));
    });
});
