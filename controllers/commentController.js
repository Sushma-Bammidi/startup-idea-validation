const Comment = require('../models/Comment');
const Idea = require('../models/Idea');
const User = require('../models/User');

exports.addComment = async (req, res) => {
  try {
    const { ideaId, commentText } = req.body;

    if (!ideaId || !commentText) {
      return res.status(400).json({ message: 'Please provide idea ID and comment text' });
    }

    const idea = await Idea.findById(ideaId);
    if (!idea) {
      return res.status(404).json({ message: 'Idea not found' });
    }

    const user = await User.findById(req.userId);

    const comment = await Comment.create({
      ideaId,
      userId: req.userId,
      username: user.username,
      commentText
    });

    // Update idea comment count
    idea.commentCount += 1;
    await idea.save();

    res.status(201).json({ success: true, message: 'Comment added successfully', comment });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getComments = async (req, res) => {
  try {
    const { ideaId } = req.params;

    const comments = await Comment.find({ ideaId }).sort({ createdAt: -1 }).populate('userId', 'username');

    res.status(200).json({ success: true, comments });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.deleteComment = async (req, res) => {
  try {
    const comment = await Comment.findById(req.params.id);

    if (!comment) {
      return res.status(404).json({ message: 'Comment not found' });
    }

    if (comment.userId.toString() !== req.userId) {
      return res.status(403).json({ message: 'Not authorized to delete this comment' });
    }

    await Comment.findByIdAndDelete(req.params.id);

    // Update idea comment count
    const idea = await Idea.findById(comment.ideaId);
    if (idea) {
      idea.commentCount = Math.max(0, idea.commentCount - 1);
      await idea.save();
    }

    res.status(200).json({ success: true, message: 'Comment deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
