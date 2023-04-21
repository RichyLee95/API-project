const express = require('express')

const bcrypt = require('bcryptjs');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { setTokenCookie, restoreUser } = require('../../utils/auth');
const { Spot, SpotImage, User, Review,Booking } = require('../../db/models');
const router = express.Router();

//get all booking by current user
router.get('/current', async (req, res) => {
    const userId = req.user.id
    const booking = await Booking.findAll({
        where: {
            ownerId: userId,
        },
    });

    return res.json(booking)
})

//edit a booking
router.put('/bookingId', async (req, res) => {
    const { bookingId } = req.params
    const updatedBooking = await Spot.findByPk(bookingId)
    if (!updatedBooking) {
        return res.status(404).json({
            "message": "Booking couldn't be found"
        })
    } else {
        const { startDate, endDate } = req.body
        updatedSpot.startDate = startDate
        updatedSpot.endDate = endDate
        await updatedSpot.save();
        res.status(200).json(updatedBooking)
    }
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