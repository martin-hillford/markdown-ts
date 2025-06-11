import { Annotation } from "@/types/annotation";

export interface IInlineParser
{
    /**
     * The order in which an inline element is found matters. If this would not be taken into account issues arise
     * with the combination of bold and hyperlinks for example. Every inline parser therefore should also the report
     * the index on which it is match so first come, first served approach can be taken and a parsing tree is created.
     * @param text
     * @return the index of where the match is happening or null when no index is matching.
     */
    getIndex(text: string): number | null;

    /**
     * Parses the text into an annotation. However,
     * if text does not contain the annotation, null **should** be return
     * @param text The text to parse
     * @returns The annotation when found, else null
     */
    parse(text: string | null | undefined) : Annotation | null;
}
