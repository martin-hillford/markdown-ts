import { Variable } from "@/types/variable";
import { IBlockParser } from "@/types/IBlockParser";
import { IInlineParser } from "@/types/IInlineParser";
import { Document } from "@/types/document";

export interface Context {
    variables? : Variable[]
    dir?: "ltr" | "rtl" | 'auto',
    lang?: string
    className?: string
    blockParsers?: IBlockParser[]
    inlineParsers?: IInlineParser[]
    document? : Document
    defaultAlignment?: "left" | "right" | "justify"
}
