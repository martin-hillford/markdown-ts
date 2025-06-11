import { Block } from "@/types";
import { BlockParser } from "./BlockParser"
import { Context } from "@/types/Context";

export class CodeBlock extends BlockParser {

    constructor(context: Context) { super(context); }

    allowedInParent = () => true;

    isMatch(text: string) : boolean {
        if(text.length < 2) return false;
        return /^`{3}/g.test(text) && /`{3}$/g.test(text)
    }

    getParser = () => this;

    render(block: Block) {
        if(block.parser !== this) return '';

        let code = block.text.substring(3, block.text.length - 3).trim();
        if(code.startsWith("\n")) code = code.substring(1);

        if(code.startsWith('&#13;')) code = code.substring(5);
        if(code.endsWith('&#13;')) code = code.substring(0, code.length - 5);
        code = code.replace('&#13;', '\t');

        return `<pre style="display: block">${code}</pre><br/>`;
    }
}
