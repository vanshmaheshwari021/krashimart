const mongoose = require('mongoose');

const cmsSchema = new mongoose.Schema({
  page: { type: String, required: true, unique: true }, // e.g., 'home', 'about', 'privacy-policy'
  title: { type: String, required: true },
  content: { type: mongoose.Schema.Types.Mixed }, // Can store HTML strings or structured JSON for homepage sections
  seoTitle: { type: String },
  seoDescription: { type: String }
}, { timestamps: true });

module.exports = mongoose.model('CMS', cmsSchema);
