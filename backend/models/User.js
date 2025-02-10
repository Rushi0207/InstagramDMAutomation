const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  instagramId: { type: String, required: true, unique: true },
  accessToken: { type: String, required: true },
  email: { type: String, unique: true },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("User", UserSchema);