const express = require("express");
const router = express.Router();
const Proposal = require("../models/Proposal");
const Project = require("../models/Project");
const User = require("../models/User");
const optionalAuth = require("../middleware/optionalAuth");

// Get proposals for a project
router.get("/project/:projectId", async (req, res) => {
  try {
    const { projectId } = req.params;
    const { page = 1, limit = 20, status, sort = "newest" } = req.query;
    
    const filter = { project: projectId };
    if (status) filter.status = status;
    
    const sortOptions = {
      newest: { createdAt: -1 },
      oldest: { createdAt: 1 },
      lowest: { bidAmount: 1 },
      highest: { bidAmount: -1 },
      timeline: { timeline: 1 }
    };
    
    const proposals = await Proposal.find(filter)
      .populate("freelancer", "name email title avatarUrl rating location skills")
      .populate("project", "title budgetMin budgetMax")
      .sort(sortOptions[sort] || sortOptions.newest)
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
    console.error("❌ Get project proposals error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// Get proposals by freelancer
router.get("/freelancer/:freelancerId", async (req, res) => {
  try {
    const { freelancerId } = req.params;
    const { page = 1, limit = 20, status } = req.query;
    
    const filter = { freelancer: freelancerId };
    if (status) filter.status = status;
    
    const proposals = await Proposal.find(filter)
      .populate("project", "title budgetMin budgetMax status category")
      .populate("freelancer", "name email")
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
    console.error("❌ Get freelancer proposals error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// Submit a proposal
router.post("/", optionalAuth, async (req, res) => {
  try {
    const { 
      projectId, 
      bidAmount, 
      timeline, 
      proposal, 
      coverLetter,
      attachments,
      milestones,
      estimatedHours,
      hourlyRate,
      availableFrom
    } = req.body;
    
    // Check if project exists and is open
    const project = await Project.findById(projectId);
    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }
    
    if (project.status !== "Open") {
      return res.status(400).json({ message: "Project is not accepting proposals" });
    }
    
    // Check if user already submitted a proposal
    if (req.userId) {
      const existingProposal = await Proposal.findOne({
        project: projectId,
        freelancer: req.userId
      });
      
      if (existingProposal) {
        return res.status(400).json({ message: "You have already submitted a proposal for this project" });
      }
    }
    
    const proposalData = {
      project: projectId,
      freelancer: req.userId,
      bidAmount,
      timeline,
      proposal,
      coverLetter,
      attachments: attachments || [],
      milestones: milestones || [],
      estimatedHours,
      hourlyRate,
      availableFrom: availableFrom ? new Date(availableFrom) : null,
      totalCost: bidAmount,
      currency: project.currency || "USD"
    };
    
    const newProposal = new Proposal(proposalData);
    await newProposal.save();
    
    // Add proposal to project
    await Project.findByIdAndUpdate(projectId, {
      $push: {
        proposals: {
          freelancer: req.userId,
          bidAmount,
          proposal,
          timeline,
          status: "Pending",
          createdAt: new Date()
        }
      }
    });
    
    // Populate the response
    await newProposal.populate("freelancer", "name email title avatarUrl rating");
    await newProposal.populate("project", "title budgetMin budgetMax");
    
    res.status(201).json(newProposal);
  } catch (err) {
    console.error("❌ Submit proposal error:", err);
    if (err.code === 11000) {
      res.status(400).json({ message: "You have already submitted a proposal for this project" });
    } else {
      res.status(500).json({ message: "Server error" });
    }
  }
});

// Update proposal status (client only)
router.put("/:proposalId/status", optionalAuth, async (req, res) => {
  try {
    const { proposalId } = req.params;
    const { status, clientNotes } = req.body;
    
    const proposal = await Proposal.findById(proposalId)
      .populate("project", "client");
    
    if (!proposal) {
      return res.status(404).json({ message: "Proposal not found" });
    }
    
    // Check if user is the project owner
    if (req.userId && proposal.project.client.toString() !== req.userId.toString()) {
      return res.status(403).json({ message: "Unauthorized" });
    }
    
    proposal.status = status;
    if (clientNotes) proposal.clientNotes = clientNotes;
    
    await proposal.save();
    
    // If proposal is accepted, update project status
    if (status === "Accepted") {
      await Project.findByIdAndUpdate(proposal.project._id, {
        status: "In Progress",
        selectedFreelancerId: proposal.freelancer
      });
      
      // Reject all other proposals for this project
      await Proposal.updateMany(
        { 
          project: proposal.project._id, 
          _id: { $ne: proposalId } 
        },
        { status: "Rejected" }
      );
    }
    
    res.json(proposal);
  } catch (err) {
    console.error("❌ Update proposal status error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// Update proposal (freelancer only)
router.put("/:proposalId", optionalAuth, async (req, res) => {
  try {
    const { proposalId } = req.params;
    const updateData = req.body;
    
    const proposal = await Proposal.findById(proposalId);
    
    if (!proposal) {
      return res.status(404).json({ message: "Proposal not found" });
    }
    
    // Check if user is the proposal owner
    if (req.userId && proposal.freelancer.toString() !== req.userId.toString()) {
      return res.status(403).json({ message: "Unauthorized" });
    }
    
    // Don't allow updating accepted proposals
    if (proposal.status === "Accepted") {
      return res.status(400).json({ message: "Cannot update accepted proposal" });
    }
    
    const updatedProposal = await Proposal.findByIdAndUpdate(
      proposalId,
      updateData,
      { new: true }
    ).populate("freelancer", "name email title avatarUrl rating")
     .populate("project", "title budgetMin budgetMax");
    
    res.json(updatedProposal);
  } catch (err) {
    console.error("❌ Update proposal error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// Withdraw proposal
router.put("/:proposalId/withdraw", optionalAuth, async (req, res) => {
  try {
    const { proposalId } = req.params;
    
    const proposal = await Proposal.findById(proposalId);
    
    if (!proposal) {
      return res.status(404).json({ message: "Proposal not found" });
    }
    
    // Check if user is the proposal owner
    if (req.userId && proposal.freelancer.toString() !== req.userId.toString()) {
      return res.status(403).json({ message: "Unauthorized" });
    }
    
    proposal.status = "Withdrawn";
    await proposal.save();
    
    res.json({ message: "Proposal withdrawn successfully" });
  } catch (err) {
    console.error("❌ Withdraw proposal error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// Get proposal details
router.get("/:proposalId", async (req, res) => {
  try {
    const { proposalId } = req.params;
    
    const proposal = await Proposal.findById(proposalId)
      .populate("freelancer", "name email title avatarUrl rating location skills bio")
      .populate("project", "title budgetMin budgetMax description client")
      .populate("project.client", "name email");
    
    if (!proposal) {
      return res.status(404).json({ message: "Proposal not found" });
    }
    
    res.json(proposal);
  } catch (err) {
    console.error("❌ Get proposal details error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
