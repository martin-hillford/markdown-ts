import { Context } from "@/types/Context";
import { describe, expect, test } from "vitest";
import { Image } from "@/parsers/inline/Image";
import { Alignment } from "@/types";

const context = { blockParsers: [], inlineParsers: [] } as Context;

describe("image-extract-attributes", () => {

    test("no-additional-attributes", () => {
        const text = "![Rocky mountains](https://images/rockies.jpg)"
        const parser = new Image(context);
        const attributes = parser.extractAttributes(text);

        expect(attributes).not.toBeNull();
        expect(attributes?.altText).toBe("Rocky mountains");
        expect(attributes?.url).toBe("https://images/rockies.jpg");
    });

    test("alignment-attributes", () => {
        const text = "![Rockies](https://images/rockies.jpg right)"
        const parser = new Image(context);
        const attributes = parser.extractAttributes(text);

        expect(attributes).not.toBeNull();
        expect(attributes?.altText).toBe("Rockies");
        expect(attributes?.url).toBe("https://images/rockies.jpg");
        expect(attributes?.align).toBe(Alignment.Right);
    });

    test("width-attributes", () => {
        const text = "![Rockies](https://images/rockies.jpg left 48)"
        const parser = new Image(context);
        const attributes = parser.extractAttributes(text);

        expect(attributes).not.toBeNull();
        expect(attributes?.altText).toBe("Rockies");
        expect(attributes?.url).toBe("https://images/rockies.jpg");
        expect(attributes?.align).toBe(Alignment.Left);
        expect(attributes?.width).toBe('48%');
    });
})
