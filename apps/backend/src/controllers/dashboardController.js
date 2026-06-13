const Order = require('../models/Order');
const Product = require('../models/Product');
const Enquiry = require('../models/Enquiry');
const User = require('../models/User');

// @desc    Get Dashboard Stats
// @route   GET /api/dashboard/stats
// @access  Private/Admin
const getDashboardStats = async (req, res) => {
  try {
    const totalProducts = await Product.countDocuments();
    const totalEnquiries = await Enquiry.countDocuments();
    const totalOrders = await Order.countDocuments();
    const totalUsers = await User.countDocuments({ role: { $ne: 'admin' } });

    // Calculate revenue from all non-cancelled orders
    const orders = await Order.find({ status: { $ne: 'Cancelled' } });
    const totalRevenue = orders.reduce((acc, item) => acc + (item.totalAmount || 0), 0);

    const recentOrders = await Order.find().sort({ createdAt: -1 }).limit(5);
    const recentEnquiries = await Enquiry.find().sort({ createdAt: -1 }).limit(5);

    res.json({
      totalProducts,
      totalEnquiries,
      totalOrders,
      totalUsers,
      totalRevenue,
      recentOrders,
      recentEnquiries
    });
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

module.exports = { getDashboardStats };
