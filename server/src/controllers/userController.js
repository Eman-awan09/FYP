// // src/controllers/userController.js
// const bcrypt = require("bcrypt");
// const User = require("../models/User");
// const { USER_ROLES } = require("../utils/constants");

// /**
//  * GET /api/users
//  * Admin: list all users with filters (optional).
//  * Query params:
//  *  - role (optional)
//  *  - search (optional: matches name/email)
//  */
// const getUsers = async (req, res, next) => {
//   try {
//     const { role, search } = req.query;
//     const filter = {};

//     if (role && Object.values(USER_ROLES).includes(role)) {
//       filter.role = role;
//     }

//     if (search) {
//       // basic search in name or email
//       filter.$or = [
//         { name: { $regex: search, $options: "i" } },
//         { email: { $regex: search, $options: "i" } },
//       ];
//     }

//     // Exclude passwordHash from the result
//     const users = await User.find(filter).select("-passwordHash");

//     res.json({ users });
//   } catch (error) {
//     next(error);
//   }
// };

// /**
//  * POST /api/users
//  * Admin: create a user.
//  * For now we'll support creation of:
//  *  - SERVICE_PROVIDER
//  *  - SERVER_ROOM_STAFF
//  *  - (optionally) TEACHER, STUDENT, ADMIN
//  * Body:
//  *  - name, email, password, role, phone, department, etc.
//  */
// const createUser = async (req, res, next) => {
//   try {
//     const {
//       name,
//       email,
//       password,
//       role,
//       phone,
//       department,
//       specialization,
//       campusOrBuilding,
//       designation,
//       semester,
//     } = req.body || {};

//     // Basic validations
//     if (!email || !password || !role) {
//       return res
//         .status(400)
//         .json({ message: "Email, password, and role are required." });
//     }

//     if (!Object.values(USER_ROLES).includes(role)) {
//       return res.status(400).json({ message: "Invalid role specified." });
//     }

//     // Only admin is allowed here (already enforced by route middleware),
//     // but we can add additional sanity checks if needed.

//     const existing = await User.findOne({ email: email.toLowerCase() });
//     if (existing) {
//       return res
//         .status(400)
//         .json({ message: "User with this email already exists." });
//     }

//     const saltRounds = 10;
//     const passwordHash = await bcrypt.hash(password, saltRounds);

//     const user = await User.create({
//       name,
//       email: email.toLowerCase(),
//       passwordHash,
//       role,
//       phone,
//       department,
//       specialization,
//       campusOrBuilding,
//       designation,
//       semester,
//       // Because admin created this official user, mark email as verified.
//       isEmailVerified: true,
//     });

//     const safeUser = {
//       id: user._id,
//       name: user.name,
//       email: user.email,
//       role: user.role,
//       phone: user.phone,
//       department: user.department,
//       specialization: user.specialization,
//       campusOrBuilding: user.campusOrBuilding,
//       designation: user.designation,
//       semester: user.semester,
//       isActive: user.isActive,
//     };

//     res.status(201).json({ message: "User created", user: safeUser });
//   } catch (error) {
//     next(error);
//   }
// };

// /**
//  * GET /api/users/:id
//  * Admin: get user by id.
//  */
// const getUserById = async (req, res, next) => {
//   try {
//     const { id } = req.params;

//     const user = await User.findById(id).select("-passwordHash");
//     if (!user) {
//       return res.status(404).json({ message: "User not found." });
//     }

//     res.json({ user });
//   } catch (error) {
//     next(error);
//   }
// };

// /**
//  * PUT /api/users/:id
//  * Admin: update user (except password; separate endpoint if needed).
//  */
// const updateUser = async (req, res, next) => {
//   try {
//     const { id } = req.params;

//     // We don't allow role change via this basic endpoint for safety (optional decision)
//     const {
//       name,
//       phone,
//       department,
//       specialization,
//       campusOrBuilding,
//       designation,
//       semester,
//       isActive,
//     } = req.body || {};

//     const user = await User.findById(id);
//     if (!user) {
//       return res.status(404).json({ message: "User not found." });
//     }

