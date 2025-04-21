import { expect, test } from "vitest";
import { markdownToHtml } from "@/parsers/markdown";

test("Autolink - link only", () =>{
    const expected = `<p><a href="https://www.apple.com">https://www.apple.com</a></p>`
    const html = markdownToHtml(`https://www.apple.com`);
    expect(html).toEqual(expected);
});

test("AutoLink - Link in text", () =>{
    const expected = `<p>go to <a href="https://www.apple.com">https://www.apple.com</a></p>`
    const html = markdownToHtml(`go to https://www.apple.com`);
    expect(html).toEqual(expected);
});

test("AutoLink - Backtick link", () =>{
    const expected = `<p>go to https://www.apple.com for more information</p>`
    const html = markdownToHtml('go to `https://www.apple.com` for more information');
    expect(html).toEqual(expected);
});

test("Autolink - explicit link only", () =>{
    const expected = `<p><a href="https://www.apple.com">https://www.apple.com</a></p>`
    const html = markdownToHtml(`<https://www.apple.com>`);
    expect(html).toEqual(expected);
});

test("AutoLink - Explicit link in text", () =>{
    const expected = `<p>go to <a href="https://www.apple.com">https://www.apple.com</a> for more information</p>`
    const html = markdownToHtml(`go to <https://www.apple.com> for more information`);
    expect(html).toEqual(expected);
});

test("AutoLink - Explicit and backtick link in text", () =>{
    const expected = `<p>go to <a href="https://www.apple.com">https://www.apple.com</a> but not to https://www.google.com for more information</p>`
    const html = markdownToHtml("go to <https://www.apple.com> but not to `https://www.google.com` for more information");
    expect(html).toEqual(expected);
});

test("AutoLink - Explicit and backtick link in text", () =>{
    const expected = `<p>go to <a href="https://www.apple.com">https://www.apple.com</a> but not to https://www.google.com for more information</p>`
    const markdown = "go to <https://www.apple.com> but not to `https://www.google.com` for more information";
    const html = markdownToHtml(markdown, { allowHtml: true });
    expect(html).toEqual(expected);
});
