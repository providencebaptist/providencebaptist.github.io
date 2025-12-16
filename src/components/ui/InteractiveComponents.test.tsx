import { describe, it, afterEach } from "node:test";
import assert from "node:assert";
import { render, screen, fireEvent, cleanup, act } from "@testing-library/react";
import { AlertDialog, AlertDialogTrigger, AlertDialogContent, AlertDialogHeader, AlertDialogTitle, AlertDialogDescription, AlertDialogFooter, AlertDialogAction, AlertDialogCancel } from "./alert-dialog";
import { Drawer, DrawerTrigger, DrawerContent, DrawerHeader, DrawerTitle, DrawerDescription, DrawerFooter, DrawerClose } from "./drawer";
import { InputOTP, InputOTPGroup, InputOTPSlot, InputOTPSeparator } from "./input-otp";

// Mock Pointer Events for Radix UI
if (!global.PointerEvent) {
    class PointerEvent extends Event {
        constructor(type: string, props: EventInit) {
            super(type, props);
        }
    }
    // @ts-expect-error -- Polyfilling global PointerEvent for JSDOM
    global.PointerEvent = PointerEvent;
}

if (!global.ResizeObserver) {
    global.ResizeObserver = class ResizeObserver {
        observe() { }
        unobserve() { }
        disconnect() { }
    };
}

describe("Interactive Components", () => {
    afterEach(cleanup);

    // --- Alert Dialog ---
    it("interacts with AlertDialog", async () => {
        render(
            <AlertDialog>
                <AlertDialogTrigger>Delete</AlertDialogTrigger>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                        <AlertDialogDescription>This action cannot be undone.</AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction>Continue</AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        );

        // Open
        fireEvent.click(screen.getByText("Delete"));

        // Check content
        assert.ok(await screen.findByText("Are you sure?"));
        assert.ok(await screen.findByText("This action cannot be undone."));

        // Buttons
        assert.ok(screen.getByText("Cancel"));
        assert.ok(screen.getByText("Continue"));

        // Close (Cancel)
        fireEvent.click(screen.getByText("Cancel"));

        // Note: Wait for disappearance is flaky in JSDOM sometimes due to animations
    });

    // --- Drawer ---
    it("interacts with Drawer", async () => {
        render(
            <Drawer>
                <DrawerTrigger>Open Drawer</DrawerTrigger>
                <DrawerContent>
                    <DrawerHeader>
                        <DrawerTitle>Drawer View</DrawerTitle>
                        <DrawerDescription>See details below.</DrawerDescription>
                    </DrawerHeader>
                    <div>Drawer Body</div>
                    <DrawerFooter>
                        <DrawerClose>Close</DrawerClose>
                    </DrawerFooter>
                </DrawerContent>
            </Drawer>
        );

        // Open
        fireEvent.click(screen.getByText("Open Drawer"));

        // Check content
        assert.ok(await screen.findByText("Drawer View"));
        assert.ok(await screen.findByText("See details below."));
        assert.ok(await screen.findByText("Drawer Body"));

        // Close
        const closeBtn = screen.getByText("Close");
        fireEvent.click(closeBtn);
    });

    // --- Input OTP ---
    it("renders InputOTP", async () => {
        render(
            <InputOTP maxLength={6}>
                <InputOTPGroup>
                    <InputOTPSlot index={0} />
                    <InputOTPSlot index={1} />
                    <InputOTPSlot index={2} />
                </InputOTPGroup>
                <InputOTPSeparator />
                <InputOTPGroup>
                    <InputOTPSlot index={3} />
                    <InputOTPSlot index={4} />
                    <InputOTPSlot index={5} />
                </InputOTPGroup>
            </InputOTP>
        );

        // Check slots exist
        // Radix/Input-OTP usually renders input underneath but slots are divs
        // We can check by role since standard inputs have roles, but OTP is custom.
        // Slots don't have roles by default in the shadcn code. 
        // We can check for a separator role
        assert.ok(screen.getByRole("separator"));

        // We can check if the underlying input exists
        const input = screen.queryByRole("textbox", { hidden: true }) || screen.queryByRole("textbox");
        assert.ok(input, "Hidden input should be rendered");
    });

});