//     // Update allowed fields only
//     if (name !== undefined) user.name = name;
//     if (phone !== undefined) user.phone = phone;
//     if (department !== undefined) user.department = department;
//     if (specialization !== undefined) user.specialization = specialization;
//     if (campusOrBuilding !== undefined) user.campusOrBuilding = campusOrBuilding;
//     if (designation !== undefined) user.designation = designation;
//     if (semester !== undefined) user.semester = semester;
//     if (typeof isActive === "boolean") user.isActive = isActive;

//     await user.save();

//     const safeUser = {
//       id: user._id,
//       name: user.name,
//       email: user.email,
//       role: user.role,
//       phone: user.phone,
//       department: user.department,
//       specialization: user.specialization,
//       campusOrBuilding: user.campusOrBuilding,
//       designation: user.designation,
//       semester: user.semester,
//       isActive: user.isActive,
//     };

//     res.json({ message: "User updated", user: safeUser });
//   } catch (error) {
//     next(error);
//   }
// };

// /**
//  * DELETE /api/users/:id
//  * Admin: soft delete (set isActive=false) instead of real delete.
//  */
// const deleteUser = async (req, res, next) => {
//   try {
//     const { id } = req.params;

//     const user = await User.findById(id);
//     if (!user) {
//       return res.status(404).json({ message: "User not found." });
//     }

//     user.isActive = false;
//     await user.save();

//     res.json({ message: "User deactivated (soft delete)." });
//   } catch (error) {
//     next(error);
//   }
// };

// /**
//  * DELETE /api/users/:id/hard
//  * Admin: permanently delete a user from DB.
//  * Use with care.
//  */
// const hardDeleteUser = async (req, res, next) => {
//   try {
//     const { id } = req.params;

//     const user = await User.findById(id);
//     if (!user) {
//       return res.status(404).json({ message: "User not found." });
//     }

//     // Optional safety: prevent hard delete of admins
//     if (user.role === USER_ROLES.ADMIN) {
//       return res
//         .status(400)
//         .json({ message: "Admin users cannot be hard-deleted." });
//     }

//     await User.deleteOne({ _id: id });

//     return res.json({ message: "User permanently deleted." });
//   } catch (error) {
//     next(error);
//   }
// };

// module.exports = {
//   getUsers,
//   createUser,
//   getUserById,
//   updateUser,
//   deleteUser,      // soft delete (block)
//   hardDeleteUser,  // hard delete
// };

// src/controllers/userController.js
const bcrypt = require("bcrypt");
const User = require("../models/User");
const { USER_ROLES } = require("../utils/constants");

/**
 * GET /api/users
 * Admin: list all users with filters (optional).
 * Query params:
 *  - role (optional)
 *  - search (optional: matches name/email)
 */
const getUsers = async (req, res, next) => {
  try {
    const { role, search } = req.query;
    const filter = {};

    if (role && Object.values(USER_ROLES).includes(role)) {
      filter.role = role;
    }

    if (search) {
      // basic search in name or email
      filter.$or = [
        { name: { $regex: search, $options: "i" } },
        { email: { $regex: search, $options: "i" } },
      ];
    }

    // Exclude passwordHash from the result
    const users = await User.find(filter).select("-passwordHash");

    res.json({ users });
  } catch (error) {
    next(error);
  }
};

/**
 * GET /api/users/service-providers
 * Roles: TEACHER (and ADMIN if you want)
 * Read-only list of service providers.
 */
const getServiceProvidersPublic = async (req, res, next) => {
  try {
    const filter = {
      role: USER_ROLES.SERVICE_PROVIDER,
      isActive: true,
    };

    const users = await User.find(filter).select(
      "-passwordHash -__v"
    );

    res.json({ users });
  } catch (error) {
    next(error);
  }
};

/**
 * POST /api/users
 * Admin: create a user.
 * For now we'll support creation of:
 *  - SERVICE_PROVIDER
 *  - SERVER_ROOM_STAFF
 *  - (optionally) TEACHER, STUDENT, ADMIN
 * Body:
 *  - name, email, password, role, phone, department, etc.
 */
