// noinspection SpellCheckingInspection

import { Context } from "@/types/Context";
import { Link } from "@/parsers/inline/Link";
import { testAnnotations } from "@/util/testing";

const context = { blockParsers: [], inlineParsers: [] } as Context;
const cases = [
    { text: null, name: 'null', expected: null },
    { text: '', name: 'empty',  expected: null },
    { text: 'text', name: 'no-link', expected: null },
    { text: '[text](url)', name: 'whole-line', expected: { content: '[text](url)' } },
    {
        text: '[text](url) at the line start',
        name: 'start-of-line',
        expected: { content: '[text](url)', tail: ' at the line start' }
    },
    {
        text: 'end of line [text](url)',
        name: 'end-of-line',
        expected: { head: 'end of line ', content: '[text](url)' }
    },
    {
        text: 'in the [text](url) of line',
        name: 'middle-of-line',
        expected: { head: 'in the ', content: '[text](url)', tail: ' of line' }
    },
    {
        text: 'multiple [text](url) or [text](url2) in line',
        name: 'multiple',
        expected: { head: 'multiple ', content: '[text](url)', tail: ' or [text](url2) in line' }
    },
    {
        text: '[![jsDelivr Hits](https://data.jsdelivr.com/v1/package/npm/async/badge?style=rounded)](https://www.jsdelivr.com/package/npm/async)',
        name: 'image in hyperlink',
        expected: { content: '[![jsDelivr Hits](https://data.jsdelivr.com/v1/package/npm/async/badge?style=rounded)](https://www.jsdelivr.com/package/npm/async)' },
    },
    {
        text: 'a image within [![image](https://image.jpg)](https://link.html) the text',
        name: 'text and image in hyperlink',
        expected: { head: 'a image within ', content: '[![image](https://image.jpg)](https://link.html)', tail: ' the text' },
    }
]
testAnnotations("link", new Link(context), cases);
