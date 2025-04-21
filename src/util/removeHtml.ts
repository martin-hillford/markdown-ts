export const removeHtml = (value: string) : string => {
    let replaced = value
        .replaceAll('<',"&lt;")
        .replaceAll('>',"&gt;")
        .replaceAll("\n&gt; ","\n> ");
    if(replaced.startsWith("&gt; ")) replaced = "> " + replaced.substring(5);
    return replaced;
}
