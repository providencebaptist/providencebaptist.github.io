
import { describe, it, afterEach, mock } from "node:test";
import assert from "node:assert";
import React from "react";
import { render, cleanup, screen } from "@testing-library/react";
import { ChartContainer, ChartTooltipContent, ChartLegendContent } from "./chart";

// Polyfill ResizeObserver
if (!global.ResizeObserver) {
    global.ResizeObserver = class ResizeObserver {
        observe() { }
        unobserve() { }
        disconnect() { }
    };
}

// Mock GetBoundingClientRect and client dimensions for Recharts
Object.defineProperties(HTMLElement.prototype, {
    getBoundingClientRect: {
        get: () => () => ({
            width: 500,
            height: 500,
            top: 0,
            left: 0,
            bottom: 500,
            right: 500,
        }),
    },
    clientWidth: {
        get: () => 500,
    },
    clientHeight: {
        get: () => 500,
    },
    offsetWidth: {
        get: () => 500,
    },
    offsetHeight: {
        get: () => 500,
    },
    offsetParent: {
        get: () => document.body,
    },
});

// Since we cannot easily mock 'recharts' with mock.module in this environment (likely due to node:test limitations or loading issues),
// We will test the functionality of our wrapper components mostly, and accept that actual Recharts rendering might be stubbed or partial.
// Luckily, our components (ChartContainer, etc.) mostly just render standard DOM or context providers, 
// and Recharts uses ResizeObserver which we polyfilled.

const chartConfig = {
    desktop: {
        label: "Desktop",
        color: "#2563eb",
    },
    mobile: {
        label: "Mobile",
        color: "#60a5fa",
    },
};

describe("Chart Component", () => {
    afterEach(() => {
        cleanup();
        mock.reset();
    });

    it("renders ChartContainer with config", () => {
        const { container } = render(
            <ChartContainer config={chartConfig} className="min-h-[200px] w-full">
                <div data-testid="chart-content">Chart Content</div>
            </ChartContainer>
        );

        // Check if style tag is injected (ChartStyle)
        const styleTags = container.querySelectorAll("style");
        assert.ok(styleTags.length > 0);
        assert.ok(styleTags[0].innerHTML.includes("--color-desktop"));

        // Content
        assert.ok(screen.getByTestId("chart-content"));
    });

    it("renders ChartTooltipContent", () => {
        render(
            <ChartContainer config={chartConfig}>
                <ChartTooltipContent
                    active={true}
                    payload={[{ name: "desktop", value: 100, color: "#2563eb", dataKey: "desktop", payload: { fill: "#2563eb" } }] as any}
                />
            </ChartContainer>
        );
        // "Desktop" comes from config label for "desktop" key.
        assert.ok(screen.getAllByText("Desktop").length >= 1);
        assert.ok(screen.getByText("100"));
    });

    it("renders ChartLegendContent", () => {
        render(
            <ChartContainer config={chartConfig}>
                <ChartLegendContent payload={[{ value: "desktop", color: "#2563eb", id: "desktop", type: "square" }]} />
            </ChartContainer>
        );
        assert.ok(screen.getByText("Desktop"));
    });
});
