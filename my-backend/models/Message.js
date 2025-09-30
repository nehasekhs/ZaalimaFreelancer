const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema(
  {
    sender: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: "User", 
      required: true, 
      index: true 
    },
    receiver: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: "User", 
      required: true, 
      index: true 
    },
    project: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: "Project", 
      index: true 
    },
    content: { type: String, required: true },
    messageType: { 
      type: String, 
      enum: ["text", "image", "file", "system", "proposal", "milestone"], 
      default: "text" 
    },
    attachments: [{ 
      filename: String, 
      url: String, 
      size: Number,
      type: String,
      originalName: String
    }],
    isRead: { type: Boolean, default: false },
    readAt: { type: Date },
    isEdited: { type: Boolean, default: false },
    editedAt: { type: Date },
    replyTo: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: "Message" 
    },
    reactions: [{
      user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
      emoji: String,
      createdAt: { type: Date, default: Date.now }
    }],
    isDeleted: { type: Boolean, default: false },
    deletedAt: { type: Date },
    metadata: {
      isUrgent: { type: Boolean, default: false },
      priority: { type: String, enum: ["Low", "Medium", "High"], default: "Medium" },
      tags: [{ type: String }]
    }
  },
  { timestamps: true }
);

// Compound index for efficient querying
messageSchema.index({ sender: 1, receiver: 1, createdAt: -1 });
messageSchema.index({ project: 1, createdAt: -1 });

// Text index for search
messageSchema.index({ content: "text" });

module.exports = mongoose.model("Message", messageSchema);
