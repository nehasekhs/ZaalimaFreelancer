const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Review = require("../models/Review");
const User = require("../models/User");
const optionalAuth = require("../middleware/optionalAuth");

// Get reviews for a specific freelancer
router.get("/freelancer/:freelancerId", async (req, res) => {
  try {
    const { freelancerId } = req.params;
    const { page = 1, limit = 10, sort = "newest" } = req.query;
    
    const sortOptions = {
      newest: { createdAt: -1 },
      oldest: { createdAt: 1 },
      highest: { rating: -1 },
      lowest: { rating: 1 }
    };

    const reviews = await Review.find({ freelancer: freelancerId })
      .populate("reviewer", "name avatarUrl")
      .populate("project", "title")
      .sort(sortOptions[sort] || sortOptions.newest)
      .limit(limit * 1)
      .skip((page - 1) * limit);

    // Get average rating
    const avgRating = await Review.aggregate([
      { $match: { freelancer: mongoose.Types.ObjectId(freelancerId) } },
      { $group: { _id: null, average: { $avg: "$rating" }, count: { $sum: 1 } } }
    ]);

    res.json({
      reviews,
      averageRating: avgRating[0]?.average || 0,
      totalReviews: avgRating[0]?.count || 0
    });
  } catch (err) {
    console.error("❌ Get reviews error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// Submit a review
router.post("/", optionalAuth, async (req, res) => {
  try {
    const { freelancerId, rating, title, comment, projectId } = req.body;
    
    if (!freelancerId || !rating || !title || !comment) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    if (rating < 1 || rating > 5) {
      return res.status(400).json({ message: "Rating must be between 1 and 5" });
    }

    // Check if freelancer exists
    const freelancer = await User.findById(freelancerId);
    if (!freelancer) {
      return res.status(404).json({ message: "Freelancer not found" });
    }

    // If user is authenticated, check if they already reviewed this freelancer
    if (req.userId) {
      const existingReview = await Review.findOne({
        freelancer: freelancerId,
        reviewer: req.userId
      });
      
      if (existingReview) {
        return res.status(400).json({ message: "You have already reviewed this freelancer" });
      }
    }

    const review = new Review({
      freelancer: freelancerId,
      reviewer: req.userId || null,
      project: projectId || null,
      rating,
      title,
      comment,
      isVerified: !!req.userId // Verified if user is authenticated
    });

    await review.save();
    
    // Populate the review data for response
    await review.populate("reviewer", "name avatarUrl");
    await review.populate("project", "title");

    res.status(201).json(review);
  } catch (err) {
    console.error("❌ Submit review error:", err);
    if (err.code === 11000) {
      res.status(400).json({ message: "You have already reviewed this freelancer" });
    } else {
      res.status(500).json({ message: "Server error" });
    }
  }
});

// Get all reviews (for admin or general browsing)
router.get("/", async (req, res) => {
  try {
    const { page = 1, limit = 20, freelancer, rating } = req.query;
    const filter = {};
    
    if (freelancer) filter.freelancer = freelancer;
    if (rating) filter.rating = rating;

    const reviews = await Review.find(filter)
      .populate("freelancer", "name title")
      .populate("reviewer", "name avatarUrl")
      .populate("project", "title")
      .sort({ createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);

    res.json(reviews);
  } catch (err) {
    console.error("❌ Get all reviews error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// Update review helpfulness
router.post("/:reviewId/helpful", async (req, res) => {
  try {
    const { reviewId } = req.params;
    const { isHelpful } = req.body;

    const updateField = isHelpful ? "helpful" : "notHelpful";
    const review = await Review.findByIdAndUpdate(
      reviewId,
      { $inc: { [updateField]: 1 } },
      { new: true }
    );

    if (!review) {
      return res.status(404).json({ message: "Review not found" });
    }

    res.json({ 
      helpful: review.helpful, 
      notHelpful: review.notHelpful 
    });
  } catch (err) {
    console.error("❌ Update helpfulness error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;