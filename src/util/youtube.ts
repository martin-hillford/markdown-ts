
// noinspection SpellCheckingInspection
const shortLinks = ["youtube.com/embed/", "youtu.be/"];
const prefixes = ["https://www.", "http://www.", "https://", "http://"];

export const getYouTubeUrl = (link : string) => {
    const youtubeId = getYouTubeId(link);
    return youtubeId ?  "https://youtu.be/" + youtubeId : undefined;
}

// noinspection SpellCheckingInspection
export const getYouTubeId = (link : string) => {

    // If the link contains v= then it's (likely) a YouTube link
    if (link && link.length && link.includes("youtube") && link.includes("v=")) {

        // clean the link so only the YouTube video id will remain
        link = link.substring(link.indexOf("v="));
        if (link.length > 2) { link = link.substring(2); }
        if (link.indexOf("&") >= 0) { link = link.substring(0, link.indexOf("&")); }

        // If a YouTube link is found, it's inserted
        if (link.length !== 0 && link !== "=v") return link;
    }

    // If the link starts with https://youtu.be/ or with  https:/youtu.be/ it also is a YouTube link
    if (link && link.length > 16) {

        let videoId = undefined;

        shortLinks.forEach(shortLink => {
            prefixes.forEach(prefix => {

                const base = prefix + shortLink;
                if (!link.startsWith(base)) return;

                const url = link.substring(base.length);
                if (url.length < 3) return;

                if (url.indexOf("?") >= 0) videoId = url.substring(0, url.indexOf("?"));
                else videoId = url;
            })
        })

        return videoId;
    }

    // not able to extract the video id
    return undefined;
};
