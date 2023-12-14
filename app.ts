import { Application, json, NextFunction, Request, Response } from "express";
import passport from "passport";
import cors from "cors";
import cookieSession from "cookie-session";
import { envConfig } from "./config/environment";
import auth from "./router/authRouter";
import "./service/passportService";

export const myApp = (app: Application) => {
  app.use(cors()).use(json());
  app.set("view engine", "ejs");

  app
    .use(
      cookieSession({
        maxAge: 24 * 60 * 60 * 1000,
        keys: [envConfig.KEY],
      })
    )
    .use((req: Request, res: Response, next: NextFunction) => {
      if (req.session && !req.session.regenerate) {
        req.session.regenerate = (cb: any) => {
          cb();
        };
      }

      if (req.session && !req.session.save) {
        req.session.save = (cb: any) => {
          cb();
        };
      }

      next();
    });

  app.use(passport.initialize());
  app.use(passport.session());

  app.use("/auth", auth);

  app.get("/", (req: Request, res: Response) => {
    return res.render("welcome", { user: req.user });
  });
};
