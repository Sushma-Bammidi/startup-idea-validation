const WaitingList = require('../models/WaitingList');
const Idea = require('../models/Idea');
const User = require('../models/User');

exports.joinWaitlist = async (req, res) => {
  try {
    const { ideaId } = req.body;

    if (!ideaId) {
      return res.status(400).json({ message: 'Please provide idea ID' });
    }

    const idea = await Idea.findById(ideaId);
    if (!idea) {
      return res.status(404).json({ message: 'Idea not found' });
    }

    // Check if user already in waitlist
    const existingEntry = await WaitingList.findOne({ ideaId, userId: req.userId });
    if (existingEntry) {
      return res.status(400).json({ message: 'You are already in the waiting list for this idea' });
    }

    const user = await User.findById(req.userId);

    const entry = await WaitingList.create({
      ideaId,
      userId: req.userId,
      email: user.email
    });

    // Update idea waitlist count
    idea.waitlistCount += 1;
    await idea.save();

    res.status(201).json({ success: true, message: 'Added to waiting list successfully', entry });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.leaveWaitlist = async (req, res) => {
  try {
    const { ideaId } = req.body;

    if (!ideaId) {
      return res.status(400).json({ message: 'Please provide idea ID' });
    }

    const entry = await WaitingList.findOneAndDelete({ ideaId, userId: req.userId });

    if (!entry) {
      return res.status(404).json({ message: 'You are not in the waiting list for this idea' });
    }

    // Update idea waitlist count
    const idea = await Idea.findById(ideaId);
    if (idea) {
      idea.waitlistCount = Math.max(0, idea.waitlistCount - 1);
      await idea.save();
    }

    res.status(200).json({ success: true, message: 'Removed from waiting list successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.checkWaitlist = async (req, res) => {
  try {
    const { ideaId } = req.params;

    const entry = await WaitingList.findOne({ ideaId, userId: req.userId });

    res.status(200).json({ success: true, inWaitlist: !!entry });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getWaitlistCount = async (req, res) => {
  try {
    const { ideaId } = req.params;

    const count = await WaitingList.countDocuments({ ideaId });

    res.status(200).json({ success: true, waitlistCount: count });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getWaitlistForIdea = async (req, res) => {
  try {
    const { ideaId } = req.params;

    const idea = await Idea.findById(ideaId);
    if (!idea) {
      return res.status(404).json({ message: 'Idea not found' });
    }

    // Only idea creator can view waitlist
    if (idea.createdBy.toString() !== req.userId) {
      return res.status(403).json({ message: 'Not authorized to view this waiting list' });
    }

    const waitlist = await WaitingList.find({ ideaId }).populate('userId', 'username email');

    res.status(200).json({ success: true, waitlist });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
