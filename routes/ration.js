const express = require('express');
const router = express.Router();
const { addRationItem } = require('../controllers/ration/addRationItem');
const { getRationItems } = require('../controllers/ration/getRationItems');

router.route('/').get(getRationItems);
router.route('/ration_item').post(addRationItem);

module.exports = router;