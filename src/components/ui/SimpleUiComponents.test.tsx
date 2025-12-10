import { describe, it } from "node:test";
import assert from "node:assert";
import { render, screen } from "@testing-library/react";
import { Avatar, AvatarImage, AvatarFallback } from "./avatar";
import { Badge } from "./badge";
import { Button } from "./button";
import { Card, CardHeader, CardContent, CardFooter, CardTitle, CardDescription } from "./card";
import { Checkbox } from "./checkbox";
import { Input } from "./input";
import { Label } from "./label";
import { Progress } from "./progress";
import { Separator } from "./separator";
import { Skeleton } from "./skeleton";
import { Switch } from "./switch";
import { Textarea } from "./textarea";
import { Toggle } from "./toggle";

describe("Simple UI Components", () => {
    it("renders Avatar", () => {
        render(
            <Avatar>
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback>CN</AvatarFallback>
            </Avatar>
        );
        assert.ok(screen.getByText("CN"));
    });

    it("renders Badge", () => {
        render(<Badge>Badge</Badge>);
        assert.ok(screen.getByText("Badge"));
    });

    it("renders Button", () => {
        render(<Button>Click me</Button>);
        assert.ok(screen.getByText("Click me"));
    });

    it("renders Card", () => {
        render(
            <Card>
                <CardHeader>
                    <CardTitle>Card Title</CardTitle>
                    <CardDescription>Card Description</CardDescription>
                </CardHeader>
                <CardContent>Content</CardContent>
                <CardFooter>Footer</CardFooter>
            </Card>
        );
        assert.ok(screen.getByText("Card Title"));
        assert.ok(screen.getByText("Content"));
    });

    it("renders Checkbox", () => {
        render(<Checkbox id="term" />);
        // Checkbox is usually an input or button with role checkbox
        assert.ok(screen.getByRole("checkbox"));
    });

    it("renders Input", () => {
        render(<Input placeholder="Type here" />);
        assert.ok(screen.getByPlaceholderText("Type here"));
    });

    it("renders Label", () => {
        render(<Label htmlFor="email">Email</Label>);
        assert.ok(screen.getByText("Email"));
    });

    it("renders Progress", () => {
        render(<Progress value={50} />);
        assert.ok(screen.getByRole("progressbar"));
    });

    it("renders Separator", () => {
        // Separator usually has role separator (if configured) or just a div
        const { container } = render(<Separator />);
        assert.ok(container.firstChild);
    });

    it("renders Skeleton", () => {
        const { container } = render(<Skeleton className="w-[100px] h-[20px]" />);
        assert.ok(container.firstChild);
    });

    it("renders Switch", () => {
        render(<Switch />);
        assert.ok(screen.getByRole("switch"));
    });

    it("renders Textarea", () => {
        render(<Textarea placeholder="Type message" />);
        assert.ok(screen.getByPlaceholderText("Type message"));
    });

    it("renders Toggle", () => {
        render(<Toggle>Toggle Me</Toggle>);
        assert.ok(screen.getByText("Toggle Me"));
    });
});
