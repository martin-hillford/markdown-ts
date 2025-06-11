import { Document, Block } from "@/types";
import { Footnote } from "@/parsers/block/Footnote";
import { Paragraph } from "@/parsers/block/Paragraph";
import { Context } from "@/types/Context";

const indent = "    ";

export class DocumentParser
{
    private readonly context : Context;

    constructor(context : Context)  {
        this.context = context
    }

    public parse(text: string) {
        return {
            blocks : this.getBlocks(text, false),
            footnotes : this.getRefs(text)
        } as Document;
    }

    public getBlocks(text : string, hasParent : boolean) {
        // Do text cleanup and split the text on blank lines
        if(!text) return [];
        let prepare = text
            .replace(/\r/g,'')
            .replace(/\n{3,}/g,"\n\n");

        // Code blocks are special as they can span multiple blocks
        // this method deals with that
        const textBlocks = protoBlocks(prepare).split("\n\n");

        // Prepare the variables
        const blocks = [] as Block[];
        let previous = null as Block | null;

        textBlocks.forEach(text => {
            const block = this.parseBlock(text, hasParent);

            // Dealing with the special case of footnotes and their indenting
            if(previous?.parser instanceof Footnote && text.startsWith(indent)) {
                const child = this.parseBlock(text, true);
                return previous.blocks?.push(child);
            }

            // General case
            previous = block;
            return blocks.push(block);
        })

        return blocks;
    }

    private parseBlock = (text : string, hasParent : boolean) => {
        const blockParsers = this.context.blockParsers ?? [];

        for(let index = 0; index < blockParsers.length; index++) {
            const parser = blockParsers[index];
            if(hasParent && !parser.allowedInParent()) continue;
            if(!parser.isMatch(text, hasParent)) continue;
            const block = parser.parseBlock(text, hasParent, this);
            if(block !== null) return block;
        }

        // If no block parser is matched, it is simply a paragraph
        // Nb. as the paragraph parser matches always, always a block is returned
        return (new Paragraph(this.context)).parseBlock(text) as Block;
    }

    private getRefs(text : string) {
        const regexp = /\[\^[a-z|0-9\-_]+]($|[^:])/g;
        let match = null as null | RegExpExecArray
        const labels = [] as string[];

        while((match=regexp.exec(text)) !== null) {
            const label = match[0].substring(2,match[0].indexOf(']'));
            labels.push(label);
        }

        return labels;
    }
}

// The protoBlocks works in conjunction with the code block to proper render code blocks
const protoBlocks = (value: string) => {

    let reconstruct = '';
    let codeOpen = false
    const lines = value.split("\n");
    const ticks = '```';

    lines.forEach(line => {
        const hasTick = line.startsWith(ticks);
        if(!hasTick && !codeOpen) reconstruct += "\n" + line;
        else if(!hasTick && codeOpen) reconstruct += "&#13;" + line;
        else if(hasTick && !codeOpen) { reconstruct += `\n${ticks}`; codeOpen = true; }
        else if(hasTick && codeOpen) { reconstruct += `&#13;${ticks}\n\n`; codeOpen = false; }
    });

    return reconstruct.trim();
}
