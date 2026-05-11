// // src/routes/departmentCalendarRoutes.js
// const express = require("express");
// const router = express.Router();

// const authMiddleware = require("../middleware/authMiddleware");
// const roleMiddleware = require("../middleware/roleMiddleware");
// const { USER_ROLES } = require("../utils/constants");

// const {
//   upsertDepartmentCalendarEntry,
//   listDepartmentCalendarEntries,
//   deleteDepartmentCalendarEntry,
// } = require("../controllers/departmentCalendarController");

// const {
//   queryDepartmentCalendarChatbot,
// } = require("../controllers/departmentChatbotController");

// // Chatbot query – Student, Teacher, Admin
// router.get(
//   "/chat",
//   authMiddleware,
//   roleMiddleware([
//     USER_ROLES.STUDENT,
//     USER_ROLES.TEACHER,
//     USER_ROLES.ADMIN,
//   ]),
//   queryDepartmentCalendarChatbot
// );

// // Admin-only for managing calendar
// router.use(authMiddleware, roleMiddleware([USER_ROLES.ADMIN]));

// router.post("/", upsertDepartmentCalendarEntry);
// router.get("/", listDepartmentCalendarEntries);
// router.delete("/:id", deleteDepartmentCalendarEntry);

// module.exports = router;

// src/routes/departmentCalendarRoutes.js
const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");
const roleMiddleware = require("../middleware/roleMiddleware");
const { USER_ROLES } = require("../utils/constants");

const {
  upsertDepartmentCalendarEntry,
  listDepartmentCalendarEntries,
  deleteDepartmentCalendarEntry,
} = require("../controllers/departmentCalendarController");

const {
  queryDepartmentCalendarChatbot,
} = require("../controllers/departmentChatbotController");

// ✅ ADD THIS — import your new RAG controller
const {
  ragChatbotHandler,
} = require("../controllers/ragChatbotController");

// Old rule-based chat (keep it for now as backup)
router.get(
  "/chat",
  authMiddleware,
  roleMiddleware([USER_ROLES.STUDENT, USER_ROLES.TEACHER, USER_ROLES.ADMIN]),
  queryDepartmentCalendarChatbot
);

// ✅ ADD THIS — new RAG-based chat route
router.get(
  "/rag-chat",
  authMiddleware,
  roleMiddleware([USER_ROLES.STUDENT, USER_ROLES.TEACHER, USER_ROLES.ADMIN]),
  ragChatbotHandler
);

// Admin-only routes
router.use(authMiddleware, roleMiddleware([USER_ROLES.ADMIN]));

router.post("/", upsertDepartmentCalendarEntry);
router.get("/", listDepartmentCalendarEntries);
router.delete("/:id", deleteDepartmentCalendarEntry);

module.exports = router;