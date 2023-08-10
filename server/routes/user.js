const express = require('express');

// controller functions
const { createUser), login } = require('../controllers/userController');
const { authMiddleware } = require('../utils/auth');

const router = express.Router();

// signup route
router.route('/').post(createUser).put(authMiddleware) 

//login route
router.route('/login').post(login);

module.exports = router;