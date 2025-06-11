import { Abstract } from "./Abstract";

export class Code extends Abstract {

    // ensure that the double tick regexp is before the single ticks
    // as the single tick also matches the double ticks
    protected readonly regexp = [
        { regexp: /`{2}.+?`{2}/, start: '`', end: '`' },
        { regexp: /`[^`]+?[^\\]`([^`]|$)/, start: '`', end: '`' },
    ]

    render(content: string) {
        const length = content.startsWith("``") ? 2 : 1;
        const text = content.substring(length, content.length - length);
        return `<code>${text}</code>`;
    }
}
