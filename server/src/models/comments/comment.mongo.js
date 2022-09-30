const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const commentSchema = new Schema({
  commentId: String,
  description: String,
  image: String,
  author: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  replies: [
    {
      type: Schema.Types.ObjectId,
      ref: "Comment",
    },
  ],
  activityDateTime: String,
});

module.exports = mongoose.model("Comment", commentSchema);
