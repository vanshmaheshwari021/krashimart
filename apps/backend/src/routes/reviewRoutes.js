const express = require('express');
const router = express.Router();
const { createReview, getProductReviews, getAllReviews, updateReviewStatus } = require('../controllers/reviewController');
const { protect, admin } = require('../middleware/authMiddleware');

router.route('/').post(createReview).get(protect, admin, getAllReviews);
router.route('/product/:id').get(getProductReviews);
router.route('/:id').put(protect, admin, updateReviewStatus);

module.exports = router;
