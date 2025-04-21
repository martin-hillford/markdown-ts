import { Block } from "@/types";
import { BlockParser } from "./BlockParser"
import { Context } from "@/types/Context";

export class HorizontalLine extends BlockParser {

    constructor(context: Context) { super(context); }

    allowedInParent = () => false;

    isMatch(text: string) : boolean {
        return /^\*{3,}$/g.test(text) || /^_{3,}$/g.test(text) || /^-{3,}$/g.test(text);
    }

    getParser = () => this;

    render(block: Block)  {
        if(block.parser !== this) return '';
        return '<hr/>';
    }
}
