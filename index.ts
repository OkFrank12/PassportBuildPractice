import express, { Application } from "express";
import { envConfig } from "./config/environment";
import { myApp } from "./app";
import { dbConnect } from "./config/dbConfig";

const port: number = parseInt(envConfig.PORT);
const app: Application = express();
myApp(app);

const server = app.listen(envConfig.PORT || port, () => {
  dbConnect();
});

process.on("uncaughtException", (error: any) => {
  console.log("uncaughtException: ", error);
  process.exit(1);
});

process.on("unhandledRejection", (reason: any) => {
  console.log("unhandledRejection: ", reason);
  server.close(() => {
    process.exit(1);
  });
});
