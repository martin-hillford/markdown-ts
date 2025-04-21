import { markdownToHtml } from "@/parsers/markdown";
import { expect, test } from "vitest";

const variables = [
    { key : 'name', render: () => "Peter" },
    { key : 'date', render: () => "11 december" }
]
const options = { variables };

test("variable - name ", () => {
    const expected = `<p>His name is Peter</p>`;
    const html = markdownToHtml("His name is @name", options);
    expect(html).toEqual(expected);
});

test("variable - date ", () => {
    const expected = `<p>toady is 11 december 2025</p>`;
    const html = markdownToHtml("toady is @date 2025", options);
    expect(html).toEqual(expected);
});
