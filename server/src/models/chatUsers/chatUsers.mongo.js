const mongoose = require("mongoose");

const chatUsersSchema = new mongoose.Schema(
  {
    userId: String,
    userName: String,
    userAvatar: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("ChatUser", chatUsersSchema);
