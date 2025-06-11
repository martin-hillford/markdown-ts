import { markdownToHtml } from "@/parsers/markdown";
import { expect, test } from "vitest";

test("line-*", () => {
    const html = markdownToHtml("********");
    expect(html).toEqual(`<hr/>`);
});

test("line--", () => {
    const html = markdownToHtml("--------");
    expect(html).toEqual(`<hr/>`);
});

test("line-_", () => {
    const html = markdownToHtml("____");
    expect(html).toEqual(`<hr/>`);
});

test("no-line but paragraph", () => {
    const html = markdownToHtml("__");
    expect(html).not.toEqual(`<hr/>`);
    expect(html).toEqual(`<p>__</p>`);
});
