const {
    singleMulterUpload,
    singlePublicFileUpload,
    multipleMulterUpload,
    multiplePublicFileUpload,
  } = require("../../awsS3");
//create a router here
const express = require('express');
const router = express.Router();
// since we're doing database stuff,
// you'll want some kind of asyncHandler
const asyncHandler = require('express-async-handler');
const propertiesValidations = require('../../utils/validation')
const { check, validationResult } = require('express-validator');
//take a second to import the database stuff you'll need
const { Property, Image } = require('../../db/models');
//here's where you'll also import other middleware
const { RequireAuth } = require('../../utils/auth')

//create the api route here
router.get('/', asyncHandler (async(req, res) => {
 const properties = await Property.findAll({
     include: Image,
 });
//  console.log(properties)
    return res.json(properties)
}));

router.get('/:id', asyncHandler (async(req, res) => {
    const propertyId = parseInt(req.params.id, 10);
    const property = await Property.findByPk(propertyId, {
        include: Image,
    });
        // console.log(property)
    return res.json(property);
}));

router.post(
    '/',
    propertiesValidations.validateCreate,
    asyncHandler(async(req, res) => {
        const property = await Property.create(req.body);
        res.json(property)
    })

);


router.post(
    '/',
    singleMulterUpload('image'),
    propertiesValidations.validateCreate,
    asyncHandler(async(req, res) => {
        const imageUrl = await singlePublicFileUpload(req.file);
        const property = await Property.create(req.body);
        let propertyId = property.id
        const image = await Image.create({
            imageUrl,
            propertyId
        })
        const data = {
            image,
            property
        }
        res.json(data)
    })

);

router.put(
    '/:id/edit',
    propertiesValidations.validateUpdate,
    asyncHandler(async function(req, res) {
        const id = parseInt(req.params.id)
        // console.log(id)
        const property = await Property.findByPk(id)
        const putProperty = await property.update(req.body)
        return res.json(putProperty);
    }),
);

router.delete(
    '/:id',
    asyncHandler (async(req, res)=> {
        const property = await Property.findByPk(req.params.id);
        if (!property) throw new Error('Cannot find that property')

        await property.destroy({ where: {id: property.id }})
        return res.json({ message: 'success' });
    })
)

//remember to export the router too
module.exports = router;
