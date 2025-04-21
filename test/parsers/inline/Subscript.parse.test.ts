import { Context } from "@/types/Context";
import { Subscript } from "@/parsers/inline/Subscript";
import { testAnnotations } from "@/util/testing";

const cases = [
    { text: null, name: 'null', expected: null },
    { text: '', name: 'empty', expected: null },
    { text: 'text', name: 'no-subscript', expected: null },
    { text: '~(subscript)', name: 'whole-line', expected: { content: "~(subscript)"} },
    {
        text: '~(subscript) at the line start',
        name: 'start-of-line',
        expected: { content: '~(subscript)', tail: ' at the line start'  }
    },
    {
        text: 'end of line ~(subscript)',
        name: 'end-of-line',
        expected: { head: 'end of line ', content: '~(subscript)' }
    },
    {
        text: 'in the ~(middle) of the line',
        name: 'middle-of-line',
        expected: { head: 'in the ', content: '~(middle)', tail: ' of the line' }
    },
    {
        text: 'multiple ~(sub) or ~(sub) in line',
        name: 'multiple',
        expected: { head: 'multiple ', content: '~(sub)', tail: ' or ~(sub) in line' }
    }
]

const context = { blockParsers: [], inlineParsers: [] } as Context;
testAnnotations("subscript", new Subscript(context), cases);
