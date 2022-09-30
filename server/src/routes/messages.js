const router = require("express").Router();
const {
  httpGetMessageById,
  httpPostMessage,
} = require("../controller/message.controller");

//add

router.post("/", httpPostMessage);

//get

router.get("/:conversationId", httpGetMessageById);

module.exports = router;
