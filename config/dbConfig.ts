import { connect } from "mongoose";
import { envConfig } from "./environment";

const dbURL: string = envConfig.MONGO;

export const dbConnect = () => {
  connect(dbURL).then(() => {
    console.log(`Connected...!`);
  });
};
