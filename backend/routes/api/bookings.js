const express = require('express')

const bcrypt = require('bcryptjs');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { setTokenCookie, restoreUser } = require('../../utils/auth');
const { Spot, SpotImage, User, Review, Booking } = require('../../db/models');
const router = express.Router();

//get all booking by current user
router.get('/current', async (req, res) => {
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

//edit a booking
router.put('/bookingId', async (req, res) => {
    const { bookingId } = req.params
    const updatedBooking = await Spot.findByPk(bookingId)
    const { startDate, endDate } = req.body
    if (!updatedBooking) {
        return res.status(404).json({
            "message": "Booking couldn't be found"
        })
    }
    if(new Date(endDate) < new Date(startDate)){
        return res.status(400).json({
            "message":"Bad request",
            "errors": {
                "endDate": "endDate cannot come before startDate"
              },
        })
    }
    updatedSpot.startDate = startDate
    updatedSpot.endDate = endDate
    await updatedSpot.save();
    res.status(200).json(updatedBooking)
})


//delete a booking
router.delete('/:bookingId', async (req, res) => {
    const { bookingId } = req.params
    const deletedBooking = await Booking.findByPk(bookingId)
    await deletedBooking.destroy()
    if (!bookingId) {
        return res.status(404).json({
            "message": "Booking couldn't be found"
        })
    } else {
        res.json({
            message: "Successfully deleted"
        })
    }
})


module.exports = router;