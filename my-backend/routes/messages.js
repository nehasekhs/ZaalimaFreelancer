const express = require("express");
const router = express.Router();
const Message = require("../models/Message");
const User = require("../models/User");
const optionalAuth = require("../middleware/optionalAuth");

// Get messages between two users
router.get("/conversation/:userId", optionalAuth, async (req, res) => {
  try {
    const { userId } = req.params;
    const { page = 1, limit = 50, projectId } = req.query;
    
    if (!req.userId) {
      return res.status(401).json({ message: "Authentication required" });
    }
    
    const filter = {
      $or: [
        { sender: req.userId, receiver: userId },
        { sender: userId, receiver: req.userId }
      ],
      isDeleted: false
    };
    
    if (projectId) {
      filter.project = projectId;
    }
    
    const messages = await Message.find(filter)
      .populate("sender", "name avatarUrl title")
      .populate("receiver", "name avatarUrl title")
      .populate("replyTo")
      .sort({ createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);
    
    const total = await Message.countDocuments(filter);
    
    res.json({
      messages: messages.reverse(), // Return in chronological order
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        pages: Math.ceil(total / limit)
      }
    });
  } catch (err) {
    console.error("❌ Get conversation error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// Get all conversations for a user
router.get("/conversations", optionalAuth, async (req, res) => {
  try {
    if (!req.userId) {
      return res.status(401).json({ message: "Authentication required" });
    }
    
    const conversations = await Message.aggregate([
      {
        $match: {
          $or: [
            { sender: req.userId },
            { receiver: req.userId }
          ],
          isDeleted: false
        }
      },
      {
        $sort: { createdAt: -1 }
      },
      {
        $group: {
          _id: {
            $cond: [
              { $eq: ["$sender", req.userId] },
              "$receiver",
              "$sender"
            ]
          },
          lastMessage: { $first: "$$ROOT" },
          unreadCount: {
            $sum: {
              $cond: [
                {
                  $and: [
                    { $eq: ["$receiver", req.userId] },
                    { $eq: ["$isRead", false] }
                  ]
                },
                1,
                0
              ]
            }
          }
        }
      },
      {
        $lookup: {
          from: "users",
          localField: "_id",
          foreignField: "_id",
          as: "user"
        }
      },
      {
        $unwind: "$user"
      },
      {
        $project: {
          user: {
            _id: "$user._id",
            name: "$user.name",
            avatarUrl: "$user.avatarUrl",
            title: "$user.title",
            isOnline: "$user.isOnline"
          },
          lastMessage: {
            content: "$lastMessage.content",
            messageType: "$lastMessage.messageType",
            createdAt: "$lastMessage.createdAt",
            isRead: "$lastMessage.isRead"
          },
          unreadCount: 1
        }
      },
      {
        $sort: { "lastMessage.createdAt": -1 }
      }
    ]);
    
    res.json({ conversations });
  } catch (err) {
    console.error("❌ Get conversations error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// Send a message
router.post("/", optionalAuth, async (req, res) => {
  try {
  const { 
      receiverId, 
      receiverEmail,
      content, 
      messageType = "text", 
      attachments = [],
      projectId,
      replyTo
    } = req.body;
    
    if (!req.userId) {
      return res.status(401).json({ message: "Authentication required" });
    }
    
    if (!receiverId && !receiverEmail) {
      return res.status(400).json({ message: "Receiver identifier (id or email) is required" });
    }
    if (!content) return res.status(400).json({ message: "Content is required" });
    
    // Resolve receiver by id or email
    let receiver;
    if (receiverId) {
      receiver = await User.findById(receiverId);
    } else if (receiverEmail) {
      receiver = await User.findOne({ email: receiverEmail });
    }
    if (!receiver) {
      return res.status(404).json({ message: "Receiver not found" });
    }
    
    const message = new Message({
      sender: req.userId,
      receiver: receiver._id,
      content,
      messageType,
      attachments,
      project: projectId,
      replyTo
    });
    
    await message.save();
    
    // Populate the response
    await message.populate("sender", "name avatarUrl title");
    await message.populate("receiver", "name avatarUrl title");
    
    // Emit socket events to receiver for real-time update
    try {
      const io = req.app.get('io');
      if (io) {
        io.to(String(receiver._id)).emit('message:new', {
          _id: message._id,
          content: message.content,
          sender: message.sender,
          receiver: message.receiver,
          createdAt: message.createdAt,
        });
        // Also emit a notification event
        io.to(String(receiver._id)).emit('notification', {
          type: 'new_message',
          title: `New message from ${message.sender.name}`,
          message: message.content,
          createdAt: new Date()
        });
      }
    } catch (socketError) {
      console.error('Socket emission error:', socketError);
    }

    res.status(201).json(message);
  } catch (err) {
    console.error("❌ Send message error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// Mark messages as read
router.put("/read", optionalAuth, async (req, res) => {
  try {
    const { senderId, projectId } = req.body;
    
    if (!req.userId) {
      return res.status(401).json({ message: "Authentication required" });
    }
    
    const filter = {
      receiver: req.userId,
      isRead: false
    };
    
    if (senderId) filter.sender = senderId;
    if (projectId) filter.project = projectId;
    
    await Message.updateMany(filter, {
      isRead: true,
      readAt: new Date()
    });
    
    res.json({ message: "Messages marked as read" });
  } catch (err) {
    console.error("❌ Mark messages as read error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// Delete a message
router.delete("/:messageId", optionalAuth, async (req, res) => {
  try {
    const { messageId } = req.params;
    
    if (!req.userId) {
      return res.status(401).json({ message: "Authentication required" });
    }
    
    const message = await Message.findById(messageId);
    
    if (!message) {
      return res.status(404).json({ message: "Message not found" });
    }
    
    // Check if user is the sender
    if (message.sender.toString() !== req.userId.toString()) {
      return res.status(403).json({ message: "Unauthorized" });
    }
    
    message.isDeleted = true;
    message.deletedAt = new Date();
    await message.save();
    
    res.json({ message: "Message deleted successfully" });
  } catch (err) {
    console.error("❌ Delete message error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// Edit a message
router.put("/:messageId", optionalAuth, async (req, res) => {
  try {
    const { messageId } = req.params;
    const { content } = req.body;
    
    if (!req.userId) {
      return res.status(401).json({ message: "Authentication required" });
    }
    
    const message = await Message.findById(messageId);
    
    if (!message) {
      return res.status(404).json({ message: "Message not found" });
    }
    
    // Check if user is the sender
    if (message.sender.toString() !== req.userId.toString()) {
      return res.status(403).json({ message: "Unauthorized" });
    }
    
    message.content = content;
    message.isEdited = true;
    message.editedAt = new Date();
    await message.save();
    
    res.json(message);
  } catch (err) {
    console.error("❌ Edit message error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// Add reaction to message
router.post("/:messageId/reaction", optionalAuth, async (req, res) => {
  try {
    const { messageId } = req.params;
    const { emoji } = req.body;
    
    if (!req.userId) {
      return res.status(401).json({ message: "Authentication required" });
    }
    
    const message = await Message.findById(messageId);
    
    if (!message) {
      return res.status(404).json({ message: "Message not found" });
    }
    
    // Remove existing reaction from this user
    message.reactions = message.reactions.filter(
      r => r.user.toString() !== req.userId.toString()
    );
    
    // Add new reaction
    message.reactions.push({
      user: req.userId,
      emoji,
      createdAt: new Date()
    });
    
    await message.save();
    
    res.json(message);
  } catch (err) {
    console.error("❌ Add reaction error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// Search messages
router.get("/search", optionalAuth, async (req, res) => {
  try {
    const { q, userId, projectId, page = 1, limit = 20 } = req.query;
    
    if (!req.userId) {
      return res.status(401).json({ message: "Authentication required" });
    }
    
    if (!q) {
      return res.status(400).json({ message: "Search query is required" });
    }
    
    const filter = {
      $text: { $search: q },
      $or: [
        { sender: req.userId },
        { receiver: req.userId }
      ],
      isDeleted: false
    };
    
    if (userId) {
      filter.$or = [
        { sender: req.userId, receiver: userId },
        { sender: userId, receiver: req.userId }
      ];
    }
    
    if (projectId) {
      filter.project = projectId;
    }
    
    const messages = await Message.find(filter)
      .populate("sender", "name avatarUrl title")
      .populate("receiver", "name avatarUrl title")
      .sort({ score: { $meta: "textScore" } })
      .limit(limit * 1)
      .skip((page - 1) * limit);
    
    const total = await Message.countDocuments(filter);
    
    res.json({
      messages,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        pages: Math.ceil(total / limit)
      }
    });
  } catch (err) {
    console.error("❌ Search messages error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
