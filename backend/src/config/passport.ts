import { config } from "dotenv";
import { RequestHandler } from "express";
import { JwtPayload } from "jsonwebtoken";
import passport from "passport";
import { ExtractJwt, Strategy, StrategyOptions } from "passport-jwt";
import { UserSchema } from "../models/UserSchema";
const dotenv = config();

const secretOrKey = process.env.JWT_SECRET_KEY || "";

// JWT Strategy configuration
let opts: StrategyOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: secretOrKey,
};
const JwtStrategy = passport.use(
  new Strategy(opts, async (jwt_payload: JwtPayload, done: Function) => {
    try {
      const user = UserSchema.findOne({ id: jwt_payload._id });
      if (user) {
        return done(null, user);
      } else {
        return done(null, false);
      }
    } catch (error) {
      return done(error, false);
    }
  })
);

export const JwtPassport: RequestHandler = (req, res, next) => {
  JwtStrategy.authenticate("jwt", { session: false }, function (err: any, user: Express.User | false | null) {
    if (err) {
      return next(err);
    }
    if (!user) {
      return res.status(200).send({ status: "token failed", msg: "token failed" });
    }
    next();
  })(req, res, next);
};
