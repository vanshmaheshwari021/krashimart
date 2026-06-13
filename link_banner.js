const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config({ path: 'apps/backend/.env' });

const CMS = require('./apps/backend/src/models/CMS');
const Product = require('./apps/backend/src/models/Product');

const updateBanner = async () => {
  try {
    const mongoUri = process.env.MONGO_URI || 'mongodb://localhost:27017/karshimart';
    await mongoose.connect(mongoUri);
    console.log('MongoDB Connected');

    // Find a product to feature (e.g. Organic Wheat Seeds)
    const product = await Product.findOne({ name: 'Organic Wheat Seeds' });
    if (!product) {
        console.log('Product not found!');
        process.exit(1);
    }

    // Update the banner CMS content
    const bannerCms = await CMS.findOne({ page: 'banners' });
    if (bannerCms) {
        bannerCms.content = {
            ...bannerCms.content,
            promotionalBanner: product.image, // Use the exact same image as the product
            promotionalLink: `/product/${product._id}` // Link directly to the product
        };
        // For mixed types, we must markModified
        bannerCms.markModified('content');
        await bannerCms.save();
        console.log(`Banner updated to feature product: ${product.name} with link /product/${product._id}`);
    } else {
        console.log('Banner CMS not found!');
    }

    process.exit();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

updateBanner();
