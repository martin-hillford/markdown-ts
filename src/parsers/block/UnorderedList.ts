import { BlockParser } from "./BlockParser"
import { Block, ListItem } from "@/types";
import { startsEveryLineWith } from '@/util/string'
import { clearLineUnorderedList, parse } from "@/util/list";
import { renderInline } from "@/parsers/render";

export class UnorderedList extends BlockParser {

    allowedInParent(): boolean { return true; }

    isMatch(text: string) : boolean {
        return startsEveryLineWith(text,/^ *\* /) ||
               startsEveryLineWith(text,/^ *- /) ||
               startsEveryLineWith(text,/^ *\+ /);
    }

    getParser = () => this;

    render(block: Block)  {
        if(block.parser !== this) return '';
        const { items } = parse(block.text, clearLineUnorderedList);
        return this.getList(items, 0);
    }

    private getList(items: ListItem[], _ : number) : string {
        if(!items || items.length === 0) return '';
        const rendered = items.map(item => this.getItem(item)).join('');
        return `<ul>${rendered}</ul>` as string;
    }

    private getItem(item : ListItem) : string {
        const text = renderInline(item.text, this.context);
        const list = this.getList(item.sub, item.level + 1);
        return `<li>${text}${list}</li>` as string;
    }
}
