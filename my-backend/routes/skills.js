const express = require("express");
const router = express.Router();
const Skill = require("../models/Skill");

// Get all skills with optional filtering
router.get("/", async (req, res) => {
  try {
    const { 
      category, 
      search, 
      isPopular, 
      difficulty, 
      marketDemand,
      limit = 50,
      page = 1 
    } = req.query;
    
    const filter = { isActive: true };
    
    if (category) filter.category = category;
    if (isPopular === 'true') filter.isPopular = true;
    if (difficulty) filter.difficulty = difficulty;
    if (marketDemand) filter.marketDemand = marketDemand;
    
    let query = Skill.find(filter);
    
    if (search) {
      query = query.find({ 
        $text: { $search: search } 
      });
    }
    
    const skills = await query
      .sort({ isPopular: -1, name: 1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);
    
    const total = await Skill.countDocuments(filter);
    
    res.json({
      skills,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        pages: Math.ceil(total / limit)
      }
    });
  } catch (err) {
    console.error("❌ Get skills error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// Get popular skills
router.get("/popular", async (req, res) => {
  try {
    const { limit = 20 } = req.query;
    const skills = await Skill.find({ 
      isActive: true, 
      isPopular: true 
    })
    .sort({ name: 1 })
    .limit(parseInt(limit));
    
    res.json({ skills });
  } catch (err) {
    console.error("❌ Get popular skills error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// Get skills by category
router.get("/category/:category", async (req, res) => {
  try {
    const { category } = req.params;
    const { limit = 50 } = req.query;
    
    const skills = await Skill.find({ 
      category, 
      isActive: true 
    })
    .sort({ name: 1 })
    .limit(parseInt(limit));
    
    res.json({ skills });
  } catch (err) {
    console.error("❌ Get skills by category error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// Search skills
router.get("/search", async (req, res) => {
  try {
    const { q, limit = 10 } = req.query;
    
    if (!q) {
      return res.status(400).json({ message: "Search query is required" });
    }
    
    const skills = await Skill.find({
      $text: { $search: q },
      isActive: true
    })
    .sort({ score: { $meta: "textScore" } })
    .limit(parseInt(limit));
    
    res.json({ skills });
  } catch (err) {
    console.error("❌ Search skills error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// Get skill categories
router.get("/categories", async (req, res) => {
  try {
    const categories = await Skill.distinct("category", { isActive: true });
    res.json({ categories });
  } catch (err) {
    console.error("❌ Get skill categories error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// Create new skill (admin only)
router.post("/", async (req, res) => {
  try {
    const skill = new Skill(req.body);
    await skill.save();
    res.status(201).json(skill);
  } catch (err) {
    console.error("❌ Create skill error:", err);
    if (err.code === 11000) {
      res.status(400).json({ message: "Skill already exists" });
    } else {
      res.status(500).json({ message: "Server error" });
    }
  }
});

// Update skill (admin only)
router.put("/:id", async (req, res) => {
  try {
    const skill = await Skill.findByIdAndUpdate(
      req.params.id, 
      req.body, 
      { new: true }
    );
    
    if (!skill) {
      return res.status(404).json({ message: "Skill not found" });
    }
    
    res.json(skill);
  } catch (err) {
    console.error("❌ Update skill error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// Delete skill (admin only)
router.delete("/:id", async (req, res) => {
  try {
    const skill = await Skill.findByIdAndUpdate(
      req.params.id, 
      { isActive: false }, 
      { new: true }
    );
    
    if (!skill) {
      return res.status(404).json({ message: "Skill not found" });
    }
    
    res.json({ message: "Skill deleted successfully" });
  } catch (err) {
    console.error("❌ Delete skill error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
