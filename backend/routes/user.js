const express = require('express');
const router = express.Router();

const asyncWrapper = require('../context/asyncWrapper');
const UserController = require('../controllers/user');
//const UserValidate = require('../validates/user');
const { user: User } = require('../models');

router.get('/userList', UserController.userList);

router.post('/addUser', UserController.addUser);

module.exports = router;
