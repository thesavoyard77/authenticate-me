const router = require('express').Router();
const sessionRouter = require('./session.js');
const usersRouter = require('./users');
const asyncHandler = require('express-async-handler');
const { setTokenCookie } = require('../../utils/auth.js');
const { User } = require('../../db/models');

router.use('/session', sessionRouter);
router.use('/users', usersRouter);



router.post('/test', (req, res) => {
  res.json({ requestBody: req.body });
});


module.exports = router;