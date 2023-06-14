const express = require('express');
const router = express.Router();

const asyncWrapper = require('../context/asyncWrapper');
const UserController = require('../controllers/user');
//const UserValidate = require('../validates/user');
const { user: User } = require('../models');

router.get('/userColumnList', UserController.userColumnList);

router.get('/userList', UserController.userList);

router.get('/userInfo/:user_idx', UserController.userInfo);

router.post('/addUser', UserController.addUser);

router.post('/updateUser', UserController.updateUser);

module.exports = router;
