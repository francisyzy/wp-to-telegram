import axios from "axios";
import * as cheerio from 'cheerio';
import config from "../config";

export async function getSecondImageUrl(): Promise<string | null> {
  try {
    if (config.URL === undefined) {
      throw new Error("WP Site must be given");
    }
    const { data: html } = await axios.get(config.URL, {
      headers: {
        "User-Agent": "Mozilla/5.0 (compatible; Bot/1.0)",
      },
    });

    const $ = cheerio.load(html);

    // Select the second <img> tag (index 1)
    const secondImg = $("img").eq(1);

    if (secondImg.length) {
      let imgSrc = secondImg.attr("src");
      if (imgSrc && imgSrc.startsWith("//")) {
        imgSrc = "https:" + imgSrc;
      }
      return imgSrc || null;
    } else {
      return null;
    }
  } catch (err: unknown) {
    if (err instanceof Error) {
      console.error("Error fetching second image:", err.message);
    } else {
      console.error("Unknown error fetching second image:", err);
    }
    return null;
  }
}
