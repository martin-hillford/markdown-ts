import { Context } from "@/types/Context";
import { Image } from "@/parsers/inline/Image";
import { testAnnotations } from "@/util/testing";

const cases = [
    { text: null, name: 'null', expected: null },
    { text: '', name: 'empty', expected: null},
    { text: 'text', name: 'no-link', expected: null },
    { text: '![text](image)', name: 'whole-line', expected: { content: '![text](image)' } },
    {
        text: '![text](image) at the line start',
        name: 'start-of-line',
        expected: { content: '![text](image)', tail: ' at the line start' },
    },
    {
        text: 'end of line ![text](image)',
        name: 'end-of-line',
        expected: { content: '![text](image)', head: 'end of line ' },
    },
    {
        text: 'in the ![text](image) of line',
        name: 'middle-of-line',
        expected: { head: 'in the ', content: '![text](image)', tail: ' of line'  },
    },
    {
        text: 'multiple ![text](image) or ![text2](image2) in line',
        name: 'multiple',
        expected: { head: 'multiple ', content: '![text](image)', tail: ' or ![text2](image2) in line'  },
    }
]

const context = { blockParsers: [], inlineParsers: [] } as Context;
testAnnotations("image-parse", new Image(context), cases);
