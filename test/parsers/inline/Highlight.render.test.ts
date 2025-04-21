import { markdownToHtml } from "@/parsers/markdown";
import { expect, test } from "vitest";

test("highlight render start of line", () => {
    const expected = `<p><mark>at</mark> the line start</p>`;
    const html = markdownToHtml("==at== the line start");
    expect(html).toEqual(expected);
});

test("highlight render end of line", () => {
    const expected = `<p>end of line <mark>this is</mark></p>`;
    const html = markdownToHtml("end of line ==this is==");
    expect(html).toEqual(expected);
});

test("highlight render middle of line", () => {
    const expected = `<p>in the <mark>middle</mark> of the line</p>`;
    const html = markdownToHtml("in the ==middle== of the line");
    expect(html).toEqual(expected);
});
