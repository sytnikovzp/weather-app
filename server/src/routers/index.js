const { Router } = require('express');

const authRouter = require('./authRouter');
const favoriteRouter = require('./favoriteRouter');
const userRouter = require('./userRouter');

const router = new Router();

router.use('/auth', authRouter);
router.use('/favorites', favoriteRouter);
router.use('/users', userRouter);

module.exports = router;
