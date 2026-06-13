const Setting = require('../models/Setting');

// @desc    Get settings
// @route   GET /api/settings
// @access  Public
const getSettings = async (req, res) => {
  try {
    const settings = await Setting.findOne();
    if (!settings) {
      // Return defaults if not found
      return res.json({ websiteName: 'KarshiMart', defaultMode: 'B2C' });
    }
    res.json(settings);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

// @desc    Update settings
// @route   PUT /api/settings
// @access  Private/Admin
const updateSettings = async (req, res) => {
  try {
    let settings = await Setting.findOne();
    
    if (settings) {
      settings.websiteName = req.body.websiteName !== undefined ? req.body.websiteName : settings.websiteName;
      settings.logoUrl = req.body.logoUrl !== undefined ? req.body.logoUrl : settings.logoUrl;
      settings.defaultMode = req.body.defaultMode || settings.defaultMode;
      settings.contactEmail = req.body.contactEmail !== undefined ? req.body.contactEmail : settings.contactEmail;
      settings.contactPhone = req.body.contactPhone !== undefined ? req.body.contactPhone : settings.contactPhone;
      settings.address = req.body.address !== undefined ? req.body.address : settings.address;
      
      if (req.body.socialLinks) {
        settings.socialLinks = { ...settings.socialLinks, ...req.body.socialLinks };
      }
      
      const updatedSettings = await settings.save();
      res.json(updatedSettings);
    } else {
      settings = await Setting.create(req.body);
      res.status(201).json(settings);
    }
  } catch (error) {
    res.status(400).json({ message: 'Invalid setting data' });
  }
};

module.exports = { getSettings, updateSettings };
