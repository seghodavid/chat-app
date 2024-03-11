const Message = require("../models/message");
const crudService = require("../utils/crudService");
const { Op } = require("sequelize");

const createMessage = async (req, res) => {
  const chatId = req.params.chatId;

  try {
    const data = { ...req.body };
    data.chatId = chatId;

    const message = await crudService.createQuery(Message, data);

    return res.status(201).json({
      message: "message sent successfully",
      data: message,
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

const findAllMessages = async (req, res) => {
  const chatId = req.params.chatId;

  try {
    const messages = await crudService.findAllQuery(Message, {
      where: { chatId: chatId},
      attributes: ["content"],
    });

    return res.status(200).json({
      message: "message found",
      data: messages,
    });
  } catch (error) {
    console.log(error);
    res.status(404).json({ message: error.message });
  }
};

const searchChatMessages = async (req, res) => {
  const search = req.query.search;
  const chatId = req.params.chatId;

  try {
    if(!search) throw new Error ('Search filter is empty')
    const text = await crudService.findAllQuery(Message, {
      where: { chatId: chatId, content: { [Op.like]: `%${search}%` } },
      attributes: ['content'],
    });

     return res.status(200).json({
       message: "message found",
       data: text,
     });
  } catch (error) {
    console.log (error);
  res.status(404).json({ message: error.message });
  }
};

const deleteMessage = async (req, res) => {
  try {
    const { messageId } = req.params;

    const message = await crudService.deleteQuery(Message, {
      where: { id: messageId },
    });

    if (!message) {
      throw new Error(`Message ${messageId} not found`);
    }

    return res.status(200).json({
      message: "Message deleted successfully",
    });
  } catch (error) {
      console.log(error);
      res.status(404).json({ message: error.message });
  }
};

module.exports = {
  createMessage,
  searchChatMessages,
  findAllMessages,
  deleteMessage
};
