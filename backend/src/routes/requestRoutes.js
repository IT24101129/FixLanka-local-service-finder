const express = require('express');
const router = express.Router();
const {
  createRequest,
  getRequests,
  getRequestById,
  updateRequest,
  updateRequestStatus,
  deleteRequest
} = require('../controllers/requestController');

router.route('/')
  .get(getRequests)
  .post(createRequest);

router.route('/:id')
  .get(getRequestById)
  .put(updateRequest)
  .delete(deleteRequest);

router.route('/:id/status')
  .patch(updateRequestStatus);

module.exports = router;
