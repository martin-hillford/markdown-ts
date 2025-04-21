const prefixes = [ 'https://player.vimeo.com/video/', 'https://vimeo.com/' ]

export const isVimeoUrl = (url : string | undefined) => {
    if(!url) return undefined;
    let prefixed = false;

    prefixes.forEach(prefix => {
        if(url.startsWith(prefix)) prefixed = true;
    });

    if(!prefixed) return false;
    return !url.includes('?');
}

export const getVimeoVideoId = (url : string | undefined) => {

    if(!isVimeoUrl(url)) return undefined;
    if(!url) return undefined;

    prefixes.forEach(prefix => {
        url = url?.replace(prefix, "").replace("/description","");
    })

    const match = url.match(/[^a-z^0-9]/);
    if(!match?.index) return url;

    return url.substring(match.index);
}

export const getVimeoUrl = (link : string) => {
    return isVimeoUrl(link) ? link : undefined;
}
