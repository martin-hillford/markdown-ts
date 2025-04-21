import { IBlockParser } from "@/types/IBlockParser";

/**
 * A block represents a parsed block structure that can be rendered.
 * @remarks The block may contain blocks and the render method of the
 * block may contain additional parsing
 */
export class Block {

    readonly parser: IBlockParser;

    readonly text : string;

    readonly blocks? : Block[];

    constructor(parser: IBlockParser, text: string, blocks?: Block[]) {
        this.parser = parser;
        this.text = text;
        this.blocks = blocks;
    }

    public render() {
        return this.parser.render(this);
    }
}
