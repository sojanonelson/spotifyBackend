const mongoose = require("mongoose");

const User = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  
  password: { type: String, required: true },
  likedSongs: { type: String, default: "" },
  likedPlaylist: { type: String, default: "" },
  subscribedArtists: { type: String, default: "" },
});

const UserModel = mongoose.model("User", User);

module.exports = UserModel;
