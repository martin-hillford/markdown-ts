import { markdownToHtml } from "@/parsers/markdown";
import { expect, test } from "vitest";

const simple = `<ul><li>First item</li><li>Second item</li><li>Third item</li><li>Fourth item</li></ul>`;

test("simple unordered list using -", () => {
    const markdown = '- First item\n- Second item\n- Third item\n- Fourth item'
    const html = markdownToHtml(markdown);
    expect(html).toEqual(simple);
});

test("simple unordered list using +", () => {
    const markdown = '+ First item\n+ Second item\n+ Third item\n+ Fourth item'
    const html = markdownToHtml(markdown);
    expect(html).toEqual(simple);
});

test("simple unordered list using *", () => {
    const markdown = '* First item\n* Second item\n* Third item\n* Fourth item'
    const html = markdownToHtml(markdown);
    expect(html).toEqual(simple);
});

test("indented unordered list", () => {
    const markdown = "- First item\n- Second item\n- Third item\n    - Indented item 1\n    - Indented item 1\n- Fourth item";
    const html = markdownToHtml(markdown);
    const expected = `<ul><li>First item</li><li>Second item</li><li>Third item<ul><li>Indented item 1</li><li>Indented item 1</li></ul></li><li>Fourth item</li></ul>`;
    expect(html).toEqual(expected);
});





