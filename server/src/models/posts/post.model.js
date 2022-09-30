const Post = require("./post.mongo");

const createPost = async (postObj) => {
  try {
    return await Post.updateOne(
      {
        postId: postObj.id,
      },
      postObj,
      {
        upsert: true,
      }
    );
  } catch (err) {
    console.log(`Could not create or update post${err}`);
  }
};

const getPosts = async () => {
  try {
    return await Post.find();
  } catch (err) {
    console.log(`Could not get posts ${err}`);
  }
};

const deletePost = async (postId) => {
  try {
    return await Post.deleteOne({ postId: postId });
  } catch (err) {
    console.log(`Could not delete post ${err}`);
  }
};

module.exports = {
  createPost,
  getPosts,
  deletePost,
};
