// src/controllers/complaintController.js
const Complaint = require("../models/Complaint");
const User = require("../models/User");
const {
  PRIORITIES,
  COMPLAINT_STATUSES,
  USER_ROLES,
} = require("../utils/constants");

const {
  notifyComplaintCreatorAdminStatus,
  notifyComplaintCreatorAssignment,
  notifyServiceProviderAssignment,
  notifyComplaintCreatorSpStatusChange,
} = require("../utils/complaintEmailHelpers");

/**
 * Helper to push a status change to history.
 */
const addHistoryEntry = (complaint, status, userId, note) => {
  complaint.history.push({
    status,
    changedBy: userId,
    note,
    changedAt: new Date(),
  });
};

/**
 * POST /api/complaints
 * Roles: STUDENT, TEACHER
 * Body: { title, description, category, priority, attachments (optional) }
 */
const createComplaint = async (req, res, next) => {
  try {
    const { title, description, category, priority } = req.body || {};
    const user = req.user;

    if (!title || !description || !category) {
      return res
        .status(400)
        .json({ message: "Title, description and category are required." });
    }

    // Ensure only allowed priorities
    const allowedPriorities = [PRIORITIES.INTERMEDIATE, PRIORITIES.HIGH];
    // teacher MAY use CRITICAL as well
    if (user.role === USER_ROLES.TEACHER) {
      allowedPriorities.push(PRIORITIES.CRITICAL);
    }

    const chosenPriority = priority || PRIORITIES.INTERMEDIATE;
    if (!allowedPriorities.includes(chosenPriority)) {
      return res.status(400).json({ message: "Invalid priority for this role." });
    }

    const complaint = new Complaint({
      title,
      description,
      category,
      createdBy: user._id,
      creatorRole: user.role,
      priority: chosenPriority,
      status: COMPLAINT_STATUSES.PENDING,
      locked: false,
      attachments: [],
    });

    // initial history entry
    addHistoryEntry(
      complaint,
      COMPLAINT_STATUSES.PENDING,
      user._id,
      "Complaint created"
    );

    await complaint.save();

    res.status(201).json({ message: "Complaint created", complaint });
  } catch (error) {
    next(error);
  }
};

/**
 * GET /api/complaints/my
 * Roles: STUDENT, TEACHER
 * Returns list of own complaints.
 */
const getMyComplaints = async (req, res, next) => {
  try {
    const user = req.user;

    const complaints = await Complaint.find({ createdBy: user._id })
      .sort({ createdAt: -1 })
      .lean();

    res.json({ complaints });
  } catch (error) {
    next(error);
  }
};

/**
 * GET /api/complaints/my/:id
 * Roles: STUDENT, TEACHER
 * Get single own complaint by id.
 */
const getMyComplaintById = async (req, res, next) => {
  try {
    const user = req.user;
    const { id } = req.params;

    const complaint = await Complaint.findOne({
      _id: id,
      createdBy: user._id,
    });

    if (!complaint) {
      return res.status(404).json({ message: "Complaint not found." });
    }

    res.json({ complaint });
  } catch (error) {
    next(error);
  }
};

/**
 * PUT /api/complaints/my/:id
 * Roles: STUDENT, TEACHER
 * Update own complaint if not locked and still PENDING.
 * Body: { title, description, category, priority }
 */
const updateMyComplaint = async (req, res, next) => {
  try {
    const user = req.user;
    const { id } = req.params;
    const { title, description, category, priority } = req.body || {};

    const complaint = await Complaint.findOne({
      _id: id,
      createdBy: user._id,
    });

    if (!complaint) {
      return res.status(404).json({ message: "Complaint not found." });
    }

    if (complaint.locked) {
      return res
        .status(400)
        .json({ message: "Complaint is locked and cannot be edited." });
    }

    if (complaint.status !== COMPLAINT_STATUSES.PENDING) {
      return res.status(400).json({
        message: "Complaint can only be edited while status is PENDING.",
      });
    }

    // Validate priority again
    const allowedPriorities = [PRIORITIES.INTERMEDIATE, PRIORITIES.HIGH];
    if (user.role === USER_ROLES.TEACHER) {
      allowedPriorities.push(PRIORITIES.CRITICAL);
    }

    if (priority && !allowedPriorities.includes(priority)) {
      return res.status(400).json({ message: "Invalid priority for this role." });
    }

    if (title !== undefined) complaint.title = title;
    if (description !== undefined) complaint.description = description;
    if (category !== undefined) complaint.category = category;
    if (priority !== undefined) complaint.priority = priority;

    addHistoryEntry(
      complaint,
      complaint.status,
      user._id,
      "Complaint updated by creator"
    );

    await complaint.save();

    res.json({ message: "Complaint updated", complaint });
  } catch (error) {
    next(error);
  }
};

