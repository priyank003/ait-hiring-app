const express = require("express");
const router = express.Router();
const passport = require("passport");
const isLoggedIn = require("../middleware/isLoggedIn");
const checkAuth = require("../middleware/check-auth");
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

router.use(checkAuth);

router.post("/create", httpCreatePost);
router.delete("/delete/:postid/:authorid", httpDeletePost);

router.get("/allcomments/:postid", httpGetComment);

router.post("/comment/:postid", httpPostComment);
router.delete("/comment/delete/:postid/:commentid/:authorid", httpDeleteComment);

module.exports = router;
