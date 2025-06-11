import { markdownToHtml } from "@/parsers/markdown";
import { expect, test } from "vitest";

test("simple-table", () => {
    const markdown = "| abc | def |\n| --- | --- |\n| 123 | 456 |";
    const html = markdownToHtml(markdown);
    const expected = "<table><tbody>"
        + "<tr class=\"header\"><td class=\"none\">abc</td><td class=\"none\">def</td></tr>"
        + "<tr><td class=\"none\">123</td><td class=\"none\">456</td></tr></tbody></table>";
    expect(html).toEqual(expected);
});

test("spanned-table", () => {
    const markdown = "| abc       |\n| --- | --- |\n| 123 | 456 |";
    const html = markdownToHtml(markdown);
    const expected = "<table><tbody>"
        + "<tr class=\"header\"><td colspan=\"2\">abc</td></tr>"
        + "<tr><td class=\"none\">123</td><td class=\"none\">456</td></tr></tbody></table>";
    expect(html).toEqual(expected);
});

test("left-table", () => {
    const markdown = "| abc | def |\n|:--- |:--- |\n| 123 | 456 |";
    const html = markdownToHtml(markdown);
    const expected = "<table><tbody>"
        + "<tr class=\"header\"><td class=\"left\">abc</td><td class=\"left\">def</td></tr>"
        + "<tr><td class=\"left\">123</td><td class=\"left\">456</td></tr></tbody></table>";
    expect(html).toEqual(expected);
});

test("right-table", () => {
    const markdown = "| abc | def |\n| ---:| ---:|\n| 123 | 456 |";
    const html = markdownToHtml(markdown);
    const expected = "<table><tbody>"
        + "<tr class=\"header\"><td class=\"right\">abc</td><td class=\"right\">def</td></tr>"
        + "<tr><td class=\"right\">123</td><td class=\"right\">456</td></tr></tbody></table>";
    expect(html).toEqual(expected);
});

test("center-table", () => {
    const markdown = "| abc | def |\n|:---:|:---:|\n| 123 | 456 |";
    const html = markdownToHtml(markdown);
    const expected = "<table><tbody>"
        + "<tr class=\"header\"><td class=\"center\">abc</td><td class=\"center\">def</td></tr>"
        + "<tr><td class=\"center\">123</td><td class=\"center\">456</td></tr></tbody></table>";
    expect(html).toEqual(expected);
});

test("mixed-table", () => {
    const markdown = "| abc | def |\n|:--- | ---:|\n| 123 | 456 |";
    const html = markdownToHtml(markdown);
    const expected = "<table><tbody>"
        + "<tr class=\"header\"><td class=\"left\">abc</td><td class=\"right\">def</td></tr>"
        + "<tr><td class=\"left\">123</td><td class=\"right\">456</td></tr></tbody></table>";
    expect(html).toEqual(expected);
});
