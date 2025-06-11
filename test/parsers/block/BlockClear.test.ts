import { markdownToHtml } from "@/parsers/markdown";
import { expect, test } from "vitest";

test("single clear", () => {
    const html = markdownToHtml("one\n\n[clear]\n\ntwo");
    expect(html).toEqual(`<p>one</p><p style="clear: both; height: 0;"></p><p>two</p>`);
});
