import { expect, test } from "vitest";
import { IInlineParser } from "@/types/IInlineParser";

interface TestCases {
    text: string | undefined | null,
    name: string,
    expected: Expected | null,
    render?: string
}

interface Expected {
    head?: string | null | undefined,
    content?: string | null | undefined,
    tail?: string | null | undefined
}

export const testAnnotations = (name: string, parser: IInlineParser, cases: TestCases[])=> {

    for (let caseIndex = 0; caseIndex < cases.length; caseIndex++) {
        const  value = cases[caseIndex];
        test(`${name}-${value.name}`, () => {
            testAnnotation(parser, value.text, value.expected);
        });
    }
};

export const testAnnotation = (parser: IInlineParser, text: string | null | undefined, expected: Expected | null)=> {
    const result = clean(parser.parse(text));
    expect(result).toEqual(clean(expected));
}

const empty = (value: string | undefined | null) => {
    if(!value || value === '' ) return null;
    return value;
}

const clean = (annotation: any) => {
    if(!annotation) return null;
    return {
        head: empty(annotation?.head),
        content: empty(annotation?.content),
        tail: empty(annotation?.tail),

    }
}
