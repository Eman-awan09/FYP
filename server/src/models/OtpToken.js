// src/models/OtpToken.js
const mongoose = require("mongoose");

/**
 * Stores OTP codes for email verification.
 * One active OTP per email at a time.
 */
const otpTokenSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
    },
    otp: {
      type: String,
      required: true,
    },
    purpose: {
      type: String,
      enum: ["REGISTER"],
      default: "REGISTER",
    },
    expiresAt: {
      type: Date,
      required: true,
    },
    used: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

// Optional index to auto-delete expired documents (TTL)
otpTokenSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

const OtpToken = mongoose.model("OtpToken", otpTokenSchema);

module.exports = OtpToken;