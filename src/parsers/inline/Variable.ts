import { Context } from "@/types/Context";
import { IInlineParser } from "@/types/IInlineParser";

export class Variable implements IInlineParser {

    protected readonly context: Context;

    constructor(context: Context) { this.context = context; }

    private getVariables() { return this.context.variables ?? []; }

    getIndex(text: string): number | null {
        const variables = this.getVariables();
        if (variables.length === 0) return null;
        if (!text || text === '') return null;

        const needles = variables.map(variable => `@${variable.key}`);
        return needles.reduce((prev: number | null, needle: string) => {
            const startIndex = text.indexOf(needle);
            if(startIndex === -1) return prev;
            if(prev == null) return startIndex;
            return prev > startIndex ? startIndex : prev;
        }, null);
    }

    parse(text: string | null | undefined)  {
        const variables = this.getVariables();
        if (variables.length === 0) return null;
        if (!text || text === '') return null;

        for (let index = 0; index < variables.length; index++) {
            const variable = variables[index];
            const needle = `@${variable.key}`;
            if (!text.includes(needle)) continue;

            const startIndex = text.indexOf(needle);

            // Nb. there is no recursive rendering on variables
            return {
                head: text.substring(0, startIndex),
                content: needle,
                tail: text.substring(startIndex + needle.length),
                render: () => variable.render()
            }
        }

        return null;
    }
}
