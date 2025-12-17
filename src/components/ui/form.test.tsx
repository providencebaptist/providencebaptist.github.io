import { describe, it, afterEach } from "node:test";
import assert from "node:assert";
import { render, screen, cleanup, fireEvent, waitFor } from "@testing-library/react";
import { useForm } from "react-hook-form";
import { Form, FormField, FormItem, FormLabel, FormControl, FormDescription, FormMessage } from "./form";
import { Input } from "./input";

const FormDemo = () => {
    const form = useForm({
        defaultValues: {
            username: "testuser",
        },
    });

    return (
        <Form {...form}>
            <form>
                <FormField
                    control={form.control}
                    name="username"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Username</FormLabel>
                            <FormControl>
                                <Input placeholder="shadcn" {...field} />
                            </FormControl>
                            <FormDescription>This is your public display name.</FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
            </form>
        </Form>
    );
};

describe("Form Component", () => {
    afterEach(cleanup);

    it("renders form components correctly", () => {
        render(<FormDemo />);

        // Label
        assert.ok(screen.getByText("Username"));
        // Input with value
        assert.strictEqual((screen.getByRole("textbox") as HTMLInputElement).value, "testuser");
        // Description
        assert.ok(screen.getByText("This is your public display name."));
    });
    it("displays error message and accessibility attributes on validation failure", async () => {
        const ValidationErrorDemo = () => {
            const form = useForm({
                defaultValues: {
                    username: "",
                },
            });

            const onSubmit = form.handleSubmit(() => { });

            return (
                <Form {...form}>
                    <form onSubmit={onSubmit}>
                        <FormField
                            control={form.control}
                            name="username"
                            rules={{ required: "Username is required" }}
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Username</FormLabel>
                                    <FormControl>
                                        <Input {...field} />
                                    </FormControl>
                                    <FormDescription>Desc</FormDescription>
                                    <FormMessage />
                                    <button type="submit">Submit</button>
                                </FormItem>
                            )}
                        />
                    </form>
                </Form>
            );
        };

        render(<ValidationErrorDemo />);

        // Submit to trigger error
        const submitBtn = screen.getByText("Submit");
        fireEvent.click(submitBtn);

        await waitFor(() => {
            // Check error message
            assert.ok(screen.getByText("Username is required"));
        });

        // Check Label error class
        const label = screen.getByText("Username");
        assert.ok(label.className.includes("text-destructive"));

        // Check Input aria-invalid
        const input = screen.getByRole("textbox");
        assert.strictEqual(input.getAttribute("aria-invalid"), "true");

        // Check aria-describedby includes message id
        const descId = input.getAttribute("aria-describedby");
        assert.ok(descId?.includes("-form-item-message"));
        assert.ok(descId?.includes("-form-item-description"));
    });
});
