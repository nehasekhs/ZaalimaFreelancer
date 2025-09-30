const express = require("express");
const router = express.Router();
const User = require("../models/User");

// Get top freelancers based on rating and experience
router.get("/top", async (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 6;
    
    const freelancers = await User.find({ 
      role: "freelancer",
      rating: { $exists: true }
    })
    .sort({ rating: -1, experienceYears: -1 })
    .limit(limit)
    .select("-password")
    .lean();

    // If no freelancers in database, return sample data
    if (freelancers.length === 0) {
      const sampleFreelancers = [
        {
          _id: "1",
          name: "John Doe",
          title: "Full Stack Developer",
          rating: 4.9,
          hourlyRate: 60,
          skills: ["React", "Node.js", "MongoDB"],
          location: "London, UK",
          avatarUrl: "https://randomuser.me/api/portraits/men/11.jpg",
          experienceYears: 5,
          bio: "Experienced Full Stack Developer delivering scalable web apps."
        },
        {
          _id: "2",
          name: "Anna Grey",
          title: "UI/UX Designer",
          rating: 4.8,
          hourlyRate: 55,
          skills: ["Figma", "UX Research", "Wireframes"],
          location: "New York, USA",
          avatarUrl: "https://randomuser.me/api/portraits/women/21.jpg",
          experienceYears: 4,
          bio: "Creative UI/UX designer with experience in web and mobile apps."
        },
        {
          _id: "3",
          name: "Ali Khan",
          title: "Backend Developer",
          rating: 4.7,
          hourlyRate: 65,
          skills: ["Node.js", "Express", "MongoDB"],
          location: "Karachi, Pakistan",
          avatarUrl: "https://randomuser.me/api/portraits/men/13.jpg",
          experienceYears: 6,
          bio: "Backend developer specializing in REST APIs and databases."
        },
        {
          _id: "4",
          name: "Emily White",
          title: "Mobile Developer",
          rating: 4.9,
          hourlyRate: 70,
          skills: ["Flutter", "React Native", "iOS"],
          location: "San Francisco, USA",
          avatarUrl: "https://randomuser.me/api/portraits/women/14.jpg",
          experienceYears: 5,
          bio: "Mobile app developer with expertise in cross-platform development."
        },
        {
          _id: "5",
          name: "Robert Lee",
          title: "DevOps Engineer",
          rating: 4.6,
          hourlyRate: 80,
          skills: ["AWS", "Docker", "Kubernetes"],
          location: "Seattle, USA",
          avatarUrl: "https://randomuser.me/api/portraits/men/15.jpg",
          experienceYears: 7,
          bio: "DevOps engineer with expertise in cloud infrastructure and automation."
        },
        {
          _id: "6",
          name: "Sophia Brown",
          title: "Data Scientist",
          rating: 5.0,
          hourlyRate: 90,
          skills: ["Python", "Machine Learning", "TensorFlow"],
          location: "Berlin, Germany",
          avatarUrl: "https://randomuser.me/api/portraits/women/16.jpg",
          experienceYears: 6,
          bio: "Data scientist creating cutting-edge ML models and analytics solutions."
        }
      ];
      return res.json({ freelancers: sampleFreelancers });
    }

    res.json({ freelancers });
  } catch (err) {
    console.error("❌ Get top freelancers error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// Get freelancers by category
router.get("/category/:category", async (req, res) => {
  try {
    const { category } = req.params;
    const limit = parseInt(req.query.limit) || 10;
    
    const freelancers = await User.find({ 
      role: "freelancer",
      categories: { $in: [category] }
    })
    .sort({ rating: -1 })
    .limit(limit)
    .select("-password")
    .lean();

    res.json({ freelancers });
  } catch (err) {
    console.error("❌ Get freelancers by category error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
