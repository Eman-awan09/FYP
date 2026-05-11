// // // src/controllers/departmentCalendarController.js
// // const {
// //   DepartmentCalendarEntry,
// //   CALENDAR_KEYS,
// // } = require("../models/DepartmentCalendarEntry");
   
// // /**
// //  * ADMIN: create or update a department calendar entry
// //  * POST /api/calendar
// //  * Body: { department, key, date, note }
// //  */  
// // const upsertDepartmentCalendarEntry = async (req, res, next) => {
// //   try {
// //     const { department, key, date, note } = req.body || {};

// //     if (!department || !key || !date) {
// //       return res
// //         .status(400)
// //         .json({ message: "department, key and date are required." });
// //     }

// //     if (!Object.values(CALENDAR_KEYS).includes(key)) {
// //       return res.status(400).json({ message: "Invalid calendar key." });
// //     }

// //     const dep = department.trim().toUpperCase();

// //     const entry = await DepartmentCalendarEntry.findOneAndUpdate(
// //       { department: dep, key },
// //       {
// //         $set: {
// //           department: dep,
// //           key,
// //           date: new Date(date),
// //           note: note || "",
// //         },
// //       },
// //       { new: true, upsert: true }
// //     );

// //     res.json({ message: "Calendar entry saved.", entry });
// //   } catch (error) {
// //     next(error);
// //   }
// // };

// // /**
// //  * ADMIN: list entries with optional department filter
// //  * GET /api/calendar?department=CSE
// //  */
// // const listDepartmentCalendarEntries = async (req, res, next) => {
// //   try {
// //     const { department } = req.query;
// //     const filter = {};
// //     if (department) {
// //       filter.department = department.trim().toUpperCase();
// //     }

// //     const entries = await DepartmentCalendarEntry.find(filter).sort({
// //       department: 1,
// //       key: 1,
// //     });

// //     res.json({ entries });
// //   } catch (error) {
// //     next(error);
// //   }
// // };

// // /**
// //  * ADMIN: delete a specific entry
// //  * DELETE /api/calendar/:id
// //  */
// // const deleteDepartmentCalendarEntry = async (req, res, next) => {
// //   try {
// //     const { id } = req.params;

// //     const entry = await DepartmentCalendarEntry.findById(id);
// //     if (!entry) {
// //       return res.status(404).json({ message: "Calendar entry not found." });
// //     }

// //     await entry.deleteOne();
// //     res.json({ message: "Calendar entry deleted." });
// //   } catch (error) {
// //     next(error);
// //   }
// // };

// // module.exports = {
// //   upsertDepartmentCalendarEntry,
// //   listDepartmentCalendarEntries,
// //   deleteDepartmentCalendarEntry,
// //   CALENDAR_KEYS,
// // };
// //controllers/departmentCalendarController.js
// const {
//   DepartmentCalendarEntry,
//   CALENDAR_KEYS,
// } = require("../models/DepartmentCalendarEntry");

// /**
//  * ADMIN: create or update a department calendar entry
//  *
//  * POST /api/calendar
//  *
//  * Body: { department, key, date, note }
//  */
// const upsertDepartmentCalendarEntry = async (req, res, next) => {
//   try {
//     const { department, key, date, note } = req.body || {};

//     if (!department || !key || !date) {
//       return res
//         .status(400)
//         .json({ message: "department, key and date are required." });
//     }

//     if (!Object.values(CALENDAR_KEYS).includes(key)) {
//       return res.status(400).json({ message: "Invalid calendar key." });
//     }

//     const dep = department.trim().toUpperCase();

//     const entry = await DepartmentCalendarEntry.findOneAndUpdate(
//       { department: dep, key },
//       {
//         $set: {
//           department: dep,
//           key,
//           date: new Date(date),
//           note: note || "",
//         },
//       },
//       { new: true, upsert: true }
//     );

//     res.json({ message: "Calendar entry saved.", entry });
//   } catch (error) {
//     next(error);
//   }
// };

// /**
//  * ADMIN: list entries with optional department filter
//  *
//  * GET /api/calendar?department=CSE
//  */
// const listDepartmentCalendarEntries = async (req, res, next) => {
//   try {
//     const { department } = req.query;
//     const filter = {};
//     if (department) {
//       filter.department = department.trim().toUpperCase();
//     }

