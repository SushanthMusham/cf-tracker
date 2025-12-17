const express = require('express');
const router = express.Router();

const authMiddleware = require('../middleware/auth.middleware');
const cfController = require('../controllers/cf.controller');

// Protected route to get user-specific stats
router.get('/stats', authMiddleware, cfController.getStats);

module.exports = router;