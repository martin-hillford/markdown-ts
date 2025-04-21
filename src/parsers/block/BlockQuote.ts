import { Block } from "@/types/block";
import { IBlockParser } from "@/types/IBlockParser";
import { DocumentParser } from "@/parsers/DocumentParser";
import { startsEveryLineWith } from '@/util/string'
import { Context } from "@/types/Context";

export class BlockQuote implements IBlockParser {

    protected readonly context: Context;

    constructor(context: Context) { this.context = (context); }

    parseBlock(text: string, hasParent: boolean, docParser: DocumentParser): Block | null {

        if (hasParent) return null;
        if(!this.isMatch(text)) return null;

        // BlockQuotes are special since they can have blocks within them.
        let content = text
            .substring(1)
            .replaceAll("\n>","\n")

        const blocks = docParser.getBlocks(content, true);
        return new Block(this, text, blocks);
    }

    allowedInParent(): boolean { return false; }

    isMatch(text: string): boolean {
        return startsEveryLineWith(text, /^>/);
    }

    render(block: Block)  {
        if(block.parser !== this || !block.blocks) return '';
        const content = block.blocks?.map(b => b.render()).join('') ?? '';
        return `<blockquote>${content}</blockquote>`;
    }
}
