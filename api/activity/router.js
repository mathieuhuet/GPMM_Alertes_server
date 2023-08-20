const router = require('express').Router();

const authMiddleware = require('../../middlewares/auth');

const postActivity = require('./postActivity');
const fetchActivities = require('./fetchActivities');
const fetchActivitiesBySite = require('./fetchActivitiesBySite')
const deleteActivity = require('./deleteActivity');
const fetchAcquit = require('./fetchAcquit');
const fetchComments = require('./fetchComments');
const postComments = require('./postComments');
const postGeneralAcquit = require('./postGeneralAcquit');
const postInterventionAcquit = require('./postInterventionAcquit');
const postRoutineAcquit = require('./postRoutineAcquit');
const reportComment = require('./reportComment');


router.post('/postActivity', authMiddleware, postActivity);
router.get('/fetchActivities', authMiddleware, fetchActivities);
router.post('/fetchActivitiesBySite', authMiddleware, fetchActivitiesBySite);
router.post('/deleteActivity', authMiddleware, deleteActivity);
router.post('/postComments', authMiddleware, postComments);
router.post('/postGeneralAcquit', authMiddleware, postGeneralAcquit);
router.post('/postInterventionAcquit', authMiddleware, postInterventionAcquit);
router.post('/postRoutineAcquit', authMiddleware, postRoutineAcquit);
router.post('/fetchAcquit', authMiddleware, fetchAcquit);
router.post('/fetchComments', authMiddleware, fetchComments);
router.post('/reportComment', authMiddleware, reportComment);


module.exports = router;