const createUser = async (req, res, next) => {
  try {
    const {
      name,
      email,
      password,
      role,
      phone,
      department,
      specialization,
      campusOrBuilding,
      designation,
      semester,
      officeLocation, // NEW
    } = req.body || {};

    // Basic validations
    if (!email || !password || !role) {
      return res
        .status(400)
        .json({ message: "Email, password, and role are required." });
    }

    if (!Object.values(USER_ROLES).includes(role)) {
      return res.status(400).json({ message: "Invalid role specified." });
    }

    const existing = await User.findOne({ email: email.toLowerCase() });
    if (existing) {
      return res
        .status(400)
        .json({ message: "User with this email already exists." });
    }

    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(password, saltRounds);

    const user = await User.create({
      name,
      email: email.toLowerCase(),
      passwordHash,
      role,
      phone,
      department,
      specialization,
      campusOrBuilding,
      designation,
      semester,
      officeLocation, // NEW
      // Because admin created this official user, mark email as verified.
      isEmailVerified: true,
    });

    const safeUser = {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      phone: user.phone,
      department: user.department,
      specialization: user.specialization,
      campusOrBuilding: user.campusOrBuilding,
      designation: user.designation,
      semester: user.semester,
      officeLocation: user.officeLocation, // NEW
      isActive: user.isActive,
    };

    res.status(201).json({ message: "User created", user: safeUser });
  } catch (error) {
    next(error);
  }
};

/**
 * GET /api/users/:id
 * Admin: get user by id.
 */
const getUserById = async (req, res, next) => {
  try {
    const { id } = req.params;

    const user = await User.findById(id).select("-passwordHash");
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    res.json({ user });
  } catch (error) {
    next(error);
  }
};

/**
 * PUT /api/users/:id
 * Admin: update user (except password; separate endpoint if needed).
 */
const updateUser = async (req, res, next) => {
  try {
    const { id } = req.params;

    // We don't allow role change via this basic endpoint for safety (optional decision)
    const {
      name,
      phone,
      department,
      specialization,
      campusOrBuilding,
      designation,
      semester,
      isActive,
      officeLocation, // NEW
    } = req.body || {};

    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    // Update allowed fields only
    if (name !== undefined) user.name = name;
    if (phone !== undefined) user.phone = phone;
    if (department !== undefined) user.department = department;
    if (specialization !== undefined) user.specialization = specialization;
    if (campusOrBuilding !== undefined)
      user.campusOrBuilding = campusOrBuilding;
    if (designation !== undefined) user.designation = designation;
    if (semester !== undefined) user.semester = semester;
    if (officeLocation !== undefined) user.officeLocation = officeLocation; // NEW
    if (typeof isActive === "boolean") user.isActive = isActive;

    await user.save();

    const safeUser = {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      phone: user.phone,
      department: user.department,
      specialization: user.specialization,
      campusOrBuilding: user.campusOrBuilding,
      designation: user.designation,
      semester: user.semester,
      officeLocation: user.officeLocation, // NEW
      isActive: user.isActive,
    };

    res.json({ message: "User updated", user: safeUser });
  } catch (error) {
    next(error);
  }
};

/**
 * DELETE /api/users/:id
 * Admin: soft delete (set isActive=false) instead of real delete.
 */
const deleteUser = async (req, res, next) => {
  try {
    const { id } = req.params;

    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    user.isActive = false;
    await user.save();

    res.json({ message: "User deactivated (soft delete)." });
  } catch (error) {
    next(error);
  }
};

/**
 * DELETE /api/users/:id/hard
 * Admin: permanently delete a user from DB.
 * Use with care.
 */
const hardDeleteUser = async (req, res, next) => {
  try {
    const { id } = req.params;

    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    // Optional safety: prevent hard delete of admins
    if (user.role === USER_ROLES.ADMIN) {
      return res
        .status(400)
        .json({ message: "Admin users cannot be hard-deleted." });
    }

    await User.deleteOne({ _id: id });

    return res.json({ message: "User permanently deleted." });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getUsers,
  createUser,
  getUserById,
  updateUser,
  deleteUser, // soft delete (block)
  hardDeleteUser, // hard delete
  getServiceProvidersPublic,
};