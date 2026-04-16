// src/models/User.js
const mongoose = require('mongoose');
const { USER_ROLES } = require('../utils/constants');

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    passwordHash: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: Object.values(USER_ROLES),
      required: true,
    },
    phone: {
      type: String,
      trim: true,
    },
    // Additional profile fields (per role)
    department: {
      type: String,
      trim: true,
    },
    semester: {
      type: String,
      trim: true,
    },
    designation: {
      type: String,
      trim: true,
    },
    campusOrBuilding: {
      type: String,
      trim: true,
    },
    isEmailVerified: {
      type: Boolean,
      default: false,
    },
    // For service providers / server room staff extra
    specialization: {
      type: String,
      trim: true,
    },
    // For soft delete in the future
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

const User = mongoose.model('User', userSchema);

module.exports = User;
