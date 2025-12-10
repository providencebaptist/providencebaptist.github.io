import { describe, it } from "node:test";
import assert from "node:assert";
import { renderHook } from "@testing-library/react";
import { useIsMobile } from "./use-mobile";

describe("useIsMobile", () => {
    it("should return false when width is greater than 768", () => {
        // Default mock setup
        Object.defineProperty(window, 'innerWidth', { writable: true, configurable: true, value: 1024 });

        // matchMedia mock for desktop
        window.matchMedia = (query) => ({
            matches: false,
            media: query,
            onchange: null,
            addListener: () => { },
            removeListener: () => { },
            addEventListener: () => { },
            removeEventListener: () => { },
            dispatchEvent: () => true,
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } as any);

        const { result } = renderHook(() => useIsMobile());
        assert.strictEqual(result.current, false);
    });

    it("should return true when width is less than 768", () => {
        Object.defineProperty(window, 'innerWidth', { writable: true, configurable: true, value: 500 });

        // matchMedia mock for mobile
        window.matchMedia = (query) => ({
            matches: true,
            media: query,
            onchange: null,
            addListener: () => { },
            removeListener: () => { },
            addEventListener: () => { },
            removeEventListener: () => { },
            dispatchEvent: () => true,
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } as any);

        const { result } = renderHook(() => useIsMobile());
        assert.strictEqual(result.current, true);
    });
});
