const router = require('express').Router();

const authMiddleware = require('../../middlewares/auth');

const postActivity = require('./postActivity');
const fetchActivities = require('./fetchActivity');


router.post('/postActivity', authMiddleware, postActivity);
router.get('/fetchActivities', authMiddleware, fetchActivities)


module.exports = router;
