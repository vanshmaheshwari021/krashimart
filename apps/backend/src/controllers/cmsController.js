const CMS = require('../models/CMS');

// @desc    Get all CMS pages
// @route   GET /api/cms
// @access  Public
const getCMSPages = async (req, res) => {
  try {
    const pages = await CMS.find();
    res.json(pages);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

// @desc    Get a single CMS page by slug/page
// @route   GET /api/cms/:page
// @access  Public
const getCMSPage = async (req, res) => {
  try {
    const page = await CMS.findOne({ page: req.params.page });
    if (page) {
      res.json(page);
    } else {
      res.status(404).json({ message: 'Page not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

// @desc    Update a CMS page
// @route   PUT /api/cms/:page
// @access  Private/Admin
const updateCMSPage = async (req, res) => {
  try {
    let pageData = await CMS.findOne({ page: req.params.page });

    if (pageData) {
      pageData.title = req.body.title || pageData.title;
      pageData.content = req.body.content || pageData.content;
      pageData.seoTitle = req.body.seoTitle !== undefined ? req.body.seoTitle : pageData.seoTitle;
      pageData.seoDescription = req.body.seoDescription !== undefined ? req.body.seoDescription : pageData.seoDescription;
      
      pageData.markModified('content');

      const updatedPage = await pageData.save();
      res.json(updatedPage);
    } else {
      // Create it if it doesn't exist
      pageData = await CMS.create({
        page: req.params.page,
        title: req.body.title || req.params.page,
        content: req.body.content || {},
        seoTitle: req.body.seoTitle || '',
        seoDescription: req.body.seoDescription || ''
      });
      res.status(201).json(pageData);
    }
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: 'Invalid CMS data' });
  }
};

module.exports = { getCMSPages, getCMSPage, updateCMSPage };
