const express = require('express');
const auth = require('../middleware/auth');
const { signup, login, getProfile } = require('../controllers/authController');

const router = express.Router();

router.post('/signup', signup);
router.post('/login', login);
router.get('/profile', auth, getProfile);

module.exports = router;
