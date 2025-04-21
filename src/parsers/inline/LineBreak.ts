import { Abstract } from "./Abstract";

export class LineBreak extends Abstract {

    // please note: if a line starts and ends with a backtick then it
    // is considered being a code block (see the CodeBlock parser)
    protected readonly regexp = [
        { regexp: /\n/, start: "\n", end: "\n" },
        { regexp: /\\/, start: "\\", end: "\\" },
        { regexp: / {2}$/, start: " ", end: " " },
    ]

    render(_: string) {
        return '<br/>';
    }
}
