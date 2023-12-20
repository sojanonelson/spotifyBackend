const mongoose = require("mongoose");

const Playlist = new mongoose.Schema({
  name: { type: String, required: true },
  coverart: { type: String, required: true },
  songs: [{ type: mongoose.Types.ObjectId, ref: "song" }],
  collaborators: [
    {
      type: mongoose.Types.ObjectId,
      ref: "user",
    },
  ],
  owner: { type: mongoose.Types.ObjectId, ref: "user" },
});

const UserModel = mongoose.model("Playlist", Playlist);
