// // src/models/DepartmentCalendarEntry.js
// const mongoose = require("mongoose");

// const CALENDAR_KEYS = {
//   COURSE_OFFERING_TIMETABLE: "COURSE_OFFERING_TIMETABLE",
//   ENROLLMENT: "ENROLLMENT",
//   LATE_ENROLLMENT: "LATE_ENROLLMENT",
//   COMMENCEMENT_GRADUATE: "COMMENCEMENT_GRADUATE",
//   COMMENCEMENT_UNDERGRADUATE: "COMMENCEMENT_UNDERGRADUATE",
//   ERP_ATTENDANCE_OPEN: "ERP_ATTENDANCE_OPEN",
// };

// const departmentCalendarEntrySchema = new mongoose.Schema(
//   {
//     department: {
//       type: String,
//       required: true, // e.g., "CSE"
//       trim: true,
//       uppercase: true,
//     },
//     key: {
//       type: String,
//       enum: Object.values(CALENDAR_KEYS),
//       required: true,
//     },
//     date: {
//       type: Date,
//       required: true,
//     },
//     note: {
//       type: String,
//       trim: true,
//     },
//   },
//   { timestamps: true }
// );

// // Ensure only one entry per (department, key)
// departmentCalendarEntrySchema.index(
//   { department: 1, key: 1 },
//   { unique: true }
// );

// const DepartmentCalendarEntry = mongoose.model(
//   "DepartmentCalendarEntry",
//   departmentCalendarEntrySchema
// );

// module.exports = { DepartmentCalendarEntry, CALENDAR_KEYS };
const mongoose = require("mongoose");

const CALENDAR_KEYS = {
  COURSE_OFFERING_TIMETABLE: "COURSE_OFFERING_TIMETABLE",
  ENROLLMENT: "ENROLLMENT",
  LATE_ENROLLMENT: "LATE_ENROLLMENT",
  COMMENCEMENT_GRADUATE: "COMMENCEMENT_GRADUATE",
  COMMENCEMENT_UNDERGRADUATE: "COMMENCEMENT_UNDERGRADUATE",
  ERP_ATTENDANCE_OPEN: "ERP_ATTENDANCE_OPEN",

  // NEW ITEMS
  SEMESTER_FREEZE_LAST_DATE: "SEMESTER_FREEZE_LAST_DATE",
  MID_SEMESTER_EXAM: "MID_SEMESTER_EXAM",
  SEMESTER_WITHDRAWAL_LAST_DATE: "SEMESTER_WITHDRAWAL_LAST_DATE",
  END_SEMESTER_EXAMS: "END_SEMESTER_EXAMS",
  RESULT_SUBMISSION_TO_COE: "RESULT_SUBMISSION_TO_COE",
  RESULT_DECLARATION_BY_COE: "RESULT_DECLARATION_BY_COE",
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

    // ✅ NEW: store embedding vector
    embedding: { type: [Number], default: [] },

    // ✅ NEW: human-readable description for embedding
    description: { type: String, default: "" },
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