const ServiceRequest = require('../models/ServiceRequest');

// @desc    Create new service request
// @route   POST /api/requests
// @access  Public
const createRequest = async (req, res, next) => {
  try {
    const {
      customerName,
      contactNumber,
      providerId,
      providerName,
      service,
      location,
      problem,
      preferredDate,
      urgency
    } = req.body;

    // Backend validation check
    if (!customerName || !contactNumber || !service || !location || !problem || !preferredDate) {
      return res.status(400).json({
        success: false,
        message: 'Please provide all required fields: customerName, contactNumber, service, location, problem, preferredDate'
      });
    }

    const newRequest = await ServiceRequest.create({
      customerName,
      contactNumber,
      providerId: providerId || null,
      providerName: providerName || 'General Service Provider',
      service,
      location,
      problem,
      preferredDate,
      urgency: urgency || 'Medium',
      status: 'Pending'
    });

    res.status(201).json({
      success: true,
      data: newRequest
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get all service requests
// @route   GET /api/requests
// @access  Public
const getRequests = async (req, res, next) => {
  try {
    const requests = await ServiceRequest.find().sort({ createdAt: -1 });
    res.status(200).json({
      success: true,
      count: requests.length,
      data: requests
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get single request by Mongo ID or FL-100X requestId
// @route   GET /api/requests/:id
// @access  Public
const getRequestById = async (req, res, next) => {
  try {
    const id = req.params.id;
    let request;

    if (id.startsWith('FL-')) {
      request = await ServiceRequest.findOne({ requestId: id });
    } else {
      request = await ServiceRequest.findById(id);
    }

    if (!request) {
      return res.status(404).json({
        success: false,
        message: `Service request not found with id ${id}`
      });
    }

    res.status(200).json({
      success: true,
      data: request
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update request details
// @route   PUT /api/requests/:id
// @access  Public
const updateRequest = async (req, res, next) => {
  try {
    const request = await ServiceRequest.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });

    if (!request) {
      return res.status(404).json({
        success: false,
        message: `Service request not found with id ${req.params.id}`
      });
    }

    res.status(200).json({
      success: true,
      data: request
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update request status
// @route   PATCH /api/requests/:id/status
// @access  Public
const updateRequestStatus = async (req, res, next) => {
  try {
    const { status } = req.body;
    const validStatuses = ['Pending', 'Accepted', 'In Progress', 'Completed', 'Cancelled'];

    if (!validStatuses.includes(status)) {
      return res.status(400).json({
        success: false,
        message: `Invalid status. Must be one of: ${validStatuses.join(', ')}`
      });
    }

    const request = await ServiceRequest.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true, runValidators: true }
    );

    if (!request) {
      return res.status(404).json({
        success: false,
        message: `Service request not found with id ${req.params.id}`
      });
    }

    res.status(200).json({
      success: true,
      data: request
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete/cancel service request
// @route   DELETE /api/requests/:id
// @access  Public
const deleteRequest = async (req, res, next) => {
  try {
    const request = await ServiceRequest.findByIdAndDelete(req.params.id);

    if (!request) {
      return res.status(404).json({
        success: false,
        message: `Service request not found with id ${req.params.id}`
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
  createRequest,
  getRequests,
  getRequestById,
  updateRequest,
  updateRequestStatus,
  deleteRequest
};
