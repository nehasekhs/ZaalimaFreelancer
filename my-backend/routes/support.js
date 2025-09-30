const express = require("express");
const router = express.Router();
const requireAuth = require("../middleware/auth");

// Very simple in-memory store for demo; replace with DB model as needed
const tickets = [];

router.post("/tickets", async (req, res) => {
  try {
    const { subject, message, email } = req.body;
    if (!subject || !message || !email) return res.status(400).json({ message: "Missing fields" });
    const ticket = {
      id: String(Date.now()),
      subject,
      message,
      email,
      status: "Open",
      createdAt: new Date(),
    };
    tickets.push(ticket);
    res.status(201).json({ ticket });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

router.get("/tickets", requireAuth, async (_req, res) => {
  res.json({ tickets });
});

module.exports = router;


