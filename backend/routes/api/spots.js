const express = require('express')

const bcrypt = require('bcryptjs');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { setTokenCookie, restoreUser } = require('../../utils/auth');
const { Spot, SpotImage, User } = require('../../db/models');
const router = express.Router();

//get all spots not finished yet
router.get('/', async (req,res)=>{

})


//get all spots by current user
router.get('/current', async (req, res) => {
    const userId = req.user.id
    const currentSpot = await Spot.findAll({
        where: {
            ownerId: userId,
        },
    });
    return res.json(currentSpot)
})




module.exports = router;