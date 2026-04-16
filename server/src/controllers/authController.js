// src/controllers/authController.js
const bcrypt = require('bcrypt');
const User = require('../models/User');
const generateToken = require('../utils/generateToken');
const OtpToken = require("../models/OtpToken");
const sendEmail = require("../utils/sendEmail");
const { USER_ROLES } = require('../utils/constants');

/**
 * POST /api/auth/login
 * Body: { email, password }
 */
const login = async (req, res, next) => {
  try {
    const { email, password } = req.body || {};

    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required.' });
    }

    // const user = await User.findOne({ email: email.toLowerCase(), isActive: true });
    const user = await User.findOne({ email: email.toLowerCase()});
    if (!user) {
      return res.status(401).json({ message: `Invalid email or password ${user.isActive}` });
    }
    if(user.isActive==false){
      return res.status(401).json({ message: `You are blocked by the admin Contact Admin` });
    }

    const isMatch = await bcrypt.compare(password, user.passwordHash);
    if (!isMatch) {
      return res.status(401).json({ message: `Invalid email or password ${user.isActive}` });
    }

    const token = generateToken(user);
    const userSafe = {
      id: user._id,
      email: user.email,
      role: user.role,
      name: user.name,
    };
    res.json({ token, user: userSafe });
  } catch (error) {
    next(error);
  }
};

/**
 * Temporary route to insert first admin manually via code (optional).
 * In production you might use Compass or script.
 */
const createFirstAdmin = async (req, res, next) => {
  try {
    const { email, password, name } = req.body || {};

    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required.' });
    }

    const existing = await User.findOne({ email: email.toLowerCase() });
    if (existing) {
      return res.status(400).json({ message: 'Admin with this email already exists.' });
    }

    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(password, saltRounds);

    const admin = await User.create({
      email: email.toLowerCase(),
      passwordHash,
      name: name || 'Super Admin',
      role: USER_ROLES.ADMIN,
      isEmailVerified: true,
    });

    res.status(201).json({ message: 'Admin created', adminId: admin._id });
  } catch (error) {
    next(error);
  }
};

/**
 * Generate a 6-digit numeric OTP.
 */
const generateOtpCode = () => {
  return String(Math.floor(100000 + Math.random() * 900000));
};

/**
 * POST /api/auth/register
 * For STUDENT and TEACHER self-registration.
 * Body:
 *  - name
 *  - email (must be university email, we can validate by domain)
 *  - password
 *  - role: "STUDENT" or "TEACHER"
 *  - optional: department, semester, designation, phone
 */
const register = async (req, res, next) => {
  try {
    const {
      name,
      email,
      password,
      role,
      department,
      semester,
      designation,
      phone,
    } = req.body || {};

    if (!name || !email || !password || !role) {
      return res
        .status(400)
        .json({ message: "Name, email, password and role are required." });
    }

    if (![USER_ROLES.STUDENT, USER_ROLES.TEACHER].includes(role)) {
      return res
        .status(400)
        .json({ message: "Only STUDENT and TEACHER can self-register." });
    }

    // Example: ensure university domain (adjust as needed)
    const allowedDomain = "@gmail.com"; // change this to your domain
    if (!email.toLowerCase().endsWith(allowedDomain)) {
      return res.status(400).json({
        message: `Only university emails (${allowedDomain}) are allowed.`,
      });
    }

    const existing = await User.findOne({ email: email.toLowerCase() });
    if (existing) {
      return res
        .status(400)
        .json({ message: "User with this email already exists." });
    }

    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(password, saltRounds);

    // Create user as not verified yet
    const user = await User.create({
      name,
      email: email.toLowerCase(),
      passwordHash,
      role,
      phone,
      department,
      semester,
      designation,
      isEmailVerified: false,
    });

    // Generate OTP
    const otp = generateOtpCode();
    const expiresAt = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes

    // Invalidate previous OTPs for this email
    await OtpToken.updateMany(
      { email: email.toLowerCase(), purpose: "REGISTER", used: false },
      { $set: { used: true } }
    );

    await OtpToken.create({
      email: email.toLowerCase(),
      otp,
      purpose: "REGISTER",
      expiresAt,
    });

    // Send email
    const subject = "Your Campus Desk OTP Code";
    const text = `Your OTP code is ${otp}. It is valid for 10 minutes.`;
    const html = `<p>Your OTP code is <strong>${otp}</strong>. It is valid for 10 minutes.</p>`;

    try {
      await sendEmail({ to: email, subject, text, html });
    } catch (emailErr) {
      console.error("Error sending OTP email:", emailErr);
      // If email sending fails, we might want to delete the user and OTP
      await User.findByIdAndDelete(user._id);
      await OtpToken.deleteMany({ email: email.toLowerCase(), purpose: "REGISTER" });

      return res.status(500).json({
        message: "Failed to send OTP email. Please try again later.",
      });
    }

    res.status(201).json({
      message: "User registered. OTP sent to email.",
      userId: user._id,
      email: user.email,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * POST /api/auth/verify-otp
 * Body:
 *  - email
 *  - otp
 */
const verifyOtp = async (req, res, next) => {
  try {
    const { email, otp } = req.body || {};

    if (!email || !otp) {
      return res.status(400).json({ message: "Email and OTP are required." });
    }

    const otpDoc = await OtpToken.findOne({
      email: email.toLowerCase(),
      otp,
      purpose: "REGISTER",
      used: false,
      expiresAt: { $gt: new Date() },
    });

    if (!otpDoc) {
      return res.status(400).json({
        message: "Invalid or expired OTP. Please request a new one.",
      });
    }

    // Mark OTP as used
    otpDoc.used = true;
    await otpDoc.save();

    // Mark user as verified
    const user = await User.findOne({ email: email.toLowerCase() });
    if (!user) {
      return res.status(404).json({ message: "User not found for this email." });
    }

    user.isEmailVerified = true;
    await user.save();

    // Auto-login after verification (optional but user-friendly)
    const token = generateToken(user);
    const safeUser = {
      id: user._id,
      email: user.email,
      role: user.role,
      name: user.name,
    };

    res.json({
      message: "Email verified successfully.",
      token,
      user: safeUser,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  login,
  createFirstAdmin,
  register,
  verifyOtp,
};