// src/controllers/resourceRequestController.js
const ResourceRequest = require("../models/ResourceRequest");
const { RESOURCE_REQUEST_STATUSES, USER_ROLES } = require("../utils/constants");

/**
 * Helper to push status change into history.
 */
const addHistoryEntry = (request, status, userId, note) => {
  request.history.push({
    status,
    changedBy: userId,
    note,
    changedAt: new Date(),
  });
};

/**
 * TEACHER
 * POST /api/resource-requests
 * Body: { studentRollNumber, resources: [{ name, quantity, notes }], purpose, dateTime }
 */
const createResourceRequest = async (req, res, next) => {
  try {
    const teacher = req.user;
    const { studentRollNumber, resources, purpose, dateTime } = req.body || {};

    if (!studentRollNumber || !purpose || !dateTime) {
      return res.status(400).json({
        message: "studentRollNumber, purpose and dateTime are required.",
      });
    }

    if (!Array.isArray(resources) || resources.length === 0) {
      return res.status(400).json({
        message: "At least one resource item is required.",
      });
    }

    const date = new Date(dateTime);
    if (isNaN(date.getTime())) {
      return res.status(400).json({ message: "Invalid dateTime." });
    }

    const request = new ResourceRequest({
      requestedByTeacher: teacher._id,
      studentRollNumber,
      resources,
      purpose,
      dateTime: date,
      status: RESOURCE_REQUEST_STATUSES.PENDING,
    });

    addHistoryEntry(
      request,
      RESOURCE_REQUEST_STATUSES.PENDING,
      teacher._id,
      "Resource request created"
    );

    await request.save();

    res
      .status(201)
      .json({ message: "Resource request created", request });
  } catch (error) {
    next(error);
  }
};

/**
 * TEACHER
 * GET /api/resource-requests/my
 * List teacher's own resource requests.
 */
// const getMyResourceRequests = async (req, res, next) => {
//   try {
//     const teacher = req.user;


//     const requests = await ResourceRequest.find({
//       requestedByTeacher: teacher._id,
//     })
//       .sort({ createdAt: -1 })
//       .lean();

//     res.json({ requests });
//   } catch (error) {
//     next(error);
//   }
// };
const getMyResourceRequests = async (req, res, next) => {
  try {
    const teacher = req.user;

    const requests = await ResourceRequest.find({
      requestedByTeacher: teacher._id,
    })
      .populate("handledByServerRoomStaff", "name email")
      .populate("requestedByTeacher", "name email")
      .sort({ createdAt: -1 })
      .lean();

    res.json({ requests });
  } catch (error) {
    next(error);
  }
};
/**
 * SERVER ROOM STAFF
 * GET /api/resource-requests
 * List all requests (for this example, all).
 * You can later filter by building/campus if needed.
 */
const getAllResourceRequestsForServerRoom = async (
  req,
  res,
  next
) => {
  try {
    const requests = await ResourceRequest.find()
      .populate(
        "requestedByTeacher",
        "name email department designation"
      )
      .populate(
        "handledByServerRoomStaff",
        "name email role campusOrBuilding"
      )
      .sort({ createdAt: -1 });

    res.json({ requests });
  } catch (error) {
    next(error);
  }
};

/**
 * SERVER ROOM STAFF
 * PATCH /api/resource-requests/:id/status
 * Body: { status, note }
 * Allowed:
 *  - PENDING -> APPROVED or REJECTED
 *  - APPROVED -> COMPLETED
 */
const updateResourceRequestStatusServerRoom = async (
  req,
  res,
  next
) => {
  try {
    const staff = req.user;
    const { id } = req.params;
    const { status, note } = req.body || {};

    const allowed = Object.values(RESOURCE_REQUEST_STATUSES);
    if (!allowed.includes(status)) {
      return res.status(400).json({
        message:
          "Invalid status. Allowed: PENDING, APPROVED, REJECTED, COMPLETED.",
      });
    }

    const request = await ResourceRequest.findById(id);
    if (!request) {
      return res.status(404).json({ message: "Resource request not found." });
    }

    // Basic transition rules
    if (request.status === RESOURCE_REQUEST_STATUSES.PENDING) {
      if (
        ![RESOURCE_REQUEST_STATUSES.APPROVED, RESOURCE_REQUEST_STATUSES.REJECTED].includes(
          status
        )
      ) {
        return res.status(400).json({
          message:
            "From PENDING, you can only move to APPROVED or REJECTED.",
        });
      }
    } else if (request.status === RESOURCE_REQUEST_STATUSES.APPROVED) {
      if (status !== RESOURCE_REQUEST_STATUSES.COMPLETED) {
        return res.status(400).json({
          message: "From APPROVED, you can only move to COMPLETED.",
        });
      }
    } else {
      // Once REJECTED or COMPLETED, no further changes
      return res.status(400).json({
        message:
          "Status cannot be changed once it is REJECTED or COMPLETED.",
      });
    }

    request.status = status;
    request.handledByServerRoomStaff = staff._id;

    addHistoryEntry(
      request,
      status,
      staff._id,
      note || `Status changed to ${status} by server room staff`
    );

    await request.save();

    res.json({
      message: "Resource request status updated",
      request,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * ADMIN
 * GET /api/resource-requests/all
 * Monitor all requests
 */
const getAllResourceRequestsForAdmin = async (req, res, next) => {
  try {
    const requests = await ResourceRequest.find()
      .populate(
        "requestedByTeacher",
        "name email department designation"
      )
      .populate(
        "handledByServerRoomStaff",
        "name email role campusOrBuilding"
      )
      .sort({ createdAt: -1 });

    res.json({ requests });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createResourceRequest,
  getMyResourceRequests,
  getAllResourceRequestsForServerRoom,
  updateResourceRequestStatusServerRoom,
  getAllResourceRequestsForAdmin,
};