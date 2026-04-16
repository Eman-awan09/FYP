// src/api/resourceRequestsApi.js
import api from "./axiosInstance";

// TEACHER: create resource request
export const createResourceRequestApi = async (payload) => {
  const res = await api.post("/resource-requests", payload);
  return res.data; // { message, request }
};

// TEACHER: list own resource requests
export const fetchMyResourceRequestsApi = async () => {
  const res = await api.get("/resource-requests/my");
  return res.data; // { requests }
};

// SERVER ROOM: list all relevant requests
export const fetchServerRoomResourceRequestsApi = async () => {
  const res = await api.get("/resource-requests");
  return res.data; // { requests }
};

// SERVER ROOM: update status (approve/reject/complete)
export const updateServerRoomResourceRequestStatusApi = async (
  id,
  payload
) => {
  const res = await api.patch(`/resource-requests/${id}/status`, payload);
  return res.data; // { message, request }
};

// ADMIN: monitor all requests
export const fetchAllResourceRequestsForAdminApi = async () => {
  const res = await api.get("/resource-requests/all");
  return res.data; // { requests }
};