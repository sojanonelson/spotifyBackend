const express = require("express");
const router = express.Router();
const passport = require("passport");
const Song = require("../models/Song");

router.use(express.json());

// POST endpoint to create a song
router.post("/create", async (req, res) => {
  console.log("response ", req.body);
  try {
    const { name, coverart, track } = req.body;
    if (!name || !coverart || !track) {
      return res
        .status(400)
        .json({ msg: "Insufficient details to create song." });
    }
    const artist = req.user._id;
    const songDetails = { name, coverart, track, artist };
    console.log(songDetails);
    const createdSong = await Song.create(songDetails);
    return res.status(200).json(createdSong);
  } catch (error) {
    console.error("Error creating song:", error);
    return res.status(500).json({ msg: "Internal Server Error" });
  }
});

// GET endpoint to retrieve songs created by the current user
router.get(
  "/get/mysongs",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    try {
      const currentUser = req.user;
      const songs = await Song.find({ artist: currentUser._id });
      return res.status(200).json({ data: songs });
    } catch (error) {
      console.error("Error retrieving user's songs:", error);
      return res.status(500).json({ msg: "Internal Server Error" });
    }
  }
);

module.exports = router;
