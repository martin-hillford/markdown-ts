import { Abstract } from "./Abstract";
import { getAttributes } from "@/util/attributes";
import { getAttribute } from "@/util/getAttribute";

export class Image extends Abstract {

    // please note: if a line starts and ends with a backtick then it
    // is considered being a code block (see the CodeBlock parser)
    protected readonly regexp = [
        { regexp: /!\[.*?]\(.+?\)/, start: '!', end: ')' }
    ]

    /**
     * This method will extract all attributes related to an image
     * It will assume that it's input is a valid markdown image reference
     * @param text
     */
    extractAttributes = (text: string) => {
        const altText = text.substring(2, text.indexOf("]"));
        const attr = text.match(/\([^\n]+\)/);

        if(attr === null) return null;
        const attributes = getAttributes(attr[0].substring(1, attr[0].length - 1));
        return { altText, ...attributes };
    }

    render(text: string) {
        const attributes = this.extractAttributes(text);
        if(!attributes) return '';
        const { align, url, altText, width } = attributes;

        const className = getAttribute('class',align !== "none" ? align : null);
        const title = getAttribute('title', attributes.title);
        const src = getAttribute('src', url);
        const alt = getAttribute('alt', altText);
        const style = !!width ? ` style="width:${width};"` : '';

        return `<img${style}${className}${alt}${title}${src} />`;
    }
}
