// noinspection HtmlUnknownAttribute, HtmlUnknownAnchorTarget

import { markdownToHtml } from "@/parsers/markdown";
import { removeWhiteSpace } from "@/util/strip";
import { expect, test } from "vitest";

test("simple-footnote", () => {
    const markdown = "this is a footnote[^1]\n\n[^1]: explanation\n\n";
    const expected = `
        <p>this is a footnote<a class="footnote" href="#footnote-1"><sup>1</sup></a></p>
        <div class="footnote">
            <div class="footnote-ref"><a id={\`reference_1\`}>{block.text}.</a></div>
            <div class="footnote-content"><p>explanation</p></div>
        </div>
    `;
    const stripped = removeWhiteSpace(expected);
    const html = markdownToHtml(markdown);
    expect(html).toEqual(stripped);
});
