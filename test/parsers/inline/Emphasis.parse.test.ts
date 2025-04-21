import { Context } from "@/types/Context";
import { Emphasis } from "@/parsers/inline/Emphasis";
import { testAnnotations } from "@/util/testing";

const cases = [
    { text: null, name: 'null', expected: null },
    { text: '', name: 'empty', expected: null },
    { text: 'text', name: 'no-emphasis', expected: null },
    { text: '**bold**', name: 'whole-line-bold', expected: { content: '**bold**' } },
    { text: '*italic*', name: 'whole-line-italic', expected: { content: '*italic*' } },
    {
        text: 'this line ends with **bold**!',
        name: 'end-with-bold!',
        expected: { head: 'this line ends with ', content: '**bold**', tail: '!' }
    },
    {
        text: 'this line ends with **bold**',
        name: 'end-with-bold',
        expected: { head: 'this line ends with ', content: '**bold**' }
    },
    {
        text: '**start** line with bold',
        name: 'start-with-bold',
        expected: { content: '**start**', tail: ' line with bold' }
    },
    {
        text: '**start** and __end__ line with bold',
        name: 'multiple',
        expected: { content: '**start**', tail: ' and __end__ line with bold' }
    },
    {
        text: 'this is _italic_ script',
        name: "italic",
        expected: { head: 'this is ', content: '_italic_', tail: ' script' }
    },
    {
        text: 'with **bold**?',
        name: "ends-with-question-mark",
        expected: { head: 'with ', content: '**bold**', tail: '?' }
    },
    {
        text: 'with ***much*** emphasis',
        name: 'bold-and-italic',
        expected: { head: 'with ', content: '***much***', tail: ' emphasis' }
    }
];

const context = { blockParsers: [], inlineParsers: [] } as Context;
testAnnotations("emphasis", new Emphasis(context), cases);
