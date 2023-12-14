import { Document } from "mongoose";

interface iUser {
  userName: string;
  email: string;
  verified: boolean;
  googleID: string;
  image: string;
}

export interface iUserData extends iUser, Document {}
