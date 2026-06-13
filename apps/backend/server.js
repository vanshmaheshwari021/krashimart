const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const rateLimit = require('express-rate-limit');
const connectDB = require('./src/config/db');

// Load env vars
dotenv.config();

// Connect to database
connectDB();

const app = express();

// Security Middleware
app.use(helmet()); // Set security headers
app.use(mongoSanitize()); // Prevent NoSQL injection
app.use(xss()); // Prevent XSS attacks

// Rate Limiting
const limiter = rateLimit({
  windowMs: 10 * 60 * 1000, // 10 mins
  max: 100 // limit each IP to 100 requests per window
});
app.use(limiter);

// Middleware
app.use(express.json());

// CORS - allow all for now, but configured securely for deployment
app.use(cors({
  origin: process.env.FRONTEND_URL || '*',
  credentials: true
}));

// Route Maps (Express Router Map)
app.use('/api/auth', require('./src/routes/authRoutes'));
app.use('/api/products', require('./src/routes/productRoutes'));
app.use('/api/categories', require('./src/routes/categoryRoutes'));
app.use('/api/orders', require('./src/routes/orderRoutes'));
app.use('/api/enquiries', require('./src/routes/enquiryRoutes'));
app.use('/api/cms', require('./src/routes/cmsRoutes'));
app.use('/api/settings', require('./src/routes/settingRoutes'));
app.use('/api/dashboard', require('./src/routes/dashboardRoutes'));
app.use('/api/reviews', require('./src/routes/reviewRoutes'));

// Basic Route
app.get('/', (req, res) => {
  res.send('Agri-Commerce API is running...');
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
