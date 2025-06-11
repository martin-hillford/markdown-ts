import { Alignment, Block } from "@/types";
import { Context } from "@/types/Context";
import { getAttribute } from "@/util/getAttribute";
import { BlockParser } from "./BlockParser"
import { renderInline } from "@/parsers/render";

/**
 * @remarks Only use this parser for know paragraph instances!
 */
export class Paragraph extends BlockParser {

    allowedInParent = () => true;

    isMatch = (_: string) => true;

    getParser = () => this;

    render(block: Block) {
        if(block.parser !== this) return ''

        const alignment = getAlignment(block.text, this.context);
        const className = getAttribute('class', alignment === Alignment.None ? null : alignment);

        // Ensure to NOT render the alignment information
        let { text } = block;
        if(alignment !== Alignment.None) text = text.substring(text.indexOf(']') + 1).trim();
        const lines = text.split("\n");
        const content = lines
            .map(line => renderInline(line, this.context))
            .map(value => value.trim()) // ensure that no additional spaces are added
            .map(linebreak) // if the line does not end with <br/> a space should be added.
            .join('')
            .trim();

        const dir = getAttribute('dir',this.context.dir);
        return `<p${dir}${className}>${content}</p>`;
    }
}

const linebreak = (value: string) =>
    value.endsWith('<br/>') ? value.trim() : value + ' ';

const getAlignment = ( text : string, context: Context ) => {
    if(text.startsWith(`[${Alignment.Right}]`)) return Alignment.Right;
    if(text.startsWith(`[${Alignment.Center}]`)) return Alignment.Center;
    if(text.startsWith(`[${Alignment.Justify}]`)) return Alignment.Justify;
    if(text.startsWith(`[${Alignment.Left}]`)) return Alignment.Left;
    return context.defaultAlignment ?? Alignment.None;
}
