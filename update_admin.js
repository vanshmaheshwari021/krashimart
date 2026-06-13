const mongoose = require('mongoose');
const dotenv = require('dotenv');
const bcrypt = require('bcryptjs');

dotenv.config({ path: 'apps/backend/.env' });

const User = require('./apps/backend/src/models/User');

const updateAdmin = async () => {
  try {
    const mongoUri = process.env.MONGO_URI || 'mongodb://localhost:27017/karshimart';
    await mongoose.connect(mongoUri);
    console.log('MongoDB Connected');

    const salt = await bcrypt.genSalt(10);
    const newPassword = await bcrypt.hash('password', salt);

    // Update the admin user (currently email admin@karshimart.com)
    await User.findOneAndUpdate(
      { role: 'admin' }, 
      { 
        email: 'admin',
        password: newPassword
      }
    );

    console.log('Admin credentials updated! Username: admin | Password: password');
    process.exit();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

updateAdmin();
