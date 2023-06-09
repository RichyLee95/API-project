const express = require('express')

const bcrypt = require('bcryptjs');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { setTokenCookie, restoreUser, requireAuth } = require('../../utils/auth');
const { Spot, SpotImage, User, Review, ReviewImage } = require('../../db/models');
const router = express.Router();

const validateReview = [
    check('review')
        .exists({ checkFalsy: true })
        .withMessage("Review text is required"),
    check('stars')
        .exists({ checkFalsy: true })
        .isNumeric({ checkFalsy: true })
        .isInt({ min: 1, max: 5 })
        .withMessage("Stars must be an integer from 1 to 5"),
    handleValidationErrors,
]

//get all reviews of current user NEEDS REVIEW IMAGE ARRAY, PREVIEW IMG, RENAME USERID TO OWNER
router.get('/current',requireAuth, async (req, res) => {
    const UserId = req.user.id
    const review = await Review.findAll({
        where: {
            userId: UserId,
        },
        include: [
            { model: User,
                attributes:[
                    'id','firstName','lastName'
                ] },
            {
                model: Spot,
                attributes: [
                    'id',
                    'ownerId',
                    'address',
                    'city',
                    'state',
                    'country',
                    'lat',
                    'lng',
                    'name',
                    'price',
                ],
                include:{
                    model:SpotImage
                }
            },
            {
                model:ReviewImage,
                attributes: [
                    'id',
                    'url'
                ]
            }
        ]
    });
    let arr = []
    review.forEach(review=>{
        arr.push(review.toJSON())
    })
    arr.forEach(review=>{
        review.Spot.SpotImages.forEach(img=>{
            if(img.preview ===true){
                review.Spot.previewImage=img.url
            }
        })
    })
    arr.forEach(review => delete review.Spot.SpotImages)
    return res.status(201).json({Reviews:arr})

})

//add an image to a review based on reviewId NOT FINISHED NEEDS REVIEWID 403 not working
router.post('/:reviewId/images',requireAuth, async (req, res) => {
    const { reviewId } = req.params
    const { url } = req.body
    const userId = req.user.id
    const review = await Review.findByPk(reviewId)
    const reviewImage = await ReviewImage.findAll({
        where: {
            reviewId
        }
    })
   
    if (!review) {
        return res.status(404).json({
            "message": "Review couldn't be found"
        })
    }
    if(userId !== review.userId){
    return res.status(403).json({"message": "Forbidden"})
    }
    if (reviewImage.length >= 10) {
        return res.status(403).json({ "message": "Maximum number of images for this resource was reached" })
    }
    const Image = await ReviewImage.create({
        url,
        reviewId
    })
    console.log(Image)
    return res.status(200).json({
        id: Image.id,
        url: Image.url,
    })





})
//edit a review
router.put('/:reviewId',requireAuth,validateReview, async (req, res) => {
    const { reviewId } = req.params
    const userId = req.user.id
    const updatedReview = await Review.findByPk(reviewId)
    if (!updatedReview) {
        return res.status(404).json({
            "message": "Review couldn't be found"
        })
    }
    if (userId !== updatedReview.userId) {
        return res.status(403).json({ "message": "Forbidden" })
    }
    const { review, stars } = req.body
    updatedReview.review = review
    updatedReview.stars = stars
    await updatedReview.save();
    res.status(200).json(updatedReview)




})

//delete a review
router.delete('/:reviewId',requireAuth, async (req, res) => {
    const { reviewId } = req.params
    const userId = req.user.id
    const deletedReview = await Review.findByPk(reviewId)
    if (!deletedReview) {
        return res.status(404).json({
            "message": "Review couldn't be found"
        })
    }
    if (userId !== deletedReview.userId) {
        return res.status(403).json({ "message": "Forbidden" })
    }
    await deletedReview.destroy()
    res.status(200).json({
        message: "Successfully deleted"
    })

})

module.exports = router;