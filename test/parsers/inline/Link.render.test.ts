// noinspection HtmlUnknownAnchorTarget,HtmlDeprecatedAttribute

import { markdownToHtml } from "@/parsers/markdown";
import { expect, test } from "vitest";

// This is the style of the video container
const style = '<style> div.video-container { overflow:hidden; display: block; padding-bottom:56.25%; position:relative; height:0; border: 1px solid rgba(0,0,0,0.1) !important; iframe, video { left:0; top:0; height:100%; width:100%; position:absolute; padding: 0; } } </style>'

test("link render simple", () => {
    const expected = `<p><a href="https://apple.com">Apple</a></p>`;
    const html = markdownToHtml("[Apple](https://apple.com)");
    expect(html).toEqual(expected);
});

test("link render with title", () => {
    const expected = `<p><a title="Apple website" href="https://apple.com">Apple</a></p>`;
    const html = markdownToHtml(`[Apple](https://apple.com "Apple website")`);
    expect(html).toEqual(expected);
});

test("link render open blank", () => {
    const expected = `<p><a target="_blank" rel="noreferrer" href="https://apple.com">Apple</a></p>`;
    const html = markdownToHtml(`[Apple](https://apple.com blank)`);
    expect(html).toEqual(expected);
});

test("link render open blank with title", () => {
    const expected = `<p><a target="_blank" rel="noreferrer" title="Apple website" href="https://apple.com">Apple</a></p>`;
    const html = markdownToHtml(`[Apple](https://apple.com blank "Apple website")`);
    expect(html).toEqual(expected);
});

test("link render mp4 video", () => {
    const iframe = "<video controls><source src=https://apple.mp4 type=\"video/mp4\" /></video>"
    const expected = `<p>${style}<div id="https://apple.mp4" class="video-container">${iframe}</div></p>`;
    const html = markdownToHtml(`[Watch an apple](https://apple.mp4 video)`);
    expect(html).toEqual(expected);
});

test("link render mp4 video with title", () => {
    // nb: the title should be ignored
    const iframe = "<video controls><source src=https://apple.mp4 type=\"video/mp4\" /></video>"
    const expected = `<p>${style}<div id="https://apple.mp4" class="video-container">${iframe}</div></p>`;
    const html = markdownToHtml(`[Watch an apple](https://apple.mp4 video "Watch a video of an apple")`);
    expect(html).toEqual(expected);
});

test("link render youtube", () => {
    const iframe = `<iframe width="420" height="315" src="https://www.youtube.com/embed/LXb3EKWsInQ?controls=1&autoplay=0" allowFullScreen allow="autoplay; picture-in-picture" frameBorder="0" />`;
    const expected = `<p>${style}<div id="youtube-LXb3EKWsInQ" class="video-container">${iframe}</div></p>`;
    const html = markdownToHtml(`[Watch an Video about Costa Rica](https://www.youtube.com/watch?v=LXb3EKWsInQ video)`);
    expect(html).toEqual(expected);
});

test("link render vimeo", () => {
    const script = `<script> fetch('https://vimeo.com/api/oembed.json?url=https://vimeo.com/1076702679').then(result => { result.json().then(body => { document.getElementById('#vimeo-1076702679').innerHTML = body.html; }); }); </script>`;
    const expected = `<p>${style}<div id="vimeo-1076702679" class="video-container">${script}</div></p>`;
    const html = markdownToHtml(`[Watch an video on vimeo](https://vimeo.com/1076702679 video)`);
    expect(html).toEqual(expected);
});

test("Linking to Heading IDs", () =>{
    const expected = `<p><a href="#heading-ids">Heading IDs</a></p>`
    const html = markdownToHtml(`[Heading IDs](#heading-ids)`);
    expect(html).toEqual(expected);
});
