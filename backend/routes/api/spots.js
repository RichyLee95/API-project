const express = require('express')

const bcrypt = require('bcryptjs');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { setTokenCookie, restoreUser, requireAuth } = require('../../utils/auth');
const { Spot, SpotImage, User, Review, ReviewImage, Booking } = require('../../db/models');
const router = express.Router();

const validateSpot = [
    check('address')
        .exists({ checkFalsy: true })
        .withMessage("Street address is required"),
    check('city')
        .exists({ checkFalsy: true })
        .withMessage("City is required"),
    check('state')
        .exists({ checkFalsy: true })
        .withMessage("State is required"),
    check('country')
        .exists({ checkFalsy: true })
        .withMessage("Country is required"),
    check('lat')
        .exists({ checkFalsy: true })
        .isDecimal()
        .withMessage("Latitude is not valid"),
    check('lng')
        .exists({ checkFalsy: true })
        .isDecimal()
        .withMessage("Longitude is not valid"),
    check('name')
        .exists({ checkFalsy: true })
        .isLength({ max: 50 })
        .withMessage("Name must be less than 50 characters"),
    check('description')
        .exists({ checkFalsy: true })
        .withMessage("Description is required"),
    check('price')
        .exists({ checkFalsy: true })
        .isDecimal()
        .withMessage("Price per day is required"),
    handleValidationErrors,
];

const validateReview = [
    check('review')
        .exists({ checkFalsy: true })
        .isDecimal()
        .withMessage("Review text is required"),
    check('stars')
        .exists({ checkFalsy: true })
        .isNumeric({ checkFalsy: true })
        .isInt({ min: 1, max: 5 })
        .withMessage("Stars must be an integer from 1 to 5"),
    handleValidationErrors,
]

const validateQuery = [
    check('page')
        .exists({ checkFalsy: true })
        .isInt({min:1, max:10, default:1})
        .withMessage("Page must be greater than or equal to 1"),
        check('size')
        .exists({ checkFalsy: true })
        .isInt({min:1, max:5, default:20})
        .withMessage("Size must be greater than or equal to 1"),
        check('maxLat')
        .optional()
        .isDecimal()
        .withMessage("Maximum latitude is invalid"),
        check('minLat')
        .optional()
        .isDecimal()
        .withMessage("Minimum latitude is invalid"),
        check('minLng')
        .optional()
        .isDecimal()
        .withMessage("Maximum longitude is invalid"),
        check('maxLng')
        .optional()
        .isDecimal()
        .withMessage("Minimum longitude is invalid"),
        check('minPrice')
        .optional()
        .isDecimal()
        .isFloat({ min: 0 })
        .withMessage("Minimum price must be greater than or equal to 0"),
        check('maxLng')
        .optional()
        .isDecimal()
        .isFloat({ min: 0 })
        .withMessage("Maximum price must be greater than or equal to 0"),
    handleValidationErrors,
]

//get all spots NEEDS PREVIEW IMG AND AVG RATING also is in array, must change
router.get('/',validateQuery, async (req, res) => {
    const spots = await Spot.findAll()

    const pagination = {}
    if((!page) || !parseInt(page) >0 ) page =1
    if((!size) || !parseInt(size) >0 ) size =20
    if(parseInt(page)>10) page = 10
    if(parseInt(size) >20) size =20

    pagination.limit = size
    pagination.offset = size * (page-1)

    return res.status(200).json(spots)
})


//get all spots by current user
router.get('/current', requireAuth, async (req, res) => {
    const userId = req.user.id
    const userspot = await Spot.findAll({
        where: {
            ownerId: userId,
        },
        include: [{model: SpotImage}, {model: Review}],
    });
let arr = []

userspot.forEach((spot)=>{
    arr.push(spot.toJSON())
})
arr.forEach((spot)=>{
    let star = 0
    let count = 0
spot.Reviews.forEach((review)=>{
    star += review.stars
    count++
})    
  spot.avgRating = star / count  
    spot.SpotImages.forEach((image)=>{
        if(image.preview === true){
            spot.previewImage = image.url
        }
    })
})
    arr.forEach((spot)=> delete spot.SpotImages)
    arr.forEach((spot)=> delete spot.Reviews)
    return res.status(200).json({Spots:arr})
})


