import { Block, ListItem } from "@/types";
import { getAttribute } from "@/util/getAttribute";
import { BlockParser } from "./BlockParser"
import { startsEveryLineWith } from '@/util/string'
import { Context } from "@/types/Context";
import { clearLineOrderedList, parse } from "@/util/list";
import { renderInline } from "@/parsers/render";

export class OrderedList extends BlockParser {

    constructor(context: Context) { super(context); }

    allowedInParent = () => true;

    isMatch(text: string) : boolean {
        return startsEveryLineWith(text,/^ *\d+./);
    }

    getParser() { return this; }

    render(block: Block)  {
        if(block.parser !== this) return '';
        const { items, start } = parse(block.text, clearLineOrderedList);
        return this.getList(items, 0, start);
    }

    private getList(items: ListItem[], level : number, start: number = 1) : string {

        if(!items || items.length === 0) return '';
        const type = getAttribute('type',(level % 2 === 0) ? undefined : "a");

        const rendered = items.map(item => this.getItem(item)).join('');
        return `<ol start="${start}"${type}>${rendered}</ol>` as string;
    }

    private getItem(item : ListItem) : string {
        const text = renderInline(item.text, this.context);
        const list = this.getList(item.sub, item.level + 1);
        return `<li>${text}${list}</li>` as string;
    }
}
