const express = require('express')
const router = require('express').Router();
const sessionRouter = require('./session.js');
const usersRouter = require('./users');
const asyncHandler = require('express-async-handler');
const { setTokenCookie } = require('../../utils/auth.js');
const { User, Property } = require('../../db/models');
const propertiesRouter = require('./properties')
//check here if you get a 404
router.use('/session', sessionRouter);
router.use('/users', usersRouter);

router.use('/properties', propertiesRouter);


// router.post('/test', (req, res) => {
//   res.json({ requestBody: req.body });
// });


module.exports = router;
