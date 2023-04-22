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

        const spot = await Spot.findByPk(deletedSpotImg.spotId)
        if(spot.id !== deletedSpotImg.spotId){
            return res.status(404).json({ "message": "Spot Image couldn't be found" })   
        }

        if(req.user.id !== spot.ownerId){
            return res.status(403).json({ "message": "Forbidden" })
        }

        await deletedSpotImg.destroy();
          return res.status(200).json({
                message: "Successfully deleted"
            })
    })




module.exports = router;