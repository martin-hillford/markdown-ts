import { Abstract } from "./Abstract";

export class Footnote extends Abstract {

    protected readonly regexp = [
        { regexp: /\[\^[a-z|0-9\-_]+]($|[^:])/, start: "[", end: "]" },
    ]

    render(content: string) {
        const reference = content.substring(2, content.indexOf(']'));
        return `<a class="footnote" href="#footnote-${reference}"><sup>${reference}</sup></a>`;
    }
}
