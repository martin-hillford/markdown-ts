import { Context } from "@/types/Context";
import { getNextAnnotation } from "@/util/getNextAnnotation";
import { isEmpty } from "@/util/isEmpty";

export const renderInline = ( text: string | null | undefined, context: Context) : string => {

    if(isEmpty(text)) return '';
    const annotation = getNextAnnotation(text, context);

    // If no text is found just return the text
    if(!annotation) return text ?? '';

    // useAnnotate will always return one annotation. It may not be the first or the only one in the line.
    // But using a recursive system the whole inline tree is rendered
    const { render, head, tail } = annotation;
    const content = render ? render() : '';

    return renderInline(head, context) + content + renderInline(tail, context);
}
