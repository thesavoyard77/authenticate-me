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

 const name = check('name').notEmpty();
 const address = check('address').notEmpty();
 const userId = check('userId')
    .notEmpty()
    .isInt({min: 1})
 const description = check('description').notEmpty();
 const price = check('price').isDecimal();

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


  module.exports = {
    handleValidationErrors,
    validateCreate,
    validateUpdate,
  };
