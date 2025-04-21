const spaces = '  ';

export const strip = (value: string) => {
    // this function wants to return the smallest document size, removing all white space.
    // except for formatted code blocks there the whitespace should be preserved
    const parts = value.split('<pre ');
    return parts.reduce((previous: string, current: string) => {
        const isCode = current.endsWith("</pre><br/>");
        const processed = isCode ? handlePreCode(current)  : removeWhiteSpace(current);
        return previous + processed;
    }, '');
}

const handlePreCode = (value: string) => {
    const handled = value.replaceAll('$gt;', '>').replaceAll('$lt;', '<');
    return `<pre ${handled}`;
}

export const removeWhiteSpace = (value: string) => {
    while(value.includes(spaces)) { value = value.replace(spaces, " "); }
    return value
        .replaceAll("\n",'')
        .replaceAll("\r", '')
        .replaceAll("> <", "><")
        .trim();
}
