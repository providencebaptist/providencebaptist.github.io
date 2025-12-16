import { describe, it, afterEach } from "node:test";
import assert from "node:assert";
import { render, screen, fireEvent, cleanup, act } from "@testing-library/react";
import {
    DropdownMenu,
    DropdownMenuTrigger,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuCheckboxItem,
    DropdownMenuRadioGroup,
    DropdownMenuRadioItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuSub,
    DropdownMenuSubTrigger,
    DropdownMenuSubContent
} from "./dropdown-menu";
import {
    ContextMenu,
    ContextMenuTrigger,
    ContextMenuContent,
    ContextMenuItem,
    ContextMenuCheckboxItem,
    ContextMenuRadioGroup,
    ContextMenuRadioItem,
    ContextMenuLabel,
    ContextMenuSeparator,
    ContextMenuSub,
    ContextMenuSubTrigger,
    ContextMenuSubContent
} from "./context-menu";
import {
    Menubar,
    MenubarMenu,
    MenubarTrigger,
    MenubarContent,
    MenubarItem,
    MenubarCheckboxItem,
    MenubarRadioGroup,
    MenubarRadioItem,
    MenubarLabel,
    MenubarSeparator,
    MenubarSub,
    MenubarSubTrigger,
    MenubarSubContent
} from "./menubar";

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

describe("Menu Components Interaction", () => {
    afterEach(cleanup);

    // --- Dropdown Menu ---
    it("interacts with DropdownMenu", async () => {
        render(
            <DropdownMenu>
                <DropdownMenuTrigger>Open Menu</DropdownMenuTrigger>
                <DropdownMenuContent>
                    <DropdownMenuLabel>My Account</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>Profile</DropdownMenuItem>
                    <DropdownMenuCheckboxItem checked>Show status</DropdownMenuCheckboxItem>
                    <DropdownMenuRadioGroup value="top">
                        <DropdownMenuRadioItem value="top">Top</DropdownMenuRadioItem>
                        <DropdownMenuRadioItem value="bottom">Bottom</DropdownMenuRadioItem>
                    </DropdownMenuRadioGroup>
                    <DropdownMenuSub>
                        <DropdownMenuSubTrigger>More</DropdownMenuSubTrigger>
                        <DropdownMenuSubContent>
                            <DropdownMenuItem>Sub Item</DropdownMenuItem>
                        </DropdownMenuSubContent>
                    </DropdownMenuSub>
                </DropdownMenuContent>
            </DropdownMenu>
        );

        const trigger = screen.getByText("Open Menu");

        // Radix triggers often respond to pointerdown to prevent focus issues
        await act(async () => {
            fireEvent.pointerDown(trigger);
            fireEvent.click(trigger);
        });

        // Check filtering/items
        assert.ok(await screen.findByText("My Account"));
        assert.ok(await screen.findByText("Profile"));
        assert.ok(await screen.findByText("Show status"));
        assert.ok(await screen.findByText("Top"));

        // Sub menu interaction
        const moreTrigger = screen.getByText("More");
        await act(async () => {
            fireEvent.pointerDown(moreTrigger); // Open sub menu
            fireEvent.click(moreTrigger);
        });

        assert.ok(await screen.findByText("Sub Item"));
    });

    // --- Context Menu ---
    it("interacts with ContextMenu", async () => {
        render(
            <ContextMenu>
                <ContextMenuTrigger className="h-[150px] w-[300px] border border-dashed text-sm">
                    Right click here
                </ContextMenuTrigger>
                <ContextMenuContent className="w-64">
                    <ContextMenuItem inset>Back</ContextMenuItem>
                    <ContextMenuItem disabled>Forward</ContextMenuItem>
                    <ContextMenuItem>Reload</ContextMenuItem>
                    <ContextMenuSub>
                        <ContextMenuSubTrigger inset>More Tools</ContextMenuSubTrigger>
                        <ContextMenuSubContent className="w-48">
                            <ContextMenuItem>Save Page As...</ContextMenuItem>
                        </ContextMenuSubContent>
                    </ContextMenuSub>
                    <ContextMenuSeparator />
                    <ContextMenuCheckboxItem checked>Show Bookmarks Bar</ContextMenuCheckboxItem>
                    <ContextMenuRadioGroup value="pedro">
                        <ContextMenuLabel inset>People</ContextMenuLabel>
                        <ContextMenuSeparator />
                        <ContextMenuRadioItem value="pedro">Pedro Duarte</ContextMenuRadioItem>
                        <ContextMenuRadioItem value="colm">Colm Tuite</ContextMenuRadioItem>
                    </ContextMenuRadioGroup>
                </ContextMenuContent>
            </ContextMenu>
        );

        const trigger = screen.getByText("Right click here");
        fireEvent.contextMenu(trigger);

        assert.ok(await screen.findByText("Reload"));
        assert.ok(await screen.findByText("Back"));

        // Assert items presence
        assert.ok(screen.getByText("Show Bookmarks Bar"));
        assert.ok(screen.getByText("Pedro Duarte"));
    });

    // --- Menubar ---
    it("interacts with Menubar", async () => {
        render(
            <Menubar>
                <MenubarMenu>
                    <MenubarTrigger>File</MenubarTrigger>
                    <MenubarContent>
                        <MenubarItem>New Tab</MenubarItem>
                        <MenubarItem>New Window</MenubarItem>
                        <MenubarSeparator />
                        <MenubarSub>
                            <MenubarSubTrigger>Share</MenubarSubTrigger>
                            <MenubarSubContent>
                                <MenubarItem>Email link</MenubarItem>
                            </MenubarSubContent>
                        </MenubarSub>
                        <MenubarSeparator />
                        <MenubarCheckboxItem checked>Show Full URLs</MenubarCheckboxItem>
                        <MenubarRadioGroup value="andy">
                            <MenubarRadioItem value="andy">Andy</MenubarRadioItem>
                            <MenubarRadioItem value="benoit">Benoit</MenubarRadioItem>
                        </MenubarRadioGroup>
                    </MenubarContent>
                </MenubarMenu>
            </Menubar>
        );

        const fileTrigger = screen.getByText("File");
        await act(async () => {
            fireEvent.pointerDown(fileTrigger);
            fireEvent.click(fileTrigger);
        });

        assert.ok(await screen.findByText("New Tab"));
        assert.ok(await screen.findByText("Share"));
        assert.ok(await screen.findByText("Show Full URLs"));

        const shareTrigger = screen.getByText("Share");
        await act(async () => {
            fireEvent.pointerDown(shareTrigger);
            fireEvent.click(shareTrigger);
        });

        assert.ok(await screen.findByText("Email link"));
    });
});
