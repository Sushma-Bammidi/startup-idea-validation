const mongoose = require('mongoose');

const IdeaSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please provide an idea title'],
    trim: true,
    maxlength: 100
  },
  description: {
    type: String,
    required: [true, 'Please provide an idea description'],
    maxlength: 2000
  },
  category: {
    type: String,
    required: [true, 'Please provide a category'],
    enum: ['Technology', 'Health', 'Finance', 'Education', 'E-commerce', 'Social', 'Entertainment', 'Other']
  },
  problemStatement: {
    type: String,
    required: [true, 'Please provide a problem statement'],
    maxlength: 1000
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  creatorName: {
    type: String,
    required: true
  },
  voteCount: {
    type: Number,
    default: 0
  },
  commentCount: {
    type: Number,
    default: 0
  },
  waitlistCount: {
    type: Number,
    default: 0
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Idea', IdeaSchema);
