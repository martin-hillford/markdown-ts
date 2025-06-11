import { ListItem } from "@/types";

export const parse = (text : string, clearLine : (text : string) => string) => {

    const lines = text.split("\n");
    const items = new Array<ListItem>();

    items.push({ text : clearLine(lines[0]), level : 0, sub : [] } as ListItem);

    lines.forEach((line, index) => {
        if(index === 0) return

        const level = getLevel(line);
        const item = { text : clearLine(lines[index]), level : level, sub : [] };

        if(level === 0) items.push(item);
        else {
            const parent = getParent(items, level);
            parent.sub.push(item);
        }
    })

    const start = getStart(lines[0]) ?? 1;

    return { items, start };
}

const getParent = (items : Array<ListItem>, level : number) : ListItem => {

    const last = items[items.length - 1];
    if(last.level === level - 1) return last;

    if(last.sub) return getParent(last.sub, level);
    return last;
}

export const getLevel = (line : string) => {
    return Math.max(0, Math.floor(line.search(/\S/) / 3));
}

export const clearLineOrderedList = (line : string) => {
    const index = line.indexOf(".")
    if(line.length === index + 1) return "";
    return line.substring(index + 1).trim();
}

export const clearLineUnorderedList = (line : string) => {
    const text = line.trim();
    const index = text.indexOf(" ")
    if(text.length === index + 1) return "";
    return text.substring(index + 1).trim();
}

const getStart = (line : string) => {
    const head = line.replace(/\D.*/, '');
    const start = parseInt(head);
    return Number.isNaN(start) ? null : start;
}
