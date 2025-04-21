export function getText(string : string, level : number) : [ string, string | undefined] {
    string = string.substring(level).trim();

    const match = string.match(/{#[a-z-]+}$/);
    if(!match || !match.index) return [ string, undefined]

    const id = string.substring(match.index + 2, string.length - 1);
    string = string.substring(0,match.index).trim();

    return [ string ,id ];
}
