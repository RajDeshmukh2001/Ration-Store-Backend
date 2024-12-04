const express = require('express');
const router = express.Router();
const { placeOrder } = require('../controllers/order/placeOrder');
const { getAllOrders } = require('../controllers/order/getAllOrders');
const { updateOrderStatus } = require('../controllers/order/updateOrderStatus');

router.route('/').get(getAllOrders);
router.route('/place_order').post(placeOrder);
router.route('/update_status').patch(updateOrderStatus);

module.exports = router;