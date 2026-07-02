const express = require('express');
const auth = require('../middleware/auth');
const {
  voteForIdea,
  removeVote,
  checkVote,
  getVoteCount
} = require('../controllers/voteController');

const router = express.Router();

router.post('/', auth, voteForIdea);
router.post('/remove', auth, removeVote);
router.get('/check/:ideaId', auth, checkVote);
router.get('/count/:ideaId', getVoteCount);

module.exports = router;
