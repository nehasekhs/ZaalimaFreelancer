const express = require("express");
const router = express.Router();
const Project = require("../models/Project");
const Proposal = require("../models/Proposal");
const Message = require("../models/Message");
const Notification = require("../models/Notification");
const requireAuth = require("../middleware/auth");

// Get dashboard stats
router.get("/stats", requireAuth, async (req, res) => {
  try {
    const userId = req.userId;
    
    // Get user's projects (as client)
    const clientProjects = await Project.find({ client: userId });
    const totalProjects = clientProjects.length;
    const activeProjects = clientProjects.filter(p => p.status === 'In Progress').length;
    const completedProjects = clientProjects.filter(p => p.status === 'Completed').length;
    
    // Get user's proposals (as freelancer)
    const freelancerProposals = await Proposal.find({ freelancer: userId });
    const pendingProposals = freelancerProposals.filter(p => p.status === 'Pending').length;
    const acceptedProposals = freelancerProposals.filter(p => p.status === 'Accepted').length;
    
    // Calculate total spent (as client)
    const totalSpent = clientProjects.reduce((sum, project) => {
      return sum + (project.totalBudget || 0);
    }, 0);
    
    // Calculate total earned (as freelancer) - from accepted proposals
    const acceptedProposalAmounts = freelancerProposals
      .filter(p => p.status === 'Accepted')
      .map(p => p.bidAmount || 0);
    const totalEarnings = acceptedProposalAmounts.reduce((sum, amount) => sum + amount, 0);
    
    res.json({
      totalProjects,
      activeProjects,
      completedProjects,
      totalSpent,
      totalEarnings,
      pendingProposals,
      acceptedProposals
    });
  } catch (err) {
    console.error("❌ Get dashboard stats error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// Get recent projects
router.get("/projects/recent", requireAuth, async (req, res) => {
  try {
    const userId = req.userId;
    const { limit = 5 } = req.query;
    
    const projects = await Project.find({ client: userId })
      .sort({ createdAt: -1 })
      .limit(parseInt(limit))
      .populate("selectedFreelancerId", "name email avatarUrl");
    
    res.json({ projects });
  } catch (err) {
    console.error("❌ Get recent projects error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// Get recent messages
router.get("/messages/recent", requireAuth, async (req, res) => {
  try {
    const userId = req.userId;
    const { limit = 5 } = req.query;
    
    const messages = await Message.find({
      $or: [
        { sender: userId },
        { receiver: userId }
      ],
      isDeleted: false
    })
    .populate("sender", "name avatarUrl")
    .populate("receiver", "name avatarUrl")
    .sort({ createdAt: -1 })
    .limit(parseInt(limit));
    
    res.json({ messages });
  } catch (err) {
    console.error("❌ Get recent messages error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// Get user's projects with proposals
router.get("/projects", requireAuth, async (req, res) => {
  try {
    const userId = req.userId;
    const { page = 1, limit = 10, status } = req.query;
    
    const filter = { client: userId };
    if (status) filter.status = status;
    
    const projects = await Project.find(filter)
      .populate("selectedFreelancerId", "name email avatarUrl title")
      .sort({ createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);
    
    // Get proposal counts for each project
    const projectsWithProposals = await Promise.all(
      projects.map(async (project) => {
        const proposalCount = await Proposal.countDocuments({ project: project._id });
        const acceptedProposal = await Proposal.findOne({ 
          project: project._id, 
          status: 'Accepted' 
        }).populate('freelancer', 'name email avatarUrl');
        
        return {
          ...project.toObject(),
          proposalCount,
          acceptedProposal
        };
      })
    );
    
    const total = await Project.countDocuments(filter);
    
    res.json({
      projects: projectsWithProposals,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        pages: Math.ceil(total / limit)
      }
    });
  } catch (err) {
    console.error("❌ Get user projects error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// Get user's proposals
router.get("/proposals", requireAuth, async (req, res) => {
  try {
    const userId = req.userId;
    const { page = 1, limit = 10, status } = req.query;
    
    const filter = { freelancer: userId };
    if (status) filter.status = status;
    
    const proposals = await Proposal.find(filter)
      .populate("project", "title budgetMin budgetMax status category client")
      .populate("project.client", "name email")
      .sort({ createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);
    
    const total = await Proposal.countDocuments(filter);
    
    res.json({
      proposals,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        pages: Math.ceil(total / limit)
      }
    });
  } catch (err) {
    console.error("❌ Get user proposals error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// Get earnings analytics
router.get("/analytics/earnings", requireAuth, async (req, res) => {
  try {
    const userId = req.userId;
    const { period = "month" } = req.query; // month, quarter, year
    
    let dateFilter = {};
    const now = new Date();
    
    switch (period) {
      case "month":
        dateFilter = {
          createdAt: {
            $gte: new Date(now.getFullYear(), now.getMonth(), 1)
          }
        };
        break;
      case "quarter":
        const quarterStart = new Date(now.getFullYear(), Math.floor(now.getMonth() / 3) * 3, 1);
        dateFilter = { createdAt: { $gte: quarterStart } };
        break;
      case "year":
        dateFilter = {
          createdAt: {
            $gte: new Date(now.getFullYear(), 0, 1)
          }
        };
        break;
    }
    
    const proposals = await Proposal.find({
      freelancer: userId,
      status: 'Accepted',
      ...dateFilter
    });
    
    const totalEarnings = proposals.reduce((sum, proposal) => sum + (proposal.bidAmount || 0), 0);
    const averageEarnings = proposals.length > 0 ? totalEarnings / proposals.length : 0;
    
    // Monthly breakdown for the current year
    const monthlyEarnings = [];
    for (let i = 0; i < 12; i++) {
      const monthStart = new Date(now.getFullYear(), i, 1);
      const monthEnd = new Date(now.getFullYear(), i + 1, 0);
      
      const monthProposals = proposals.filter(proposal => {
        const proposalDate = new Date(proposal.createdAt);
        return proposalDate >= monthStart && proposalDate <= monthEnd;
      });
      
      const monthEarnings = monthProposals.reduce((sum, proposal) => sum + (proposal.bidAmount || 0), 0);
      
      monthlyEarnings.push({
        month: monthStart.toLocaleDateString('en-US', { month: 'short' }),
        earnings: monthEarnings
      });
    }
    
    res.json({
      totalEarnings,
      averageEarnings,
      proposalCount: proposals.length,
      monthlyEarnings
    });
  } catch (err) {
    console.error("❌ Get earnings analytics error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// Get project analytics
router.get("/analytics/projects", requireAuth, async (req, res) => {
  try {
    const userId = req.userId;
    
    const projects = await Project.find({ client: userId });
    
    const statusCounts = {
      Open: projects.filter(p => p.status === 'Open').length,
      'In Progress': projects.filter(p => p.status === 'In Progress').length,
      Completed: projects.filter(p => p.status === 'Completed').length,
      Cancelled: projects.filter(p => p.status === 'Cancelled').length
    };
    
    const categoryCounts = {};
    projects.forEach(project => {
      categoryCounts[project.category] = (categoryCounts[project.category] || 0) + 1;
    });
    
    const totalBudget = projects.reduce((sum, project) => sum + (project.totalBudget || 0), 0);
    const averageBudget = projects.length > 0 ? totalBudget / projects.length : 0;
    
    res.json({
      statusCounts,
      categoryCounts,
      totalBudget,
      averageBudget,
      totalProjects: projects.length
    });
  } catch (err) {
    console.error("❌ Get project analytics error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
