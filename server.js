const { config } = require("dotenv");
const mongoose = require("mongoose");
const express = require("express");
const app = express();
require("dotenv").config();
const User = require("./models/User");
const passport = require("passport");
const authRouter = require("./routes/auth");
const songRouter = require("./routes/song");
const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const jwt = require("jsonwebtoken")

require('./config/passports')(passport)
app.use(passport.initialize());
// db connect
mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((x) => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.error("Error while connecting DB ..");
  });

// JWT Extract
// let authJwt = (req, res, next) => {
//   let token = req.headers.authorization; // Corrected 'req.header.authorization' to 'req.headers.authorization'
//   console.log("The token is :", token)
//   if (!token) {
//     return res.status(403).send({
//       success: false,
//       message: "Failed to authenticate",
//     });
//   } else {
//     // Verify the token
//     jwt.verify(token.split(' ')[1], process.env.secretKey, function (
//       err,
//       decoded
//     ) {
//       if (err) {
//         return res.status(403).send({
//           success: false,
//           message: "invalid token",
//         });
//       } else {
//         next();
//       }
//     });
//   }
// };

const port = process.env.PORT;

app.get("/", (req, res) => {
  res.send("Hello from Server!");
});


app.use("/auth", authRouter);
app.use("/song",passport.authenticate('jwt', {session:false}), songRouter);

app.listen(port, () => {
  console.log(`Server is running at port ${port}`);
});
