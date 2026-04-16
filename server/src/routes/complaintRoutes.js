// src/routes/complaintRoutes.js
const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
const roleMiddleware = require("../middleware/roleMiddleware");
const { USER_ROLES } = require("../utils/constants");
const {
  createComplaint,
  getMyComplaints,
  getMyComplaintById,
  updateMyComplaint,
  deleteMyComplaint,
  getAllComplaints,
  updateComplaintStatusAdmin,
  getAssignedComplaints,
  updateAssignedComplaintStatus,
  assignComplaintToServiceProvider,
  addComplaintAttachmentsBase64
} = require("../controllers/complaintController");

// All complaint routes require auth
router.use(authMiddleware);

// Student & Teacher routes (own complaints)
router.post(
  "/",
  roleMiddleware([USER_ROLES.STUDENT, USER_ROLES.TEACHER]),
  createComplaint
);

router.get(
  "/my",
  roleMiddleware([USER_ROLES.STUDENT, USER_ROLES.TEACHER]),
  getMyComplaints
);

router.get(
  "/my/:id",
  roleMiddleware([USER_ROLES.STUDENT, USER_ROLES.TEACHER]),
  getMyComplaintById
);

router.put(
  "/my/:id",
  roleMiddleware([USER_ROLES.STUDENT, USER_ROLES.TEACHER]),
  updateMyComplaint
);

router.delete(
  "/my/:id",
  roleMiddleware([USER_ROLES.STUDENT, USER_ROLES.TEACHER]),
  deleteMyComplaint
);

// Admin routes: view all, approve/reject
router.get(
  "/",
  roleMiddleware([USER_ROLES.ADMIN]),
  getAllComplaints
);

router.patch(
  "/:id/status",
  roleMiddleware([USER_ROLES.ADMIN]),
  updateComplaintStatusAdmin
);

// NEW: Admin assign complaint to service provider
router.patch(
  "/:id/assign",
  roleMiddleware([USER_ROLES.ADMIN]),
  assignComplaintToServiceProvider
);

// Service Provider: view & update assigned complaints
router.get(
  "/assigned",
  roleMiddleware([USER_ROLES.SERVICE_PROVIDER]),
  getAssignedComplaints
);

router.patch(
  "/assigned/:id/status",
  roleMiddleware([USER_ROLES.SERVICE_PROVIDER]),
  updateAssignedComplaintStatus
);

// Student & Teacher: add base64 attachments to own complaint
router.post(
  "/my/:id/attachments-base64",
  roleMiddleware([USER_ROLES.STUDENT, USER_ROLES.TEACHER]),
  addComplaintAttachmentsBase64
);

module.exports = router;