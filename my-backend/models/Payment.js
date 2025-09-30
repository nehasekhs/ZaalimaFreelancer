const mongoose = require("mongoose");

const paymentSchema = new mongoose.Schema(
  {
    project: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: "Project", 
      required: true, 
      index: true 
    },
    client: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: "User", 
      required: true, 
      index: true 
    },
    freelancer: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: "User", 
      required: true, 
      index: true 
    },
    amount: { type: Number, required: true },
    currency: { type: String, default: "USD" },
    status: { 
      type: String, 
      enum: ["Pending", "Escrowed", "Released", "Refunded", "Disputed", "Cancelled"], 
      default: "Pending",
      index: true 
    },
    paymentMethod: { 
      type: String, 
      enum: ["Credit Card", "PayPal", "Bank Transfer", "Crypto"], 
      required: true 
    },
    paymentIntentId: { type: String }, // Stripe payment intent ID
    transactionId: { type: String }, // External payment processor transaction ID
    escrowReleaseDate: { type: Date }, // When funds can be released
    milestone: {
      title: String,
      description: String,
      amount: Number,
      dueDate: Date,
      status: { 
        type: String, 
        enum: ["Pending", "In Progress", "Completed", "Approved", "Rejected"], 
        default: "Pending" 
      }
    },
    dispute: {
      reason: String,
      description: String,
      status: { 
        type: String, 
        enum: ["Open", "Under Review", "Resolved", "Closed"], 
        default: "Open" 
      },
      resolution: String,
      resolvedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
      resolvedAt: Date
    },
    fees: {
      platformFee: { type: Number, default: 0 },
      processingFee: { type: Number, default: 0 },
      freelancerAmount: { type: Number, required: true }
    },
    metadata: {
      clientNotes: String,
      freelancerNotes: String,
      attachments: [{ 
        filename: String, 
        url: String, 
        type: String 
      }]
    },
    releaseConditions: {
      autoRelease: { type: Boolean, default: false },
      autoReleaseDays: { type: Number, default: 7 },
      requiresApproval: { type: Boolean, default: true }
    },
    history: [{
      action: String,
      description: String,
      performedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
      timestamp: { type: Date, default: Date.now },
      metadata: mongoose.Schema.Types.Mixed
    }]
  },
  { timestamps: true }
);

// Calculate freelancer amount after fees
paymentSchema.pre('save', function(next) {
  if (this.isModified('amount') || this.isModified('fees')) {
    this.fees.freelancerAmount = this.amount - (this.fees.platformFee || 0) - (this.fees.processingFee || 0);
  }
  next();
});

// Add to history when status changes
paymentSchema.pre('save', function(next) {
  if (this.isModified('status') && !this.isNew) {
    this.history.push({
      action: 'Status Changed',
      description: `Status changed to ${this.status}`,
      performedBy: this.client, // This should be set by the controller
      timestamp: new Date()
    });
  }
  next();
});

// Indexes for efficient querying
paymentSchema.index({ client: 1, status: 1 });
paymentSchema.index({ freelancer: 1, status: 1 });
paymentSchema.index({ project: 1, status: 1 });
paymentSchema.index({ status: 1, createdAt: -1 });

module.exports = mongoose.model("Payment", paymentSchema);
