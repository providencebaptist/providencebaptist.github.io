import { describe, it, afterEach } from "node:test";
import assert from "node:assert";
import { render, screen, fireEvent, cleanup } from "@testing-library/react";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator } from "./breadcrumb";
import { Collapsible, CollapsibleTrigger, CollapsibleContent } from "./collapsible";
import { Command, CommandInput, CommandList, CommandItem } from "./command";
import { ContextMenu, ContextMenuTrigger, ContextMenuContent, ContextMenuItem } from "./context-menu";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "./dropdown-menu";
import { HoverCard, HoverCardTrigger, HoverCardContent } from "./hover-card";
import { Menubar, MenubarMenu, MenubarTrigger, MenubarContent, MenubarItem } from "./menubar";
import { Pagination, PaginationContent, PaginationItem, PaginationLink } from "./pagination";
import { Popover, PopoverTrigger, PopoverContent } from "./popover";
import { RadioGroup, RadioGroupItem } from "./radio-group";
import { ScrollArea } from "./scroll-area";
import { Sheet, SheetTrigger, SheetContent, SheetTitle } from "./sheet";
import { Slider } from "./slider";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "./table";
import { ToggleGroup, ToggleGroupItem } from "./toggle-group";
import { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider } from "./tooltip";

describe("More UI Components", () => {
    afterEach(() => {
        cleanup();
        document.body.style.pointerEvents = 'auto';
    });

    it("renders Breadcrumb", () => {
        render(
            <Breadcrumb>
                <BreadcrumbList>
                    <BreadcrumbItem>
                        <BreadcrumbLink href="/">Home</BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                        <BreadcrumbLink href="/docs">Docs</BreadcrumbLink>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>
        );
        assert.ok(screen.getByText("Home"));
        assert.ok(screen.getByText("Docs"));
    });

    it("renders Collapsible", () => {
        render(
            <Collapsible>
                <CollapsibleTrigger>Toggle</CollapsibleTrigger>
                <CollapsibleContent>Content</CollapsibleContent>
            </Collapsible>
        );
        assert.ok(screen.getByText("Toggle"));
    });

    it("renders Command", () => {
        render(
            <Command>
                <CommandInput placeholder="Type a command..." />
                <CommandList>
                    <CommandItem>Calendar</CommandItem>
                </CommandList>
            </Command>
        );
        assert.ok(screen.getByPlaceholderText("Type a command..."));
    });

    it("renders DropdownMenu", () => {
        render(
            <DropdownMenu>
                <DropdownMenuTrigger>Open Menu</DropdownMenuTrigger>
                <DropdownMenuContent>
                    <DropdownMenuItem>Profile</DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        );
        assert.ok(screen.getByText("Open Menu"));
    });

    it("renders HoverCard", () => {
        render(
            <HoverCard>
                <HoverCardTrigger>Hover Card</HoverCardTrigger>
                <HoverCardContent>Content</HoverCardContent>
            </HoverCard>
        );
        assert.ok(screen.getByText("Hover Card"));
    });

    it("renders Menubar", () => {
        render(
            <Menubar>
                <MenubarMenu>
                    <MenubarTrigger>File Menu</MenubarTrigger>
                    <MenubarContent>
                        <MenubarItem>New</MenubarItem>
                    </MenubarContent>
                </MenubarMenu>
            </Menubar>
        );
        assert.ok(screen.getByText("File Menu"));
    });

    it("renders Pagination", () => {
        render(
            <Pagination>
                <PaginationContent>
                    <PaginationItem>
                        <PaginationLink href="#">1</PaginationLink>
                    </PaginationItem>
                </PaginationContent>
            </Pagination>
        );
        assert.ok(screen.getByText("1"));
    });

    it("renders Popover", async () => {
        render(
            <Popover>
                <PopoverTrigger>Open Popover</PopoverTrigger>
                <PopoverContent>Content</PopoverContent>
            </Popover>
        );
        fireEvent.click(screen.getByText("Open Popover"));
        assert.ok(await screen.findByText("Content"));
    });

    it("renders RadioGroup", () => {
        render(
            <RadioGroup defaultValue="option-one">
                <RadioGroupItem value="option-one" id="option-one" />
                <label htmlFor="option-one">Option One</label>
                <RadioGroupItem value="option-two" id="option-two" />
            </RadioGroup>
        );
        assert.ok(screen.getByLabelText("Option One"));
    });

    it("renders ScrollArea", () => {
        render(
            <ScrollArea className="h-[200px] w-[350px]">
                Jokester began sneaking into the castle in the middle of the night...
            </ScrollArea>
        );
        assert.ok(screen.getByText(/Jokester/));
    });

    it("renders Sheet", async () => {
        render(
            <Sheet>
                <SheetTrigger>Open Sheet</SheetTrigger>
                <SheetContent>
                    <SheetTitle>Sheet Header</SheetTitle>
                    Sheet Content
                </SheetContent>
            </Sheet>
        );
        fireEvent.click(screen.getByText("Open Sheet"));
        assert.ok(await screen.findByText("Sheet Content"));
    });

    it("renders Slider", () => {
        render(<Slider defaultValue={[50]} max={100} step={1} />);
        assert.ok(screen.getByRole("slider"));
    });

    it("renders Table", () => {
        render(
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Head</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    <TableRow>
                        <TableCell>Cell</TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        );
        assert.ok(screen.getByText("Head"));
        assert.ok(screen.getByText("Cell"));
    });

    it("renders ToggleGroup", () => {
        render(
            <ToggleGroup type="single">
                <ToggleGroupItem value="a">A</ToggleGroupItem>
            </ToggleGroup>
        );
        assert.ok(screen.getByText("A"));
    });

    it("renders ToggleGroup with context variants", () => {
        render(
            <ToggleGroup type="single" variant="outline" size="lg">
                <ToggleGroupItem value="a">A</ToggleGroupItem>
            </ToggleGroup>
        );
        const item = screen.getByText("A").closest("button");
        assert.ok(item);
        // ToggleGroupItem uses context for variant/size
    });

    it("renders Tooltip", () => {
        render(
            <TooltipProvider>
                <Tooltip>
                    <TooltipTrigger>Hover Tooltip</TooltipTrigger>
                    <TooltipContent>Tooltip Content</TooltipContent>
                </Tooltip>
            </TooltipProvider>
        );
        assert.ok(screen.getByText("Hover Tooltip"));
    });
});