/**
 * DELETE /api/complaints/my/:id
 * Roles: STUDENT, TEACHER
 * Delete own complaint if not locked and still PENDING.
 */
const deleteMyComplaint = async (req, res, next) => {
  try {
    const user = req.user;
    const { id } = req.params;

    const complaint = await Complaint.findOne({
      _id: id,
      createdBy: user._id,
    });

    if (!complaint) {
      return res.status(404).json({ message: "Complaint not found." });
    }

    if (complaint.locked || complaint.status !== COMPLAINT_STATUSES.PENDING) {
      return res.status(400).json({
        message:
          "Complaint can only be deleted while status is PENDING and not locked.",
      });
    }

    await complaint.deleteOne();

    res.json({ message: "Complaint deleted." });
  } catch (error) {
    next(error);
  }
};

/**
 * ADMIN ONLY
 * GET /api/complaints
 * Query: status, priority, creatorRole, department (later)
 */
const getAllComplaints = async (req, res, next) => {
  try {
    const { status, priority, creatorRole } = req.query;
    const filter = {};

    if (status && Object.values(COMPLAINT_STATUSES).includes(status)) {
      filter.status = status;
    }

    if (priority && Object.values(PRIORITIES).includes(priority)) {
      filter.priority = priority;
    }

    if (creatorRole && Object.values(USER_ROLES).includes(creatorRole)) {
      filter.creatorRole = creatorRole;
    }

    const complaints = await Complaint.find(filter)
      .populate("createdBy", "name email role department")
      .populate("assignedTo", "name email role department")
      .sort({ createdAt: -1 });

    res.json({ complaints });
  } catch (error) {
    next(error);
  }
};

/**
 * ADMIN ONLY
 * PATCH /api/complaints/:id/status
 * Body: { status, lock }
 * Used for approve / reject (for now).
 */
const updateComplaintStatusAdmin = async (req, res, next) => {
  try {
    const admin = req.user;
    const { id } = req.params;
    const { status, lock } = req.body || {};

    const allowedStatuses = [
      COMPLAINT_STATUSES.APPROVED,
      COMPLAINT_STATUSES.REJECTED,
    ];

    if (!allowedStatuses.includes(status)) {
      return res.status(400).json({
        message: "Invalid status update. Only APPROVED or REJECTED allowed here.",
      });
    }

    const complaint = await Complaint.findById(id).populate(
      "createdBy",
      "name email role"
    );
    if (!complaint) {
      return res.status(404).json({ message: "Complaint not found." });
    }

    complaint.status = status;

    if (typeof lock === "boolean") {
      complaint.locked = lock;
    }

    addHistoryEntry(
      complaint,
      status,
      admin._id,
      `Status changed to ${status} by admin`
    );

    await complaint.save();

    // Email notification to creator on APPROVED / REJECTED
    try {
      await notifyComplaintCreatorAdminStatus(complaint, status);
    } catch (emailErr) {
      console.error("Error sending admin status email:", emailErr);
    }

    res.json({ message: "Complaint status updated", complaint });
  } catch (error) {
    next(error);
  }
};

// SERVICE PROVIDER: list assigned
const getAssignedComplaints = async (req, res, next) => {
  try {
    const user = req.user;

    const complaints = await Complaint.find({ assignedTo: user._id })
      .populate("createdBy", "name email role department")
      .sort({
        priority: -1,
        createdAt: -1,
      });

    res.json({ complaints });
  } catch (error) {
    next(error);
  }
};

