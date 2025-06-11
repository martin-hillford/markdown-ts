import { Context } from "@/types/Context";
import { testAnnotations } from "@/util/testing";
import { Variable } from "@/parsers/inline/Variable";

const variables = [
    { key : 'name', render: () => "Peter" },
    { key : 'date', render: () => "11 december" }
]

const cases = [
    { text: null, name: 'null', expected: null },
    { text: '', name: 'empty', expected: null },
    { text: 'text', name: 'no-variable', expected: null },
    { text: '^(superscript)', name: 'whole-line-superscript', expected: null },
    { text: '@name',  name: 'whole-line-variable', expected: { content: '@name' } },
    { text: 'His @name is', name: 'middle-of-the text',  expected: { head: 'His ', content: '@name', tail: ' is' } },
]

const context = { variables } as Context;
testAnnotations("variable", new Variable(context), cases,);
