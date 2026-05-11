// controllers/departmentChatbotController.js
const {
  DepartmentCalendarEntry,
  CALENDAR_KEYS,
} = require("../models/DepartmentCalendarEntry");
const { USER_ROLES } = require("../utils/constants");

// Map question text to one calendar key
const detectCalendarKeyFromQuestion = (qLower) => {
  // Course offering / timetable
  if (
    qLower.includes("course offering") ||
    qLower.includes("timetable") ||
    qLower.includes("time table") ||
    qLower.includes("course schedule")
  ) {
    return CALENDAR_KEYS.COURSE_OFFERING_TIMETABLE;
  }

  // Late enrollment
  if (qLower.includes("late enrollment") || qLower.includes("late enrolment")) {
     
    return CALENDAR_KEYS.LATE_ENROLLMENT;
  }

  // Enrollment / admission
  if (
    qLower.includes("enrollment") ||
    qLower.includes("enrolment") ||
    qLower.includes("admission") ||
    qLower.includes("register on portal")
  ) {
    return CALENDAR_KEYS.ENROLLMENT;
  }

  // Graduate commencement
  if (
    qLower.includes("graduate") &&
    (qLower.includes("commencement") || qLower.includes("start"))
  ) {
    console.log(qLower)
    return CALENDAR_KEYS.COMMENCEMENT_GRADUATE;
  }

  // Undergraduate commencement
  if (
    (qLower.includes("undergraduate") ||
      qLower.includes("ug") ||
      qLower.includes("bachelor")) &&
    (qLower.includes("commencement") || qLower.includes("start"))
  ) {
    return CALENDAR_KEYS.COMMENCEMENT_UNDERGRADUATE;
  }

  // ERP attendance open
  if (
    (qLower.includes("erp") || qLower.includes("portal")) &&
    (qLower.includes("attendance") ||
      qLower.includes("attendence") ||
      qLower.includes("open"))
  ) {
    return CALENDAR_KEYS.ERP_ATTENDANCE_OPEN;
  }

  // NEW: Semester Freeze - Last Date
  if (
    (qLower.includes("semester freeze") || qLower.includes("sem freeze")) &&
    (qLower.includes("last date") ||
      qLower.includes("deadline") ||
      qLower.includes("last day"))
  ) {
    return CALENDAR_KEYS.SEMESTER_FREEZE_LAST_DATE;
  }

  // NEW: Mid-Semester Exam
  if (
    qLower.includes("mid semester") ||
    qLower.includes("mid-semester") ||
    qLower.includes("mid sem") ||
    qLower.includes("midterm") ||
    qLower.includes("mid term")
  ) {
    return CALENDAR_KEYS.MID_SEMESTER_EXAM;
  }

  // NEW: Semester Withdrawal - Last Date
  if (
    (qLower.includes("semester withdrawal") ||
      qLower.includes("sem withdrawal") ||
      qLower.includes("withdraw from semester")) &&
    (qLower.includes("last date") ||
      qLower.includes("deadline") ||
      qLower.includes("last day"))
  ) {
    return CALENDAR_KEYS.SEMESTER_WITHDRAWAL_LAST_DATE;
  }

  // NEW: End-Semester Exams
  if (
    qLower.includes("end semester") ||
    qLower.includes("end-semester") ||
    qLower.includes("end sem") ||
    qLower.includes("final exam") ||
    qLower.includes("finals")
  ) {
    return CALENDAR_KEYS.END_SEMESTER_EXAMS;
  }

  // NEW: Result Submission by Depts to COE
  if (
    (qLower.includes("result submission") ||
      qLower.includes("submit results")) &&
    (qLower.includes("coe") ||
      qLower.includes("controller of examination") ||
      qLower.includes("controller of examinations"))
  ) {
    return CALENDAR_KEYS.RESULT_SUBMISSION_TO_COE;
  }

  // NEW: Result Declaration by COE
  if (
    (qLower.includes("result declaration") ||
      qLower.includes("results declaration") ||
      qLower.includes("result announcement") ||
      qLower.includes("results announcement") ||
      qLower.includes("results out") ||
      qLower.includes("when will results") ||
      qLower.includes("when are results")) &&
    (qLower.includes("coe") ||
      qLower.includes("controller of examination") ||
      qLower.includes("controller of examinations"))
  ) {
    return CALENDAR_KEYS.RESULT_DECLARATION_BY_COE;
  }

  return null;
};

