//create a router here
const express = require('express');
const router = express.Router();
// since we're doing database stuff,
// you'll want some kind of asyncHandler
const asyncHandler = require('express-async-handler');

//take a second to import the database stuff you'll need
const { Property } = require('../../db/models');
//here's where you'll also import other middleware
const { RequireAuth } = require('../../utils/auth')

//create the api route here
router.get('/', asyncHandler (async(req, res) => {
 const properties = await Property.findAll();
//  console.log(properties)
    res.json(properties)
}));

//remember to export the router too
module.exports = router;
