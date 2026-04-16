// src/routes/resourceRequestRoutes.js
const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");
const roleMiddleware = require("../middleware/roleMiddleware");
const { USER_ROLES } = require("../utils/constants");

const {
  createResourceRequest,
  getMyResourceRequests,
  getAllResourceRequestsForServerRoom,
  updateResourceRequestStatusServerRoom,
  getAllResourceRequestsForAdmin,
} = require("../controllers/resourceRequestController");

// All routes require auth
router.use(authMiddleware);

// TEACHER routes
router.post(
  "/",
  roleMiddleware([USER_ROLES.TEACHER]),
  createResourceRequest
);

router.get(
  "/my",
  roleMiddleware([USER_ROLES.TEACHER]),
  getMyResourceRequests
);

// SERVER ROOM STAFF routes
router.get(
  "/",
  roleMiddleware([USER_ROLES.SERVER_ROOM_STAFF]),
  getAllResourceRequestsForServerRoom
);

router.patch(
  "/:id/status",
  roleMiddleware([USER_ROLES.SERVER_ROOM_STAFF]),
  updateResourceRequestStatusServerRoom
);

// ADMIN monitoring route
router.get(
  "/all",
  roleMiddleware([USER_ROLES.ADMIN]),
  getAllResourceRequestsForAdmin
);

module.exports = router;