const express = require('express')

const bcrypt = require('bcryptjs');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { setTokenCookie, restoreUser, requireAuth } = require('../../utils/auth');
const { Spot, SpotImage, User, Review, Booking } = require('../../db/models');
const router = express.Router();

//get all booking by current user
router.get('/current', requireAuth, async (req, res) => {
    const userId = req.user.id
    const bookings = await Booking.findAll({
        where: {
            userId: userId,
        },
        include: [
            { model: Spot,
                attributes:{exclude:[
                    'createdAt','updatedAt', 'description'
                ]},
            include: {
                model:SpotImage
            } },
        ],
    });
let bookingarr = []
bookings.forEach(booking=>{
    bookingarr.push(booking.toJSON())
})
// console.log(bookingarr)
bookingarr.forEach(spot =>{
    spot.Spot.SpotImages.forEach(img=>{
        if(img.preview === true){
            spot.Spot.previewImage=img.url
        }
        delete spot.Spot.SpotImages
    })
})
// console.log(spot.Spot)
console.log(bookingarr)
    return res.status(200).json({ Bookings: bookingarr })
})

//edit a booking
router.put('/:bookingId', requireAuth, async (req, res) => {
    const { bookingId } = req.params
    const updatedBooking = await Booking.findByPk(bookingId)
    const { startDate, endDate } = req.body
    console.log(updatedBooking)
    if (!updatedBooking) {
        return res.status(404).json({
            "message": "Booking couldn't be found"
        })
    }
    if(updatedBooking.userId !== req.user.id){
        return res.status(403).json({"message":"Forbidden"})
    }
    if (new Date(endDate) < new Date(startDate)) {
        return res.status(400).json({
            "message": "Bad request",
            "errors": {
                "endDate": "endDate cannot come before startDate"
            },
        })
    }
    let bookings = await Booking.findAll()
    let bookingarr = []
    bookings.forEach(booking=>{
        bookingarr.push(booking.toJSON())
    })
    if(new Date(updatedBooking.startDate).getTime()< new Date().getTime()){
        return res.status(403).json({'message':"Past bookings can't be modified"})
    }
    bookingarr.forEach(booking=>{
        const newStart = new Date(startDate).getTime()
        const newEnd = new Date(endDate).getTime()
        const start=new Date(booking.startDate).getTime()
        const end=new Date(booking.endDate).getTime()
        if(((newStart<=start && newEnd >= end)|| (newEnd > start && newEnd <= end) || (newStart >= start && newStart < end))){
            return res.status(403).json({"message": "Sorry, this spot is already booked for the specified dates",
            "errors": {
              "startDate": "Start date conflicts with an existing booking",
              "endDate": "End date conflicts with an existing booking"
            }})
        }
    })

    updatedBooking.startDate = startDate
    updatedBooking.endDate = endDate
    await updatedBooking.save();
    res.status(200).json(updatedBooking)
})


//delete a booking INCLUDE SPOT,NEEDS BOOKING CANT BE DELETED IF STARTED
router.delete('/:bookingId', requireAuth, async (req, res) => {
    const { bookingId } = req.params
    const deletedBooking = await Booking.findByPk(bookingId, {include:{model:Spot}})
    // const spot = await Spot.findAll(ownerId)
    if (!deletedBooking) {
        return res.status(404).json({
            "message": "Booking couldn't be found"
        })
    }
    if(!(deletedBooking.userId === req.user.id || req.user.id === deletedBooking.Spot.ownerId )){
        return res.status(403).json({"message":"Forbidden"})
    }
    if(new Date(deletedBooking.startDate).getTime() <= new Date().getTime()){
        return res.status(403).json({'message':"Bookings that have been started can't be deleted"})
        
    }


     await deletedBooking.destroy()
    res.status(200).json({
        message: "Successfully deleted"
    })

})


module.exports = router;