const {
  createPost,
  getPosts,
  deletePost,
} = require("../models/posts/post.model");
const { postComment } = require("../models/comments/comment.model");
const { v4: uuidv4 } = require("uuid");
const User = require("../models/user/user.mongo");
const jwt = require("jsonwebtoken");
const HttpError = require("../models/http-error");
const httpCreatePost = async (req, res) => {
  const { title, author, description } = req.body;
  // const token = req.headers.authorization.split(" ")[1];

  // const user = jwt.verify(token, process.env.JWTSecretKey);

  const postedByUser = await User.findOne({ userId: author }).exec();

  const postObj = {
    author: postedByUser._id,
    title,
    description,
    activityDateTime: new Date(),
    postId: uuidv4(),
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

const httpDeletePost = async (req, res, next) => {
  const postId = req.params.postid;
  const authorId = req.params.authorid;

  if (req.userData.userId !== authorId) {
    const error = new HttpError("You are not allowed to edit this post", 401);
    return next(error);
  }

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
