const express = require("express");
const {
  createMessage,
  searchChatMessages,
  findAllMessages,
  deleteMessage,
} = require("../controllers/message");
const router = express.Router();

router.route("/:chatId").post(createMessage).get(findAllMessages);
router.route('/:chatId/search').get(searchChatMessages)
router.route("/:messageId").delete(deleteMessage);

module.exports = router;
