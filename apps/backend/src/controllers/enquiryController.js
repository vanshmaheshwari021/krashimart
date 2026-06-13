const Enquiry = require('../models/Enquiry');

// @desc    Create a new enquiry
// @route   POST /api/enquiries
// @access  Public
const createEnquiry = async (req, res) => {
  try {
    const { contactPerson, companyName, phone, email, quantity, message } = req.body;
    const enquiry = await Enquiry.create({ contactPerson, companyName, phone, email, quantity, message, status: 'New' });
    res.status(201).json(enquiry);
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: 'Invalid enquiry data' });
  }
};

// @desc    Get all enquiries
// @route   GET /api/enquiries
// @access  Private/Admin
const getEnquiries = async (req, res) => {
  try {
    const enquiries = await Enquiry.find({}).sort({ createdAt: -1 });
    res.json(enquiries);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

// @desc    Update enquiry status
// @route   PUT /api/enquiries/:id
// @access  Private/Admin
const updateEnquiryStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const enquiry = await Enquiry.findByIdAndUpdate(req.params.id, { status }, { new: true });
    res.json(enquiry);
  } catch (error) {
    res.status(400).json({ message: 'Error updating status' });
  }
};

// @desc    Get logged in user enquiries
// @route   GET /api/enquiries/myenquiries
// @access  Private
const getMyEnquiries = async (req, res) => {
  try {
    const enquiries = await Enquiry.find({ email: req.user.email }).sort({ createdAt: -1 });
    res.json(enquiries);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

module.exports = { createEnquiry, getEnquiries, updateEnquiryStatus, getMyEnquiries };
