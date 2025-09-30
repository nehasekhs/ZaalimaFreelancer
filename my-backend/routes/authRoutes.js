const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");

// Public routes
router.post("/signup", authController.signup);
router.post("/login", authController.login);
router.get("/verify", (req, res) => {
  try {
    const auth = req.headers.authorization || "";
    const token = auth.startsWith("Bearer ") ? auth.split(" ")[1] : null;
    if (!token) return res.status(401).json({ message: "No token" });
    const jwt = require('jsonwebtoken');
    const JWT_SECRET = process.env.JWT_SECRET || "supersecretkey";
    const decoded = jwt.verify(token, JWT_SECRET);
    res.json({ user: { id: decoded.id } });
  } catch (e) {
    res.status(401).json({ message: "Invalid token" });
  }
});
router.post("/logout", authController.logout);


module.exports = router;
