// noinspection HtmlUnknownAttribute

import { Block } from "@/types/block";
import { IBlockParser } from "@/types/IBlockParser";
import { DocumentParser } from "@/parsers/DocumentParser";
import { Paragraph } from "@/parsers/block/Paragraph";
import { Context } from "@/types/Context";
import { strip } from "@/util/strip";

export class Footnote implements IBlockParser {

    protected readonly context: Context;

    constructor(context: Context) { this.context = (context); }

    parseBlock(text: string, hasParent: boolean, _: DocumentParser): Block | null {
        if (hasParent) return null;

        const parser =  new Paragraph(this.context);
        const paragraph = parser.parseBlock(text.substring(text.indexOf(" ") + 1)) as Block;
        const content = text.substring(2, text.indexOf(']'));
        return new Block(this, content, [paragraph]);
    }

    allowedInParent(): boolean { return true; }

    isMatch(text: string) : boolean {
        if(text.length < 5) return false;
        return /^\[\^[a-z|0-9\-_]+]: /g.test(text)
    }

    render(block: Block)  {
        if(block.parser !== this) return '';

        // If no ref can be found don't display it as it will confuse the reader
        const contains = this.context?.document?.footnotes?.includes(block.text);
        if(!contains) return '';

        // create the content of the blocks
        const content = block.blocks?.map(b => b.render()).join('') ?? '';

        // Creat the html
        const html = ` 
            <div class="footnote">
                <div class="footnote-ref"><a id={\`reference_${block.text}\`}>{block.text}.</a></div>
                <div class="footnote-content">${content}</div>
            </div>
        ` as string;
        return strip(html);
    }
}
