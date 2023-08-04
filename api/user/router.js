const router = require('express').Router();

const authMiddleware = require('../../middlewares/auth');

const logout = require('./logout');
const login = require('./login');
const register = require('./register');
const verify = require('./verify');
const getUserInfo = require('./getUserInfo');
const deleteAccount = require('./deleteAccount');



router.post('/login', login);
router.post('/register', register);
router.delete('/deleteAccount', authMiddleware, deleteAccount)
router.post('/verify', verify);
router.get('/getUserInfo', authMiddleware, getUserInfo);
router.post('/logout', authMiddleware, logout);


module.exports = router;
