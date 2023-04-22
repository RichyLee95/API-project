// backend/routes/api/index.js
const router = require('express').Router();
const sessionRouter = require('./session.js');
const usersRouter = require('./users.js');
const spotRouter = require('./spots.js')
const reviewRouter = require('./reviews.js')
const spotImageRouter = require('./spot-images.js')
const reviewImageRouter = require('./review-images.js')
const bookingRouter = require('./bookings.js')
const { restoreUser } = require("../../utils/auth.js");

// Connect restoreUser middleware to the API router
  // If current user session is valid, set req.user to the user in the database
  // If current user session is not valid, set req.user to null
router.use(restoreUser);
router.use('/review-images', reviewImageRouter)
router.use('/spot-images', spotImageRouter)
router.use('/spots', spotRouter)
router.use('/session', sessionRouter);
router.use('/bookings', bookingRouter);
router.use('/spots', spotRouter);
router.use('/users', usersRouter);
router.use('/reviews', reviewRouter);
// GET /api/restore-user
router.get(
  '/restore-user',
  (req, res) => {
    return res.json(req.user);
  }
);

router.post('/test', function(req, res) {
    res.json({ requestBody: req.body });
  });

// GET /api/set-token-cookie
const { setTokenCookie } = require('../../utils/auth.js');
const { User } = require('../../db/models');
router.get('/set-token-cookie', async (_req, res) => {
  const user = await User.findOne({
    where: {
      username: 'Demo-lition'
    }
  });
  setTokenCookie(res, user);
  return res.json({ user: user });
});






const { requireAuth } = require('../../utils/auth.js');
router.get(
  '/require-auth',
  requireAuth,
  (req, res) => {
    return res.json(req.user);
  }
);


module.exports = router;