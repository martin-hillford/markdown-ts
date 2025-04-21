import {Annotation, IInlineParser} from "@/types";
import { Context } from "@/types/Context";

export abstract class Abstract implements IInlineParser {

    protected readonly context: Context;

    protected abstract readonly regexp: { regexp: RegExp, start: string, end: string }[];

    constructor(context: Context) { this.context = context; }

    getIndex(text: string): number | null {
        if (!text || text === '') return null;

        let foundIndex = null;
        for(let index = 0; index < this.regexp.length; index += 1) {
            const match = this?.regexp[index]?.regexp.exec(text);
            if(match?.index == null) continue;
            if(!foundIndex || match.index < foundIndex) foundIndex = match.index;
        }

        return foundIndex;
    }

    parse(text: string | undefined | null) {
        if (!text || text === '') return null;

        for(let index = 0; index < this.regexp.length; index += 1) {
            const match = this.regexp[index];
            const result = this.find(text, match);
            if(result !== null) return result;
        }

        return null;
    }

    private find(text: string, match : { regexp: RegExp, start: string, end: string}): Annotation | null {
        const { start, end, regexp } = match;

        const result = regexp.exec(text);
        if(result == null) return null;

        // something for matching purposes an additional first and last character is used in the match
        let startIndex = result.index;
        while(text[startIndex] !== start) startIndex++;

        let endIndex = result.index + result[0].length;
        while(text[endIndex] !== end) endIndex--;

        // Get the head, content and tail
        const head = text.substring(0,startIndex);
        const content = text.substring(startIndex, endIndex + 1);
        const tail = text.substring( endIndex + 1);

        // Return the result
        return { head, content, render : () => this.render(content), tail }
    }

    protected abstract render(content: string): string;
}
