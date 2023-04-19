const express = require('express')

const bcrypt = require('bcryptjs');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { setTokenCookie, restoreUser } = require('../../utils/auth');
const { Spot, SpotImage, User } = require('../../db/models');
const router = express.Router();

//get all spots not finished yet
router.get('/', async (req, res) => {

})


//get all spots by current user
router.get('/current', async (req, res) => {
    const userId = req.user.id
    const spot = await Spot.findAll({
        where: {
            ownerId: userId,
        },
    });
    console.log(userId)
    return res.json(spot)
})


//get spot by id
router.get('/:spotId', async (req, res) => {
    const spotId = req.params.spotId
    const spot = await Spot.findAll({
        where: {
            id: spotId,
        },
        include: [{
            model: SpotImage
        },
        {
            model: User
        },
        ],

    });
    return res.json(spot)
})

//Create a spot
router.post('/', async (req, res) => {
    const { address, city, state, country, lat, lng, name, description, price } = req.body
    const newSpot = await Spot.create({
        address, city, state, country, lat, lng, name, description, price
    })
    res.json({
        data: newSpot
    })
})

//Add img to spot based on spotid
router.post('/:spotId/images', async (req, res) => {



})

//Edit a spot
router.put('/:spotId', async (req, res) => {
const updatedSpot = await Spot.findbyPk(req.params.spotId)
const {address, city, state, country, lat, lng, name, description, price} = req.body

await updatedSpot.save();
res.json({
    data:updatedSpot
})
})


//Delete a spot
router.delete('/:spotId', async (req, res) => {
// const deletedSpot = 


})

module.exports = router;