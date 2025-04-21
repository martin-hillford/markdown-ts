import { Abstract } from "./Abstract";
import { renderInline } from "@/parsers/render";

export class Superscript extends Abstract {

    // please note: if a line starts and ends with a backtick then it
    // is considered being a code block (see the CodeBlock parser)
    protected readonly regexp = [
        { regexp: /\^\(.+?\)/, start: '^', end: ')' }
    ]

    render(content: string) {
        const text = content.substring(2, content.length - 1);
        const value = renderInline(text, this.context);
        return `<sup>${value}</sup>`;
    }
}
