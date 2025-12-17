import { describe, it, afterEach } from "node:test";
import assert from "node:assert";
import { render, screen, fireEvent, waitFor, cleanup } from "@testing-library/react";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "./accordion";
import { Alert, AlertTitle, AlertDescription } from "./alert";
import { Dialog, DialogTrigger, DialogContent, DialogTitle } from "./dialog";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem, SelectGroup, SelectLabel, SelectSeparator } from "./select";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "./tabs";
import { Carousel, CarouselContent, CarouselItem } from "./carousel";

// Mock ResizeObserver if not already global? (It is in test-setup.js)

describe("Complex UI Components", () => {
    afterEach(() => {
        cleanup();
        document.body.style.pointerEvents = 'auto'; // Force reset in case Radix leaves it
    });
    it("renders Accordion", async () => {
        render(
            <Accordion type="single" collapsible>
                <AccordionItem value="item-1">
                    <AccordionTrigger>Is it accessible?</AccordionTrigger>
                    <AccordionContent>Yes</AccordionContent>
                </AccordionItem>
            </Accordion>
        );
        assert.ok(screen.getByText("Is it accessible?"));
        // Trigger click
        fireEvent.click(screen.getByText("Is it accessible?"));
        // Content might be async
        const content = await screen.findByText("Yes");
        assert.ok(content);
    });

    it("renders Alert", () => {
        render(
            <Alert>
                <AlertTitle>Heads up!</AlertTitle>
                <AlertDescription>You can add specific components.</AlertDescription>
            </Alert>
        );
        assert.ok(screen.getByText("Heads up!"));
    });

    it("renders Dialog", async () => {
        render(
            <Dialog>
                <DialogTrigger>Open</DialogTrigger>
                <DialogContent>
                    <DialogTitle>Dialog Title</DialogTitle>
                    <p>Dialog Content</p>
                </DialogContent>
            </Dialog>
        );
        fireEvent.click(screen.getByText("Open"));
        assert.ok(await screen.findByText("Dialog Title"));
    });

    it("renders Select with all components", async () => {
        render(
            <Select>
                <SelectTrigger>
                    <SelectValue placeholder="Theme" />
                </SelectTrigger>
                <SelectContent>
                    <SelectGroup>
                        <SelectLabel>Fruits</SelectLabel>
                        <SelectItem value="apple">Apple</SelectItem>
                        <SelectSeparator />
                        <SelectItem value="banana">Banana</SelectItem>
                    </SelectGroup>
                </SelectContent>
            </Select>
        );
        fireEvent.click(screen.getByText("Theme"));
        assert.ok(await screen.findByText("Fruits"));
        assert.ok(screen.getByText("Apple"));
    });

    it("renders Tabs", async () => {
        render(
            <Tabs defaultValue="account">
                <TabsList>
                    <TabsTrigger value="account">Account</TabsTrigger>
                    <TabsTrigger value="password">Password</TabsTrigger>
                </TabsList>
                <TabsContent value="account">Account settings.</TabsContent>
                <TabsContent value="password">Change password.</TabsContent>
            </Tabs>
        );
        assert.ok(screen.getByText("Account settings."));
        // fireEvent.click(screen.getByText("Password"));
        // assert.ok(await screen.findByText("Change password."));
    });

    it("renders Carousel", () => {
        render(
            <Carousel>
                <CarouselContent>
                    <CarouselItem>Slide 1</CarouselItem>
                    <CarouselItem>Slide 2</CarouselItem>
                </CarouselContent>
            </Carousel>
        );
        assert.ok(screen.getByText("Slide 1"));
    });
});
