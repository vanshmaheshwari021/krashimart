const mongoose = require('mongoose');
const dotenv = require('dotenv');
const bcrypt = require('bcryptjs');

dotenv.config({ path: 'apps/backend/.env' });

const User = require('./apps/backend/src/models/User');
const Product = require('./apps/backend/src/models/Product');
const Order = require('./apps/backend/src/models/Order');
const Enquiry = require('./apps/backend/src/models/Enquiry');

const restoreUser = async () => {
  try {
    const mongoUri = process.env.MONGO_URI || 'mongodb://localhost:27017/karshimart';
    await mongoose.connect(mongoUri);
    console.log('MongoDB Connected for Restoring...');

    // 1. Recreate User
    const salt = await bcrypt.genSalt(10);
    const password = await bcrypt.hash('nopasswordneeded', salt);

    // Delete if already exists just in case
    await User.deleteOne({ email: 'vanshbaheti01@gmail.com' });

    const user = await User.create({
      name: 'vanshbaheti01',
      email: 'vanshbaheti01@gmail.com',
      password: password,
      role: 'customer',
      location: 'India'
    });

    console.log('User vanshbaheti01 restored.');

    // 2. Fetch some products
    const products = await Product.find().limit(3);
    if(products.length < 3) {
        console.log("Not enough products.");
        process.exit(1);
    }

    // 3. Recreate 2 Retail Orders
    await Order.insertMany([
      {
        user: user._id,
        customerName: 'vanshbaheti01',
        email: 'vanshbaheti01@gmail.com',
        phone: '9876543210',
        address: 'Test Address, India',
        paymentMethod: 'COD',
        totalAmount: products[0].price * 2,
        status: 'Delivered',
        isPaid: true,
        isDelivered: true,
        items: [
          {
            product: products[0]._id,
            name: products[0].name,
            quantity: 2,
            price: products[0].price
          }
        ]
      },
      {
        user: user._id,
        customerName: 'vanshbaheti01',
        email: 'vanshbaheti01@gmail.com',
        phone: '9876543210',
        address: 'Test Address, India',
        paymentMethod: 'COD',
        totalAmount: products[1].price * 1,
        status: 'Pending',
        isPaid: false,
        isDelivered: false,
        items: [
          {
            product: products[1]._id,
            name: products[1].name,
            quantity: 1,
            price: products[1].price
          }
        ]
      }
    ]);
    console.log('2 Retail Orders restored.');

    // 4. Recreate 1 Wholesale Enquiry
    await Enquiry.create({
      user: user._id,
      companyName: 'Vansh Enterprises',
      contactPerson: 'vanshbaheti01',
      email: 'vanshbaheti01@gmail.com',
      product: products[2]._id,
      quantity: 1000,
      message: 'Need bulk quotation.',
      status: 'In Progress'
    });
    console.log('1 Wholesale Enquiry restored.');

    console.log('RESTORE COMPLETE!');
    process.exit();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

restoreUser();
