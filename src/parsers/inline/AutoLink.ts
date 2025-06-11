import { Annotation, IInlineParser } from "@/types";

const regexp =  /(?:https?:\/\/.)?(?:www\.)?[-a-zA-Z0-9@%._+~#=]{2,256}\.[a-z]{2,6}\b[-a-zA-Z0-9@:%_+.~#?&\/=]*/;

// There are now three options
// 1) this is auto-detected link (so now < or ` can be found in frond of it
// 2) this is an explicitly created link with < >
// 3 this is link that should not be turned into a link because it is surrounded by backticks

export class AutoLink implements IInlineParser {

    getIndex(text: string): number | null {
       const { index } = this.getIndexInfo(text);
       return index;
    }

    parse(text: string | null | undefined): Annotation | null {
        const { index, suffix = '', prefix = '', match } = this.getIndexInfo(text);
        if(index === null) return null;

        const url = prefix === ''
            ? text!.substring(match.index, match.index + match[0].length)
            : text!.substring(match.index, text!.indexOf(suffix, match.index));

        const head = text!.substring(0, match!.index - prefix.length);
        const tail = text!.substring(match!.index + url.length + suffix.length);

        const render = () => prefix === '`' ? url : `<a href="${url}">${url}</a>`;
        return { head, tail, render, content: '' };
    }

    private getIndexInfo(text: string | null | undefined) {
        if(text === null || text === undefined) return { index: null }
        const match = regexp.exec(text);
        if(match === null || match.length === 0) return { index: null, match }
        if(match.index === 0) return { index: 0, match }

        // Ensure to ignore complete links and deal correctly with backticks
        const char = text.charAt(match.index - 1);
        if(char == '(') return { index: null, match };
        else if(char === '`') return { index: match.index -1, prefix: '`', suffix: '`', match };

        // Explicit links are more complex, since the < and > character is used.
        // and they be filtered if html is forbidden
        else if(char === '<') return { index: match.index -1, prefix: '<', suffix: '>', match };
        if(match.index < 4) return { index: match.index, match };
        const before = text.substring(match.index - 4, match.index);
        if(before === '&lt;') return { index: match.index - 4, prefix: '&lt;', suffix: '&gt;', match };

        // Auto detect case
        return { index: match.index, match };
    }
}
