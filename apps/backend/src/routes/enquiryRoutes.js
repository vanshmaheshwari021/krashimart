const express = require('express');
const router = express.Router();
const { createEnquiry, getEnquiries, updateEnquiryStatus, getMyEnquiries } = require('../controllers/enquiryController');
const { protect, admin } = require('../middleware/authMiddleware');

router.route('/').post(createEnquiry).get(protect, admin, getEnquiries);
router.route('/myenquiries').get(protect, getMyEnquiries);
router.route('/:id').put(protect, admin, updateEnquiryStatus);

module.exports = router;
