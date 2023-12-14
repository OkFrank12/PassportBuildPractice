import { config } from "dotenv";
config();

export const envConfig = {
  PORT: process.env.PORT!,
  KEY: process.env.KEY!,
  MONGO: process.env.MONGO!,
  ID: process.env.ID!,
  SECRET: process.env.SECRET!,
};
