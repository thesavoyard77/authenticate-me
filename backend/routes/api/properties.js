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
    singleMulterUpload('image'),
    propertiesValidations.validateUpdate,
    asyncHandler(async function(req, res) {
        const imageUrl = await singlePublicFileUpload(req.file);
        const propertyId = parseInt(req.params.id)
        const property = await Property.findByPk(propertyId)
        const putProperty = await property.update(req.body)
        const image = await Image.create({
            imageUrl,
            propertyId
        })
        const data = {
            image,
            putProperty
        }
        res.json(data)
    }),
);


// router.post(
//     '/',
//     multipleMulterUpload("images"),
//     propertiesValidations.validateCreate,
//     asyncHandler(async(req, res) => {
//         const imagesUrl = await multiplePublicFileUpload(req.files);
//         const property = await Property.create(req.body);
//         let propertyId = property.id
//         imagesUrl.forEach(async(image) =>{
//             await image.create({
//                 imagesUrl,
//                 propertyId
//             })
//         }) 

//         res.json(property)
//     })
// );


router.delete(
    '/:id',
    asyncHandler (async(req, res)=> {
        const propertyId = req.params.id
        const allPropertyPhotos = await Image.findAll({
            where: {
                propertyId: propertyId
            }
        })
        allPropertyPhotos.forEach(async(image)=> {
            await image.destroy()
        })
        const property = await Property.findByPk(propertyId);
        if (!property) throw new Error('Cannot find that property')
        await property.destroy({ where: {id: propertyId }})
        return res.json({ message: 'success' });
    })
)

//remember to export the router too
module.exports = router;
