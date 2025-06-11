import { AltHeader } from "@/parsers/block/AltHeader";
import { BlockClear } from "@/parsers/block/BlockClear";
import { BlockQuote } from "@/parsers/block/BlockQuote";
import { CodeBlock } from "@/parsers/block/CodeBlock";
import { Footnote } from "@/parsers/block/Footnote";
import { Header } from "@/parsers/block/Header";
import { HorizontalLine } from "@/parsers/block/HorizontalLine";
import { OrderedList } from "@/parsers/block/OrderedList";
import { Table } from "@/parsers/block/Table";
import { UnorderedList } from "@/parsers/block/UnorderedList";
import { IBlockParser } from "@/types/IBlockParser";
import { Context } from "@/types/Context";

export const getBlockParsers = (context: Context) => [
    new AltHeader(context),
    new Header(context),
    new BlockClear(context),
    new BlockQuote(context),
    new CodeBlock(context),
    new Footnote(context),
    new HorizontalLine(context),
    new OrderedList(context),
    new Table(context),
    new UnorderedList(context)
] as IBlockParser[]
