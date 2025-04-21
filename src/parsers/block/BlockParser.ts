import { IBlockParser } from "@/types/IBlockParser";
import { Block } from "@/types/block";
import { Context } from "@/types/Context";

export abstract class BlockParser implements IBlockParser {

    protected readonly context: Context;

    constructor(context: Context) { this.context = context; }

    abstract allowedInParent() : boolean;

    parseBlock(text: string): Block | null {
        if(!this.isMatch(text)) return null;
        return new Block(this.getParser(), text, []);
    }

    abstract getParser() : IBlockParser;

    abstract isMatch(text: string): boolean;

    abstract render(block: Block): string;
}

