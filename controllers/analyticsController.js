const Idea = require('../models/Idea');
const Vote = require('../models/Vote');
const Comment = require('../models/Comment');
const WaitingList = require('../models/WaitingList');

exports.getAnalytics = async (req, res) => {
  try {
    const { ideaId } = req.params;

    const idea = await Idea.findById(ideaId);
    if (!idea) {
      return res.status(404).json({ message: 'Idea not found' });
    }

    // Only idea creator can view analytics
    if (idea.createdBy.toString() !== req.userId) {
      return res.status(403).json({ message: 'Not authorized to view this analytics' });
    }

    const votes = await Vote.countDocuments({ ideaId });
    const comments = await Comment.countDocuments({ ideaId });
    const waitlist = await WaitingList.countDocuments({ ideaId });

    // Calculate engagement metrics
    const totalEngagement = votes + comments + waitlist;
    const engagementRate = totalEngagement > 0 ? ((votes + waitlist) / totalEngagement * 100).toFixed(2) : 0;

    res.status(200).json({
      success: true,
      analytics: {
        ideaId: idea._id,
        title: idea.title,
        voteCount: votes,
        commentCount: comments,
        waitlistCount: waitlist,
        totalEngagement,
        engagementRate: parseFloat(engagementRate),
        createdAt: idea.createdAt,
        updatedAt: idea.updatedAt
      }
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getCreatorAnalytics = async (req, res) => {
  try {
    // Get all ideas created by the user
    const ideas = await Idea.find({ createdBy: req.userId });

    const analyticsData = await Promise.all(
      ideas.map(async (idea) => {
        const votes = await Vote.countDocuments({ ideaId: idea._id });
        const comments = await Comment.countDocuments({ ideaId: idea._id });
        const waitlist = await WaitingList.countDocuments({ ideaId: idea._id });
        const totalEngagement = votes + comments + waitlist;

        return {
          ideaId: idea._id,
          title: idea.title,
          category: idea.category,
          voteCount: votes,
          commentCount: comments,
          waitlistCount: waitlist,
          totalEngagement,
          createdAt: idea.createdAt
        };
      })
    );

    // Calculate overall statistics
    const totalVotes = analyticsData.reduce((sum, item) => sum + item.voteCount, 0);
    const totalComments = analyticsData.reduce((sum, item) => sum + item.commentCount, 0);
    const totalWaitlist = analyticsData.reduce((sum, item) => sum + item.waitlistCount, 0);
    const totalIdeas = ideas.length;

    res.status(200).json({
      success: true,
      analytics: {
        totalIdeas,
        totalVotes,
        totalComments,
        totalWaitlist,
        averageEngagement: totalIdeas > 0 ? ((totalVotes + totalComments + totalWaitlist) / totalIdeas).toFixed(2) : 0,
        ideas: analyticsData
      }
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getTrendingIdeas = async (req, res) => {
  try {
    const ideas = await Idea.find().sort({ voteCount: -1 }).limit(10);

    const trendingIdeas = await Promise.all(
      ideas.map(async (idea) => {
        const comments = await Comment.countDocuments({ ideaId: idea._id });
        const waitlist = await WaitingList.countDocuments({ ideaId: idea._id });

        return {
          _id: idea._id,
          title: idea.title,
          description: idea.description,
          category: idea.category,
          creatorName: idea.creatorName,
          voteCount: idea.voteCount,
          commentCount: comments,
          waitlistCount: waitlist,
          createdAt: idea.createdAt
        };
      })
    );

    res.status(200).json({ success: true, trendingIdeas });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
