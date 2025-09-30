const express = require("express");
const router = express.Router();
const requireAuth = require("../middleware/auth");
const Notification = require("../models/Notification");

// Get notifications for current user
router.get("/", requireAuth, async (req, res) => {
  try {
    const { limit = 20 } = req.query;
    const notifications = await Notification.find({ user: req.userId })
      .sort({ createdAt: -1 })
      .limit(parseInt(limit));
    res.json({ notifications });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;


