const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt"); // Don't forget to require bcrypt
const User = require("../models/User");
const { getToken } = require("../utils/helpers");

// Add this line to parse JSON in the request body
router.use(express.json());

router.post("/register", async (req, res) => {
  try {
    const { email, password, name } = req.body;

    // Use await to wait for the result of the findOne query
    const user = await User.findOne({ email: email });

    if (user) {
      return res.status(403).json({ error: "Email is already in use!" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUserData = { email, password: hashedPassword, name };
    const newUser = await User.create(newUserData);
    const token = await getToken(email, newUser);
    const userToReturn = { ...newUser.toJSON(), token };
    delete userToReturn.password;
    console.log("Register Sucessfull..");
    console.log("\x1b[33m", "Login Successful..", "\x1b[0m");
    return res.status(200).json(userToReturn);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ error: "Missing fields." });
  }
  const user = await User.findOne({ email: email });
  if (!user) {
    return res.status(401).json({ error: "Invalid credentials." });
  }
  const validPassword = await bcrypt.compare(password, user.password); // Fix the typo here
  if (!validPassword) {
    return res.status(401).json({ error: "Invalid credentials." });
  }
  console.log("\x1b[32m\x1b[47m", "Login Successful..", "\x1b[0m");
  const token = await getToken(user.email, user);
  const userToReturn = { ...user.toJSON(), token };
  delete userToReturn.password;
  return res.status(200).json(userToReturn);
});

module.exports = router;
