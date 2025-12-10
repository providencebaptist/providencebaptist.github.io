import { describe, it } from "node:test";
import assert from "node:assert";
import { render, screen, waitFor } from "@testing-library/react";
import { renderWithProviders } from "../test-utils";
import BreadcrumbSchema from "./BreadcrumbSchema";

describe("BreadcrumbSchema", () => {
    it("renders JSON-LD script", async () => {
        // Need to render within Router context (provided by renderWithProviders)
        // and ideally check the head or body for script tag.
        // HelmetAsync renders to head. JSDOM supports it.

        renderWithProviders(<BreadcrumbSchema />, { route: '/about' });

        // Wait for Helmet to update
        // We can check if script exists.
        // screen.debug(); 

        // Searching for script tags in JSDOM:
        await waitFor(() => {
            const scripts = document.querySelectorAll('script[type="application/ld+json"]');
            assert.ok(scripts.length > 0, "Should find JSON-LD script");

            const script = scripts[0];
            const content = JSON.parse(script.textContent || "{}");
            assert.strictEqual(content["@type"], "BreadcrumbList");
        });

        // At /about, breadcrumb should have Home > About PBC
        // Depending on BreadcrumbSchema logic.
    });
});

