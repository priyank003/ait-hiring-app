const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const UserSchema = new Schema(
  {
    email: {
      type: String,
      sparse: true,
    },
    outlookId: {
      type: String,
      required: true,
      unique: true,
    },
  },
  {
    strict: false,
  }
);

module.exports = mongoose.model("User", UserSchema);
