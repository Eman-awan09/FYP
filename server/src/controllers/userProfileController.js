// src/controllers/userProfileController.js
const User = require("../models/User");
const { USER_ROLES } = require("../utils/constants");

exports.getMyProfile = async (req, res) => {
  try {
    const userId = req.user.id;

    const user = await User.findById(userId).select("-passwordHash -__v");

    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    return res.json({ user });
  } catch (error) {
    console.error("Error in getMyProfile:", error);
    return res.status(500).json({ message: "Failed to load profile." });
  }
};

exports.updateMyProfile = async (req, res) => {
  try {
    const userId = req.user.id;
    const role = req.user.role;

    const allowedUpdates = {};

    // Common
    if (typeof req.body.name === "string") {
      const name = req.body.name.trim();
      if (name.length === 0) {
        return res
          .status(400)
          .json({ message: "Name cannot be empty if provided." });
      }
      allowedUpdates.name = name;
    }

    if (typeof req.body.phone === "string") {
      const phone = req.body.phone.trim();
      // very light validation: digits only (optional)
      if (phone && !/^[0-9+\-()\s]+$/.test(phone)) {
        return res.status(400).json({
          message:
            "Phone number can only contain digits, spaces, +, -, and parentheses.",
        });
      }
      allowedUpdates.phone = phone;
    }

    // Role-specific
    switch (role) {
      case USER_ROLES.STUDENT: {
        if (typeof req.body.department === "string") {
          allowedUpdates.department = req.body.department.trim();
        }
        if (typeof req.body.semester === "string") {
          allowedUpdates.semester = req.body.semester.trim();
        }
        break;
      }

      case USER_ROLES.TEACHER: {
        if (typeof req.body.department === "string") {
          allowedUpdates.department = req.body.department.trim();
        }
        if (typeof req.body.designation === "string") {
          allowedUpdates.designation = req.body.designation.trim();
        }
        break;
      }

      case USER_ROLES.SERVICE_PROVIDER:
      case USER_ROLES.SERVER_ROOM_STAFF: {
        if (typeof req.body.specialization === "string") {
          allowedUpdates.specialization = req.body.specialization.trim();
        }
        if (typeof req.body.campusOrBuilding === "string") {
          allowedUpdates.campusOrBuilding =
            req.body.campusOrBuilding.trim();
        }
        break;
      }

      case USER_ROLES.ADMIN:
      default:
        break;
    }

    if (Object.keys(allowedUpdates).length === 0) {
      return res
        .status(400)
        .json({ message: "No valid fields provided to update." });
    }

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { $set: allowedUpdates },
      { new: true, runValidators: true }
    ).select("-passwordHash -__v");

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found." });
    }

    return res.json({
      user: updatedUser,
      message: "Profile updated successfully.",
    });
  } catch (error) {
    console.error("Error in updateMyProfile:", error);
    return res.status(500).json({ message: "Failed to update profile." });
  }
};