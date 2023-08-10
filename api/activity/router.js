const router = require('express').Router();

const authMiddleware = require('../../middlewares/auth');

const postActivity = require('./postActivity');
const fetchActivities = require('./fetchActivity');
const deleteActivity = require('./deleteActivity');


router.post('/postActivity', authMiddleware, postActivity);
router.get('/fetchActivities', authMiddleware, fetchActivities);
router.post('/deleteActivity', authMiddleware, deleteActivity);


module.exports = router;
