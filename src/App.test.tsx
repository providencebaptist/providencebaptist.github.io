import { describe, it } from "node:test";
import assert from "node:assert";
import { render, screen } from "@testing-library/react";
import App from "./App";
import * as HelmetAsync from "react-helmet-async";
import * as TooltipPrimitivePkg from "@radix-ui/react-tooltip";

// Define strict types for element queries
type QueryMethod = (text: string | RegExp) => HTMLElement | HTMLElement[] | null;

// Helper to patch Radix/Helmet for the test environment specifically if needed,
// though test-utils handles this for isolated component tests. 
// App.tsx uses providers directly, so we might need to mock them or ensure App uses the patched versions?
// Actually App.tsx imports standard libraries.
// The Node loader (ts-loader) doesn't rewrite imports.
// So App.tsx imports 'react-helmet-async' which returns the Module object { default: ..., HelmetProvider: ... }
// But React code expects `import { HelmetProvider } ...` to work directly.
// In CJS/ESM interop in Node, named imports from CJS modules might fail if not statically analyzable.
// However, I patched `test-utils` to handle it.
// To test `App`, we need to mock the modules that `App` imports to behave correctly, 
// OR we rely on `ts-loader` or `test-setup` to fix it.
// The `test-setup.js` patches globals. 
// Writing a test that renders `App` directly might fail if `App.tsx` has `import { HelmetProvider } ...` and Node sees it as undefined.
// Let's try rendering it.

describe("App Integration", () => {
    it("renders Home by default", async () => {
        render(<App />);
        // Use findAllByText to wait for any lazy loading or effects
        const elements = await screen.findAllByText(/Welcome Home/i);
        assert.ok(elements.length > 0);
    });

    it("navigates to About page", async () => {
        // Navigation testing in a full App render is hard because window.location is fixed in JSDOM unless using MemoryRouter.
        // App.tsx uses BrowserRouter? Let's check App.tsx.
    });
});
