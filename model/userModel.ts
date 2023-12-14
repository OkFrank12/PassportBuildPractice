import { model, Schema } from "mongoose";
import { iUserData } from "../util/interface";

const userModel = new Schema<iUserData>(
  {
    userName: String,
    email: String,
    image: String,
    googleID: String,
    verified: Boolean,
  },
  { timestamps: true }
);

export default model<iUserData>("users", userModel);
