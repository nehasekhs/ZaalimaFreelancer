require("dotenv").config();
const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const cors = require("cors");

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