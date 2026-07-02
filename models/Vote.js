const mongoose = require('mongoose');

const VoteSchema = new mongoose.Schema({
  ideaId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Idea',
    required: true
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Ensure a user can only vote once per idea
VoteSchema.index({ ideaId: 1, userId: 1 }, { unique: true });

module.exports = mongoose.model('Vote', VoteSchema);
