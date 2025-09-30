const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema(
  {
    freelancer: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: "User", 
      required: true, 
      index: true 
    },
    reviewer: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: "User", 
      required: true, 
      index: true 
    },
    project: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: "Project", 
      required: false, 
      index: true 
    },
    rating: { 
      type: Number, 
      required: true, 
      min: 1, 
      max: 5, 
      index: true 
    },
    title: { 
      type: String, 
      required: true, 
      maxlength: 100 
    },
    comment: { 
      type: String, 
      required: true, 
      maxlength: 1000 
    },
    isVerified: { 
      type: Boolean, 
      default: false 
    },
    helpful: { 
      type: Number, 
      default: 0 
    },
    notHelpful: { 
      type: Number, 
      default: 0 
    }
  },
  { timestamps: true }
);

// Ensure one review per reviewer per freelancer
reviewSchema.index({ freelancer: 1, reviewer: 1 }, { unique: true });

// Text index for search
reviewSchema.index({ title: "text", comment: "text" });

module.exports = mongoose.model("Review", reviewSchema);