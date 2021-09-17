 const { validationResult } = require('express-validator');
 const { check } = require('express-validator');


 const handleValidationErrors = (req, _res, next) => {
    const validationErrors = validationResult(req);

    if (!validationErrors.isEmpty()) {
      const errors = validationErrors
        .array()
        .map((error) => `${error.msg}`);

      const err = Error('Bad request.');
      err.errors = errors;
      err.status = 400;
      err.title = 'Bad request.';
      next(err);
    }
    next();
  };
// properties
 const name = check('name').notEmpty();
 const address = check('address').notEmpty();
 const userId = check('userId') //shared
    .notEmpty()
    .isInt({min: 1})
 const description = check('description').notEmpty();
 const price = check('price').isDecimal({ decimal_digits: '2' });
//reservations
 const propertyId = check('propertyId')
    .notEmpty()
    .isInt({min: 1})
 const startDate = check('startDate').isISO8601().toDate()
 const endDate = check('endDate').isISO8601().toDate().isAfter(startDate)
 const totalPrice = check('totalPrice').isCurrency()

const validateCreate = [
   name,
   address,
   userId,
   description,
   price,
   handleValidationErrors,
];


const validateUpdate = [
  name,
  address,
  userId,
  description,
  price,
  handleValidationErrors,
 ];

 validateReservationCreate= [
  userId,
  propertyId,
  startDate,
  endDate,
  totalPrice,
  handleValidationErrors,
];


  module.exports = {
    handleValidationErrors,
    validateCreate,
    validateUpdate,
    validateReservationCreate,
  };
