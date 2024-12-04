const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { login } = require('../controllers/auth/login');
const { logout } = require('../controllers/auth/logout');
const { authAccount } = require('../controllers/auth/authAccount');
const { userRegistration } = require('../controllers/auth/userRegistration');

router.route('/login').post(login);
router.route('/logout').get(logout);
router.route('/registration').post(userRegistration);
router.route('/authorized_account').get(auth, authAccount);

module.exports = router;