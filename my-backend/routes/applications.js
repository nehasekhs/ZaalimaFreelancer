const express = require("express");
const router = express.Router();
const requireAuth = require("../middleware/auth");
const Application = require("../models/Application");

// Apply to a project
router.post("/", requireAuth, async (req, res) => {
  try {
    const { project, coverMessage, proposal } = req.body;
    const app = await Application.create({ project, freelancer: req.userId, coverMessage, proposal });
    res.status(201).json(app);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// List my applications
router.get("/me", requireAuth, async (req, res) => {
  try {
    const apps = await Application.find({ freelancer: req.userId }).populate("project").sort({ appliedAt: -1 });
    res.json(apps);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;


