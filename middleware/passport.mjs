import passport from "passport";
import { Strategy } from "passport-jwt";
import extractCookie from "../utils/extractCookie.js";
import db from "../models/index.mjs";

let jwtOptions = {
  jwtFromRequest: extractCookie,
  secretOrKey: process.env.JWT_TOKEN_KEY,
};

passport.use(
  new Strategy(jwtOptions, async (jwt_payload, next) => {
    const user = await db.User.findOne({ where: { id: jwt_payload.id } });

    if (user) {
      next(null, user);
    } else {
      next(null, false);
    }
  })
);
