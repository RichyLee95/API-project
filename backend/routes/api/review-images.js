const express = require('express')

const bcrypt = require('bcryptjs');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { setTokenCookie, restoreUser } = require('../../utils/auth');
const { ReviewImage } = require('../../db/models');
const router = express.Router();


router.delete('/:imageId', async (req, res) => {
const {imageId} = req.params
const deletedReviewImg = await ReviewImage.findByPk(imageId);
if (!deletedReviewImg) {
    return res.status(404).json({
        "message": "Review Image couldn't be found"
    })
}
await deletedReviewImg.destroy();
  return res.status(200).json({
        message: "Successfully deleted"
    })

})










module.exports = router;