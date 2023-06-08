const express = require('express');
const router = express.Router();

const asyncWrapper = require('../context/asyncWrapper');
const UserController = require('../controllers/user');
//const UserValidate = require('../validates/user');
const { user: User } = require('../models');

router.get('/userList', asyncWrapper(async (req, res) => {
  const list = await User.findAll();

  res.json({
    list,
  });
}));

router.post('/addUser', UserController.addUser);

module.exports = router;
