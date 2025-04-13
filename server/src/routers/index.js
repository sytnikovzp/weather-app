const { Router } = require('express');

const authRouter = require('./authRouter');
const favoritesRouter = require('./favoritesRouter');
const userProfileRouter = require('./userProfileRouter');

const router = new Router();

router.use('/auth', authRouter);
router.use('/favorites', favoritesRouter);
router.use('/profile', userProfileRouter);

module.exports = router;
