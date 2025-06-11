// noinspection HtmlDeprecatedAttribute

import { Annotation, IInlineParser, LinkType } from "@/types";
import { getAttribute } from "@/util/getAttribute";
import { isEmpty } from "@/util/isEmpty";
import { renderInline } from "@/parsers/render";
import { Context } from "@/types/Context";
import { renderVideo } from '@/renderers/video';

// Extract and parses a lnk within the Markdown text
// the basic link structure: [content](link)
export class Link implements IInlineParser {

    protected readonly context: Context;

    constructor(context: Context) { this.context = context; }

    getIndex(text: string): number | null {

        // For getting the index simple do a couple of index search
        if(isEmpty(text)) return null;

        const { start, end } = this.getIndices(text);
        if(start === -1 || end === -1) return null;
        if(end < start) return null;
        return start;
    }

    parse(text: string | null | undefined): Annotation | null {
        try {
            if (text == null) return null;
            let {start, end} = this.getIndices(text);

            // There is the interesting problem. If the link contains an image
            // the content has match partly with the image.
            let content = text.substring(start + 1, end);

            // check if content contains
            if (content.includes('![')) {
                end = text.indexOf(']', end + 1);
                content = text.substring(start + 1, end);
            }

            // Now check if a url is following
            const startUrl = text.charAt(end + 1);
            const endUrl = text.indexOf(')', end + 2);
            if(startUrl !== '(' || endUrl === -1) return null;
            const url = text.substring(end + 2, endUrl);

            // create the annotation
            return {
                head: text.substring(0, start),
                render: () => this.render(content,url),
                tail: text.substring(endUrl + 1),
                content: text.substring(start, endUrl + 1)
            }

        }  catch { return null;}
    }

    private getIndices(text: string) {
        const start = text.indexOf('[');

        // Ensure to ignore the footnotes here. They are technically links but handle by another inline parser
        if(text.charAt(start + 1) === '^') return { start: -1, end: -1 };

        const end = text.indexOf(']');
        return { start, end }
    }

    /**
     * This method will extract all attributes related to a hyperlink
     * @param url
     */
    extractAttributes = (url: string) => {

        // the structure of the url is as follows: uri[ video]|[ blank]["title"]
        // So first determine if url has a title
        let title = undefined; let blank = false; let isVideo = false; let headingId = undefined;

        if(url.endsWith('"')) {
            const proto = url.substring(0, url.length - 2);
            const lastIndex = proto.lastIndexOf('"');
            title = url.substring(lastIndex + 1, url.length - 1).trim();
            url = url.substring(0, lastIndex).trim();
        }

        // Check if the link is blank, thus should open in another tab
        if(url.endsWith(' blank')) {
            url = url.substring(0, url.length - 6).trim();
            blank = true
        }

        // Check if the link is blank, thus should open in another tab
        if(url.endsWith(' video')) {
            url = url.substring(0, url.length - 6).trim();
            isVideo = true
        }

        // And deal with the heading id case
        if(url.startsWith('#')) headingId = url.substring(1).trim();

        return {
            href: url.trim(), blank, title, type: isVideo ? LinkType.Video : LinkType.Regular, headingId
        }
    }

    render(text: string, url: string) {
        const attributes = this.extractAttributes(url);
        const { type, href } = attributes;

        if(type === LinkType.Video) return renderVideo(href);

        const children = renderInline(text, this.context);
        const title = getAttribute('title',attributes.title);
        if(!attributes.blank) return `<a${title} href="${href}">${children}</a>`;
        return `<a target="_blank" rel="noreferrer"${title} href="${href}">${children}</a>`;
    }
}
