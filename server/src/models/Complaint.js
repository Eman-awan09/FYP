// src/models/Complaint.js
const mongoose = require("mongoose");
const {
  PRIORITIES,
  COMPLAINT_STATUSES,
} = require("../utils/constants");

const historyEntrySchema = new mongoose.Schema(
  {
    status: {
      type: String,
      enum: Object.values(COMPLAINT_STATUSES),
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

// src/models/Complaint.js
const attachmentSchema = new mongoose.Schema(
  {
    filename: String,
    mimeType: String,
    size: Number,
    data: String, // base64 string (e.g., "data:image/png;base64,....")
  },
  { _id: false }
);

const complaintSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    category: {
      type: String,
      required: true,
      trim: true, // e.g., "IT", "Electrical"
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    creatorRole: {
      type: String,
      required: true,
    },
    priority: {
      type: String,
      enum: Object.values(PRIORITIES),
      default: PRIORITIES.INTERMEDIATE,
    },
    status: {
      type: String,
      enum: Object.values(COMPLAINT_STATUSES),
      default: COMPLAINT_STATUSES.PENDING,
    },
    attachments: [attachmentSchema],
    assignedTo: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // service provider
      default: null,
    },
    locked: {
      type: Boolean,
      default: false,
    },
    history: [historyEntrySchema],
  },
  { timestamps: true }
);

const Complaint = mongoose.model("Complaint", complaintSchema);

module.exports = Complaint;