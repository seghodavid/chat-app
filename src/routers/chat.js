const express = require('express');
const { createChat, findChat, findAllChats, deleteChat } = require('../controllers/chat');
const router = express.Router();


router.route('/').post(createChat)
router.route("/").get(findAllChats);
router
  .route("/:chatId")
  .get(findChat)
  .delete(deleteChat);


module.exports = router