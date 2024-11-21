const { Router } = require('express');
// ==============================================================
const authRouter = require('./authRouter');
const userRouter = require('./userRouter');
const favoriteRouter = require('./favoriteRouter');

const router = new Router();

router.use('/auth', authRouter);
router.use('/users', userRouter);
router.use('/favorites', favoriteRouter);

module.exports = router;
