import { expect, test, describe } from "vitest";
import { getVimeoVideoId } from '@/util/vimeo';

describe("isVimeoUrl", function() {

  test("Regular link", function() {
    expect(getVimeoVideoId("https://vimeo.com/419963616/description")).toBe("419963616");
  });


  test("Share link", function() {
    expect(getVimeoVideoId("https://vimeo.com/419963616")).toBe("419963616");
  });

  test("Player link", function() {
    expect(getVimeoVideoId("https://player.vimeo.com/video/419963616")).toBe("419963616");
  });

});


