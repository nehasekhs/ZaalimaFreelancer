const mongoose = require("mongoose");

const proposalSchema = new mongoose.Schema(
  {
    project: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: "Project", 
      required: true, 
      index: true 
    },
    freelancer: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: "User", 
      required: true, 
      index: true 
    },
    bidAmount: { type: Number, required: true },
    timeline: { type: String, required: true },
    proposal: { type: String, required: true },
    coverLetter: { type: String },
    attachments: [{ 
      filename: String, 
      url: String, 
      size: Number,
      type: String 
    }],
    status: { 
      type: String, 
      enum: ["Pending", "Accepted", "Rejected", "Withdrawn"], 
      default: "Pending",
      index: true 
    },
    isRead: { type: Boolean, default: false },
    clientNotes: { type: String },
    freelancerNotes: { type: String },
    negotiationHistory: [{
      message: String,
      amount: Number,
      timeline: String,
      from: { type: String, enum: ["Client", "Freelancer"] },
      createdAt: { type: Date, default: Date.now }
    }],
    milestones: [{
      title: String,
      description: String,
      dueDate: Date,
      amount: Number,
      status: { type: String, enum: ["Pending", "In Progress", "Completed"], default: "Pending" }
    }],
    questions: [{
      question: String,
      answer: String,
      askedBy: { type: String, enum: ["Client", "Freelancer"] },
      createdAt: { type: Date, default: Date.now }
    }],
    isUrgent: { type: Boolean, default: false },
    availableFrom: { type: Date },
    estimatedHours: { type: Number },
    hourlyRate: { type: Number },
    totalCost: { type: Number },
    currency: { type: String, default: "USD" }
  },
  { timestamps: true }
);

// Ensure one proposal per freelancer per project
proposalSchema.index({ project: 1, freelancer: 1 }, { unique: true });

// Text index for search
proposalSchema.index({ proposal: "text", coverLetter: "text" });

module.exports = mongoose.model("Proposal", proposalSchema);
