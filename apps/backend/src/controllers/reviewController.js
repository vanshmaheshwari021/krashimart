const Review = require('../models/Review');

// @desc    Create a new review
// @route   POST /api/reviews
// @access  Public
const createReview = async (req, res) => {
  try {
    const { product, name, rating, comment } = req.body;
    const review = await Review.create({ product, name, rating, comment, status: 'Pending' });
    res.status(201).json(review);
  } catch (error) {
    res.status(400).json({ message: 'Invalid review data' });
  }
};

// @desc    Get all approved reviews for a product
// @route   GET /api/reviews/product/:id
// @access  Public
const getProductReviews = async (req, res) => {
  try {
    const reviews = await Review.find({ product: req.params.id, status: 'Approved' }).sort({ createdAt: -1 });
    res.json(reviews);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

// @desc    Get all reviews (Admin)
// @route   GET /api/reviews
// @access  Private/Admin
const getAllReviews = async (req, res) => {
  try {
    const reviews = await Review.find({}).populate('product', 'name').sort({ createdAt: -1 });
    res.json(reviews);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

// @desc    Update review status (Approve/Reject)
// @route   PUT /api/reviews/:id
// @access  Private/Admin
const updateReviewStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const review = await Review.findByIdAndUpdate(req.params.id, { status }, { new: true });
    
    if (review) {
      res.json(review);
    } else {
      res.status(404).json({ message: 'Review not found' });
    }
  } catch (error) {
    res.status(400).json({ message: 'Invalid data' });
  }
};

module.exports = { createReview, getProductReviews, getAllReviews, updateReviewStatus };
