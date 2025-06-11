import { removeWhiteSpace } from "@/util/strip";
import { getVimeoVideoId } from "@/util/vimeo";
import { getYouTubeId } from "@/util/youtube";

/**
 * This method renders the html for to play a video. This can be a YouTube, Vimeo or generic video using the
 * controls provided by the browser to play for example mp4 files
 * @param url The url to the video file
 */
export const renderVideo = (url: string) => {
    const youtubeId = getYouTubeId(url);
    if(youtubeId) return renderYoutube(youtubeId);

    const vimeoVideoId = getVimeoVideoId(url);
    if(vimeoVideoId) return renderVimeo(vimeoVideoId);

    return renderBrowserVideo(url);
}

/**
 * This method renders the html for to play a video on YouTube
 * @param videoId The id of the video on YouTube
 */
export const renderYoutube = (videoId: string) => {
    const src = `https://www.youtube.com/embed/${videoId}?controls=1&autoplay=0`;
    const iframe = `<iframe width="420" height="315" src="${src}" allowFullScreen allow="autoplay; picture-in-picture" frameBorder="0" />`;
    return getVideoContainer(iframe, `youtube-${videoId}`);
}

/**
 * This method renders the html for to play a video on Vimeo
 * @param videoId The id of the video on Vimeo
 */
export const renderVimeo = (videoId: string) => {
    const script = ` 
            <script>
                fetch('https://vimeo.com/api/oembed.json?url=https://vimeo.com/${videoId}').then(result => {
                    result.json().then(body => {
                        document.getElementById('#vimeo-${videoId}').innerHTML = body.html;
                    });   
                });
            </script>
        `;
    return getVideoContainer(script, `vimeo-${videoId}`);
}

/**
 * This method renders the html for a video element in the browser
 * @param url The url of the video file. Must be a video file supported by the browser
 */
export const renderBrowserVideo = (url: string) => {
    const video = `<video controls><source src=${url} type="video/mp4" /></video>`;
    return getVideoContainer(video, url);
}

/**
 * This method renders a wrapper for video on the provided content
 * @param content Html content with a some kind of video control (web, vimeo, YouTube)
 * @param id An identifier to uniquely identify the container
 */
export const getVideoContainer = (content :string, id: string) => {
    const style = `
            <style>
                div.video-container {
                    overflow:hidden; display: block; padding-bottom:56.25%;
                    position:relative; height:0; border: 1px solid rgba(0,0,0,0.1) !important;
                    iframe, video { left:0; top:0; height:100%; width:100%; position:absolute; padding: 0; }
                }
            </style>
        `;
    return removeWhiteSpace(`${style}<div id="${id}" class="video-container">${content}</div>`);
}
