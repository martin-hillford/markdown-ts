import { markdownToHtml } from "@/parsers/markdown";
import { expect, test } from "vitest";

test("singe-line-blockquote", () => {
    const html = markdownToHtml("> test case");
    expect(html).toEqual("<blockquote><p>test case</p></blockquote>");
});

test("multi-line-blockquote", () => {
    const html = markdownToHtml("> a\n> b\n> c");
    expect(html).toEqual("<blockquote><p>a b c</p></blockquote>");
});

test("multi-line-blockquote", () => {
    const html = markdownToHtml("> a  \n> b  \n> c");
    expect(html).toEqual("<blockquote><p>a<br/>b<br/>c</p></blockquote>");
});

test("blockquote - html entities", () => {
    const html = markdownToHtml("> a <style></style> and  \n> b  \n> c  ");
    expect(html).toEqual("<blockquote><p>a &lt;style&gt;&lt;/style&gt; and<br/>b<br/>c</p></blockquote>");
});
