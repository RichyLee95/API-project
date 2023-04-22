const express = require('express')

const bcrypt = require('bcryptjs');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { setTokenCookie, restoreUser, requireAuth } = require('../../utils/auth');
const { ReviewImage,Review } = require('../../db/models');
const router = express.Router();


router.delete('/:imageId',requireAuth, async (req, res) => {
const {imageId} = req.params
const deletedReviewImg = await ReviewImage.findByPk(imageId);
console.log(deletedReviewImg)
if (!deletedReviewImg) {
    return res.status(404).json({
        "message": "Review Image couldn't be found"
    })
}
const review = await Review.findByPk(deletedReviewImg.reviewId)
if(review.id !== deletedReviewImg.reviewId){
    return res.status(403).json({ "message": "Forbidden" })
}
await deletedReviewImg.destroy();
  return res.status(200).json({
        message: "Successfully deleted"
    })

})










module.exports = router;