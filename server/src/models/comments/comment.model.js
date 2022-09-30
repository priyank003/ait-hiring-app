const Comment = require("./comment.mongo");
const Post = require("../posts/post.mongo");
const postComment = async (postId, commentObj) => {
  try {
    const post = await Post.findOne({ postId: postId }).exec();
    post.comment({
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

const deleteComment = async (commentId) => {
  try {
    return await Post.deleteOne({ commentId: commentId });
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
