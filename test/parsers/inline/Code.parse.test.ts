import { Context } from "@/types/Context";
import { Code } from "@/parsers/inline/Code";
import { testAnnotations } from "@/util/testing";

const cases = [
    { text: null,  name: 'null', expected: null },
    { text: '',  name: 'empty', expected: null },
    { text: 'text', name: 'no-code', expected: null,},
    { text: ' `code`', name: 'code-at-end-of-line', expected: { head: ' ', content: '`code`' } },
    { text: 'a `code` a', name: 'code-in-middle-of-line', expected: { head: 'a ', content: '`code`', tail: ' a' } },
    { text: '``code``', name: 'double-ticks', expected: {  content: '``code``' } },
    {
        text: '`code` at the start',
        name: 'code-at-start-of-line',
        expected: { head: null, content: '`code`', tail: ' at the start' }
    },
    {
        text: '``code` at the start', name: 'additional backtick',
        expected: { head: '`', content: '`code`', tail: ' at the start' }
    },
    {
        text: 'with a ``back`tick`` in the code',
        name: 'double-ticks',
        expected: { head: 'with a ', content: '``back`tick``', tail: ' in the code' }
    },
]

const context = { blockParsers: [], inlineParsers: [] } as Context;
testAnnotations("code", new Code(context), cases);
