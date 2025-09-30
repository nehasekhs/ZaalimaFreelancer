const express = require("express");
const router = express.Router();
const Verification = require("../models/Verification");
const User = require("../models/User");
const requireAuth = require("../middleware/auth");

// Submit verification request
router.post("/submit", requireAuth, async (req, res) => {
  try {
    const { type, verificationData, documents } = req.body;
    
    // Check if user already has a pending verification of this type
    const existingVerification = await Verification.findOne({
      user: req.userId,
      type,
      status: { $in: ["Pending", "Under Review"] }
    });
    
    if (existingVerification) {
      return res.status(400).json({ 
        message: `You already have a pending ${type.toLowerCase()} verification` 
      });
    }
    
    const verification = new Verification({
      user: req.userId,
      type,
      verificationData,
      documents: documents || [],
      metadata: {
        ipAddress: req.ip,
        userAgent: req.get('User-Agent'),
        deviceInfo: req.get('X-Device-Info') || 'Unknown'
      }
    });
    
    // Add to history
    verification.history.push({
      action: "Verification Submitted",
      description: `${type} verification submitted`,
      performedBy: req.userId,
      timestamp: new Date()
    });
    
    await verification.save();
    
    res.status(201).json(verification);
  } catch (err) {
    console.error("❌ Submit verification error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// Get user's verifications
router.get("/", requireAuth, async (req, res) => {
  try {
    const { type, status } = req.query;
    
    const filter = { user: req.userId };
    if (type) filter.type = type;
    if (status) filter.status = status;
    
    const verifications = await Verification.find(filter)
      .populate("reviewer", "name email")
      .sort({ createdAt: -1 });
    
    res.json({ verifications });
  } catch (err) {
    console.error("❌ Get verifications error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// Get verification details
router.get("/:verificationId", requireAuth, async (req, res) => {
  try {
    const { verificationId } = req.params;
    
    const verification = await Verification.findById(verificationId)
      .populate("user", "name email")
      .populate("reviewer", "name email");
    
    if (!verification) {
      return res.status(404).json({ message: "Verification not found" });
    }
    
    // Verify user has access to this verification
    if (verification.user._id.toString() !== req.userId.toString()) {
      return res.status(403).json({ message: "Unauthorized" });
    }
    
    res.json(verification);
  } catch (err) {
    console.error("❌ Get verification details error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// Update verification (user only)
router.put("/:verificationId", requireAuth, async (req, res) => {
  try {
    const { verificationId } = req.params;
    const { verificationData, documents } = req.body;
    
    const verification = await Verification.findById(verificationId);
    
    if (!verification) {
      return res.status(404).json({ message: "Verification not found" });
    }
    
    // Verify user has access to this verification
    if (verification.user.toString() !== req.userId.toString()) {
      return res.status(403).json({ message: "Unauthorized" });
    }
    
    // Only allow updates if status is Pending
    if (verification.status !== "Pending") {
      return res.status(400).json({ 
        message: "Cannot update verification that is under review or completed" 
      });
    }
    
    if (verificationData) {
      verification.verificationData = { ...verification.verificationData, ...verificationData };
    }
    
    if (documents) {
      verification.documents = documents;
    }
    
    // Add to history
    verification.history.push({
      action: "Verification Updated",
      description: "Verification information updated",
      performedBy: req.userId,
      timestamp: new Date()
    });
    
    await verification.save();
    
    res.json(verification);
  } catch (err) {
    console.error("❌ Update verification error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// Cancel verification
router.put("/:verificationId/cancel", requireAuth, async (req, res) => {
  try {
    const { verificationId } = req.params;
    
    const verification = await Verification.findById(verificationId);
    
    if (!verification) {
      return res.status(404).json({ message: "Verification not found" });
    }
    
    // Verify user has access to this verification
    if (verification.user.toString() !== req.userId.toString()) {
      return res.status(403).json({ message: "Unauthorized" });
    }
    
    // Only allow cancellation if status is Pending
    if (verification.status !== "Pending") {
      return res.status(400).json({ 
        message: "Cannot cancel verification that is under review or completed" 
      });
    }
    
    verification.status = "Cancelled";
    
    // Add to history
    verification.history.push({
      action: "Verification Cancelled",
      description: "Verification cancelled by user",
      performedBy: req.userId,
      timestamp: new Date()
    });
    
    await verification.save();
    
    res.json(verification);
  } catch (err) {
    console.error("❌ Cancel verification error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// Admin: Get all verifications (admin only)
router.get("/admin/all", requireAuth, async (req, res) => {
  try {
    // Check if user is admin (you'll need to implement admin check)
    // For now, we'll just check if user exists
    const user = await User.findById(req.userId);
    if (!user || user.role !== 'admin') {
      return res.status(403).json({ message: "Admin access required" });
    }
    
    const { page = 1, limit = 20, type, status } = req.query;
    
    const filter = {};
    if (type) filter.type = type;
    if (status) filter.status = status;
    
    const verifications = await Verification.find(filter)
      .populate("user", "name email avatarUrl")
      .populate("reviewer", "name email")
      .sort({ createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);
    
    const total = await Verification.countDocuments(filter);
    
    res.json({
      verifications,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        pages: Math.ceil(total / limit)
      }
    });
  } catch (err) {
    console.error("❌ Get all verifications error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// Admin: Review verification
router.put("/:verificationId/review", requireAuth, async (req, res) => {
  try {
    // Check if user is admin
    const user = await User.findById(req.userId);
    if (!user || user.role !== 'admin') {
      return res.status(403).json({ message: "Admin access required" });
    }
    
    const { verificationId } = req.params;
    const { status, reviewNotes, rejectionReason } = req.body;
    
    const verification = await Verification.findById(verificationId);
    
    if (!verification) {
      return res.status(404).json({ message: "Verification not found" });
    }
    
    verification.status = status;
    verification.reviewer = req.userId;
    verification.reviewNotes = reviewNotes;
    
    if (status === "Rejected") {
      verification.rejectionReason = rejectionReason;
    } else if (status === "Approved") {
      verification.verifiedAt = new Date();
      
      // Update user's verification status
      await User.findByIdAndUpdate(verification.user, {
        $addToSet: { verifiedTypes: verification.type }
      });
    }
    
    // Add to history
    verification.history.push({
      action: "Verification Reviewed",
      description: `Verification ${status.toLowerCase()} by admin`,
      performedBy: req.userId,
      timestamp: new Date(),
      metadata: { reviewNotes, rejectionReason }
    });
    
    await verification.save();
    
    res.json(verification);
  } catch (err) {
    console.error("❌ Review verification error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// Get verification statistics
router.get("/stats/summary", requireAuth, async (req, res) => {
  try {
    const userId = req.userId;
    
    const verifications = await Verification.find({ user: userId });
    
    const stats = {
      total: verifications.length,
      pending: verifications.filter(v => v.status === "Pending").length,
      underReview: verifications.filter(v => v.status === "Under Review").length,
      approved: verifications.filter(v => v.status === "Approved").length,
      rejected: verifications.filter(v => v.status === "Rejected").length,
      byType: {}
    };
    
    // Count by type
    const types = ["Identity", "Phone", "Email", "Payment", "Portfolio", "Skills"];
    types.forEach(type => {
      const typeVerifications = verifications.filter(v => v.type === type);
      stats.byType[type] = {
        total: typeVerifications.length,
        approved: typeVerifications.filter(v => v.status === "Approved").length,
        pending: typeVerifications.filter(v => v.status === "Pending").length
      };
    });
    
    res.json(stats);
  } catch (err) {
    console.error("❌ Get verification stats error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
