import { Block } from "@/types/block";
import { DocumentParser } from "@/parsers/DocumentParser";

export interface IBlockParser
{
    /**
     * Parses the text into a block. If the block could not be parsed, null is return
     * @param text The text to parse
     * @param hasParent True is this block is wrapped into a parent
     * @param docParser The document parser that is calling this block parser
     */
    parseBlock(text: string, hasParent : boolean, docParser: DocumentParser) : Block | null;

    /**
     * Determines if the given text is in match this block
     * @param text The text to parse
     * @param hasParent True is this block is wrapped into a parent
     * @returns True when the markings of this block are matching else false.
     */
    isMatch(text: string, hasParent : boolean): boolean;

    /**
     * Some blocks (like headers) are not allowed in a parent (e.g. a blockQuote).
     * But some blocks (like a list) are allowed in a parent.
     * @returns true when allowed in a parent, else false.
     */
    allowedInParent() : boolean;

    /**
     * This method will render the given block.
     * If the block could not be rendered by this parser, return null
     * @param block
     */
    render(block : Block) : string;
}
