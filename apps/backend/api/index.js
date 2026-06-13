const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('../src/config/db');

// Load env vars
dotenv.config();

// Connect to database
connectDB();

const app = express();

// Security Middleware (Removed mongoSanitize for Vercel compatibility)

// Middleware
app.use(express.json());

// CORS - allow all for now, but configured securely for deployment
app.use(cors({
  origin: process.env.FRONTEND_URL || '*',
  // removed credentials: true to allow origin '*'
}));

// Route Maps (Express Router Map)
app.use('/api/auth', require('../src/routes/authRoutes'));
app.use('/api/products', require('../src/routes/productRoutes'));
app.use('/api/categories', require('../src/routes/categoryRoutes'));
app.use('/api/orders', require('../src/routes/orderRoutes'));
app.use('/api/enquiries', require('../src/routes/enquiryRoutes'));
app.use('/api/cms', require('../src/routes/cmsRoutes'));
app.use('/api/settings', require('../src/routes/settingRoutes'));
app.use('/api/dashboard', require('../src/routes/dashboardRoutes'));
app.use('/api/reviews', require('../src/routes/reviewRoutes'));

// Basic Route
app.get('/', (req, res) => {
  res.send('Agri-Commerce API is running...');
});

const PORT = process.env.PORT || 5000;

if (process.env.NODE_ENV !== 'production') {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

module.exports = app;
