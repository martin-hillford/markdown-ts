import { Context } from "@/types/Context";
import { IInlineParser } from "@/types";

export const getNextAnnotation = (text : string | null | undefined, context: Context) => {

    const { inlineParsers } = context;

    if(!text || text === '' || !inlineParsers) return null;
    const parsers = inlineParsers ?? [];

    // For each of the parses get the index so that can be determined which is the first matching
    let match = { index: text.length, parser : null} as { index: number; parser : null | IInlineParser };

    for(let index = 0; index < parsers.length; index++) {
        const parser = parsers[index];
        const textIndex = parser.getIndex(text);
        if(textIndex != null && textIndex < match.index) match = { index: textIndex, parser : parsers[index] };
    }

    return match.parser?.parse(text) ?? null;
}
