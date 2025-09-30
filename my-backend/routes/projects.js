const express = require("express");
const router = express.Router();
const requireAuth = require("../middleware/auth");
const optionalAuth = require("../middleware/optionalAuth");
const Project = require("../models/Project");
const Proposal = require("../models/Proposal");
const Message = require("../models/Message");
const Notification = require("../models/Notification");

// Demo projects endpoint
router.get("/demo", async (req, res) => {
  res.json([
    {
      _id: "demo1",
      title: "AI Video Editor Web App",
      company: "DemoTech",
      description: "A web app that lets users upload, edit, and export videos with AI-powered effects. Includes a live video preview below!",
      budgetMin: 1000,
      budgetMax: 3000,
      duration: "2 months",
      category: "Web Development",
      tags: ["AI", "Video", "React", "Node.js"],
      videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
      createdAt: new Date(),
    },
    {
      _id: "demo2",
      title: "E-commerce Platform Redesign",
      company: "Shoply",
      description: "Redesign the UI/UX of an existing e-commerce platform for better conversion and mobile experience.",
      budgetMin: 2000,
      budgetMax: 5000,
      duration: "1 month",
      category: "UI/UX Design",
      tags: ["UI/UX", "Figma", "E-commerce"],
      createdAt: new Date(),
    },
    {
      _id: "demo3",
      title: "Mobile Fitness App",
      company: "FitNow",
      description: "Develop a cross-platform fitness app with workout tracking, video tutorials, and social features.",
      budgetMin: 1500,
      budgetMax: 4000,
      duration: "3 months",
      category: "Mobile Development",
      tags: ["React Native", "Fitness", "API"],
      createdAt: new Date(),
    },
  ]);
});


// Create project (allows anonymous posting)
router.post("/", optionalAuth, async (req, res) => {
  try {
    const body = req.body;
    // If user is authenticated, use their ID, otherwise set to null
    const clientId = req.userId || null;
    const project = await Project.create({ ...body, client: clientId });
    res.status(201).json(project);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// List projects with filters
router.get("/", async (req, res) => {
  const { category, minBudget, maxBudget, duration, skills, q } = req.query;
  const filter = {};
  if (category) filter.category = category;
  if (duration) filter.duration = duration;
  if (minBudget || maxBudget) {
    filter.$and = [];
    if (minBudget) filter.$and.push({ budgetMin: { $gte: Number(minBudget) } });
    if (maxBudget) filter.$and.push({ budgetMax: { $lte: Number(maxBudget) } });
  }
  if (skills) filter.tags = { $in: skills.split(",").map(s=>s.trim()) };
  try {
    const query = q ? Project.find(filter).find({ $text: { $search: q } }) : Project.find(filter);
    const items = await query.sort({ createdAt: -1 }).limit(50);
    res.json(items);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

// Recent projects for current authenticated client (used in Dashboard)
router.get("/recent", requireAuth, async (req, res) => {
  try {
    const { limit = 5 } = req.query;
    const projects = await Project.find({ client: req.userId })
      .sort({ createdAt: -1 })
      .limit(parseInt(limit));
    res.json({ projects });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

// List my projects (client-owned)
router.get("/mine", requireAuth, async (req, res) => {
  try {
    const items = await Project.find({ client: req.userId }).sort({ createdAt: -1 });
    res.json(items);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

// Get project by id
router.get("/:id", async (req, res) => {
  try {
    const project = await Project.findById(req.params.id).populate("client", "name email");
    if (!project) return res.status(404).json({ message: "Not found" });
    res.json(project);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

// Update project
router.put("/:id", requireAuth, async (req, res) => {
  try {
    const updated = await Project.findOneAndUpdate({ _id: req.params.id, client: req.userId }, req.body, { new: true });
    if (!updated) return res.status(404).json({ message: "Not found or unauthorized" });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete project
router.delete("/:id", requireAuth, async (req, res) => {
  try {
    const deleted = await Project.findOneAndDelete({ _id: req.params.id, client: req.userId });
    if (!deleted) return res.status(404).json({ message: "Not found or unauthorized" });
    res.json({ message: "Deleted" });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;


