const express = require('express');
const router = express.Router();

const profileCardRoutes = require('./profileCard');
const userRouter = require('./user');

router.use('/profile-card', profileCardRoutes);

router.use('/user', userRouter);

module.exports = router;
