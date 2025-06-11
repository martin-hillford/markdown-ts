import { Alignment } from "./index";

export type Table = {
    header? : {
        values : string[],
        align : Alignment[]
    };
    rows : string[][];
    columns : number;
}
