export const startsEveryLineWith = (text : string, regexp : RegExp) => {
    const lines = text.split("\n");
    for(let index = 0; index < lines.length; index++) {
        if(!regexp.test(lines[index])) return false;
    }
    return true;
}
