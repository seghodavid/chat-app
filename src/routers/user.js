const express = require('express');
const { createUser, findAllUsers, findUser, updateUser, deleteUser, login } = require('../controllers/user');
const router = express.Router();


router.route('/register').post(createUser)
router.route('/login').post(login)
router.route('/users').get(findAllUsers)
router.route('/user/:userId').get(findUser).patch(updateUser).delete(deleteUser)


module.exports = router