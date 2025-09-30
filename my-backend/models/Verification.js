const mongoose = require("mongoose");

const verificationSchema = new mongoose.Schema(
  {
    user: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: "User", 
      required: true, 
      index: true 
    },
    type: { 
      type: String, 
      enum: ["Identity", "Phone", "Email", "Payment", "Portfolio", "Skills"], 
      required: true,
      index: true 
    },
    status: { 
      type: String, 
      enum: ["Pending", "Under Review", "Approved", "Rejected", "Expired"], 
      default: "Pending",
      index: true 
    },
    documents: [{
      filename: String,
      url: String,
      type: String, // 'front', 'back', 'selfie', 'portfolio', etc.
      uploadedAt: { type: Date, default: Date.now }
    }],
    verificationData: {
      // Identity verification
      firstName: String,
      lastName: String,
      dateOfBirth: Date,
      idNumber: String,
      idType: String, // 'passport', 'drivers_license', 'national_id'
      country: String,
      
      // Phone verification
      phoneNumber: String,
      verificationCode: String,
      codeExpiresAt: Date,
      
      // Email verification
      email: String,
      emailToken: String,
      emailTokenExpires: Date,
      
      // Payment verification
      bankAccount: String,
      routingNumber: String,
      accountType: String,
      bankName: String,
      
      // Portfolio verification
      portfolioItems: [{
        title: String,
        description: String,
        url: String,
        imageUrl: String,
        clientName: String,
        projectDate: Date,
        verified: { type: Boolean, default: false }
      }],
      
      // Skills verification
      skills: [{
        skillName: String,
        testScore: Number,
        testDate: Date,
        certificateUrl: String,
        verified: { type: Boolean, default: false }
      }]
    },
    reviewer: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: "User" 
    },
    reviewNotes: String,
    rejectionReason: String,
    verifiedAt: Date,
    expiresAt: Date,
    metadata: {
      ipAddress: String,
      userAgent: String,
      deviceInfo: String,
      location: {
        country: String,
        city: String,
        coordinates: {
          lat: Number,
          lng: Number
        }
      }
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

// Set expiration date based on verification type
verificationSchema.pre('save', function(next) {
  if (this.isNew) {
    const expirationDays = {
      'Identity': 30,
      'Phone': 7,
      'Email': 1,
      'Payment': 14,
      'Portfolio': 30,
      'Skills': 90
    };
    
    this.expiresAt = new Date(Date.now() + (expirationDays[this.type] * 24 * 60 * 60 * 1000));
  }
  next();
});

// Add to history when status changes
verificationSchema.pre('save', function(next) {
  if (this.isModified('status') && !this.isNew) {
    this.history.push({
      action: 'Status Changed',
      description: `Status changed to ${this.status}`,
      performedBy: this.reviewer || this.user,
      timestamp: new Date()
    });
  }
  next();
});

// Indexes for efficient querying
verificationSchema.index({ user: 1, type: 1 });
verificationSchema.index({ status: 1, type: 1 });
verificationSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 }); // TTL index

module.exports = mongoose.model("Verification", verificationSchema);
