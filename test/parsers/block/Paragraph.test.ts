import { Options, markdownToHtml } from "@/parsers/markdown";
import { expect, test } from "vitest";

test("singe-line-paragraph", () => {
    const html = markdownToHtml("test case");
    expect(html).toEqual("<p>test case</p>");
});

test("multi-line-paragraph", () => {
    const html = markdownToHtml("a\nb\nc");
    expect(html).toEqual("<p>a b c</p>");
});

test("line-break-paragraph", () => {
    const html = markdownToHtml("a  \nb  \nc  ");
    expect(html).toEqual("<p>a<br/>b<br/>c</p>");
});

test("double-paragraph", () => {
    const html = markdownToHtml("one\n\ntwo");
    expect(html).toEqual("<p>one</p><p>two</p>");
});

test("double-paragraph", () => {
    const options = { defaultAlignment: "left" } as Options;
    const html = markdownToHtml("one\n\ntwo", options);
    expect(html).toEqual("<p class=\"left\">one</p><p class=\"left\">two</p>");
});
