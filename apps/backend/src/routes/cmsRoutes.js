const express = require('express');
const router = express.Router();
const { getCMSPages, getCMSPage, updateCMSPage } = require('../controllers/cmsController');
const { protect, admin } = require('../middleware/authMiddleware');

router.route('/').get(getCMSPages);
router.route('/:page').get(getCMSPage).put(protect, admin, updateCMSPage);

module.exports = router;
