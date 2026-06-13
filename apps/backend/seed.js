const mongoose = require('mongoose');
const dotenv = require('dotenv');
const bcrypt = require('bcryptjs'); // Need to install bcryptjs
const connectDB = require('./src/config/db');

// Load Models
const User = require('./src/models/User');
const Category = require('./src/models/Category');
const Product = require('./src/models/Product');
const CMS = require('./src/models/CMS');
const Setting = require('./src/models/Setting');

dotenv.config();

const seedData = async () => {
  try {
    await connectDB();

    console.log('Clearing old data...');
    await Promise.all([
      User.deleteMany(),
      Category.deleteMany(),
      Product.deleteMany(),
      CMS.deleteMany(),
      Setting.deleteMany()
    ]);

    console.log('Inserting Admin...');
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash('password', salt);
    await User.create({
      name: 'Super Admin',
      email: 'admin',
      password: hashedPassword,
      role: 'admin'
    });

    console.log('Inserting Categories...');
    const categories = await Category.insertMany([
      { name: 'Seeds & Grains', slug: 'seeds-grains', displayOrder: 1 },
      { name: 'Fertilizers', slug: 'fertilizers', displayOrder: 2 },
      { name: 'Farming Tools', slug: 'farming-tools', displayOrder: 3 },
      { name: 'Fresh Produce', slug: 'fresh-produce', displayOrder: 4 }
    ]);

    console.log('Inserting Products...');
    await Product.insertMany([
      { name: 'Premium Organic Wheat Seeds', slug: 'premium-wheat', price: 25.99, category: categories[0]._id, visibility: 'Both', stock: 500, image: 'https://images.unsplash.com/photo-1574323347407-28d8b9d31bd3' },
      { name: 'Basmati Rice (Bulk)', slug: 'basmati-rice', price: 45.00, category: categories[0]._id, visibility: 'B2B', stock: 1000, image: 'https://images.unsplash.com/photo-1586201375761-83865001e8ac' },
      { name: 'Natural Neem Fertilizer', slug: 'neem-fertilizer', price: 15.50, category: categories[1]._id, visibility: 'Both', stock: 200, image: 'https://images.unsplash.com/photo-1628189871790-2bb785022dc2' },
      { name: 'Heavy Duty Tractor Plow', slug: 'tractor-plow', price: 850.00, category: categories[2]._id, visibility: 'Both', stock: 10, image: 'https://images.unsplash.com/photo-1592860883395-e21b02661502' },
      { name: 'Fresh Farm Apples (Box)', slug: 'fresh-apples', price: 35.00, category: categories[3]._id, visibility: 'Both', stock: 150, image: 'https://images.unsplash.com/photo-1560806887-1e4cd0b6fac6' },
      { name: 'Organic Soya Beans', slug: 'soya-beans', price: 18.20, category: categories[0]._id, visibility: 'Both', stock: 300, image: 'https://images.unsplash.com/photo-1588698188174-8255b55de16a' },
      { name: 'Irrigation Hose Pipe 50m', slug: 'irrigation-hose', price: 40.00, category: categories[2]._id, visibility: 'B2B', stock: 50, image: 'https://images.unsplash.com/photo-1416879598555-224424ceb5f8' },
      { name: 'Cold-Pressed Mustard Oil', slug: 'mustard-oil', price: 12.00, category: categories[3]._id, visibility: 'Both', stock: 80, image: 'https://images.unsplash.com/photo-1620606708779-1b5e526efbf0' },
      { name: 'NPK Complex Fertilizer', slug: 'npk-fertilizer', price: 55.00, category: categories[1]._id, visibility: 'B2B', stock: 400, image: 'https://images.unsplash.com/photo-1530836369250-ef71a3f5e481' },
      { name: 'Garden Pruning Shears', slug: 'pruning-shears', price: 14.99, category: categories[2]._id, visibility: 'B2C', stock: 120, image: 'https://images.unsplash.com/photo-1416879598555-224424ceb5f8' }
    ]);

    console.log('Inserting CMS Pages & Settings...');
    await CMS.insertMany([
      { page: 'home', title: 'Home', content: { heroTitle: 'Cultivating Tomorrow' }, seoTitle: 'KarshiMart | Home' },
      { page: 'about', title: 'About Us', content: { mission: 'Bridging the gap between farming and commerce' }, seoTitle: 'KarshiMart | About' },
      { page: 'privacy', title: 'Privacy Policy', content: { text: 'Your data is safe with us.' }, seoTitle: 'KarshiMart | Privacy' }
    ]);

    await Setting.create({
      websiteName: 'KarshiMart',
      defaultMode: 'B2C',
      contactEmail: 'support@karshimart.com'
    });

    console.log('✅ Data Import Success');
    process.exit();
  } catch (error) {
    console.error('❌ Data Import Failed:', error);
    process.exit(1);
  }
};

seedData();
