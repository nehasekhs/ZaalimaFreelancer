const express = require("express");
const router = express.Router();
const requireAuth = require("../middleware/auth");
const Freelancer = require("../models/User");

// Simple placeholder AI matching that scores freelancers by overlapping skills
router.post("/matching", requireAuth, async (req, res) => {
  try {
    const { project, algorithm = "enhanced_matching" } = req.body;
    if (!project || !Array.isArray(project.tags)) {
      return res.status(400).json({ message: "Project with tags is required" });
    }

    // Find freelancers with any matching skills
    const candidates = await Freelancer.find({ role: "freelancer" }).select(
      "name email skills title hourlyRate avatarUrl rating"
    );

    const matches = candidates
      .map((f) => {
        const skills = Array.isArray(f.skills) ? f.skills : [];
        const overlap = skills.filter((s) => project.tags.includes(s));
        const score = overlap.length / Math.max(skills.length || 1, project.tags.length || 1);
        return {
          freelancer: {
            id: f._id,
            name: f.name,
            title: f.title,
            email: f.email,
            hourlyRate: f.hourlyRate,
            avatarUrl: f.avatarUrl,
          },
          score: Number((score * 100).toFixed(1)),
          overlappingSkills: overlap,
        };
      })
      .sort((a, b) => b.score - a.score)
      .slice(0, 10);

    const overallScore = matches.length > 0 ? Math.round(matches[0].score) : 0;

    res.json({ algorithm, matches, overallScore });
  } catch (err) {
    console.error("❌ AI matching error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;


