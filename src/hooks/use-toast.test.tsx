import { describe, it, beforeEach, mock } from "node:test";
import assert from "node:assert";
import { renderHook, act } from "@testing-library/react";
import { useToast, toast, reducer } from "./use-toast";

mock.timers.enable({ apis: ['setTimeout'] });

// Reset state is tricky because it's module level memoryState.
// But we can dispatch REMOVE_TOAST with no id to clear it?
// Looking at reducer: REMOVE_TOAST with undefined toastId returns { toasts: [] }.
// So we can use that to clear state.

const clearState = () => {
    // Accessing dispatch via toast/useToast isn't direct for action type, but useToast returns dismiss which calls DISMISS_TOAST.
    // Wait, line 182: dismiss: (toastId?: string) => dispatch({ type: "DISMISS_TOAST", toastId }),
    // But we want REMOVE_TOAST to clear.
    // The reducer handles REMOVE_TOAST with undefined id (line 111).
    // But `useToast` doesn't expose a way to trigger REMOVE_TOAST directly without ID or via timeout.
    // However, `toast` uses `genId` which increments module-level `count`.
    // We can't easily reset `count` or `memoryState` without reloading the module.
    // But we can rely on `reducer` tests for logic and `useToast` tests assuming sequential IDs.
};

describe("useToast reducer", () => {
    it("should add toast", () => {
        const state = { toasts: [] };
        const action = { type: "ADD_TOAST" as const, toast: { id: "1", title: "test" } };
        const newState = reducer(state, action);
        assert.strictEqual(newState.toasts.length, 1);
        assert.strictEqual(newState.toasts[0].title, "test");
    });

    it("should limit toasts", () => {
        const state = { toasts: [{ id: "1" }] };
        const action = { type: "ADD_TOAST" as const, toast: { id: "2" } };
        const newState = reducer(state, action);
        // Limit is 1
        assert.strictEqual(newState.toasts.length, 1);
        assert.strictEqual(newState.toasts[0].id, "2");
    });

    it("should update toast", () => {
        const state = { toasts: [{ id: "1", title: "old" }] };
        const action = { type: "UPDATE_TOAST" as const, toast: { id: "1", title: "new" } };
        const newState = reducer(state, action);
        assert.strictEqual(newState.toasts[0].title, "new");
    });

    it("should dismiss toast", () => {
        const state = { toasts: [{ id: "1", open: true }] };
        const action = { type: "DISMISS_TOAST" as const, toastId: "1" };
        const newState = reducer(state, action);
        assert.strictEqual(newState.toasts[0].open, false);
    });

    it("should dismiss all toasts if no id provided", () => {
        const state = { toasts: [{ id: "1", open: true }, { id: "2", open: true }] };
        const action = { type: "DISMISS_TOAST" as const };
        const newState = reducer(state, action);
        assert.ok(newState.toasts.every(t => !t.open));
    });

    it("should remove toast", () => {
        const state = { toasts: [{ id: "1" }] };
        const action = { type: "REMOVE_TOAST" as const, toastId: "1" };
        const newState = reducer(state, action);
        assert.strictEqual(newState.toasts.length, 0);
    });

    it("should clear toasts", () => {
        const state = { toasts: [{ id: "1" }] };
        const action = { type: "REMOVE_TOAST" as const };
        const newState = reducer(state, action);
        assert.strictEqual(newState.toasts.length, 0);
    });
});

describe("useToast hook", () => {
    // We need to act carefully because state is shared across tests in the same file.

    it("should add and remove toast", () => {
        const { result } = renderHook(() => useToast());

        act(() => {
            result.current.toast({ title: "Hello" });
        });

        assert.strictEqual(result.current.toasts.length, 1);
        assert.strictEqual(result.current.toasts[0].title, "Hello");

        act(() => {
            result.current.dismiss(result.current.toasts[0].id);
        });

        // Dismiss sets open to false, but doesn't remove immediately (timeout).
        assert.strictEqual(result.current.toasts[0].open, false);
    });

    it("should update toast via returned helper", () => {
        const { result } = renderHook(() => useToast());

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        let t: any;
        act(() => {
            t = result.current.toast({ title: "Init" });
        });

        assert.strictEqual(result.current.toasts[0].title, "Init");

        act(() => {
            t.update({ id: t.id, title: "Updated" });
        });

        assert.strictEqual(result.current.toasts[0].title, "Updated");
    });
});
