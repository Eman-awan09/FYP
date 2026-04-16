// src/utils/complaintEmailHelpers.js
const sendEmail = require("./sendEmail");

/**
 * Email creator when admin approves / rejects.
 */
const notifyComplaintCreatorAdminStatus = async (complaint, newStatus) => {
  const user = complaint.createdBy;
  if (!user || !user.email) return;

  const subject = `Your complaint "${complaint.title}" is ${newStatus}`;
  const text = `Dear ${user.name || "User"},

Your complaint titled "${complaint.title}" has been ${newStatus.toLowerCase()} by the admin.

Current status: ${newStatus}

Thank you,
Campus Desk`;

  await sendEmail({ to: user.email, subject, text });
};

/**
 * Email creator when a complaint is assigned / reassigned to SP.
 */
const notifyComplaintCreatorAssignment = async (complaint, serviceProvider) => {
  const user = complaint.createdBy;
  if (!user || !user.email) return;

  const subject = `Your complaint "${complaint.title}" has been assigned`;
  const text = `Dear ${user.name || "User"},

Your complaint titled "${complaint.title}" has been assigned to:

${serviceProvider.name || serviceProvider.email}

They will work on your issue as soon as possible.

Thank you,
Campus Desk`;

  await sendEmail({ to: user.email, subject, text });
};

/**
 * Email service provider on new assignment.
 */
const notifyServiceProviderAssignment = async (complaint, serviceProvider) => {
  if (!serviceProvider || !serviceProvider.email) return;

  const subject = `New complaint assigned: "${complaint.title}"`;
  const text = `Dear ${serviceProvider.name || "Service Provider"},

A new complaint has been assigned to you.

Title: ${complaint.title}
From: ${
    complaint.createdBy?.name ||
    complaint.createdBy?.email ||
    "User"
  }
Priority: ${complaint.priority}
Category: ${complaint.category}
Current status: ${complaint.status}

Please log in to the service provider panel to view and work on this complaint.

Thank you,
Campus Desk`;

  await sendEmail({ to: serviceProvider.email, subject, text });
};

/**
 * Email creator when service provider changes status.
 */
const notifyComplaintCreatorSpStatusChange = async (
  complaint,
  newStatus,
  note
) => {
  const user = complaint.createdBy;
  if (!user || !user.email) return;

  const subject = `Complaint "${complaint.title}" status updated to ${newStatus}`;
  const noteText = note ? `\nService provider note: ${note}` : "";

  const text = `Dear ${user.name || "User"},

The status of your complaint titled "${complaint.title}" has been updated by the service provider.

New status: ${newStatus}${noteText}

Thank you,
Campus Desk`;

  await sendEmail({ to: user.email, subject, text });
};

module.exports = {
  notifyComplaintCreatorAdminStatus,
  notifyComplaintCreatorAssignment,
  notifyServiceProviderAssignment,
  notifyComplaintCreatorSpStatusChange,
};