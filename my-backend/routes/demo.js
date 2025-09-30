const express = require("express");
const router = express.Router();

// Demo data per freelancer role/type (mock)
const defaultFiles = [
  {
    id: "fs1",
    title: "Full-Stack App Repo",
    type: "repo",
    url: "https://github.com/vercel/next.js",
    description: "Sample full-stack repository showing API routes and UI."
  },
  {
    id: "fs2",
    title: "API Postman Collection",
    type: "document",
    url: "https://www.postman.com/collections/demo",
    description: "Endpoints and sample requests."
  }
];

const defaultVideos = [
  {
    id: "vid1",
    title: "Edited Promo Reel",
    type: "video",
    url: "https://www.w3schools.com/html/mov_bbb.mp4",
    description: "Edited video showcasing transitions and color grading."
  }
];

// Demo files for a freelancer
router.get("/files/:freelancerId", async (req, res) => {
  const { freelancerId } = req.params;
  // In real app, look up freelancer and tailor data.
  res.json({
    files: [
      ...defaultFiles,
      { id: "cv1", title: "Portfolio PDF", type: "pdf", url: "https://example.com/portfolio.pdf", description: "Selected work samples." }
    ]
  });
});

// Demo sessions (recordings or upcoming)
router.get("/sessions/:freelancerId", async (req, res) => {
  const { freelancerId } = req.params;
  res.json({
    sessions: [
      {
        id: "sess1",
        title: "Live Coding Demo",
        status: "recording",
        playbackUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
        recordedAt: new Date(Date.now() - 86400000)
      },
      {
        id: "sess2",
        title: "Design Review Walkthrough",
        status: "upcoming",
        scheduledAt: new Date(Date.now() + 3 * 86400000)
      }
    ]
  });
});

module.exports = router;


