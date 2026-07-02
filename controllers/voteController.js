const Vote = require('../models/Vote');
const Idea = require('../models/Idea');

exports.voteForIdea = async (req, res) => {
  try {
    const { ideaId } = req.body;

    if (!ideaId) {
      return res.status(400).json({ message: 'Please provide idea ID' });
    }

    const idea = await Idea.findById(ideaId);
    if (!idea) {
      return res.status(404).json({ message: 'Idea not found' });
    }

    // Check if user already voted
    const existingVote = await Vote.findOne({ ideaId, userId: req.userId });
    if (existingVote) {
      return res.status(400).json({ message: 'You have already voted for this idea' });
    }

    // Create vote
    const vote = await Vote.create({ ideaId, userId: req.userId });

    // Update idea vote count
    idea.voteCount += 1;
    await idea.save();

    res.status(201).json({ success: true, message: 'Vote recorded successfully', vote });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.removeVote = async (req, res) => {
  try {
    const { ideaId } = req.body;

    if (!ideaId) {
      return res.status(400).json({ message: 'Please provide idea ID' });
    }

    const vote = await Vote.findOneAndDelete({ ideaId, userId: req.userId });

    if (!vote) {
      return res.status(404).json({ message: 'Vote not found' });
    }

    // Update idea vote count
    const idea = await Idea.findById(ideaId);
    if (idea) {
      idea.voteCount = Math.max(0, idea.voteCount - 1);
      await idea.save();
    }

    res.status(200).json({ success: true, message: 'Vote removed successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.checkVote = async (req, res) => {
  try {
    const { ideaId } = req.params;

    const vote = await Vote.findOne({ ideaId, userId: req.userId });

    res.status(200).json({ success: true, hasVoted: !!vote });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getVoteCount = async (req, res) => {
  try {
    const { ideaId } = req.params;

    const count = await Vote.countDocuments({ ideaId });

    res.status(200).json({ success: true, voteCount: count });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
