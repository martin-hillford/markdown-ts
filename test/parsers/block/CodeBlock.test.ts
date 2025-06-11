import { markdownToHtml } from "@/parsers/markdown";
import { expect, test } from "vitest";

test("simple-code", () => {
    const html = markdownToHtml("```\nconst test = 10;\n```");
    expect(html).toEqual("<pre style=\"display: block\">const test = 10;</pre><br/>");
});

test("code with spaces", () => {
    const html = markdownToHtml("```\n    const test = 10;\n```");
    expect(html).toEqual("<pre style=\"display: block\">    const test = 10;</pre><br/>");
});

test("code with spaces", () => {
    const html = markdownToHtml("```\n\t const test = 10;\n```");
    expect(html).toEqual("<pre style=\"display: block\">\t const test = 10;</pre><br/>");
});
