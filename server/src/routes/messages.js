const router = require("express").Router();
const {
  httpGetMessageById,
  httpPostMessage,
} = require("../controller/message.controller");
const checkAuth = require("../middleware/check-auth");

// router.use(checkAuth);

//add

router.post("/post", httpPostMessage);

//get

router.get("/:conversationId", httpGetMessageById);

module.exports = router;
