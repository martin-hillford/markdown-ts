import { Block } from "@/types";
import { getAttribute } from "@/util/getAttribute";
import { BlockParser } from "./BlockParser"
import { renderInline } from "@/parsers/render";
import { getText } from "@/util/header";

export class Header extends BlockParser {

    allowedInParent = () => true;

    isMatch(text: string): boolean {
        // A header should start with 1 till 6 # and be a single line
        return text.indexOf("\n") === -1 && /^#{1,6} /.test(text);
    }

    getParser() { return this; }

    render(block: Block)  {
        if(block.parser !== this) return '';

        const level = block.text.indexOf(' ');
        const [ text, id ] = getText(block.text, level);
        if(text === "") return '';

        return this.getHeader(level,id, text);
    }

    public getHeader(level: number, id: string | undefined, text: string) {
        const content = renderInline(text, this.context);
        const hid = getAttribute('id',id);
        return `<h${level}${hid}>${content}</h${level}>`;
    }
}
