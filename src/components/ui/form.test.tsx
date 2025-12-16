import { describe, it, afterEach } from "node:test";
import assert from "node:assert";
import { render, screen, cleanup } from "@testing-library/react";
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
});
