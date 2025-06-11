import { Context } from "@/types/Context";
import { describe, expect, test } from "vitest";
import { Link } from "@/parsers/inline/Link";

const context = { blockParsers: [], inlineParsers: [] } as Context;

describe("link-extract-attributes", () => {

    test("no-additional-attributes", () => {

        const text = "https://google.com"
        const parser = new Link(context);
        const attributes = parser.extractAttributes(text);

        expect(attributes).not.toBeNull();
        expect(attributes?.href).toBe("https://google.com");
    });

    test("blank", () => {

        const text = "https://google.com blank"
        const parser = new Link(context);
        const attributes = parser.extractAttributes(text);

        expect(attributes).not.toBeNull();
        expect(attributes?.blank).toBeTruthy();
        expect(attributes?.href).toBe("https://google.com");
    });

    test("blank", () => {

        const text = "#heading"
        const parser = new Link(context);
        const attributes = parser.extractAttributes(text);

        expect(attributes).not.toBeNull();
        expect(attributes?.blank).toBeFalsy();
        expect(attributes?.headingId).toBe('heading');
        expect(attributes?.href).toBeUndefined;
    });
});