/**
 * GET /api/calendar/chat?q=...&department=...
 *
 * Roles: STUDENT, TEACHER, ADMIN
 */
const queryDepartmentCalendarChatbot = async (req, res, next) => {
  try {
    const user = req.user;
    let { q, department } = req.query;

    if (!q || !q.trim()) {
      return res
        .status(400)
        .json({ message: "Query parameter 'q' is required." });
    }

    const qLower = q.trim().toLowerCase();

    // determine department: query param > profile.department > "ALL"
    let dep =
      (department && department.trim().toUpperCase()) ||
      (user.department && user.department.trim().toUpperCase()) ||
      "ALL";
    // consol
    const key = detectCalendarKeyFromQuestion(qLower);

    if (!key) {
      return res.json({
        answer:
          "I could not detect which academic date you are asking about. Please mention words like 'enrollment', 'course offering timetable', 'late enrollment', 'graduate classes', 'undergraduate classes', 'ERP portal for attendance', 'semester freeze', 'mid-semester exam', 'semester withdrawal', 'end-semester exams', 'result submission to COE', or 'result declaration by COE'.",
      });
    }

    // Try exact dep
    let entry = await DepartmentCalendarEntry.findOne({
      department: dep,
      key,
    });

    // Fallback to ALL if not found
    if (!entry && dep !== "ALL") {
      entry = await DepartmentCalendarEntry.findOne({
        department: "ALL",
        key,
      });
    }

    if (!entry) {
      return res.json({
        answer: `No configured date found for this item in department '${dep}'. Please contact administration.`,
      });
    }

    const dateStr = new Date(entry.date).toLocaleDateString();
    let answer = "";

    switch (key) {
      case CALENDAR_KEYS.COURSE_OFFERING_TIMETABLE:
        answer = `For department ${entry.department}, the course offering and timetable are available from ${dateStr}.`;
        break;
      case CALENDAR_KEYS.ENROLLMENT:
        answer = `For department ${entry.department}, enrollment on the student portal is scheduled for ${dateStr}.`;
        break;
      case CALENDAR_KEYS.LATE_ENROLLMENT:
        answer = `For department ${entry.department}, late enrollment on the student portal is allowed until ${dateStr}.`;
        break;
      case CALENDAR_KEYS.COMMENCEMENT_GRADUATE:
        answer = `Graduate classes for department ${entry.department} commence on ${dateStr}.`;
        break;
      case CALENDAR_KEYS.COMMENCEMENT_UNDERGRADUATE:
        answer = `Undergraduate classes for department ${entry.department} commence on ${dateStr}.`;
        break;
      case CALENDAR_KEYS.ERP_ATTENDANCE_OPEN:
        answer = `The ERP portal for attendance for department ${entry.department} opens on ${dateStr}.`;
        break;

      // NEW: Semester Freeze - Last Date
      case CALENDAR_KEYS.SEMESTER_FREEZE_LAST_DATE:
        answer = `For department ${entry.department}, the last date for semester freeze is ${dateStr}.`;
        break;

      // NEW: Mid-Semester Exam
      case CALENDAR_KEYS.MID_SEMESTER_EXAM:
        answer = `For department ${entry.department}, the mid-semester examinations are scheduled on/around ${dateStr}.`;
        break;

      // NEW: Semester Withdrawal - Last Date
      case CALENDAR_KEYS.SEMESTER_WITHDRAWAL_LAST_DATE:
        answer = `For department ${entry.department}, the last date for semester withdrawal is ${dateStr}.`;
        break;

      // NEW: End-Semester Exams
      case CALENDAR_KEYS.END_SEMESTER_EXAMS:
        answer = `For department ${entry.department}, the end-semester examinations are scheduled on/around ${dateStr}.`;
        break;

      // NEW: Result Submission by Depts to COE
      case CALENDAR_KEYS.RESULT_SUBMISSION_TO_COE:
        answer = `For department ${entry.department}, the deadline for result submission to the COE is ${dateStr}.`;
        break;

      // NEW: Result Declaration by COE
      case CALENDAR_KEYS.RESULT_DECLARATION_BY_COE:
        answer = `The COE has scheduled the declaration of results for department ${entry.department} on ${dateStr}.`;
        break;

      default:
        answer = `The date for this academic event is ${dateStr}.`;
    }

    if (entry.note) {
      answer += `\n\nNote: ${entry.note}`;
    }

    return res.json({ answer, key, department: entry.department });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  queryDepartmentCalendarChatbot,
};