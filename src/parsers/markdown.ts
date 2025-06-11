import { DocumentParser } from "@/parsers/DocumentParser";
import { IBlockParser, IInlineParser, Variable } from "@/types";
import { getInlineParsers } from "@/parsers/inline/getInlineParsers";
import { Context } from "@/types/Context";
import { getBlockParsers } from "@/parsers/block/getBlockParsers";
import { removeHtml } from "@/util/removeHtml";
import { strip } from "@/util/strip";

export interface Options {
    getBlockParsers?: (context: Context) => IBlockParser[]
    getInlineParsers?: (context: Context) => IInlineParser[]
    variables? : Variable[]
    dir?: "ltr" | "rtl" | 'auto',
    lang?: string
    className?: string,
    defaultAlignment?: "left" | "right" | "justify"
    allowHtml?: boolean
}

export const markdownToHtml = (text: string, options?: Options) => {

    // ensure that no html is inserted through the text
    if(!options?.allowHtml) text = removeHtml(text);

    const context = createContext(options);
    const documentParser = new DocumentParser(context);
    context.document = documentParser.parse(text);

    const blocks = context.document.blocks.map(block => block.render());
    return strip(blocks.join(''));
}


const createContext = (options?: Options) => {
    const context = { ...options } as Context;

    context.blockParsers = [
        ...(options?.getBlockParsers ? options?.getBlockParsers(context) : []),
        ...getBlockParsers(context)
    ];
    context.inlineParsers = [
        ...(options?.getInlineParsers ? options?.getInlineParsers(context) : []),
        ...getInlineParsers(context)
    ];
    return context;
}

