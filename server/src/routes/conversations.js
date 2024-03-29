const router = require("express").Router();
const Conversation = require("../models/conversation/conversation.mongo");
const checkAuth = require("../middleware/check-auth");
const {
  httpGetConversation,
  httpPostConversation,
  httpGetConvTwoUsers,
  httpGetUserData,
} = require("../controller/conversation.controller");

// router.use(checkAuth);


//new conv

router.post("/", httpPostConversation);

//get conv of a user

router.get("/:userId", httpGetConversation);

// get conv includes two userId

router.get("/find/:firstUserId/:secondUserId", httpGetConvTwoUsers);

router.get("/userdata/:userId", httpGetUserData);

module.exports = router;
