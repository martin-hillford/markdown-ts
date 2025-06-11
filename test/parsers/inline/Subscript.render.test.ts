import { markdownToHtml } from "@/parsers/markdown";
import { expect, test } from "vitest";

test("subscript render start of line", () => {
    const expected = `<p><sub>subscript</sub> at the line start</p>`;
    const html = markdownToHtml("~(subscript) at the line start");
    expect(html).toEqual(expected);
});

test("subscript render end of line", () => {
    const expected = `<p>end of line <sub>subscript</sub></p>`;
    const html = markdownToHtml("end of line ~(subscript)");
    expect(html).toEqual(expected);
});

test("subscript render middle of line", () => {
    const expected = `<p>in the <sub>middle</sub> of the line</p>`;
    const html = markdownToHtml("in the ~(middle) of the line");
    expect(html).toEqual(expected);
});
