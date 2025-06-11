import { markdownToHtml } from "@/parsers/markdown";
import { expect, test } from "vitest";

test("alt-header-h1", () => {
    const html = markdownToHtml("header\n======");
    expect(html).toEqual(`<h1>header</h1>`);
});

test("alt-header-h2", () => {
    const html = markdownToHtml("header\n------");
    expect(html).toEqual(`<h2>header</h2>`);
});

test("none-alt-header", () => {
    const html = markdownToHtml("header\n******");
    expect(html).toEqual(`<p>header ******</p>`);
});
