const Provider = require('../models/Provider');

// @desc    Get all providers with filter & search support
// @route   GET /api/providers
// @access  Public
const getProviders = async (req, res, next) => {
  try {
    const { service, location, availability, rating, search } = req.query;
    const filter = {};

    if (service && service !== 'All') {
      filter.service = { $regex: new RegExp(service, 'i') };
    }

    if (location && location !== 'All') {
      filter.location = { $regex: new RegExp(location, 'i') };
    }

    if (availability && availability !== 'All') {
      filter.availability = { $regex: new RegExp(availability, 'i') };
    }

    if (rating) {
      filter.rating = { $gte: parseFloat(rating) };
    }

    if (search && search.trim() !== '') {
      const searchRegex = new RegExp(search.trim(), 'i');
      filter.$or = [
        { name: searchRegex },
        { service: searchRegex },
        { location: searchRegex },
        { description: searchRegex }
      ];
    }

    const providers = await Provider.find(filter).sort({ rating: -1, createdAt: -1 });
    res.status(200).json({
      success: true,
      count: providers.length,
      data: providers
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get single provider by ID
// @route   GET /api/providers/:id
// @access  Public
const getProviderById = async (req, res, next) => {
  try {
    const provider = await Provider.findById(req.params.id);

    if (!provider) {
      return res.status(404).json({
        success: false,
        message: `Provider not found with id ${req.params.id}`
      });
    }

    res.status(200).json({
      success: true,
      data: provider
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Create new provider
// @route   POST /api/providers
// @access  Public
const createProvider = async (req, res, next) => {
  try {
    const provider = await Provider.create(req.body);
    res.status(201).json({
      success: true,
      data: provider
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update provider
// @route   PUT /api/providers/:id
// @access  Public
const updateProvider = async (req, res, next) => {
  try {
    const provider = await Provider.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });

    if (!provider) {
      return res.status(404).json({
        success: false,
        message: `Provider not found with id ${req.params.id}`
      });
    }

    res.status(200).json({
      success: true,
      data: provider
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete provider
// @route   DELETE /api/providers/:id
// @access  Public
const deleteProvider = async (req, res, next) => {
  try {
    const provider = await Provider.findByIdAndDelete(req.params.id);

    if (!provider) {
      return res.status(404).json({
        success: false,
        message: `Provider not found with id ${req.params.id}`
      });
    }

    res.status(200).json({
      success: true,
      data: {}
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getProviders,
  getProviderById,
  createProvider,
  updateProvider,
  deleteProvider
};
