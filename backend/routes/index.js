const express = require('express');
const router = express.Router();

const profileCardRoutes = require('./profileCard');
const userRouter = require('./user');
const profileRouter = require('./profile');

//router.use('/profile-card', profileCardRoutes);

router.use('/user', userRouter);

router.use('/profile', profileRouter);

module.exports = router;
