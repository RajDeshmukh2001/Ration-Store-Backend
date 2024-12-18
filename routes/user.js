const express = require('express');
const router = express.Router();
const { updateUserProfile } = require('../controllers/user/updateUserProfile');
const { getUserOrders } = require('../controllers/user/getUserOrders');
const { getAllUsers } = require('../controllers/user/getAllUsers');
const { getSingleUser } = require('../controllers/user/getSingleUser');

router.route('/').get(getAllUsers);
router.route('/:id').get(getSingleUser);
router.route('/my_orders/:id').get(getUserOrders);
router.route('/update/:id').put(updateUserProfile);

module.exports = router;