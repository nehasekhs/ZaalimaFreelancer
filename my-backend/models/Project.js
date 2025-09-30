const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, index: true },
    company: { type: String, required: true },
    description: { type: String },
    budgetMin: { type: Number, index: true },
    budgetMax: { type: Number, index: true },
    duration: { type: String, index: true },
    category: { type: String, index: true },
    tags: [{ type: String }],
    client: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: false, index: true },
    
    // Enhanced fields
    projectType: { 
      type: String, 
      enum: ["Fixed Price", "Hourly Rate"], 
      default: "Fixed Price",
      index: true 
    },
    experienceLevel: { 
      type: String, 
      enum: ["Entry", "Intermediate", "Expert"], 
      default: "Intermediate",
      index: true 
    },
    projectDuration: { 
      type: String, 
      enum: ["Less than 1 month", "1-3 months", "3-6 months", "6+ months"],
      index: true 
    },
    skillsRequired: [{ type: String, index: true }],
    visibility: { 
      type: String, 
      enum: ["Public", "Private"], 
      default: "Public",
      index: true 
    },
    attachments: [{ 
      filename: String, 
      url: String, 
      size: Number,
      type: String 
    }],
    timezone: { type: String, default: "UTC" },
    milestones: [{
      title: String,
      description: String,
      dueDate: Date,
      amount: Number,
      status: { type: String, enum: ["Pending", "In Progress", "Completed"], default: "Pending" }
    }],
    paymentTerms: { 
      type: String, 
      enum: ["Escrow", "Milestone-based", "Completion-based"], 
      default: "Escrow" 
    },
    selectedFreelancerId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    status: { 
      type: String, 
      enum: ["Open", "In Progress", "Completed", "Cancelled"], 
      default: "Open",
      index: true 
    },
    proposals: [{ 
      freelancer: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
      bidAmount: Number,
      proposal: String,
      timeline: String,
      status: { type: String, enum: ["Pending", "Accepted", "Rejected"], default: "Pending" },
      createdAt: { type: Date, default: Date.now }
    }],
    totalBudget: { type: Number },
    currency: { type: String, default: "USD" },
    isUrgent: { type: Boolean, default: false },
    remoteWork: { type: Boolean, default: true },
    location: { type: String },
    languages: [{ type: String }],
    maxProposals: { type: Number, default: 50 },
    autoAccept: { type: Boolean, default: false },
    autoAcceptAmount: { type: Number }
  },
  { timestamps: true }
);

// Text index on textual fields only
projectSchema.index({ title: "text", description: "text", company: "text" });
// Separate index for tags array for efficient $in queries
projectSchema.index({ tags: 1 });

module.exports = mongoose.model("Project", projectSchema);


