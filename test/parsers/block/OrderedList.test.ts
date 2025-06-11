import { markdownToHtml } from "@/parsers/markdown";
import { expect, test } from "vitest";

test("simple ordered list", () => {
    const markdown = '1. First item\n2. Second item\n3. Third item\n4. Fourth item'
    const html = markdownToHtml(markdown);
    const expected = `<ol start="1"><li>First item</li><li>Second item</li><li>Third item</li><li>Fourth item</li></ol>`;
    expect(html).toEqual(expected);
});

test("incorrectly labeled list", () => {
    const markdown = '1. First item\n1. Second item\n1. Third item\n1. Fourth item'
    const html = markdownToHtml(markdown);
    const expected = `<ol start="1"><li>First item</li><li>Second item</li><li>Third item</li><li>Fourth item</li></ol>`;
    expect(html).toEqual(expected);
});

test("indented list", () => {
    const markdown = "1. First item\n2. Second item\n3. Third item\n    1. Indented item 1\n    2. Indented item 1\n4. Fourth item";
    const html = markdownToHtml(markdown);
    const expected = `<ol start="1"><li>First item</li><li>Second item</li><li>Third item<ol start="1" type="a"><li>Indented item 1</li><li>Indented item 1</li></ol></li><li>Fourth item</li></ol>`;
    expect(html).toEqual(expected);
});





