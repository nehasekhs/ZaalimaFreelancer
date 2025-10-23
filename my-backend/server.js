require("dotenv").config();
const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const multer = require("multer");
const path = require("path");
const fs = require("fs");

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    credentials: true,
  },
});
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true,
}));

// DB connect
mongoose
  .connect(process.env.MONGO_URI || "mongodb://localhost:27017/freelancehub")
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

// Serve static uploads
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// ✅ Create uploads folder if missing
if (!fs.existsSync("uploads")) {
  fs.mkdirSync("uploads");
}

// ✅ Multer setup for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + "-" + file.originalname);
  },
});
const upload = multer({ storage });

// ✅ Simple model for storing file info (optional but realistic)
const FileSchema = new mongoose.Schema({
  name: String,
  path: String,
  size: Number,
  type: String,
  uploadedBy: String,
  projectId: String,
  uploadedAt: { type: Date, default: Date.now },
});
const FileModel = mongoose.model("File", FileSchema);

// ✅ File upload route
app.post("/api/collaboration/upload", upload.single("file"), async (req, res) => {
  try {
    const file = req.file;
    if (!file) return res.status(400).json({ message: "No file uploaded" });

    const newFile = new FileModel({
      name: file.originalname,
      path: `/uploads/${file.filename}`,
      size: file.size,
      type: file.mimetype.split("/")[0],
      uploadedBy: req.userId || "Anonymous", // if you want, integrate with your auth middleware
      projectId: req.body.projectId,
    });

    await newFile.save();

    res.json({
      message: "File uploaded successfully",
      file: {
        id: newFile._id,
        name: newFile.name,
        size: newFile.size,
        type: newFile.type,
        uploadedBy: newFile.uploadedBy,
        uploadedAt: newFile.uploadedAt,
        url: `${req.protocol}://${req.get("host")}${newFile.path}`,
      },
    });
  } catch (err) {
    console.error("❌ Error uploading file:", err);
    res.status(500).json({ message: "File upload failed" });
  }
});

// ✅ Get all files for a specific project
app.get("/api/projects/:projectId/files", async (req, res) => {
  try {
    const files = await FileModel.find({ projectId: req.params.projectId });
    res.json({ files });
  } catch (err) {
    console.error("❌ Error fetching files:", err);
    res.status(500).json({ message: "Failed to fetch files" });
  }
});

// ✅ Download route — real download on click
// app.get("/api/collaboration/download/:id", async (req, res) => {
//   try {
//     const file = await FileModel.findById(req.params.id);
//     if (!file) return res.status(404).json({ message: "File not found" });

//     const filePath = path.join(__dirname, file.path);

//     if (fs.existsSync(filePath)) {
//       res.download(filePath, file.name); // triggers real browser download
//     } else {
//       res.status(404).json({ message: "File missing on server" });
//     }
//   } catch (err) {
//     console.error("❌ Error downloading file:", err);
//     res.status(500).json({ message: "Download failed" });
//   }
// });
// ✅ Download file by ID
app.get("/api/collaboration/download/:id", async (req, res) => {
  try {
    const file = await FileModel.findById(req.params.id);
    if (!file) return res.status(404).json({ message: "File not found" });

    const filePath = path.join(__dirname, file.path);
    res.download(filePath, file.name);
  } catch (err) {
    console.error("❌ Error downloading file:", err);
    res.status(500).json({ message: "Failed to download file" });
  }
});

// ✅ Delete file by ID
app.delete("/api/collaboration/delete/:id", async (req, res) => {
  try {
    const file = await FileModel.findById(req.params.id);
    if (!file) return res.status(404).json({ message: "File not found" });

    const filePath = path.join(__dirname, file.path.replace(/^\//, ''));
    // Delete file from filesystem
    if (fs.existsSync(filePath)) fs.unlinkSync(filePath);


    // Delete from MongoDB
    await FileModel.findByIdAndDelete(req.params.id);

    res.json({ message: "File deleted successfully", id: req.params.id });
  } catch (err) {
    console.error("❌ Error deleting file:", err);
    res.status(500).json({ message: "Failed to delete file" });
  }
});

// Routes
const authRoutes = require("./routes/authRoutes");
app.use("/api/auth", authRoutes);

const profile = require("./routes/profile");
app.use("/api/profile", profile);

// Domain routes
app.use("/api/projects", require("./routes/projects"));
app.use("/api/applications", require("./routes/applications"));
app.use("/api/payments", require("./routes/payments"));
app.use("/api/reviews", require("./routes/reviews"));
app.use("/api/freelancers", require("./routes/freelancers"));
app.use("/api/skills", require("./routes/skills"));
app.use("/api/proposals", require("./routes/proposals"));
app.use("/api/messages", require("./routes/messages"));
app.use("/api/dashboard", require("./routes/dashboard"));
app.use("/api/verification", require("./routes/verification"));
app.use("/api/notifications", require("./routes/notifications"));
app.use("/api/ai", require("./routes/ai"));
app.use("/api/search", require("./routes/search"));
app.use("/api/support", require("./routes/support"));
app.use("/api/demo", require("./routes/demo"));

// Expose io to routes
app.set('io', io);

// Example protected route
const requireAuth = require("./middleware/auth");
app.get("/api/protected", requireAuth, (req, res) => {
  res.json({ message: "You are authorized!", userId: req.userId });
});

// Socket.IO events
io.on("connection", (socket) => {
  socket.on('register', (userId) => {
    if (userId) {
      socket.join(String(userId));
    }
  });

  socket.on("join-room", (roomId) => {
    socket.join(roomId);
  });

  socket.on("document-change", ({ roomId, delta }) => {
    socket.to(roomId).emit("receive-change", delta);
  });

  socket.on("chat-message", ({ roomId, message }) => {
    io.to(roomId).emit("chat-message", message);
  });

  socket.on('typing', ({ to, from }) => {
    if (to) io.to(String(to)).emit('typing', { from });
  });
});

// Server start with fallback port
server.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
}).on("error", (err) => {
  if (err.code === "EADDRINUSE") {
    const newPort = Number(PORT) + 1;
    server.listen(newPort, () => {
      console.log(`⚠️ Port ${PORT} in use, switched to http://localhost:${newPort}`);
    });
  } else {
    throw err;
  }
});