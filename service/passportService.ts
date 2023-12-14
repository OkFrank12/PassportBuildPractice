import passport from "passport";
import { Strategy } from "passport-google-oauth20";
import userModel from "../model/userModel";
import { envConfig } from "../config/environment";

passport.serializeUser((user, done) => {
  return done(null, user);
});

passport.deserializeUser((user, done) => {
  return done(null, user!);
});

passport.use(
  new Strategy(
    {
      clientID: envConfig.ID,
      clientSecret: envConfig.SECRET,
      callbackURL: "/auth/google/reverse",
    },
    (accessToken, refreshToken, profile, done) => {
      try {
        userModel.findOne({ googleID: profile.id }).then((currentUser) => {
          if (currentUser) {
            console.log("current: ", currentUser);
            done(null, currentUser);
          } else {
            new userModel({
              userName: profile.displayName,
              googleID: profile.id,
              email: profile.emails![0].value,
              verified: profile.emails![0].verified,
              image: profile._json.picture,
            })
              .save()
              .then((newUser) => {
                console.log("new: ", newUser);
                done(null, newUser);
              });
          }
        });
      } catch (error) {
        console.log(error);
      }
    }
  )
);
