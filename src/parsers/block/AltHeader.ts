import { Block } from "@/types";
import { BlockParser } from "./BlockParser"
import { getText } from "@/util/header";
import { Context } from "@/types/Context";
import { Header } from "./Header";

export class AltHeader extends BlockParser {

    constructor(context: Context) { super(context); }

    allowedInParent = () => true;

    isMatch(text: string) : boolean {
        // An alt header must have 2 lines.
        // The second should have 3 or more, for an H1 or 3 or more = for an H2
        const count = (text.match(/\n/g) || []).length;
        if(count !== 1) return false;
        return /\n-{3,}$/.test(text) || /\n={3,}$/.test(text);
    }

    getParser = () => this;

    render(block: Block) {
        if(block.parser !== this) return '';
        const lines = block.text.split("\n");
        const level = lines[1][0] === '=' ? 1 : 2;
        const [ text, id ] = getText(lines[0], level);
        const content = block.text.substring(0, level) + text;

        // Simple reuse the header render function here
        const header = new Header(this.context) as Header;
        return header.getHeader(level,id, content);
    }
}
