const mongoose = require('mongoose');
const dotenv = require('dotenv');
const bcrypt = require('bcryptjs');

dotenv.config();

const User = require('./models/User');
const Category = require('./models/Category');
const Product = require('./models/Product');
const Order = require('./models/Order');
const Enquiry = require('./models/Enquiry');
const CMS = require('./models/CMS');
const Setting = require('./models/Setting');

const seedData = async () => {
  try {
    const mongoUri = process.env.MONGO_URI || 'mongodb://localhost:27017/karshimart';
    await mongoose.connect(mongoUri);
    console.log('MongoDB Connected for Seeding...');

    // Clear existing collections
    await User.deleteMany();
    await Category.deleteMany();
    await Product.deleteMany();
    await Order.deleteMany();
    await Enquiry.deleteMany();
    await CMS.deleteMany();
    await Setting.deleteMany();

    // 1. Users
    const salt = await bcrypt.genSalt(10);
    const adminPassword = await bcrypt.hash('admin123', salt);
    const userPassword = await bcrypt.hash('user123', salt);

    const admin = await User.create({
      name: 'Super Admin',
      email: 'admin@karshimart.com',
      password: adminPassword,
      role: 'admin',
      location: 'HQ'
    });

    const user1 = await User.create({
      name: 'Retail Customer',
      email: 'customer@karshimart.com',
      password: userPassword,
      role: 'customer',
      location: 'Mumbai'
    });

    const user2 = await User.create({
      name: 'Wholesale Partner',
      email: 'partner@karshimart.com',
      password: userPassword,
      role: 'b2b',
      location: 'Delhi'
    });

    console.log('Users created.');

    // 2. Categories
    const categoriesData = [
      { name: 'Seeds', slug: 'seeds' },
      { name: 'Fertilizers', slug: 'fertilizers' },
      { name: 'Tools', slug: 'tools' },
      { name: 'Spices', slug: 'spices' }
    ];
    const createdCategories = await Category.insertMany(categoriesData);
    console.log('Categories created.');

    // 3. Products
    const productsData = [
      {
        name: 'Premium Basmati Rice Seeds',
        slug: 'premium-basmati-rice-seeds',
        description: 'High-yielding basmati rice seeds perfect for northern plains.',
        price: 450,
        unit: 'kg',
        category: createdCategories[0]._id,
        image: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&q=80&w=600',
        stock: 500
      },
      {
        name: 'Organic Wheat Seeds',
        slug: 'organic-wheat-seeds',
        description: 'Drought-resistant wheat variety.',
        price: 120,
        unit: 'kg',
        category: createdCategories[0]._id,
        image: 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?auto=format&fit=crop&q=80&w=600',
        stock: 1000,
        badge: 'organic'
      },
      {
        name: 'Neem Cake Fertilizer',
        slug: 'neem-cake-fertilizer',
        description: '100% organic neem cake powder for natural pest control and soil health.',
        price: 80,
        unit: 'kg',
        category: createdCategories[1]._id,
        image: 'https://images.unsplash.com/photo-1628183210344-f17a94fbfec6?auto=format&fit=crop&q=80&w=600',
        stock: 200,
        badge: 'organic'
      },
      {
        name: 'NPK 19:19:19 Water Soluble',
        slug: 'npk-19-19-19-water-soluble',
        description: 'Balanced water soluble fertilizer for all crops.',
        price: 150,
        unit: 'kg',
        category: createdCategories[1]._id,
        image: 'https://images.unsplash.com/photo-1590682680695-43b964a3ae17?auto=format&fit=crop&q=80&w=600',
        stock: 400
      },
      {
        name: 'Heavy Duty Sickle',
        slug: 'heavy-duty-sickle',
        description: 'Iron sickle with wooden handle for harvesting.',
        price: 250,
        unit: 'piece',
        category: createdCategories[2]._id,
        image: 'https://images.unsplash.com/photo-1584022634354-949e223dcb4f?auto=format&fit=crop&q=80&w=600',
        stock: 50
      },
      {
        name: 'Garden Pruning Shears',
        slug: 'garden-pruning-shears',
        description: 'Sharp stainless steel pruning shears.',
        price: 400,
        unit: 'piece',
        category: createdCategories[2]._id,
        image: 'https://images.unsplash.com/photo-1416879598555-220b8f469106?auto=format&fit=crop&q=80&w=600',
        stock: 80
      },
      {
        name: 'Turmeric Fingers (Salem)',
        slug: 'turmeric-fingers-salem',
        description: 'High curcumin content authentic Salem turmeric fingers.',
        price: 180,
        unit: 'kg',
        category: createdCategories[3]._id,
        image: 'https://images.unsplash.com/photo-1615485925600-97237c4fc1ec?auto=format&fit=crop&q=80&w=600',
        stock: 300,
        badge: 'organic'
      },
      {
        name: 'Guntur Red Chillies',
        slug: 'guntur-red-chillies',
        description: 'Spicy, bright red dried Guntur chillies.',
        price: 220,
        unit: 'kg',
        category: createdCategories[3]._id,
        image: 'https://images.unsplash.com/photo-1596645511874-95d03a1fc6c9?auto=format&fit=crop&q=80&w=600',
        stock: 150
      },
      {
        name: 'Hybrid Tomato Seeds',
        slug: 'hybrid-tomato-seeds',
        description: 'Disease resistant, high yield tomato seeds.',
        price: 500,
        unit: 'packet',
        category: createdCategories[0]._id,
        image: 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?auto=format&fit=crop&q=80&w=600',
        stock: 100
      },
      {
        name: 'Black Pepper (Tellicherry)',
        slug: 'black-pepper-tellicherry',
        description: 'Premium grade large black peppercorns.',
        price: 650,
        unit: 'kg',
        category: createdCategories[3]._id,
        image: 'https://images.unsplash.com/photo-1596644040902-14ebaf252b46?auto=format&fit=crop&q=80&w=600',
        stock: 200,
        badge: 'organic'
      }
    ];
    const createdProducts = await Product.insertMany(productsData);
    console.log('Products created.');

    // 4. CMS Pages
    await CMS.insertMany([
      {
        page: 'home',
        title: 'Home',
        content: {
          heroTitle: 'Cultivating the Future of Agriculture',
          heroSubtitle: 'Connecting farmers and buyers with transparent pricing and direct-from-source quality.'
        },
        seoTitle: 'KarshiMart | Buy Direct from Farmers',
        seoDescription: 'The premium platform for agricultural goods.'
      },
      {
        page: 'about',
        title: 'About Us',
        content: {
          mission: 'To empower farmers through direct market access and fair pricing.',
          vision: 'A world where agricultural supply chains are transparent and efficient.'
        },
        seoTitle: 'About KarshiMart',
        seoDescription: 'Learn about our mission.'
      },
      {
        page: 'policies',
        title: 'Policies',
        content: {
          privacyText: 'We protect your data with bank-level security. We never sell your personal information.',
          termsText: 'By using this site, you agree to fair trade practices and honest product reviews.'
        },
        seoTitle: 'Policies & Legal',
        seoDescription: 'Read our terms and conditions.'
      },
      {
        page: 'banners',
        title: 'Banners',
        content: {
          topBanner: 'Free shipping on wholesale orders over ₹50,000! Valid till month end.',
          promotionalBanner: 'https://images.unsplash.com/photo-1464226184884-fa280b87c399?auto=format&fit=crop&q=80&w=1200'
        }
      },
      {
        page: 'testimonials',
        title: 'Testimonials',
        content: {
          list: [
            { name: 'Ramesh Singh', text: 'Best quality seeds I have ever bought. My yield doubled this year!' },
            { name: 'Anita Desai', text: 'Fast delivery and very transparent pricing.' }
          ]
        }
      }
    ]);
    console.log('CMS pages created.');

    // 5. Global Settings
    await Setting.create({
      websiteName: 'KarshiMart Demo',
      defaultMode: 'B2C',
      contactEmail: 'support@karshimart.com',
      contactPhone: '+91 9876543210',
      address: '123 Agri Tower, Mumbai, India',
      socialLinks: { facebook: 'https://facebook.com', twitter: 'https://twitter.com', instagram: 'https://instagram.com' }
    });
    console.log('Settings created.');

    // 6. Test Enquiries
    await Enquiry.insertMany([
      {
        user: user2._id,
        companyName: 'FarmFresh Supermarkets',
        contactPerson: 'Amit Kumar',
        email: 'amit@farmfresh.com',
        product: createdProducts[0]._id,
        quantity: 500,
        message: 'Need 500kg of Basmati Rice delivered to Pune.',
        status: 'New'
      },
      {
        user: user2._id,
        companyName: 'FarmFresh Supermarkets',
        contactPerson: 'Amit Kumar',
        email: 'amit@farmfresh.com',
        product: createdProducts[6]._id,
        quantity: 100,
        message: 'Please send a quote for 100kg Turmeric.',
        status: 'In Progress'
      },
      {
        user: user2._id,
        companyName: 'Agri Supply Co.',
        contactPerson: 'Sunita Patel',
        email: 'sunita@agrisupply.in',
        product: createdProducts[2]._id,
        quantity: 1000,
        message: 'Looking for bulk discount on Neem Cake.',
        status: 'Resolved'
      }
    ]);
    console.log('Enquiries created.');

    // 7. Test Orders
    await Order.insertMany([
      {
        user: user1._id,
        customerName: 'Retail Customer',
        email: 'customer@karshimart.com',
        phone: '9876543210',
        address: '101 Appt, Mumbai',
        paymentMethod: 'COD',
        totalAmount: 900,
        status: 'Pending',
        isPaid: false,
        isDelivered: false,
        items: [
          {
            product: createdProducts[0]._id,
            name: createdProducts[0].name,
            quantity: 2,
            price: 450
          }
        ]
      },
      {
        user: user1._id,
        customerName: 'Retail Customer',
        email: 'customer@karshimart.com',
        phone: '9876543210',
        address: '101 Appt, Mumbai',
        paymentMethod: 'Paid',
        totalAmount: 180,
        status: 'Delivered',
        isPaid: true,
        isDelivered: true,
        items: [
          {
            product: createdProducts[6]._id,
            name: createdProducts[6].name,
            quantity: 1,
            price: 180
          }
        ]
      },
      {
        user: admin._id,
        customerName: 'Super Admin',
        email: 'admin@karshimart.com',
        phone: '1111111111',
        address: 'HQ, Mumbai',
        paymentMethod: 'COD',
        totalAmount: 1500,
        status: 'Processing',
        isPaid: false,
        isDelivered: false,
        items: [
          {
            product: createdProducts[8]._id,
            name: createdProducts[8].name,
            quantity: 3,
            price: 500
          }
        ]
      }
    ]);
    console.log('Orders created.');

    console.log('✅ SEEDING COMPLETE! You can now log in.');
    process.exit();
  } catch (error) {
    console.error('Error during seeding:', error);
    process.exit(1);
  }
};

seedData();
