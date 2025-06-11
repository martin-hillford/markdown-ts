// noinspection HtmlUnknownTarget

import { markdownToHtml } from "@/parsers/markdown";
import { expect, test } from "vitest";

test("image render simple", () => {
    const expected = `<p><img alt="text" src="/image.jpg" /></p>`;
    const html = markdownToHtml("![text](/image.jpg)");
    expect(html).toEqual(expected);
});

test("image render with title", () => {
    const expected = `<p><img alt="text" title="title" src="/image.jpg" /></p>`;
    const html = markdownToHtml(`![text](/image.jpg "title")`);
    expect(html).toEqual(expected);
});

test("image render with width in pixel", () => {
    const expected = `<p><img style="width:100px;" alt="text" title="title" src="/image.jpg" /></p>`;
    const html = markdownToHtml(`![text](/image.jpg 100px "title")`);
    expect(html).toEqual(expected);
});

test("image render with width in percentage", () => {
    const expected = `<p><img style="width:75%;" alt="text" title="title" src="/image.jpg" /></p>`;
    expect(markdownToHtml(`![text](/image.jpg 75% "title")`)).toEqual(expected);
    expect(markdownToHtml(`![text](/image.jpg 75 "title")`)).toEqual(expected);
});

test("image render with width 100%", () => {
    const expected = `<p><img style="width:100%;" alt="text" title="title" src="/image.jpg" /></p>`;
    expect(markdownToHtml(`![text](/image.jpg 100% "title")`)).toEqual(expected);
    expect(markdownToHtml(`![text](/image.jpg 100 "title")`)).toEqual(expected);
    expect(markdownToHtml(`![text](/image.jpg 300 "title")`)).toEqual(expected);
});

test("image render left alignment", () => {
    const expected = `<p><img class="left" alt="text" title="title" src="/image.jpg" /></p>`;
    expect(markdownToHtml(`![text](/image.jpg left "title")`)).toEqual(expected);
});

test("image render right alignment", () => {
    const expected = `<p><img class="right" alt="text" src="/image.jpg" /></p>`;
    expect(markdownToHtml(`![text](/image.jpg right)`)).toEqual(expected);
});
