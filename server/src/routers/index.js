const { Router } = require('express');
// ==============================================================
const authRouter = require('./authRouter');
const favoriteRouter = require('./favoriteRouter');

const router = new Router();

router.use('/auth', authRouter);
router.use('/favorites', favoriteRouter);

module.exports = router;
