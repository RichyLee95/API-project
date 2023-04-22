const express = require('express')

const bcrypt = require('bcryptjs');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { setTokenCookie, restoreUser, requireAuth } = require('../../utils/auth');
const { Spot, SpotImage, User, Review, Booking } = require('../../db/models');
const router = express.Router();

//get all booking by current user TAKE OUT DESC, CREATED AT, UPDATED AT
router.get('/current', requireAuth, async (req, res) => {
    const userId = req.user.id
    const booking = await Booking.findAll({
        where: {
            userId: userId,
        },
        include: [
            { model: Spot },
        ],
    });

    return res.status(200).json({ Bookings: booking })
})

//edit a booking REQUESTED RESOUCE NOT FOUND, ADD BOOKING CONFLICT
router.put('/bookingId', requireAuth, async (req, res) => {
    const { bookingId } = req.params
    const updatedBooking = await Spot.findByPk(bookingId,{include:[Spot]})
    const { startDate, endDate } = req.body
    if (!updatedBooking) {
        return res.status(404).json({
            "message": "Booking couldn't be found"
        })
    }
    if (new Date(endDate) < new Date(startDate)) {
        return res.status(400).json({
            "message": "Bad request",
            "errors": {
                "endDate": "endDate cannot come before startDate"
            },
        })
    }
    if(updatedBooking.userId !== req.user.id){
        return res.status(403).json({"message":"Booking must belong to the current user"})
    }
    updatedBooking.startDate = startDate
    updatedBooking.endDate = endDate
    await updatedBooking.save();
    res.status(200).json(updatedBooking)
})


//delete a booking INCLUDE SPOT,NEEDS BOOKING CANT BE DELETED IF STARTED
router.delete('/:bookingId', requireAuth, async (req, res) => {
    const { bookingId } = req.params
    const deletedBooking = await Booking.findByPk(bookingId)

    if (!bookingId) {
        return res.status(404).json({
            "message": "Booking couldn't be found"
        })
    } await deletedBooking.destroy()
    res.json({
        message: "Successfully deleted"
    })

})


module.exports = router;