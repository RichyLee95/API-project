const express = require('express')

const bcrypt = require('bcryptjs');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { setTokenCookie, restoreUser, requireAuth } = require('../../utils/auth');
const { Spot, SpotImage, User } = require('../../db/models');
const router = express.Router();


router.delete('/:imageId',requireAuth, async (req, res) => {
    const {imageId} = req.params
    const deletedSpotImg = await SpotImage.findByPk(imageId);
        if (!deletedSpotImg) {
            return res.status(404).json({
                "message": "Spot Image couldn't be found"
            })
        }
        await deletedSpotImg.destroy();
          return res.status(200).json({
                message: "Successfully deleted"
            })
    })




module.exports = router;