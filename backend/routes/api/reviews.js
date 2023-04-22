const express = require('express')

const bcrypt = require('bcryptjs');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { setTokenCookie, restoreUser } = require('../../utils/auth');
const { Spot, SpotImage, User, Review } = require('../../db/models');
const router = express.Router();


//get all reviews of current user NOT FINISHED
router.get('/current', async (req, res) => {
    const UserId = req.user.id
    const review = await Review.findAll({
        where: {
            userId: UserId,
        },
    });
    return res.status(200).json(review)

})

//add an image to a review based on reviewId NOT FINISHED NEEDS ERROR
router.post('/:reviewId/images', async (req, res) => {
const { reviewId} = req.params
const { url} = req.body
const review = await Review.findByPk(reviewId)
// const maxImage = Review.
if(!review){
    return res.status(404).json({
        "message": "Review couldn't be found"
    })
}
const Image = await SpotImage.create({
    url
})
res.json({
    id: Image.id,
    url: Image.url,
})





})
//edit a review
router.put('/:reviewId', async (req, res) => {
    const { reviewId } = req.params
    const updatedReview = await Review.findByPk(reviewId)
    if (!updatedReview) {
        return res.status(404).json({
            "message": "Review couldn't be found"
        })
    } else {
        const { review, stars } = req.body
        updatedReview.review = review
        updatedReview.stars = stars
        await updatedReview.save();
        res.status(200).json(updatedReview)
    }



})

//delete a review
router.delete('/:reviewId', async (req, res) => {
    const { reviewId } = req.params
    const deletedReview = await Review.findByPk(reviewId)
    await deletedReview.destroy()
    if (!reviewId) {
        return res.status(404).json({
            "message": "Review couldn't be found"
        })
    } else {
        res.status(200).json({
            message: "Successfully deleted"
        })
    }
})

module.exports = router;