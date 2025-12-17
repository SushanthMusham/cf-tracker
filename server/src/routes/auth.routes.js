const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth.controller');

// register controller
router.post('/register',authController.register);


// login controller
router.post('/login',authController.login);


module.exports = router;