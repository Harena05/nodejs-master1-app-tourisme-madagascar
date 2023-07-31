const express = require('express');
const authController = require('../controllers/user.controller');

const router = express.Router();

// Registration
router.post('/register', authController.register);

// Login
router.post('/login', authController.login);

module.exports = router;
