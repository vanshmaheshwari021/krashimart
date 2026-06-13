const mongoose = require('mongoose');

const settingSchema = new mongoose.Schema({
  websiteName: { type: String, default: 'KarshiMart' },
  logoUrl: { type: String, default: '' },
  defaultMode: { type: String, enum: ['B2B', 'B2C'], default: 'B2C' },
  contactEmail: { type: String },
  contactPhone: { type: String },
  address: { type: String },
  socialLinks: {
    facebook: String,
    twitter: String,
    instagram: String
  }
}, { timestamps: true });

module.exports = mongoose.model('Setting', settingSchema);
