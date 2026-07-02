const express = require('express');
const auth = require('../middleware/auth');
const {
  createIdea,
  getAllIdeas,
  getIdeaById,
  updateIdea,
  deleteIdea,
  getMyIdeas
} = require('../controllers/ideaController');

const router = express.Router();

router.post('/', auth, createIdea);
router.get('/', getAllIdeas);
router.get('/trending', getAllIdeas);
router.get('/my-ideas', auth, getMyIdeas);
router.get('/:id', getIdeaById);
router.put('/:id', auth, updateIdea);
router.delete('/:id', auth, deleteIdea);

module.exports = router;
