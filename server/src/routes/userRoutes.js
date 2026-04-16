// // src/routes/userRoutes.js
// const express = require("express");
// const router = express.Router();
// const authMiddleware = require("../middleware/authMiddleware");
// const roleMiddleware = require("../middleware/roleMiddleware");
// const { USER_ROLES } = require("../utils/constants");

// const {
//   getUsers,
//   createUser,
//   getUserById,
//   updateUser,
//   deleteUser,
//   hardDeleteUser
// } = require("../controllers/userController");

// const {
//   getMyProfile,
//   updateMyProfile,
// } = require("../controllers/userProfileController");

// /**
//  * 1) Profile routes for any authenticated user
//  *    - must be defined BEFORE admin-only `/:id` route
//  *    - and must NOT be wrapped in admin role middleware
//  */

// // GET current user's profile
// router.get("/me", authMiddleware, getMyProfile);

// // UPDATE current user's profile
// router.put("/me", authMiddleware, updateMyProfile);

// /**
//  * 2) Admin-only user management routes
//  *    Apply auth + admin role guard BELOW
//  */
// router.use(authMiddleware, roleMiddleware([USER_ROLES.ADMIN]));

// // GET /api/users
// router.get("/", getUsers);

// // POST /api/users
// router.post("/", createUser);

// // GET /api/users/:id
// router.get("/:id", getUserById);

// // PUT /api/users/:id
// router.put("/:id", updateUser);

// // DELETE /api/users/:id        -> soft delete (block)
// router.delete("/:id", deleteUser);

// // DELETE /api/users/:id/hard   -> hard delete from DB
// router.delete("/:id/hard", hardDeleteUser);

// module.exports = router;

// src/routes/userRoutes.js
const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
const roleMiddleware = require("../middleware/roleMiddleware");
const { USER_ROLES } = require("../utils/constants");

const {
  getUsers,
  createUser,
  getUserById,
  updateUser,
  deleteUser,
  hardDeleteUser,
  getServiceProvidersPublic, // NEW
} = require("../controllers/userController");

const {
  getMyProfile,
  updateMyProfile,
} = require("../controllers/userProfileController");

/**
 * 1) Profile routes for any authenticated user
 *    - must be defined BEFORE admin-only `/:id` route
 *    - and must NOT be wrapped in admin role middleware
 */

// GET current user's profile
router.get("/me", authMiddleware, getMyProfile);

// UPDATE current user's profile
router.put("/me", authMiddleware, updateMyProfile);

/**
 * 2) Service provider directory accessible to TEACHER (and ADMIN if needed)
 *    - read-only list of service providers
 *    - not admin-only
 */
router.get(
  "/service-providers",
  authMiddleware,
  roleMiddleware([USER_ROLES.TEACHER, USER_ROLES.ADMIN]),
  getServiceProvidersPublic
);

/**
 * 3) Admin-only user management routes
 *    Apply auth + admin role guard BELOW
 */
router.use(authMiddleware, roleMiddleware([USER_ROLES.ADMIN]));

// GET /api/users
router.get("/", getUsers);

// POST /api/users
router.post("/", createUser);

// GET /api/users/:id
router.get("/:id", getUserById);

// PUT /api/users/:id
router.put("/:id", updateUser);

// DELETE /api/users/:id        -> soft delete (block)
router.delete("/:id", deleteUser);

// DELETE /api/users/:id/hard   -> hard delete from DB
router.delete("/:id/hard", hardDeleteUser);

module.exports = router;