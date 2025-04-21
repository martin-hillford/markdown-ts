import { markdownToHtml } from "@/parsers/markdown";
import { expect, test } from "vitest";

test("emphasis render strong", () => {
    const expected = `<p>this is <strong>strong</strong></p>`;
    expect(markdownToHtml("this is **strong**")).toEqual(expected);
    expect(markdownToHtml("this is __strong__")).toEqual(expected);
});

test("emphasis render italic", () => {
    const expected = `<p>this is <em>italic</em></p>`;
    expect(markdownToHtml("this is *italic*")).toEqual(expected);
    expect(markdownToHtml("this is _italic_")).toEqual(expected);
});

test("emphasis render strong and italic", () => {
    const expected = `<p>this is <strong><em>strong and italic</em></strong></p>`;
    expect(markdownToHtml("this is ***strong and italic***")).toEqual(expected);
    expect(markdownToHtml("this is ___strong and italic___")).toEqual(expected);
});

test("emphasis render strong and italic mixed", () => {
    const expected = `<p>this is <strong><em>strong and italic</em></strong></p>`;
    // expect(markdownToHtml("_**strong and italic**_")).toEqual(expected);
    expect(markdownToHtml("this is __*strong and italic*__")).toEqual(expected);
    expect(markdownToHtml("this is **_strong and italic_**")).toEqual(expected);
    expect(markdownToHtml("this is *__strong and italic__*")).toEqual(expected);
    expect(markdownToHtml("this is _**strong and italic**_")).toEqual(expected);

});
