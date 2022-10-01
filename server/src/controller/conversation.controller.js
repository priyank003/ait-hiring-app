const Conversation = require("../models/conversation/conversation.mongo");
const chatUsers = require("../models/chatUsers/chatUsers.mongo");

const httpPostConversation = async (req, res) => {
  const newConversation = new Conversation({
    members: [req.body.senderId, req.body.receiverId],
  });

  try {
    const savedConversation = await newConversation.save();
    res.status(200).json(savedConversation);
  } catch (err) {
    res.status(500).json(err);
  }
};

const httpGetConversation = async (req, res) => {
  try {
    const conversation = await Conversation.find({
      members: { $in: [req.params.userId] },
    });

    res.status(200).json(conversation);
  } catch (err) {
    res.status(500).json(err);
  }
};

const httpGetConvTwoUsers = async (req, res) => {
  try {
    const conversation = await Conversation.findOne({
      members: { $all: [req.params.firstUserId, req.params.secondUserId] },
    });
    console.log(conversation);
    if (conversation == null) {
      console.log(req.params.firstUserId, req.params.secondUserId);
      const newConvo = new Conversation({
        members: [req.params.firstUserId, req.params.secondUserId],
      });

      await newConvo.save();

      return res.status(200).json(newConvo);
    }
    res.status(200).json(conversation);
  } catch (err) {
    res.status(500).json(err);
  }
};
const httpGetUserData = async (req, res) => {
  try {
    const user = await chatUsers.findOne({ userId: req.params.userId });

    res.status(200).json(user);
  } catch (err) {
    res.status(500).json(err);
  }
};
module.exports = {
  httpPostConversation,
  httpGetConversation,
  httpGetConvTwoUsers,
  httpGetUserData,
};
