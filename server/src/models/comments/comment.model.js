const Comment = require("./comment.mongo");
const Post = require("../posts/post.mongo");
const postComment = async (postId, commentObj) => {
  try {
    const post = await Post.findOne({ postId: postId }).exec();
    post.comment({
      commentId: commentObj.commentId,
      author: commentObj.author,
      text: commentObj.description,
      activityDateTime: commentObj.activityDateTime,
    });
    // return post.comments({
    //   author: commentObj.author,
    //   text: commentObj.description,
    //   activityDateTime: commentObj,
    // });
    // });
  } catch (err) {
    console.log(`Could not post comment ${err}`);
  }
};

const deleteComment = async (postId, commentId) => {
  try {
    return await Post.findOneAndUpdate(
      { postId: postId },
      { $pull: { comments: { commentId: commentId } } }
    );
  } catch (err) {
    console.log(`Could not delete post ${err}`);
  }
};

const getComments = async (postId) => {
  try {
    const post = await Post.findOne({ postId: postId }).populate({
      path: "comments",
      populate: {
        path: "author",
      },
    });
    return post;
  } catch (err) {
    console.log(`Could not get comments ${err}`);
  }
};
module.exports = {
  postComment,
  deleteComment,
  getComments,
};
