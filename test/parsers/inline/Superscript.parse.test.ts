import { Context } from "@/types/Context";
import { Superscript } from "@/parsers/inline/Superscript";
import { testAnnotations } from "@/util/testing";

const cases = [
    { text: null, name: 'null', expected: null},
    { text: '', name: 'empty', expected: null },
    { text: 'text', name: 'no-superscript', expected: null},
    { text: '^(superscript)', name: 'whole-line', expected: { content: "^(superscript)" } },
    {
        text: '^(superscript) at the line start',
        name: 'start-of-line',
        expected: { content: '^(superscript)', tail: ' at the line start'  }
    },
    {
        text: 'end of line ^(superscript)',
        name: 'end-of-line',
        expected: { head: 'end of line ', content: '^(superscript)' }
    },
    {
        text: 'in the ^(middle) of the line',
        name: 'middle-of-line',
        expected: { head: 'in the ', content: '^(middle)', tail: ' of the line' }
    },
    {
        text: 'multiple ^(superscript) or ^(superscript) in line',
        name: 'multiple',
        expected: { head: 'multiple ', content: '^(superscript)', tail: ' or ^(superscript) in line' }
    }
]

const context = { blockParsers: [], inlineParsers: [] } as Context;
testAnnotations("superscript", new Superscript(context), cases);
