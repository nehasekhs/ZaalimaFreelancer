const mongoose = require("mongoose");

const skillSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, unique: true, index: true },
    category: { type: String, required: true, index: true },
    description: { type: String },
    isPopular: { type: Boolean, default: false, index: true },
    icon: { type: String }, // Icon URL or class name
    color: { type: String, default: "#8b5cf6" },
    parentCategory: { type: String, index: true },
    synonyms: [{ type: String }], // Alternative names for the skill
    difficulty: { 
      type: String, 
      enum: ["Beginner", "Intermediate", "Advanced"], 
      default: "Intermediate" 
    },
    marketDemand: { 
      type: String, 
      enum: ["Low", "Medium", "High"], 
      default: "Medium" 
    },
    averageRate: { type: Number }, // Average hourly rate for this skill
    isActive: { type: Boolean, default: true, index: true }
  },
  { timestamps: true }
);

// Text index for search
skillSchema.index({ name: "text", description: "text", synonyms: "text" });

module.exports = mongoose.model("Skill", skillSchema);
