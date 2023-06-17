const express = require('express');
const router = express.Router();

const ProfileController = require('../controllers/profile');

router.post('/addProfile', ProfileController.addProfile);

module.exports = router;
