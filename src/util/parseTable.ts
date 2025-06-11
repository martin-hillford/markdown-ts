import { Alignment, Table } from "@/types"

const tempChar = "¥%$¥";

export const parseTable = (text : string) => {

    const table = {} as Table;
    const lines = text.split("\n").map(line => line.trim());

    table.header = getHeader(lines);

    const rows = table.header ? lines.slice(2) : lines;
    table.rows = getRows(rows);

    const count = table.header ? table.header.values.length : 0;
    table.columns = Math.max(count, ...table.rows.map(row => row.length));

    sanitize(table);
    return table;
}

const getHeader = (lines : string[]) => {
    if(!hasHeader(lines)) return undefined;

    return {
        values : getColumn(lines[0]),
        align : getAlignments(lines[1])
    }
}

const getAlignments = (line : string) => {
    const cells = removeClosure(line).split('|');
    return cells.map(value => getAlignment(value));
}

const getAlignment = (string : string) => {
    const value = string.trim();

    const start = value[0];
    const end = value[value.length -1];

    if(start === ':' && end === ':') return Alignment.Center;
    else if(start === ':') return Alignment.Left;
    else if(end === ':') return Alignment.Right;

    return Alignment.None;
}

const getRows = (lines : string[]) => {
    return lines.map(line => getColumn(line));
}
const getColumn = (line : string) => {
    return removeClosure(line)
        .replace("\\|",tempChar)
        .split('|')
        .map(value => value.trim().replace(tempChar,'|'));
}

const hasHeader = (lines : string[]) => {
    if(lines.length < 2) return false;
    return /^\|[ :\-|]+\|$/.test(lines[1]);
}

const sanitize = (table : Table) => {
    if(table.header && table.header.values.length !== 1 ) {
        table.header.values = sanitizeRow(table, table.header.values, "");
        table.header.align = sanitizeRow(table, table.header.align, Alignment.Left);
    }

    table.rows.forEach((row,index) =>{
        table.rows[index] = sanitizeRow(table,row,"");
    })
}

function sanitizeRow<T>(table : Table, row : T[], value : T) {
    while(row.length !== table.columns) { row.push(value) }
    return row;
}

const removeClosure = (line : string) => {
    let cleaned = line.trim().substring(1);
    if(cleaned.endsWith('|')) cleaned = cleaned.substring(0, cleaned.length - 1);
    return cleaned;
}
