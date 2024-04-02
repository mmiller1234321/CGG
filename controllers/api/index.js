const router = require('express').Router();

const userRoutes = require('./user-routes');
const tutorRoutes = require('./tutor-routes.js');
const skillRoutes = require('./skill-routes.js');

router.use('/users', userRoutes);
router.use('/tutor', tutorRoutes);
router.use('/skill', skillRoutes);

module.exports = router;
