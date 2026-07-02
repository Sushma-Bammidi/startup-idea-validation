const mongoose = require('mongoose');

const WaitingListSchema = new mongoose.Schema({
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
  email: {
    type: String,
    required: true
  },
  joinedAt: {
    type: Date,
    default: Date.now
  }
});

// Ensure a user can only join the waiting list once per idea
WaitingListSchema.index({ ideaId: 1, userId: 1 }, { unique: true });

module.exports = mongoose.model('WaitingList', WaitingListSchema);
