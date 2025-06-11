import { Block } from "@/types";
import { BlockParser } from "./BlockParser"
import { Context } from "@/types/Context";

export class BlockClear extends BlockParser {

    constructor(context: Context) { super(context); }

    allowedInParent = () => true;

    isMatch(text: string) : boolean {
        return text === "[clear]";
    }

    getParser = () => this;

    render(block: Block)  {
        if(block.parser !== this) return '';
        return `<p style="clear: both; height: 0;"></p>`;
    }
}
