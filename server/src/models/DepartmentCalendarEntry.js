// src/models/DepartmentCalendarEntry.js
const mongoose = require("mongoose");

const CALENDAR_KEYS = {
  COURSE_OFFERING_TIMETABLE: "COURSE_OFFERING_TIMETABLE",
  ENROLLMENT: "ENROLLMENT",
  LATE_ENROLLMENT: "LATE_ENROLLMENT",
  COMMENCEMENT_GRADUATE: "COMMENCEMENT_GRADUATE",
  COMMENCEMENT_UNDERGRADUATE: "COMMENCEMENT_UNDERGRADUATE",
  ERP_ATTENDANCE_OPEN: "ERP_ATTENDANCE_OPEN",
};

const departmentCalendarEntrySchema = new mongoose.Schema(
  {
    department: {
      type: String,
      required: true, // e.g., "CSE"
      trim: true,
      uppercase: true,
    },
    key: {
      type: String,
      enum: Object.values(CALENDAR_KEYS),
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
    note: {
      type: String,
      trim: true,
    },
  },
  { timestamps: true }
);

// Ensure only one entry per (department, key)
departmentCalendarEntrySchema.index(
  { department: 1, key: 1 },
  { unique: true }
);

const DepartmentCalendarEntry = mongoose.model(
  "DepartmentCalendarEntry",
  departmentCalendarEntrySchema
);

module.exports = { DepartmentCalendarEntry, CALENDAR_KEYS };