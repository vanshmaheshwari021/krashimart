const express = require('express');
const router = express.Router();
const { loginUser, registerUser, getUserProfile, getUsers, updateUserRole } = require('../controllers/authController');
const { protect, admin } = require('../middleware/authMiddleware');

router.post('/login', loginUser);
router.post('/register', registerUser);
router.get('/profile', protect, getUserProfile);
router.get('/users', protect, admin, getUsers);
router.put('/users/:id/role', protect, admin, updateUserRole);

module.exports = router;
