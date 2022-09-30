const express = require("express");
const router = express.Router();
const passport = require("passport");
const {
  httpCreatePost,
  httpGetPost,
  httpDeletePost,
} = require("../controller/post.controller");
const {
  httpPostComment,
  httpDeleteComment,
  httpGetComment,
} = require("../controller/comment.controller");

router.get("/get", httpGetPost);
router.post("/create", httpCreatePost);
router.delete("/delete/:postid", httpDeletePost);

router.get("/allcomments/:postid", httpGetComment);

router.post("/comment/:postid", httpPostComment);
router.delete("/delete/:commentId", httpDeleteComment);

module.exports = router;
