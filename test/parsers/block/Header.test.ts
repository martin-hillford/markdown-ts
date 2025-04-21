import { markdownToHtml } from "@/parsers/markdown";
import { expect, test } from "vitest";

test("header-h1", () => {
    const html = markdownToHtml("# header");
    expect(html).toEqual(`<h1>header</h1>`);
});

test("header-h2", () => {
    const html = markdownToHtml("## header");
    expect(html).toEqual(`<h2>header</h2>`);
});

test("header-h3", () => {
    const html = markdownToHtml("### header");
    expect(html).toEqual(`<h3>header</h3>`);
});

test("header-h4", () => {
    const html = markdownToHtml("#### header");
    expect(html).toEqual(`<h4>header</h4>`);
});

test("header-h5", () => {
    const html = markdownToHtml("##### header");
    expect(html).toEqual(`<h5>header</h5>`);
});

test("header-h6", () => {
    const html = markdownToHtml("###### header");
    expect(html).toEqual(`<h6>header</h6>`);
});

test("header-inline-bold", () => {
    const html = markdownToHtml("###### **header**");
    expect(html).toEqual(`<h6><strong>header</strong></h6>`);
});

test("header-with-id", () => {
    const html = markdownToHtml("### My Great Heading {#custom-id}");
    expect(html).toEqual(`<h3 id="custom-id">My Great Heading</h3>`);
});
