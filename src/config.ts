import * as dotenv from "dotenv";

dotenv.config();

const config = {
  PORT: process.env.PORT || "3000",
  API_TOKEN: process.env.API_TOKEN,
  POST_GROUP_ID: process.env.POST_GROUP_ID,
  URL: process.env.URL,
  OWNER_ID: process.env.OWNER_ID,
};

export default config;
