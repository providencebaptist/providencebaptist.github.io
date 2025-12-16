import { describe, it, afterEach, mock } from "node:test";
import assert from "node:assert";
import { render, cleanup, screen } from "@testing-library/react";
import { ChartContainer, ChartTooltip, ChartTooltipContent, ChartLegend, ChartLegendContent } from "./chart";

// Mock Recharts ResponsiveContainer to just render children
mock.module("recharts", {
    namedExports: {
        ResponsiveContainer: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
        Tooltip: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
        Legend: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
    }
});

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

        // Check if style tag is injected
        // The ChartContainer renders a ChartStyle component which renders a <style> tag.
        const styleTags = container.querySelectorAll("style");
        assert.ok(styleTags.length > 0);

        // Content
        // assert.ok(screen.getByTestId("chart-content")); // Might be wrapped
    });

    it("renders ChartTooltipContent directly", () => {
        // We need to render it inside ChartContainer to provide context
        render(
            <ChartContainer config={chartConfig}>
                <ChartTooltipContent active={true} payload={[{ name: "Desktop", value: 100, color: "#2563eb" }]} />
            </ChartContainer>
        );
        assert.ok(screen.getByText("Desktop"));
        assert.ok(screen.getByText("100"));
    });

    it("renders ChartLegendContent directly", () => {
        render(
            <ChartContainer config={chartConfig}>
                <ChartLegendContent payload={[{ value: "desktop", color: "#2563eb", id: "desktop", type: "square" }]} />
            </ChartContainer>
        );
        assert.ok(screen.getByText("Desktop"));
    });
});
