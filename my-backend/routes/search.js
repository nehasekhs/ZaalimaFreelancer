const express = require("express");
const router = express.Router();
const Project = require("../models/Project");

// Semantic-ish AI search placeholder: searches projects by title/description/tags
router.post("/ai", async (req, res) => {
  try {
    const { query = "", filters = {} } = req.body || {};

    const conditions = [];
    if (query) {
      conditions.push(
        { title: { $regex: query, $options: "i" } },
        { description: { $regex: query, $options: "i" } },
        { tags: { $in: [new RegExp(query, "i")] } }
      );
    }

    const filter = {};
    if (filters.category) filter.category = filters.category;

    const mongoQuery = conditions.length > 0 ? { $or: conditions, ...filter } : filter;

    const results = await Project.find(mongoQuery).sort({ createdAt: -1 }).limit(50);
    res.json({ results });
  } catch (err) {
    console.error("❌ AI search error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// Suggestions endpoint returns simple text suggestions
router.post("/suggestions", async (req, res) => {
  try {
    const { query = "" } = req.body || {};
    if (!query || String(query).trim().length < 2) return res.json({ suggestions: [] });

    const term = String(query).trim();
    const suggestions = [
      { text: `${term} Developer`, type: "skill" },
      { text: `${term} Designer`, type: "skill" },
      { text: `${term} Expert`, type: "experience" },
      { text: `Senior ${term}`, type: "experience" },
    ];
    res.json({ suggestions });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;


