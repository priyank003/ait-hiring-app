const Message = require("../models/messages/message.mongo");

const httpPostMessage = async (req, res) => {
  const newMessage = new Message(req.body);

  try {
    const savedMessage = await newMessage.save();
    res.status(200).json(savedMessage);
  } catch (err) {
    res.status(500).json(err);
  }
};

const httpGetMessageById = async (req, res) => {
 
  try {
    const messages = await Message.find({
      conversationId: req.params.conversationId,
    });

    const msg = await Message.find({
      conversationId: "6337200274727660986b1bc8",
    });
   
    res.status(200).json(messages);
  } catch (err) {
    res.status(500).json(err);
  }
};

module.exports = {
  httpPostMessage,
  httpGetMessageById,
};
