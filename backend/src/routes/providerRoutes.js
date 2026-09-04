const express = require('express');
const router = express.Router();
const {
  getProviders,
  getProviderById,
  createProvider,
  updateProvider,
  deleteProvider
} = require('../controllers/providerController');

router.route('/')
  .get(getProviders)
  .post(createProvider);

router.route('/:id')
  .get(getProviderById)
  .put(updateProvider)
  .delete(deleteProvider);

module.exports = router;
