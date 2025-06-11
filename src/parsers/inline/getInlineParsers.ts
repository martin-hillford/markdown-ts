import { AutoLink } from "@/parsers/inline/AutoLink";
import { IInlineParser } from "@/types/IInlineParser";
import { Variable } from "./Variable";
import { Code } from "./Code";
import { Emphasis } from "./Emphasis";
import { Highlight } from "@/parsers/inline/Highlight";
import { Image } from "./Image";
import { Link } from "@/parsers/inline/Link";
import { Subscript } from "@/parsers/inline/Subscript";
import { Superscript } from "@/parsers/inline/Superscript";
import { LineBreak } from "@/parsers/inline/LineBreak";
import { StrikeThrough } from "@/parsers/inline/StrikeThrough";
import { Footnote } from "@/parsers/inline/Footnote";
import { Context } from "@/types/Context";

export const getInlineParsers = (context: Context) => {
    return [
        new Variable(context),
        new Link(context),
        new AutoLink(), // this must appear above code!
        new Image(context),
        new Code(context),
        new Footnote(context),
        new Subscript(context),
        new Superscript(context),
        new Emphasis(context),
        new StrikeThrough(context),
        new Highlight(context),
        new LineBreak(context)
    ] as IInlineParser[];
}
