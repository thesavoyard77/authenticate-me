const express = require('express');
const router = express.Router();
// since we're doing database stuff,
// you'll want some kind of asyncHandler
const asyncHandler = require('express-async-handler');
const ReservationsValidations = require('../../utils/validation')
const { check, validationResult } = require('express-validator');
//take a second to import the database stuff you'll need
const { Reservation, Property } = require('../../db/models');
//here's where you'll also import other middleware
const { RequireAuth } = require('../../utils/auth')


//create the api route here

//find all reservations
router.get('/', asyncHandler (async(req, res) => {
    const reservations = await Reservation.findAll();

    return res.json(reservations);
}));

//find one reservation by id
router.get('/:id', asyncHandler (async(req, res) => {
    const reservationId = parseInt(req.params.id, 10);
    const reservation = await Reservation.findByPk(req.params.id, {
        include: Property
    });

    return res.json(reservation)
}));


//reservation with property

// router.get(
//     '/:id',
//     asyncHandler(async(req, res) => {
//       const reservation = await Reservation.findByPk(req.params.id, {
//         include: Property
//       });
//       return res.json(reservation)
//     })
//   );

//create a new reservation

router.post(
    '/',
    ReservationsValidations.validateReservationCreate,
    asyncHandler (async(req, res) => {
        const {
            userId,
            propertyId,
            startDate,
            endDate,
            totalPrice,
        } = req.body;

        const reservation = await Reservation.create({
            userId,
            propertyId,
            startDate,
            endDate,
            totalPrice,
        });
        res.json(reservation)
    })
);

//delete a reservation
router.delete(
    '/:id',
    asyncHandler (async(req, res) => {
        const reservation = await Reservation.findByPk(req.params.id);
        if (!reservation) throw new Error("Cannot find that reservation");

        await reservation.destroy({ where: {id: reservation.id}})
        return res.json({ message: 'Success!'})
    })
)

//remember to export the router too
module.exports = router;
