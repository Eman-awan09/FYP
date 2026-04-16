// src/routes/authRoutes.js
const express = require("express");
const router = express.Router();
const {
  login,
  createFirstAdmin,
  register,
  verifyOtp,
} = require("../controllers/authController");

// Login route (shared for all roles)
router.post("/login", login);

// Registration (students & teachers)
router.post("/register", register);

// OTP verification
router.post("/verify-otp", verifyOtp);

// Only for first admin
router.post("/create-first-admin", createFirstAdmin);

module.exports = router;