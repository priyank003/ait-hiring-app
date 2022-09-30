const { v4: uuidv4 } = require("uuid");
const { deleteComment } = require("../models/comments/comment.model");
const jwt = require("jsonwebtoken");
const User = require("../models/user/user.mongo");
const {
  postComment,
  getComments,
} = require("../models/comments/comment.model");

const httpPostComment = async (req, res) => {
  const postId = req.params.postid;

  const token = req.headers.authorization.split(" ")[1];
  const user = jwt.verify(token, process.env.JWTSecretKey);
  const postedByUser = await User.findOne({ outlookId: user.id }).exec();
  const commentObj = {
    author: postedByUser._id,
    activityDateTime: new Date(),
    commentId: uuidv4(),
    ...req.body,
  };
  await postComment(postId, commentObj);

  res.status(200).json({
    status: "ok",
  });
};

const httpDeleteComment = async (req, res) => {
  const commentId = req.params.commentid;

  await deleteComment(commentId);

  res.status(200).json({
    status: "ok",
    message: "deleted post successfully",
  });
};

const httpGetComment = async (req, res) => {
  const postId = req.params.postid;

  const results = await getComments(postId);

  console.log(results);

  res.status(200).json({
    status: "ok",
    results: results.comments,
  });
};

module.exports = {
  httpPostComment,
  httpDeleteComment,
  httpGetComment,
};
