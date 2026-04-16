// src/controllers/departmentCalendarController.js
const {
  DepartmentCalendarEntry,
  CALENDAR_KEYS,
} = require("../models/DepartmentCalendarEntry");

/**
 * ADMIN: create or update a department calendar entry
 * POST /api/calendar
 * Body: { department, key, date, note }
 */
const upsertDepartmentCalendarEntry = async (req, res, next) => {
  try {
    const { department, key, date, note } = req.body || {};

    if (!department || !key || !date) {
      return res
        .status(400)
        .json({ message: "department, key and date are required." });
    }

    if (!Object.values(CALENDAR_KEYS).includes(key)) {
      return res.status(400).json({ message: "Invalid calendar key." });
    }

    const dep = department.trim().toUpperCase();

    const entry = await DepartmentCalendarEntry.findOneAndUpdate(
      { department: dep, key },
      {
        $set: {
          department: dep,
          key,
          date: new Date(date),
          note: note || "",
        },
      },
      { new: true, upsert: true }
    );

    res.json({ message: "Calendar entry saved.", entry });
  } catch (error) {
    next(error);
  }
};

/**
 * ADMIN: list entries with optional department filter
 * GET /api/calendar?department=CSE
 */
const listDepartmentCalendarEntries = async (req, res, next) => {
  try {
    const { department } = req.query;
    const filter = {};
    if (department) {
      filter.department = department.trim().toUpperCase();
    }

    const entries = await DepartmentCalendarEntry.find(filter).sort({
      department: 1,
      key: 1,
    });

    res.json({ entries });
  } catch (error) {
    next(error);
  }
};

/**
 * ADMIN: delete a specific entry
 * DELETE /api/calendar/:id
 */
const deleteDepartmentCalendarEntry = async (req, res, next) => {
  try {
    const { id } = req.params;

    const entry = await DepartmentCalendarEntry.findById(id);
    if (!entry) {
      return res.status(404).json({ message: "Calendar entry not found." });
    }

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