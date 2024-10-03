const router = require('express').Router();
const videoRoutes = require('./thoughtRoutes');
const userRoutes = require('./userRoutes');

router.use('/thoughts', videoRoutes);
router.use('/users', userRoutes);

module.exports = router;
