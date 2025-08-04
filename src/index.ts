import { Telegraf } from "telegraf";

import config from "./config";

import { printBotInfo } from "./utils/consolePrintUsername";
import { getSecondImageUrl } from "./utils/fetch-site";
import { overwriteLastImg, readLastImg } from "./utils/file-db";

import bot from "./lib/bot";

const index = async () => {
  bot.use(Telegraf.log());
  bot.launch();
  if (process.env.NODE_ENV != "production") {
    printBotInfo(bot);
  }

  const imageUrl = await getSecondImageUrl();

  if (imageUrl) {
    // console.log("Second image URL:", imageUrl);
  } else {
    console.log("No second image found.");
    if (config.OWNER_ID !== undefined) {
      bot.telegram
        .sendMessage(config.OWNER_ID, "Fail to send image")
        .then(() => {
          console.log("error sent!");
        });
    }
  }

  const lastImg = await readLastImg();

  if (lastImg != imageUrl) {
    if (config.POST_GROUP_ID === undefined) {
      throw new Error("CHANNEL must be provided!");
    }
    if (imageUrl !== null) {
      bot.telegram
        .sendPhoto(config.POST_GROUP_ID, imageUrl)
        .then(() => {
          console.log("message sent!");
        });
      overwriteLastImg(imageUrl);
    }
  } else {
    console.log("Image previously sent, skipping");
  }

  await bot.stop(); // Stop the bot gracefully
  process.exit(0); // Exit the process
};

index();