//     const entries = await DepartmentCalendarEntry.find(filter).sort({
//       department: 1,
//       key: 1,
//     });

//     res.json({ entries });
//   } catch (error) {
//     next(error);
//   }
// };

// /**
//  * ADMIN: delete a specific entry
//  *
//  * DELETE /api/calendar/:id
//  */
// const deleteDepartmentCalendarEntry = async (req, res, next) => {
//   try {
//     const { id } = req.params;

//     const entry = await DepartmentCalendarEntry.findById(id);
//     if (!entry) {
//       return res.status(404).json({ message: "Calendar entry not found." });
//     }

//     await entry.deleteOne();
//     res.json({ message: "Calendar entry deleted." });
//   } catch (error) {
//     next(error);
//   }
// };

// module.exports = {
//   upsertDepartmentCalendarEntry,
//   listDepartmentCalendarEntries,
//   deleteDepartmentCalendarEntry,
//   CALENDAR_KEYS,
// };

// controllers/departmentCalendarController.js
const {
  DepartmentCalendarEntry,
  CALENDAR_KEYS,
} = require("../models/DepartmentCalendarEntry");
const { generateEmbedding } = require("../services/embeddingService");

const KEY_DESCRIPTIONS = {
  COURSE_OFFERING_TIMETABLE: "course offering timetable schedule classes",
  ENROLLMENT: "enrollment registration student portal admission date",
  LATE_ENROLLMENT: "late enrollment late registration after deadline",
  COMMENCEMENT_GRADUATE: "graduate classes start commencement date",
  COMMENCEMENT_UNDERGRADUATE: "undergraduate bachelor classes start commencement",
  ERP_ATTENDANCE_OPEN: "ERP portal attendance open date system",
  SEMESTER_FREEZE_LAST_DATE: "semester freeze last date lock course registration deadline",
  MID_SEMESTER_EXAM: "mid semester exam midterm examination date",
  SEMESTER_WITHDRAWAL_LAST_DATE: "semester withdrawal last date withdraw from courses deadline",
  END_SEMESTER_EXAMS: "end semester final exams examination date",
  RESULT_SUBMISSION_TO_COE: "result submission controller of examination COE deadline",
  RESULT_DECLARATION_BY_COE: "result declaration announcement COE controller of examinations",
};

const upsertDepartmentCalendarEntry = async (req, res, next) => {
  try {
    const { department, key, date, note } = req.body || {};

    if (!department || !key || !date) {
      return res.status(400).json({ message: "department, key and date are required." });
    }
    if (!Object.values(CALENDAR_KEYS).includes(key)) {
      return res.status(400).json({ message: "Invalid calendar key." });
    }

    const dep = department.trim().toUpperCase();

    // Save entry first
    const entry = await DepartmentCalendarEntry.findOneAndUpdate(
      { department: dep, key },
      { $set: { department: dep, key, date: new Date(date), note: note || "" } },
      { new: true, upsert: true }
    );

    // ✅ Auto-generate embedding for RAG
    try {
      const description = `${KEY_DESCRIPTIONS[key] || key} for ${dep} department. ${note || ""}`;
      const embedding = await generateEmbedding(description);
      await DepartmentCalendarEntry.findByIdAndUpdate(entry._id, { embedding, description });
    } catch (embErr) {
      console.warn("Embedding generation failed (non-critical):", embErr.message);
    }

    res.json({ message: "Calendar entry saved.", entry });
  } catch (error) {
    next(error);
  }
};

const listDepartmentCalendarEntries = async (req, res, next) => {
  try {
    const { department } = req.query;
    const filter = {};
    if (department) filter.department = department.trim().toUpperCase();
    const entries = await DepartmentCalendarEntry.find(filter).sort({ department: 1, key: 1 });
    res.json({ entries });
  } catch (error) {
    next(error);
  }
};

const deleteDepartmentCalendarEntry = async (req, res, next) => {
  try {
    const { id } = req.params;
    const entry = await DepartmentCalendarEntry.findById(id);
    if (!entry) return res.status(404).json({ message: "Calendar entry not found." });
    await entry.deleteOne();
    res.json({ message: "Calendar entry deleted." });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  upsertDepartmentCalendarEntry,
  listDepartmentCalendarEntries,
  deleteDepartmentCalendarEntry,
  CALENDAR_KEYS,
};