//get spot by id  username and spot img created at, updated at,add alias
router.get('/:spotId', async (req, res) => {
    const { spotId } = req.params
    const spot = await Spot.findByPk(spotId)
    const spothouse = await Spot.findAll({
        where: {
            id: spotId,
        },
        include: [{
            model:Review
        },
        {
            model: SpotImage,
            attributes: ['id', 'url', 'preview']
        },
        {
            model: User,
            as:'Owner',
            attributes: ['id', 'firstName', 'lastName']
            
        },
        ],
    });
    if (!spot) {
        return res.status(404).json({
            "message": "Spot couldn't be found"
        })
    }
    let arr = []
    spothouse.forEach((spot)=>{
        arr.push(spot.toJSON())
    })
    arr.forEach((spot)=>{
        let star = 0
        let count = 0
        spot.Reviews.forEach((review)=>{
            star += review.stars
            count++
        })
        spot.avgStarRating = star / count
        spot.numReviews = count
    })
    arr.forEach((spot)=> delete spot.Reviews)
    const [spotarr] = arr
    return res.status(200).json(spotarr)
})

//Create a spot REMOVE UPDATED AT, CREATED AT,ID
router.post('/', requireAuth, validateSpot, async (req, res) => {
    const { address, city, state, country, lat, lng, name, description, price } = req.body
    const newSpot = await Spot.create({
        address, city, state, country, lat, lng, name, description, price
    })
    res.json(newSpot)
})

//Add img to spot based on spotid ADD SPOT OWNER ID, 403, ADD LIMIT
router.post('/:spotId/images', requireAuth, async (req, res) => {
    const { spotId } = req.params
    const { url, preview } = req.body
    const spot = await Spot.findByPk(spotId)
    const user = req.user.id
    if (!spot) {
        return res.status(404).json({
            "message": "Spot couldn't be found"
        })
    }
    if (user !== spot.ownerId) {
        return res.status(403).json({ "message": "Forbidden" })
    }
    const Image = await SpotImage.create({
        url,
        preview,
        spotId
    })
    res.status(201).json({
        id: Image.id,
        url: Image.url,
        preview: Image.preview
    })

})

//Edit a spot ADD UPDATED SPOT OBJ 403 isnt working
router.put('/:spotId', requireAuth, validateSpot, async (req, res) => {
    const { spotId } = req.params
    const spot = await Spot.findByPk(spotId)
    const user = req.user.id

    if (!spot) {
        return res.status(404).json({
            "message": "Spot couldn't be found"
        })
    }
    if (user !== spot.ownerId) {
        return res.status(403).json({ "message": "Forbidden" })
    }
    const { address, city, state, country, lat, lng, name, description, price } = req.body
    spot.address = address
    spot.city = city
    spot.state = state
    spot.country = country
    spot.lat = lat
    spot.lng = lng
    spot.name = name
    spot.description = description
    spot.price = price
    await spot.save();
    res.status(200).json(spot)

})


//Delete a spot need 403 not working
router.delete('/:spotId', requireAuth, async (req, res) => {
    const { spotId } = req.params
    const deletedSpot = await Spot.findByPk(spotId);
    const user = req.user.id

    if (!deletedSpot) {
        return res.status(404).json({
            "message": "Spot couldn't be found"
        })
    }
    if (user !== deletedSpot.ownerId) {
        return res.status(403).json({ "message": "Forbidden" })
    }
    await deletedSpot.destroy();
    res.status(200).json({
        message: "Successfully deleted"
    })

})

//get all reviews by spotid NEEDS "REVIEWS" IN FRONT
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
    return res.status(200).json(review)
})

//create a review for a spot based on spotId REVIEW TEXT VALIDATE ERROR
router.post('/:spotId/reviews', requireAuth, validateReview, async (req, res) => {
    const { review, stars } = req.body
    const { spotId } = req.params
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
    res.status(201).json(newReview)
})

//get all bookings for a spot based on spotid
router.get('/:spotId/bookings', async (req, res) => {
    const { spotId } = req.params
    const spot = await Spot.findByPk(spotId)
    if (!spot) {
        return res.status(404).json({
            "message": "Spot couldn't be found"
        })
    }
    if (spot.ownerId !== req.user.id) {
        const userBooking = await Booking.findAll({
            where: {
                spotId: spotId,
            },
            attributes: [
                "spotId", "startDate", "endDate"
            ],
        });
        return res.json({ Bookings: userBooking })
    }
    if (spot.ownerId == req.user.id) {
        const ownerBooking = await Booking.findAll({
            where: {
                spotId: spotId,
            },
            include: {
                model: User,
                attributes: [
                    "id", "firstName", "lastName"
                ],
            },
        });
        return res.status(200).json({ Bookings: ownerBooking })
    }
})

//create a booking based on spotid doesnt run
router.post('/:spotId/bookings', requireAuth, async (req, res) => {
    const { startDate, endDate } = req.body
    const { spotId } = req.params
    const spot = await Spot.findByPk(spotId)
    const user = req.user.id
    if (!spot) {
        return res.status(404).json({
            "message": "Spot couldn't be found"
        })
    }
    if(spot == user){
        return res.status(403).json({ "message": "Forbidden" })   
    }

    const booking = await Booking.findAll({
        where: {
            spotId: spotId,
        }
    })

})
module.exports = router;