// src/controllers/departmentChatbotController.js
const {
  DepartmentCalendarEntry,
  CALENDAR_KEYS,
} = require("../models/DepartmentCalendarEntry");
const { USER_ROLES } = require("../utils/constants");

// Map question text to one calendar key
const detectCalendarKeyFromQuestion = (qLower) => {
  if (
    qLower.includes("course offering") ||
    qLower.includes("timetable") ||
    qLower.includes("time table") ||
    qLower.includes("course schedule")
  ) {
    return CALENDAR_KEYS.COURSE_OFFERING_TIMETABLE;
  }

  if (qLower.includes("late enrollment") || qLower.includes("late enrolment")) {
    return CALENDAR_KEYS.LATE_ENROLLMENT;
  }

  if (
    qLower.includes("enrollment") ||
    qLower.includes("enrolment") ||
    qLower.includes("admission") ||
    qLower.includes("register on portal")
  ) {
    return CALENDAR_KEYS.ENROLLMENT;
  }

  if (
    qLower.includes("graduate") &&
    (qLower.includes("commencement") || qLower.includes("start"))
  ) {
    return CALENDAR_KEYS.COMMENCEMENT_GRADUATE;
  }

  if (
    (qLower.includes("undergraduate") ||
      qLower.includes("ug") ||
      qLower.includes("bachelor")) &&
    (qLower.includes("commencement") || qLower.includes("start"))
  ) {
    return CALENDAR_KEYS.COMMENCEMENT_UNDERGRADUATE;
  }

  if (
    (qLower.includes("erp") || qLower.includes("portal")) &&
    (qLower.includes("attendance") ||
      qLower.includes("attendence") ||
      qLower.includes("open"))
  ) {
    return CALENDAR_KEYS.ERP_ATTENDANCE_OPEN;
  }

  return null;
};

/**
 * GET /api/calendar/chat?q=...&department=...
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

    const key = detectCalendarKeyFromQuestion(qLower);

    if (!key) {
      return res.json({
        answer:
          "I could not detect which academic date you are asking about. Please mention words like 'enrollment', 'course offering timetable', 'late enrollment', 'graduate classes', 'undergraduate classes', or 'ERP portal for attendance'.",
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