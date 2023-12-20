require("dotenv").config();
const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const User = require("../models/User");

module.exports = function (passport) {
  const opts = {
    secretOrKey: process.env.secretKey,
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  };
  console.log("secretKey:", process.env.secretKey)

  passport.use(
    new JwtStrategy(opts, async (jwt_payload, done) => {
        console.log("passport working...");
      try {
        const user = await User.findById(jwt_payload.sub);
        if (user) {
          // If the user is found, log the payload and return the user
          console.log("Token Found");
          console.log(jwt_payload);
          return done(null, user);
        } else {
          // If the user is not found, return false
          console.log("user not found with this token")
          return done(null, false);
        }
      } catch (error) {
        // If an error occurs during the database lookup, return the error
        return done(error, false);
      }
    })
  );
};
