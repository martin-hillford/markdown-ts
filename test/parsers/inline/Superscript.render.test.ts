import { markdownToHtml } from "@/parsers/markdown";
import { expect, test } from "vitest";

test("superscript render start of line", () => {
    const expected = `<p><sup>superscript</sup> at the line start</p>`;
    const html = markdownToHtml("^(superscript) at the line start");
    expect(html).toEqual(expected);
});

test("superscript render end of line", () => {
    const expected = `<p>end of line <sup>superscript</sup></p>`;
    const html = markdownToHtml("end of line ^(superscript)");
    expect(html).toEqual(expected);
});

test("superscript render middle of line", () => {
    const expected = `<p>in the <sup>middle</sup> of the line</p>`;
    const html = markdownToHtml("in the ^(middle) of the line");
    expect(html).toEqual(expected);
});
