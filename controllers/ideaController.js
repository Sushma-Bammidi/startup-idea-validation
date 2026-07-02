const Idea = require('../models/Idea');
const Vote = require('../models/Vote');
const Comment = require('../models/Comment');
const WaitingList = require('../models/WaitingList');

exports.createIdea = async (req, res) => {
  try {
    const { title, description, category, problemStatement } = req.body;

    if (!title || !description || !category || !problemStatement) {
      return res.status(400).json({ message: 'Please provide all required fields' });
    }

    // Get creator name from User model
    const User = require('../models/User');
    const user = await User.findById(req.userId);

    const idea = await Idea.create({
      title,
      description,
      category,
      problemStatement,
      createdBy: req.userId,
      creatorName: user.username
    });

    res.status(201).json({ success: true, message: 'Idea created successfully', idea });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getAllIdeas = async (req, res) => {
  try {
    const { category, search } = req.query;
    let filter = {};

    if (category) {
      filter.category = category;
    }

    if (search) {
      filter.$or = [
        { title: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } }
      ];
    }

    const ideas = await Idea.find(filter).sort({ createdAt: -1 }).populate('createdBy', 'username');

    res.status(200).json({ success: true, ideas });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getIdeaById = async (req, res) => {
  try {
    const idea = await Idea.findById(req.params.id).populate('createdBy', 'username email');

    if (!idea) {
      return res.status(404).json({ message: 'Idea not found' });
    }

    // Get votes, comments, and waiting list info
    const voteCount = await Vote.countDocuments({ ideaId: id });
    const commentCount = await Comment.countDocuments({ ideaId: id });
    const waitlistCount = await WaitingList.countDocuments({ ideaId: id });

    res.status(200).json({
      success: true,
      idea,
      voteCount,
      commentCount,
      waitlistCount
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateIdea = async (req, res) => {
  try {
    let idea = await Idea.findById(req.params.id);

    if (!idea) {
      return res.status(404).json({ message: 'Idea not found' });
    }

    if (idea.createdBy.toString() !== req.userId) {
      return res.status(403).json({ message: 'Not authorized to update this idea' });
    }

    idea = await Idea.findByIdAndUpdate(req.params.id, req.body, { new: true });

    res.status(200).json({ success: true, message: 'Idea updated successfully', idea });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.deleteIdea = async (req, res) => {
  try {
    const idea = await Idea.findById(req.params.id);

    if (!idea) {
      return res.status(404).json({ message: 'Idea not found' });
    }

    if (idea.createdBy.toString() !== req.userId) {
      return res.status(403).json({ message: 'Not authorized to delete this idea' });
    }

    await Idea.findByIdAndDelete(req.params.id);
    // Also delete related votes, comments, and waiting list entries
    await Vote.deleteMany({ ideaId: req.params.id });
    await Comment.deleteMany({ ideaId: req.params.id });
    await WaitingList.deleteMany({ ideaId: req.params.id });

    res.status(200).json({ success: true, message: 'Idea deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getMyIdeas = async (req, res) => {
  try {
    const ideas = await Idea.find({ createdBy: req.userId }).sort({ createdAt: -1 });

    res.status(200).json({ success: true, ideas });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
