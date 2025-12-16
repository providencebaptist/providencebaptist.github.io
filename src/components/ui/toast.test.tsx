
import { describe, it, afterEach } from "node:test";
import assert from "node:assert";
import { render, screen, cleanup, act, fireEvent } from "@testing-library/react";
import { useToast, toast as toastFn } from "@/hooks/use-toast";
import { ToastProvider, ToastViewport, Toast, ToastTitle, ToastDescription, ToastClose, ToastAction } from "./toast";
import { Toaster } from "./toaster";
import React from "react";

// Helper component to use hook
const ToastTrigger = () => {
    const { toast } = useToast();
    return (
        <button onClick={() => toast({ title: "Test Toast", description: "Test Description" })}>
            Show Toast
        </button>
    );
};

// Helper to display toasts
const TestToastApp = () => {
    return (
        <ToastProvider>
            <ToastTrigger />
            <Toaster /> {/* Assuming Toaster uses useToast under hood to render */}
            {/* But Toaster implementation usually maps state. We should verify usages if possible, or build custom map */}
        </ToastProvider>
    );
};

// Custom Consumer since Toaster might be in another file
const CustomToaster = () => {
    const { toasts } = useToast();
    return (
        <>
            {toasts.map(t => (
                <Toast key={t.id} {...t} duration={Infinity}>
                    <div className="grid gap-1">
                        {t.title && <ToastTitle>{t.title}</ToastTitle>}
                        {t.description && <ToastDescription>{t.description}</ToastDescription>}
                    </div>
                </Toast>
            ))}
            <ToastViewport />
        </>
    )
}

describe("Toast Logic and Components", () => {
    afterEach(cleanup);

    it("renders Toast components", () => {
        render(
            <ToastProvider>
                <Toast duration={Infinity}>
                    <ToastTitle>Title</ToastTitle>
                    <ToastDescription>Description</ToastDescription>
                    <ToastAction altText="Action">Action</ToastAction>
                    <ToastClose />
                </Toast>
                <ToastViewport />
            </ToastProvider>
        );

        assert.ok(screen.getByText("Title"));
        assert.ok(screen.getByText("Description"));
        assert.ok(screen.getByText("Action"));
    });

    it("integrates with useToast hook", async () => {
        render(
            <ToastProvider>
                <ToastTrigger />
                <CustomToaster />
            </ToastProvider>
        );

        // Click trigger
        fireEvent.click(screen.getByText("Show Toast"));

        // Wait for toast to appear
        const toastTitle = await screen.findByText("Test Toast");
        assert.ok(toastTitle);
        assert.ok(screen.getByText("Test Description"));
    });
});
