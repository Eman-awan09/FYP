// src/api/complaintsApi.js
import api from "./axiosInstance";

// Student/Teacher: create complaint
export const createComplaintApi = async (payload) => {
  const res = await api.post("/complaints", payload);
  return res.data;
};

// Student/Teacher: list own complaints
export const fetchMyComplaintsApi = async () => {
  const res = await api.get("/complaints/my");
  return res.data; // { complaints }
};

// Student/Teacher: get own complaint by id
export const fetchMyComplaintByIdApi = async (id) => {
  const res = await api.get(`/complaints/my/${id}`);
  return res.data;
};

// Student/Teacher: update own complaint
export const updateMyComplaintApi = async (id, payload) => {
  const res = await api.put(`/complaints/my/${id}`, payload);
  return res.data;
};

// Student/Teacher: delete own complaint
export const deleteMyComplaintApi = async (id) => {
  const res = await api.delete(`/complaints/my/${id}`);
  return res.data;
};

// Admin: list all complaints
export const fetchAllComplaintsApi = async (params = {}) => {
  const res = await api.get("/complaints", { params });
  return res.data; // { complaints }
};

// Admin: update status (approve/reject)
export const updateComplaintStatusAdminApi = async (id, payload) => {
  const res = await api.patch(`/complaints/${id}/status`, payload);
  return res.data;
};

// Admin: assign complaint to service provider
export const assignComplaintToServiceProviderApi = async (
  complaintId,
  serviceProviderId
) => {
  const res = await api.patch(`/complaints/${complaintId}/assign`, {
    serviceProviderId,
  });
  return res.data;
};

// SERVICE PROVIDER: list assigned complaints
export const fetchAssignedComplaintsApi = async () => {
  const res = await api.get("/complaints/assigned");
  return res.data; // { complaints }
};

// SERVICE PROVIDER: update status of assigned complaint
export const updateAssignedComplaintStatusApi = async (id, payload) => {
  const res = await api.patch(`/complaints/assigned/${id}/status`, payload);
  return res.data;
};

// Upload (append) base64 attachments to a complaint
export const uploadComplaintAttachmentsBase64Api = async (
  complaintId,
  attachments // [{ filename, mimeType, size, data }]
) => {
  const res = await api.post(`/complaints/my/${complaintId}/attachments-base64`, {
    attachments,
  });
  return res.data; // { message, attachments }
};
