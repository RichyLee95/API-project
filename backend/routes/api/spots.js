const express = require('express')

const bcrypt = require('bcryptjs');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { setTokenCookie, restoreUser } = require('../../utils/auth');
const { Spot, SpotImage, User, Review, ReviewImage } = require('../../db/models');
const router = express.Router();

//get all spots
router.get('/', async (req, res) => {
    const spots = await Spot.findAll()
    return res.json(spots)
})


//get all spots by current user
router.get('/current', async (req, res) => {
    const userId = req.user.id
    const spot = await Spot.findAll({
        where: {
            ownerId: userId,
        },
    });

    return res.json(spot)
})


//get spot by id NOT FINISHED needs numreviews, avgstarrating spotimages
router.get('/:spotId', async (req, res) => {
    const spotId = req.params.spotId
    const spot = await Spot.findByPk(spotId)
    if (!spot) {
        return res.status(404).json({
            "message": "Spot couldn't be found"
        })
    }
    const spothouse = await Spot.findAll({
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
    return res.json(spothouse)
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
    const { spotId } = req.params
    const { url, preview } = req.body
    const spot = await Spot.findByPk(spotId)
    if (!spot) {
        return res.status(404).json({
            "message": "Spot couldn't be found"
        })
    }
    const spotImage = await SpotImage.findOne({
        where: {
            spotId
        }
    })
    const Image = await SpotImage.create({
        url,
        preview
    })
    res.json({
        id: Image.id,
        url: Image.url,
        preview: Image.preview
    })

})

//Edit a spot
router.put('/:spotId', async (req, res) => {
    const { spotId } = req.params
    const spot = await Spot.findByPk(spotId)
    if (!spot) {
        return res.status(404).json({
            "message": "Spot couldn't be found"
        })
    } else {
        const { address, city, state, country, lat, lng, name, description, price } = req.body
        updatedSpot.address = address
        updatedSpot.city = city
        updatedSpot.state = state
        updatedSpot.country = country
        updatedSpot.lat = lat
        updatedSpot.lng = lng
        updatedSpot.name = name
        updatedSpot.description = description
        updatedSpot.price = price
        await updatedSpot.save();
        res.status(200).json(updatedSpot)
    }
})


//Delete a spot
router.delete('/:spotId', async (req, res) => {
    const { spotId } = req.params
    const deletedSpot = await Spot.findByPk(spotId);
    await deletedSpot.destroy();
    if (!spotId) {
        return res.status(404).json({
            "message": "Spot couldn't be found"
        })
    } else {
        res.json({
            message: "Successfully deleted"
        })
    }
})

//get all reviews by spotid
router.get('/:spotId/reviews', async (req, res) => {
    const { spotId } = req.params
    const spot = await Spot.findByPk(spotId)
    if (!spot) {
        return res.status(404).json({
            "message": "Spot couldn't be found"
        })
    }
    const review = await Review.findAll({
        where: {
            spotId: spotId,
        },
        include: [
            {
                model: User,
                attributes: ['id', 'firstName', 'lastName'],
            },
            {
                model: ReviewImage,
                attributes: ['id', 'url']
            }
        ]
    });
    return res.json(review)
})

//create a review for a spot based on userId
router.post('/:spotId/reviews', async (req, res) => {
    const { review, stars } = req.body
    const spot = await Spot.findByPk(spotId)
    const reviewcheck = await Review.findOne({
        where: {
            spotId: req.params.spotId,
            userId: req.user.id,
        },
    })
    if (reviewcheck) {
        return res.status(500).json({
            "message": "User already has a review for this spot"
        })
    }
    if (!spot) {
        return res.status(404).json({
            "message": "Spot couldn't be found"
        })
    }
    const newReview = await Review.create({
        userId: req.user.id,
        spotId: spotId.id,
        review,
        stars
    })
    res.json(newReview)
})





module.exports = router;