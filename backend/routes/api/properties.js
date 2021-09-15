//create a router here
const express = require('express');
const router = express.Router();
// since we're doing database stuff,
// you'll want some kind of asyncHandler
const asyncHandler = require('express-async-handler');
const propertiesValidations = require('../../utils/validation')
const { check, validationResult } = require('express-validator');
//take a second to import the database stuff you'll need
const { Property } = require('../../db/models');
//here's where you'll also import other middleware
const { RequireAuth } = require('../../utils/auth')

//create the api route here
router.get('/', asyncHandler (async(req, res) => {
 const properties = await Property.findAll();
//  console.log(properties)
    return res.json(properties)
}));

router.get('/:id', asyncHandler (async(req, res) => {
    const propertyId = parseInt(req.params.id, 10);
    const property = await Property.findByPk(propertyId);

    return res.json(property);
}));

router.post(
    '/',
    propertiesValidations.validateCreate,
    asyncHandler(async(req, res) => {
        const property = await Property.create(req.body);
        res.json(property)
    })

)

router.put(
    '/:id',
    propertiesValidations.validateUpdate,
    asyncHandler(async function(req, res) {
        const id = await Property.findByPk(req.params.id)
        await id.update(

            {where: {
                id: id,
                name: req.params.name,
                address: req.params.address,
                userId: req.params.userId,
                description: req.params.description,
                price: req.params.price,
            }}
        )
        res.json(id);
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
