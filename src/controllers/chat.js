const Chat = require('../models/chat');
const Message = require('../models/message');
const crudService = require('../utils/crudService');

const createChat = async (req, res) => {
   try {
     const senderId = req.user.userId;
     const data = { ...req.body };

     data.senderId = senderId;

     const chat = await crudService.createQuery(Chat, data);

     return res.status(201).json({
       message: "message sent successfully",
       data: chat,
     });
   } catch (error) {
    res.status(500).json({
        error: error.message
    });
   }
}

const findAllChats = async (req, res) => {
  const chats = await crudService.findAllQuery(Chat, {});

  return res.status(200).json({
    message: "Success",
    data: chats,
  });
};

const findChat = async (req, res) => {
 try {
   const { chatId } = req.params;

   const chat = await crudService.findOneQuery(Chat, {
     where: { id: chatId },
     include: ['message']
   });

   if (!chat) {
     throw new Error(`Chat ${chatId} not found`);
   }

   return res.status(200).json({
     message: "Success",
     data: chat,
   });
 } catch (error) {
  res.status(500).json({message: error.message});
 }
};

const deleteChat = async (req, res) => {
  const { chatId } = req.params;

  const chat = await crudService.deleteQuery(Chat, {
    where: { id: chatId },
  });

  if (!chat) {
    throw new Error(`Chat ${chatId} not found`);
  }

  return res.status(200).json({
    message: "Successfully deleted chat",
  });
};



module.exports = {
    createChat,
    findAllChats,
    findChat,
    deleteChat,
}