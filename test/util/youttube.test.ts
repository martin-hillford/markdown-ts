// noinspection SpellCheckingInspection

import { expect, test, describe } from "vitest";
import { getYouTubeId } from '@/util/youtube'

describe("getYouTubeId", function() {

    test("Regular link", function() {
        expect(getYouTubeId("https://www.youtube.com/watch?v=KJwYBJMSbPI")).toBe("KJwYBJMSbPI");
    });

    test("Share link", function() {
        expect(getYouTubeId("https://youtu.be/KJwYBJMSbPI")).toBe("KJwYBJMSbPI");
    });

    test("Share link - http", function() {
        expect(getYouTubeId("http://youtu.be/KJwYBJMSbPI")).toBe("KJwYBJMSbPI");
    });

    test("Embedded link", function() {
        expect(getYouTubeId("https://www.youtube.com/embed/KJwYBJMSbPI")).toBe("KJwYBJMSbPI");
    });

    test("Regular link - with options", function() {
        expect(getYouTubeId("https://www.youtube.com/watch?v=KJwYBJMSbPI&controls=2")).toBe("KJwYBJMSbPI");
    });

    test("Share link - with options", function() {
        expect(getYouTubeId("https://youtu.be/KJwYBJMSbPI?controls=2")).toBe("KJwYBJMSbPI");
    });

    test("Share link - http - with options", function() {
        expect(getYouTubeId("http://youtu.be/KJwYBJMSbPI?controls=2")).toBe("KJwYBJMSbPI");
    });

    test("Embedded link - with options", function() {
        expect(getYouTubeId("https://www.youtube.com/embed/KJwYBJMSbPI?controls=2")).toBe("KJwYBJMSbPI");
    });
});
