// src/routes/eventRoutes.js
const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
const roleMiddleware = require("../middleware/roleMiddleware");
const { USER_ROLES } = require("../utils/constants");

const {
  createEvent,
  getAllEventsAdmin,
  getPublicEvents,
  getEventByIdAdmin,
  updateEvent,
  deleteEvent,
} = require("../controllers/eventController");

// PUBLIC/ANY AUTHENTICATED (for our app, all users are auth):
// but your requirement is: Student, Teacher, Admin can view events
// We can protect with auth and allow roles [STUDENT, TEACHER, ADMIN]
router.get(
  "/",
  authMiddleware,
  roleMiddleware([
    USER_ROLES.STUDENT,
    USER_ROLES.TEACHER,
    USER_ROLES.ADMIN,
  ]),
  getPublicEvents
);

// ADMIN ONLY
router.use(authMiddleware, roleMiddleware([USER_ROLES.ADMIN]));

router.post("/", createEvent);
router.get("/admin", getAllEventsAdmin);
router.get("/:id", getEventByIdAdmin);
router.put("/:id", updateEvent);
router.delete("/:id", deleteEvent);

module.exports = router;