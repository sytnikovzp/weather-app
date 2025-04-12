const { Router } = require('express');

const authRouter = require('./authRouter');
const favoritesRouter = require('./favoritesRouter');
const usersRouter = require('./usersRouter');

const router = new Router();

router.use('/auth', authRouter);
router.use('/favorites', favoritesRouter);
router.use('/users', usersRouter);

module.exports = router;
