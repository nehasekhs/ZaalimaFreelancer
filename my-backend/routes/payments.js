const express = require("express");
const router = express.Router();
const Payment = require("../models/Payment");
const Project = require("../models/Project");
const User = require("../models/User");
const requireAuth = require("../middleware/auth");

// Create payment (client only)
router.post("/create", requireAuth, async (req, res) => {
  try {
    const { 
      projectId, 
      freelancerId, 
      amount, 
      paymentMethod, 
      milestone,
      autoRelease = false,
      autoReleaseDays = 7
    } = req.body;
    
    // Verify project exists and user is the client
    const project = await Project.findById(projectId);
    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }
    
    if (project.client.toString() !== req.userId.toString()) {
      return res.status(403).json({ message: "Unauthorized" });
    }
    
    // Verify freelancer exists
    const freelancer = await User.findById(freelancerId);
    if (!freelancer) {
      return res.status(404).json({ message: "Freelancer not found" });
    }
    
    // Calculate fees (example: 5% platform fee, 2.9% + $0.30 processing fee)
    const platformFee = amount * 0.05;
    const processingFee = (amount * 0.029) + 0.30;
    const freelancerAmount = amount - platformFee - processingFee;
    
    const payment = new Payment({
      project: projectId,
      client: req.userId,
      freelancer: freelancerId,
      amount,
      paymentMethod,
      milestone: milestone ? {
        title: milestone.title,
        description: milestone.description,
        amount: milestone.amount || amount,
        dueDate: milestone.dueDate ? new Date(milestone.dueDate) : null
      } : null,
      fees: {
        platformFee,
        processingFee,
        freelancerAmount
      },
      releaseConditions: {
        autoRelease,
        autoReleaseDays,
        requiresApproval: !autoRelease
      },
      status: "Pending"
    });
    
    await payment.save();
    
    // Add to history
    payment.history.push({
      action: "Payment Created",
      description: `Payment of $${amount} created for project ${project.title}`,
      performedBy: req.userId,
      timestamp: new Date()
    });
    
    await payment.save();
    
    res.status(201).json(payment);
  } catch (err) {
    console.error("❌ Create payment error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// Process payment (simulate payment processing)
router.post("/:paymentId/process", requireAuth, async (req, res) => {
  try {
    const { paymentId } = req.params;
    const { paymentIntentId, transactionId } = req.body;
    
    const payment = await Payment.findById(paymentId);
    if (!payment) {
      return res.status(404).json({ message: "Payment not found" });
    }
    
    // Verify user is the client
    if (payment.client.toString() !== req.userId.toString()) {
      return res.status(403).json({ message: "Unauthorized" });
    }
    
    // Simulate payment processing
    // In a real app, you would integrate with Stripe, PayPal, etc.
    payment.status = "Escrowed";
    payment.paymentIntentId = paymentIntentId;
    payment.transactionId = transactionId;
    payment.escrowReleaseDate = new Date(Date.now() + (payment.releaseConditions.autoReleaseDays * 24 * 60 * 60 * 1000));
    
    // Add to history
    payment.history.push({
      action: "Payment Processed",
      description: `Payment processed and funds escrowed`,
      performedBy: req.userId,
      timestamp: new Date(),
      metadata: { paymentIntentId, transactionId }
    });
    
    await payment.save();
    
    res.json(payment);
  } catch (err) {
    console.error("❌ Process payment error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// Release payment (client only)
router.post("/:paymentId/release", requireAuth, async (req, res) => {
  try {
    const { paymentId } = req.params;
    const { notes } = req.body;
    
    const payment = await Payment.findById(paymentId);
    if (!payment) {
      return res.status(404).json({ message: "Payment not found" });
    }
    
    // Verify user is the client
    if (payment.client.toString() !== req.userId.toString()) {
      return res.status(403).json({ message: "Unauthorized" });
    }
    
    if (payment.status !== "Escrowed") {
      return res.status(400).json({ message: "Payment is not in escrow" });
    }
    
    payment.status = "Released";
    payment.metadata.clientNotes = notes;
    
    // Add to history
    payment.history.push({
      action: "Payment Released",
      description: `Payment released to freelancer${notes ? ` with notes: ${notes}` : ''}`,
      performedBy: req.userId,
      timestamp: new Date()
    });
    
    await payment.save();
    
    res.json(payment);
  } catch (err) {
    console.error("❌ Release payment error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// Request refund (client only)
router.post("/:paymentId/refund", requireAuth, async (req, res) => {
  try {
    const { paymentId } = req.params;
    const { reason, description } = req.body;
    
    const payment = await Payment.findById(paymentId);
    if (!payment) {
      return res.status(404).json({ message: "Payment not found" });
    }
    
    // Verify user is the client
    if (payment.client.toString() !== req.userId.toString()) {
      return res.status(403).json({ message: "Unauthorized" });
    }
    
    if (payment.status !== "Escrowed") {
      return res.status(400).json({ message: "Payment is not in escrow" });
    }
    
    payment.status = "Refunded";
    payment.dispute = {
      reason,
      description,
      status: "Open"
    };
    
    // Add to history
    payment.history.push({
      action: "Refund Requested",
      description: `Refund requested: ${reason}`,
      performedBy: req.userId,
      timestamp: new Date(),
      metadata: { reason, description }
    });
    
    await payment.save();
    
    res.json(payment);
  } catch (err) {
    console.error("❌ Request refund error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// Dispute payment (both client and freelancer)
router.post("/:paymentId/dispute", requireAuth, async (req, res) => {
  try {
    const { paymentId } = req.params;
    const { reason, description } = req.body;
    
    const payment = await Payment.findById(paymentId);
    if (!payment) {
      return res.status(404).json({ message: "Payment not found" });
    }
    
    // Verify user is either client or freelancer
    if (payment.client.toString() !== req.userId.toString() && 
        payment.freelancer.toString() !== req.userId.toString()) {
      return res.status(403).json({ message: "Unauthorized" });
    }
    
    if (payment.status !== "Escrowed") {
      return res.status(400).json({ message: "Payment is not in escrow" });
    }
    
    payment.status = "Disputed";
    payment.dispute = {
      reason,
      description,
      status: "Open"
    };
    
    // Add to history
    payment.history.push({
      action: "Dispute Created",
      description: `Dispute created: ${reason}`,
      performedBy: req.userId,
      timestamp: new Date(),
      metadata: { reason, description }
    });
    
    await payment.save();
    
    res.json(payment);
  } catch (err) {
    console.error("❌ Create dispute error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// Get payments for user
router.get("/", requireAuth, async (req, res) => {
  try {
    const { page = 1, limit = 20, status, type } = req.query;
    
    const filter = {
      $or: [
        { client: req.userId },
        { freelancer: req.userId }
      ]
    };
    
    if (status) filter.status = status;
    
    const payments = await Payment.find(filter)
      .populate("project", "title category")
      .populate("client", "name email")
      .populate("freelancer", "name email")
      .sort({ createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);
    
    const total = await Payment.countDocuments(filter);
    
    res.json({
      payments,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        pages: Math.ceil(total / limit)
      }
    });
  } catch (err) {
    console.error("❌ Get payments error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// Get payment details
router.get("/:paymentId", requireAuth, async (req, res) => {
  try {
    const { paymentId } = req.params;
    
    const payment = await Payment.findById(paymentId)
      .populate("project", "title description category")
      .populate("client", "name email avatarUrl")
      .populate("freelancer", "name email avatarUrl");
    
    if (!payment) {
      return res.status(404).json({ message: "Payment not found" });
    }
    
    // Verify user has access to this payment
    if (payment.client._id.toString() !== req.userId.toString() && 
        payment.freelancer._id.toString() !== req.userId.toString()) {
      return res.status(403).json({ message: "Unauthorized" });
    }
    
    res.json(payment);
  } catch (err) {
    console.error("❌ Get payment details error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// Update milestone status (freelancer only)
router.put("/:paymentId/milestone", requireAuth, async (req, res) => {
  try {
    const { paymentId } = req.params;
    const { status, notes } = req.body;
    
    const payment = await Payment.findById(paymentId);
    if (!payment) {
      return res.status(404).json({ message: "Payment not found" });
    }
    
    // Verify user is the freelancer
    if (payment.freelancer.toString() !== req.userId.toString()) {
      return res.status(403).json({ message: "Unauthorized" });
    }
    
    if (!payment.milestone) {
      return res.status(400).json({ message: "No milestone associated with this payment" });
    }
    
    payment.milestone.status = status;
    if (notes) payment.metadata.freelancerNotes = notes;
    
    // Add to history
    payment.history.push({
      action: "Milestone Updated",
      description: `Milestone status updated to ${status}`,
      performedBy: req.userId,
      timestamp: new Date(),
      metadata: { status, notes }
    });
    
    await payment.save();
    
    res.json(payment);
  } catch (err) {
    console.error("❌ Update milestone error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// Get payment analytics
router.get("/analytics/summary", requireAuth, async (req, res) => {
  try {
    const userId = req.userId;
    
    // Get all payments for user
    const payments = await Payment.find({
      $or: [
        { client: userId },
        { freelancer: userId }
      ]
    });
    
    const totalEarnings = payments
      .filter(p => p.freelancer.toString() === userId.toString() && p.status === "Released")
      .reduce((sum, p) => sum + p.fees.freelancerAmount, 0);
    
    const totalSpent = payments
      .filter(p => p.client.toString() === userId.toString())
      .reduce((sum, p) => sum + p.amount, 0);
    
    const pendingPayments = payments.filter(p => p.status === "Escrowed").length;
    const disputedPayments = payments.filter(p => p.status === "Disputed").length;
    
    res.json({
      totalEarnings,
      totalSpent,
      pendingPayments,
      disputedPayments,
      totalPayments: payments.length
    });
  } catch (err) {
    console.error("❌ Get payment analytics error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;