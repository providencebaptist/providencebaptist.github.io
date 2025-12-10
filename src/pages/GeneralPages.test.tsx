import { describe, it } from "node:test";
import assert from "node:assert";
import { screen } from "@testing-library/react";
import { renderWithProviders } from "../test-utils";
import About from "./About";
import Beliefs from "./Beliefs";
import Give from "./Give";
import History from "./History";
import Leadership from "./Leadership";
import NotFound from "./NotFound";
import Purpose from "./Purpose";
import Eternity from "./Eternity";
import Home from "./Home";

describe("Static Pages", () => {
    it("renders Home content", async () => {
        renderWithProviders(<Home />);
        const elements = await screen.findAllByText(/Welcome Home/i);
        assert.ok(elements.length > 0);
    });

    it("renders About content", async () => {
        renderWithProviders(<About />);
        const elements = await screen.findAllByText(/About/i);
        assert.ok(elements.length > 0);
    });

    it("renders Beliefs content", async () => {
        renderWithProviders(<Beliefs />);
        const elements = await screen.findAllByText(/Beliefs/i);
        assert.ok(elements.length > 0);
    });

    it("renders Give content", async () => {
        renderWithProviders(<Give />);
        const elements = await screen.findAllByText(/Give/i);
        assert.ok(elements.length > 0);
    });

    it("renders History content", async () => {
        renderWithProviders(<History />);
        const elements = await screen.findAllByText(/History/i);
        assert.ok(elements.length > 0);
    });

    it("renders Leadership content", async () => {
        renderWithProviders(<Leadership />);
        const elements = await screen.findAllByText(/Pastor/i);
        assert.ok(elements.length > 0);
    });

    it("renders NotFound content", async () => {
        renderWithProviders(<NotFound />);
        const elements = await screen.findAllByText(/404/i);
        assert.ok(elements.length > 0);
    });

    it("renders Purpose content", async () => {
        renderWithProviders(<Purpose />);
        const elements = await screen.findAllByText(/Purpose/i);
        assert.ok(elements.length > 0);
    });

    it("renders Eternity content", async () => {
        renderWithProviders(<Eternity />);
        const elements = await screen.findAllByText(/Eternity/i);
        assert.ok(elements.length > 0);
    });
});
