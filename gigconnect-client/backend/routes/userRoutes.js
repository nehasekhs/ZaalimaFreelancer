import express from "express";
import User from "../models/User.js";
import protect from "../middleware/auth.js";

const router = express.Router();

// GET logged-in user profile
router.get("/profile", protect, async (req, res) => {
  try {
    const user = req.user; // middleware ne req.user me daal diya hai
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// PUT update profile
router.put("/profile", protect, async (req, res) => {
  try {
    const user = req.user;

    Object.assign(user, req.body); // update all fields
    await user.save();

    res.json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
