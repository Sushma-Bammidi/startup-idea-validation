const express = require('express');
const auth = require('../middleware/auth');
const {
  getAnalytics,
  getCreatorAnalytics,
  getTrendingIdeas
} = require('../controllers/analyticsController');

const router = express.Router();

router.get('/idea/:ideaId', auth, getAnalytics);
router.get('/creator/dashboard', auth, getCreatorAnalytics);
router.get('/trending/ideas', getTrendingIdeas);

module.exports = router;
