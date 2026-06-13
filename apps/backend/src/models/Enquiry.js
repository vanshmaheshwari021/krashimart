const mongoose = require('mongoose');

const enquirySchema = new mongoose.Schema({
  product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
  type: { type: String, enum: ['Product', 'Bulk', 'General'], default: 'Product' },
  companyName: { type: String },
  contactPerson: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String },
  quantity: { type: Number },
  message: { type: String, required: true },
  status: { type: String, enum: ['New', 'In Progress', 'Resolved', 'Closed'], default: 'New' }
}, { timestamps: true });

module.exports = mongoose.model('Enquiry', enquirySchema);
