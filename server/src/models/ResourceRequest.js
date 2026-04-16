// src/models/ResourceRequest.js
const mongoose = require("mongoose");
const { RESOURCE_REQUEST_STATUSES } = require("../utils/constants");

const resourceItemSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true }, // e.g., "Projector"
    quantity: { type: Number, default: 1, min: 1 },
    notes: { type: String, trim: true },
  },
  { _id: false }
);

const statusHistorySchema = new mongoose.Schema(
  {
    status: {
      type: String,
      enum: Object.values(RESOURCE_REQUEST_STATUSES),
    },
    changedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    note: {
      type: String,
      trim: true,
    },
    changedAt: {
      type: Date,
      default: Date.now,
    },
  },
  { _id: false }
);

const resourceRequestSchema = new mongoose.Schema(
  {
    requestedByTeacher: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    studentRollNumber: {
      type: String,
      required: true,
      trim: true,
    },
    resources: {
      type: [resourceItemSchema],
      validate: (v) => Array.isArray(v) && v.length > 0,
    },
    purpose: {
      type: String,
      required: true,
      trim: true,
    },
    dateTime: {
      type: Date,
      required: true,
    },
    status: {
      type: String,
      enum: Object.values(RESOURCE_REQUEST_STATUSES),
      default: RESOURCE_REQUEST_STATUSES.PENDING,
    },
    handledByServerRoomStaff: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },
    history: [statusHistorySchema],
  },
  { timestamps: true }
);

const ResourceRequest = mongoose.model(
  "ResourceRequest",
  resourceRequestSchema
);

module.exports = ResourceRequest;