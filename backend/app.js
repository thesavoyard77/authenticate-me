const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const csurf = require('csurf');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');
const routes = require('./routes');

const { environment } = require('./config');
const isProduction = environment === 'production';
const app = express();
app.use(morgan('dev'));
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));
app.use(express.json())

if (!isProduction) {
    // enable cors only in development
    app.use(cors());
  }
  // helmet helps set a variety of headers to better secure your app
  app.use(helmet({
    contentSecurityPolicy: false
  }));

  // Set the _csrf token and create req.csrfToken method
  // Comment this out to use Postman to test backend routes
  app.use(
    csurf({
      cookie: {
        secure: isProduction,
        sameSite: isProduction && "Lax",
        httpOnly: true,
      },
    })
  );

  app.use(routes);

  app.use((req, res, next) => {
    const err = new Error("The requested resource could not be found.");
    err.title = "Resource not found";
    err.errors = ["The requested resource could not be found."];
    err.status = 404;
    next(err)
  });

 const { ValidationError } = require('sequelize');

 app.use((err, _req, _res, next ) => {
   if (err instanceof ValidationError) {
     err.errors = err.errors.map((e) => e.message);
     err.title = "Validation error";
   }
   next(err);
 });

 app.use((err, _req, res, _next) => {
   res.status(err.status || 500);
   console.error(err);
   res.json({
     title: err.title || 'Server Error',
     message: err.message,
     errors: err.errors,
     stack: isProduction ? null : err.stack,
   });
 });



  module.exports = app;
