import { Abstract } from "./Abstract";
import { renderInline } from "@/parsers/render";

export class StrikeThrough extends Abstract {

    // All the regexps to match the proper emphasis
    protected readonly regexp = [
        { regexp: /~{2}.+?~{2}/, start: '~', end: '~' },
    ];

    render(content: string)  {
        const text = content.substring(2, content.length - 2);
        const children = renderInline(text, this.context);
        return `<span style="text-decoration:line-through">${children}</span>`;
    }
}
