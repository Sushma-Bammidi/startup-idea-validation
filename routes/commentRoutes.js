const express = require('express');
const auth = require('../middleware/auth');
const {
  addComment,
  getComments,
  deleteComment
} = require('../controllers/commentController');

const router = express.Router();

router.post('/', auth, addComment);
router.get('/:ideaId', getComments);
router.delete('/:id', auth, deleteComment);

module.exports = router;
