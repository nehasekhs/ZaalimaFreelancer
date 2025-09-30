const mongoose = require("mongoose");

const applicationSchema = new mongoose.Schema(
  {
    project: { type: mongoose.Schema.Types.ObjectId, ref: "Project", required: true, index: true },
    freelancer: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true, index: true },
    coverMessage: { type: String },
    proposal: { type: String },
    status: { type: String, enum: ["Applied", "Under Review", "Shortlisted", "Accepted", "Rejected"], default: "Applied", index: true },
    appliedAt: { type: Date, default: Date.now, index: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Application", applicationSchema);


