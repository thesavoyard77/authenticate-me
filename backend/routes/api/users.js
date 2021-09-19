const express = require('express');
const asyncHandler = require('express-async-handler');

const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { User, Property, Reservation } = require('../../db/models');

const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const router = express.Router();

const validateSignup = [
    check('email')
      .exists({ checkFalsy: true })
      .isEmail()
      .withMessage('Please provide a valid email.'),
    check('username')
      .exists({ checkFalsy: true })
      .isLength({ min: 4 })
      .withMessage('Please provide a username with at least 4 characters.'),
    check('username')
      .not()
      .isEmail()
      .withMessage('Username cannot be an email.'),
    check('password')
      .exists({ checkFalsy: true })
      .isLength({ min: 6 })
      .withMessage('Password must be 6 characters or more.'),
    handleValidationErrors,
  ];

router.post(
    '/',
    validateSignup,
    asyncHandler(async(req, res) => {
        const { email, password, username } = req.body;
        const user = await User.signup({ email, username, password });

        await setTokenCookie(res, user);

        return res.json({
            user,
        });
    }),
);
// get all users, probably won't use
router.get('/', asyncHandler (async(req, res) => {
  // console.log("reqBody======>", req.body)
  const users = await User.findAll();

  res.json(users);
}));

//Get both reservations and properties in one go, worth a try
// router.get(
//   '/:id',
//   asyncHandler(async(req, res) => {
//     const usersStuff = await User.findOne({
//       where: { id:req.params.id},
//       include: [{
//         model: Reservation,
//         model: Property
//     }]
//     })
//     return res.json(usersStuff)
//   })
// )

//get all users reservations with properties and reservations
router.get(
  '/:id/reservations',
  asyncHandler(async(req, res) => {
    const usersStuff = await User.findByPk(req.params.id, {
      include: [ Reservation, Property ]
    });
    return res.json(usersStuff)
  })
);


// //Get all of a user's properties
// router.get(
//   '/:id/properties',
//   asyncHandler(async(req, res) => {
//     const usersStuff = await User.findOne({
//       where: { id:req.params.id},
//       include: {
//         model: Property
//     }
//     })
//     return res.json(usersStuff)
//   })
// );


module.exports = router;