// SERVICE PROVIDER: update assigned complaint status
const updateAssignedComplaintStatus = async (req, res, next) => {
  try {
    const user = req.user;
    const { id } = req.params;
    const { status, note } = req.body || {};

    const allowedStatuses = [
      COMPLAINT_STATUSES.ASSIGNED,
      COMPLAINT_STATUSES.IN_PROGRESS,
      COMPLAINT_STATUSES.RESOLVED,
      COMPLAINT_STATUSES.CLOSED,
    ];

    if (!allowedStatuses.includes(status)) {
      return res.status(400).json({
        message:
          "Invalid status. Allowed: ASSIGNED, IN_PROGRESS, RESOLVED, CLOSED.",
      });
    }

    const complaint = await Complaint.findOne({
      _id: id,
      assignedTo: user._id,
    }).populate("createdBy", "name email role");

    if (!complaint) {
      return res.status(404).json({
        message:
          "Complaint not found or not assigned to the current service provider.",
      });
    }

    // Backend guard: prevent updates after RESOLVED
    if (complaint.status === COMPLAINT_STATUSES.RESOLVED) {
      return res.status(400).json({
        message: "Resolved complaints cannot be updated by service provider.",
      });
    }

    complaint.status = status;

    addHistoryEntry(
      complaint,
      status,
      user._id,
      note || `Status updated to ${status} by service provider`
    );

    await complaint.save();

    // Email notification to creator on SP status change
    try {
      await notifyComplaintCreatorSpStatusChange(complaint, status, note);
    } catch (emailErr) {
      console.error("Error sending SP status email:", emailErr);
    }

    res.json({ message: "Complaint status updated", complaint });
  } catch (error) {
    next(error);
  }
};

/**
 * ADMIN
 * PATCH /api/complaints/:id/assign
 * Body: { serviceProviderId }
 * Assigns complaint to a service provider.
 */
const assignComplaintToServiceProvider = async (req, res, next) => {
  try {
    const admin = req.user;
    const { id } = req.params;
    const { serviceProviderId } = req.body || {};

    if (!serviceProviderId) {
      return res
        .status(400)
        .json({ message: "serviceProviderId is required." });
    }

    // Ensure the assignee is a valid, active service provider
    const sp = await User.findOne({
      _id: serviceProviderId,
      role: USER_ROLES.SERVICE_PROVIDER,
      isActive: true,
    }).select("name email");

    if (!sp) {
      return res
        .status(400)
        .json({ message: "Invalid service provider id." });
    }

    const complaint = await Complaint.findById(id).populate(
      "createdBy",
      "name email role"
    );
    if (!complaint) {
      return res.status(404).json({ message: "Complaint not found." });
    }

    // It’s common to only assign after APPROVED, but we won’t strictly enforce here
    complaint.assignedTo = sp._id;
    complaint.status = COMPLAINT_STATUSES.ASSIGNED;
    addHistoryEntry(
      complaint,
      complaint.status,
      admin._id,
      `Assigned to service provider ${sp.name || sp.email} by admin`
    );
    
    await complaint.save();

    // Email notifications on assignment
    try {
      await notifyComplaintCreatorAssignment(complaint, sp);
      await notifyServiceProviderAssignment(complaint, sp);
    } catch (emailErr) {
      console.error("Error sending assignment emails:", emailErr);
    }

    res.json({ message: "Complaint assigned to service provider", complaint });
  } catch (error) {
    next(error);
  }
};

/**
 * STUDENT/TEACHER
 * POST /api/complaints/my/:id/attachments-base64
 * Body: { attachments: [{ filename, mimeType, size, data }] }
 * Attach base64-encoded files to complaint.
 */
const addComplaintAttachmentsBase64 = async (req, res, next) => {
  try {
    const user = req.user;
    const { id } = req.params;
    const { attachments } = req.body || {};

    if (!Array.isArray(attachments) || attachments.length === 0) {
      return res
        .status(400)
        .json({ message: "At least one attachment is required." });
    }

    const complaint = await Complaint.findOne({
      _id: id,
      createdBy: user._id,
    });

    if (!complaint) {
      return res.status(404).json({ message: "Complaint not found." });
    }
    
    if (complaint.locked || complaint.status !== COMPLAINT_STATUSES.PENDING) {
      return res.status(400).json({
        message:
          "Attachments can only be added while complaint is PENDING and not locked.",
      });
    }

    // Basic validation of base64 strings
    const cleanAttachments = attachments
      .filter(
        (att) =>
          att &&
          typeof att.filename === "string" &&
          typeof att.data === "string" &&
          att.data.startsWith("data:")
      )
      .map((att) => ({
        filename: att.filename,
        mimeType: att.mimeType || null,
        size: att.size || null,
        data: att.data, // full data URL string
      }));

    if (cleanAttachments.length === 0) {
      return res
        .status(400)
        .json({ message: "No valid attachments were provided." });
    }

    complaint.attachments.push(...cleanAttachments);

    addHistoryEntry(
      complaint,
      complaint.status,
      user._id,
      `Added ${cleanAttachments.length} base64 attachment(s)`
    );

    await complaint.save();

    res.status(200).json({
      message: "Attachments added.",
      attachments: complaint.attachments,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
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
  addComplaintAttachmentsBase64,
};