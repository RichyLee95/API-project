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
    await deletedReviewImg.destroy();
    if (!imageId) {
        return res.status(404).json({
            "message": "Review Image couldn't be found"
        })
    } else {
        res.json({
            message: "Successfully deleted"
        })
    }
})










module.exports = router;