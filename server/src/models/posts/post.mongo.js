const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const postSchema = new Schema({
  postId: String,
  title: String,
  image: String,
  description: String,
  location: String,
  author: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  comments: [
    {
      author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
      text: String,
      activityDateTime: String,
    },
  ],
  activityDateTime: String,
});

postSchema.methods.comment= function (c) {

  this.comments.push(c);
  return this.save();
};

module.exports = mongoose.model("Post", postSchema);
