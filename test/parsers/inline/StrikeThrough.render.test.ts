import { markdownToHtml } from "@/parsers/markdown";
import { expect, test } from "vitest";

test("strikethrough render start of line", () => {
    const expected = `<p><span style="text-decoration:line-through">at</span> the line start</p>`;
    const html = markdownToHtml("~~at~~ the line start");
    expect(html).toEqual(expected);
});

test("strikethrough render end of line", () => {
    const expected = `<p>end of line <span style="text-decoration:line-through">this is</span></p>`;
    const html = markdownToHtml("end of line ~~this is~~");
    expect(html).toEqual(expected);
});

test("strikethrough render middle of line", () => {
    const expected = `<p>in the <span style="text-decoration:line-through">middle</span> of the line</p>`;
    const html = markdownToHtml("in the ~~middle~~ of the line");
    expect(html).toEqual(expected);
});
