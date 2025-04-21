import { Block } from "./block";
import { Variable } from "@/types/variable";

export type Document = {
    blocks : Block[]
    footnotes : string[]
    variables?: Variable[]
}
