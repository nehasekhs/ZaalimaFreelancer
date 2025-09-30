const mongoose = require("mongoose");

const notificationSchema = new mongoose.Schema(
  {
    user: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: "User", 
      required: true, 
      index: true 
    },
    type: { 
      type: String, 
      enum: [
        "new_proposal", 
        "proposal_accepted", 
        "proposal_rejected", 
        "new_message", 
        "project_milestone", 
        "payment_received", 
        "project_completed", 
        "review_received", 
        "skill_endorsement", 
        "profile_view", 
        "system_announcement"
      ], 
      required: true,
      index: true 
    },
    title: { type: String, required: true },
    message: { type: String, required: true },
    data: { 
      type: mongoose.Schema.Types.Mixed 
    }, // Additional data specific to notification type
    isRead: { type: Boolean, default: false, index: true },
    readAt: { type: Date },
    priority: { 
      type: String, 
      enum: ["Low", "Medium", "High", "Urgent"], 
      default: "Medium",
      index: true 
    },
    actionUrl: { type: String }, // URL to navigate when notification is clicked
    expiresAt: { type: Date }, // For time-sensitive notifications
    isEmailSent: { type: Boolean, default: false },
    isPushSent: { type: Boolean, default: false },
    isSmsSent: { type: Boolean, default: false },
    relatedUser: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: "User" 
    },
    relatedProject: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: "Project" 
    },
    relatedProposal: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: "Proposal" 
    }
  },
  { timestamps: true }
);

// Index for efficient querying
notificationSchema.index({ user: 1, isRead: 1, createdAt: -1 });
notificationSchema.index({ type: 1, createdAt: -1 });
notificationSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 }); // TTL index

module.exports = mongoose.model("Notification", notificationSchema);
