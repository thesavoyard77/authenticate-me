const express = require('express')
const router = require('express').Router();
const sessionRouter = require('./session.js');
const usersRouter = require('./users');
const asyncHandler = require('express-async-handler');
const { setTokenCookie } = require('../../utils/auth.js');
const { User, Property, Reservation } = require('../../db/models');
const propertiesRouter = require('./properties');
const reservationsRouter = require('./reservation');
//check here if you get a 404
router.use('/session', sessionRouter);
router.use('/users', usersRouter);
router.use('/reservations', reservationsRouter);
router.use('/properties', propertiesRouter);





module.exports = router;
