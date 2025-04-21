import { markdownToHtml } from "@/parsers/markdown";
import { expect, test } from "vitest";


test("code render simple", () => {
    const html = markdownToHtml("this is some `code`");
    expect(html).toEqual(`<p>this is some <code>code</code></p>`);
});

test("code render with backticks", () => {
    const html = markdownToHtml("this is some ``code with ` backticks``");
    expect(html).toEqual('<p>this is some <code>code with ` backticks</code></p>');
});

test("code render with line start", () => {
    const html = markdownToHtml("`code` at the start of the line");
    expect(html).toEqual('<p><code>code</code> at the start of the line</p>');
});

test("code render with line end", () => {
    const html = markdownToHtml("at the end of the line `code`");
    expect(html).toEqual('<p>at the end of the line <code>code</code></p>');
});
