import { Block, Alignment, Table as Type } from "@/types";
import { BlockParser } from "./BlockParser"
import { startsEveryLineWith } from '@/util/string'
import { parseTable } from "@/util/parseTable";
import { renderInline } from "@/parsers/render";

export class Table extends BlockParser {

    allowedInParent(): boolean {
        return true;
    }

    isMatch = (text: string) => startsEveryLineWith(text, /^\|/);

    getParser = () => this;

    render(block: Block) {
        if (block.parser !== this) return '';
        const table = parseTable(block.text);

        const rows = table.rows.map((row: string[]) => {
            const cells = this.renderCells(table, row);
            return `<tr>${cells}</tr>` as string;
        });

        const head = this.renderHead(table);
        return `<table><tbody>${head}${rows}</tbody></table>  `;
    }

    private renderHead(table: Type,) {
        if (!table.header) return '';
        const single = table.header?.values.length === 1;

        if (single) {
            const content = renderInline(table.header.values[0], this.context)
            return `<tr class="header"><td colspan="${table.columns}">${content}</td></tr>`
        }

        const cells = this.renderCells(table, table.header.values,);
        return `<tr class="header">${cells}</tr>`
    }

    private renderCells(table: Type, cells: string[]) {
        return cells.map((cell, index) => this.getCell(table, cell, index)).join('');
    }

    private getCell(table: Type, cell: string, index: number) {
        const align = getAlign(table, index);
        const text = renderInline(cell, this.context);
        return `<td class="${align}">${text}</td>`;
    }
}

const getAlign = (table : Type, cell : number) => {
    if(!table.header) return Alignment.Left;
    return table.header.align[cell];
}
