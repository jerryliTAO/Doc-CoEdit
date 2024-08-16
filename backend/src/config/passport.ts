import { config } from "dotenv";
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
export const JwtPassport = passport.use(
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
