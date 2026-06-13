const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config({ path: 'apps/backend/.env' });

const Setting = require('./apps/backend/src/models/Setting');

const fixName = async () => {
  try {
    const mongoUri = process.env.MONGO_URI || 'mongodb://localhost:27017/karshimart';
    await mongoose.connect(mongoUri);
    
    await Setting.updateOne({}, { websiteName: 'KarshiMart' });
    console.log('Website name updated to KarshiMart');
    
    process.exit();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

fixName();
