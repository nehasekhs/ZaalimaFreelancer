const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require("../models/User");

const JWT_SECRET = process.env.JWT_SECRET || "supersecretkey";

function createToken(userId) {
  return jwt.sign({ id: userId }, JWT_SECRET, { expiresIn: "7d" });
}

exports.signup = async (req, res) => {
  try {
    const { name, email, password, role = "client", title, bio, location, experienceYears, hourlyRate, portfolioUrl, skills = [], categories = [], availability, avatarUrl } = req.body;

    // check if email exists
    const existing = await User.findOne({ email });
    if (existing) return res.status(400).json({ message: "Email already exists" });

    // hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
      name,
      email,
      password: hashedPassword,
      role,
      title,
      bio,
      location,
      experienceYears,
      hourlyRate,
      portfolioUrl,
      skills,
      categories,
      availability,
      avatarUrl,
    });
    await user.save();

    const token = createToken(user._id);

    res.status(201).json({
      message: "Signup successful",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        title: user.title,
        bio: user.bio,
        location: user.location,
        experienceYears: user.experienceYears,
        hourlyRate: user.hourlyRate,
        portfolioUrl: user.portfolioUrl,
        skills: user.skills,
        categories: user.categories,
        availability: user.availability,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
        avatarUrl: user.avatarUrl,
      },
    });
  } catch (err) {
    console.error("❌ Signup error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    let user = await User.findOne({ email });
    // Auto-provision demo users for convenience
    if (!user && /@demo\.com$/i.test(email)) {
      const role = email.toLowerCase().startsWith('client') ? 'client' : 'freelancer';
      const hashedPassword = await bcrypt.hash(password, 10);
      user = await User.create({ name: email.split('@')[0], email, password: hashedPassword, role });
    }
    if (!user) return res.status(400).json({ message: "Invalid credentials" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

    const token = createToken(user._id);

    res.json({
      message: "Login successful",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        title: user.title,
        bio: user.bio,
        location: user.location,
        experienceYears: user.experienceYears,
        hourlyRate: user.hourlyRate,
        portfolioUrl: user.portfolioUrl,
        skills: user.skills,
        categories: user.categories,
        availability: user.availability,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
        avatarUrl: user.avatarUrl,
      },
    });
  } catch (err) {
    console.error("❌ Login error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

exports.logout = async (_req, res) => {
  try {
    // If using cookies, clear them here. For token-based, client removes token.
    res.json({ message: "Logout successful" });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};
