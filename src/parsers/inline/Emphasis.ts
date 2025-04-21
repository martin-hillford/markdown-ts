import { Abstract } from "./Abstract";
import { renderInline } from "@/parsers/render";

export class Emphasis extends Abstract {

    // All the regexps to match the proper emphasis
    // note: the array matched in order. So string match the *** and it's variants, then ** or __ and finally * or _
    protected readonly regexp = [
        { regexp: /\*[*_]{2}[^_?]+[*_]{2}\*/, start: '*', end: '*' }, // this matches *** and *__
        { regexp: /_[*_]{2}[^_?]+[*_]{2}_/, start: '_', end: '_' }, // this matches __ and _**
        { regexp: /(^|[^*])\*{2}[^*?]+\*{2}([^*]|$)/, start: '*', end: '*' }, // this matches ** but not ***
        { regexp: /(^|[^_])_{2}[^_?]+_{2}([^_]|$)/, start: '_', end: '_' }, // this matches __ but not ___
        { regexp: /(^|[^*])\*[^*?]+\*([^*]|$)/, start: '*', end: '*' }, // this matches * but not **
        { regexp: /(^|[^_])_[^_?]+_([^_]|$)/, start: '_', end: '_' }, // this matches _ but not __
    ];

    render(content: string)  {
        const regexp =  /([*_]{1,3}).*?/;
        const result = regexp.exec(content);
        if(result === null) return content;
        const count = result[0].length;

        const text = content.substring(count, content.length - count);
        const children = renderInline(text, this.context);

        if(count === 3) return `<strong><em>${children}</em></strong>`;
        if(count === 2) return `<strong>${children}</strong>`;
        return `<em>${children}</em>`;
    }
}
