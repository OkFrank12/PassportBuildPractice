import { Request, Response, Router } from "express";
import passport from "passport";

const auth: Router = Router();

auth.get("/login", (req: Request, res: Response) => {
  return res.render("login", { user: req.user });
});

auth.get("/logout", (req: Request, res: Response) => {
  req.logout;
  res.redirect("/");
});

auth.get(
  "/google",
  passport.authenticate("google", { scope: ["email", "profile"] })
);

auth.get(
  "/google/reverse",
  passport.authenticate("google"),
  (req: Request, res: Response) => {
    return res.render("home", { user: req.user });
  }
);

export default auth