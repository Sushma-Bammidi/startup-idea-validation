const express = require('express');
const auth = require('../middleware/auth');
const {
  joinWaitlist,
  leaveWaitlist,
  checkWaitlist,
  getWaitlistCount,
  getWaitlistForIdea
} = require('../controllers/waitlistController');

const router = express.Router();

router.post('/join', auth, joinWaitlist);
router.post('/leave', auth, leaveWaitlist);
router.get('/check/:ideaId', auth, checkWaitlist);
router.get('/count/:ideaId', getWaitlistCount);
router.get('/:ideaId', auth, getWaitlistForIdea);

module.exports = router;
