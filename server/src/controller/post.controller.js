const { createPost, getPosts,deletePost } = require("../models/posts/post.model");
const { postComment } = require("../models/comments/comment.model");
const { v4: uuidv4 } = require("uuid");
const User = require("../models/user/user.mongo");
const jwt = require("jsonwebtoken");
const httpCreatePost = async (req, res) => {
  const token = req.headers.authorization.split(" ")[1];

  const user = jwt.verify(token, process.env.JWTSecretKey);

  const postedByUser = await User.findOne({ outlookId: user.id }).exec();

  const postObj = {
    author: postedByUser._id,
    activityDateTime: new Date(),
    id: uuidv4(),
    ...req.body,
  };
  await createPost(postObj);

  res.status(200).json({
    status: "ok",
  });
};

const httpGetPost = async (req, res) => {
  const posts = await getPosts();

  res.status(200).json({
    status: "ok",
    results: posts,
  });
};

const httpDeletePost = async (req, res) => {
  const postId = req.params.postid;

  await deletePost(postId);

  res.status(200).json({
    status: "ok",
    message: "deleted post successfully",
  });
};

module.exports = {
  httpCreatePost,
  httpGetPost,
  httpDeletePost,
};
