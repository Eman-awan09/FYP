// src/api/usersApi.js
import api from "./axiosInstance";

/**
 * Fetch list of users (admin only).
 * Params: { role, search }
 */
export const fetchUsersApi = async (params = {}) => {
  const res = await api.get("/users", { params });
  return res.data; // { users }
};

/**
 * Create user (admin only).
 * body includes: { name, email, password, role, phone, department, ... }
 */
export const createUserApi = async (payload) => {
  const res = await api.post("/users", payload);
  return res.data; // { message, user }
};

// Fetch ONLY service providers (for assignment options)
export const fetchServiceProvidersApi = async () => {
  const res = await api.get("/users", {
    params: { role: "SERVICE_PROVIDER" },
  });
  return res.data; // { users }
};

/**
 * CURRENT USER PROFILE (all roles)
 */
export const getMyProfileApi = async () => {
  const res = await api.get("/users/me");   // <-- use api, not axios
  return res.data;
};

export const updateMyProfileApi = async (payload) => {
  const res = await api.put("/users/me", payload); // <-- use api, not axios
  return res.data;
};

// NEW: update user (for toggling isActive)
export const updateUserApi = async (userId, payload) => {
  const res = await api.put(`/users/${userId}`, payload);
  return res.data;
};

/**
 * Delete user (admin only).
 * Soft delete if backend uses isActive flag.
 */

export const deleteUserApi = async (userId) => {
  const res = await api.delete(`/users/${userId}`); // soft delete (block)
  return res.data;
};

export const hardDeleteUserApi = async (userId) => {
  const res = await api.delete(`/users/${userId}/hard`); // hard delete
  return res.data;
};

// NEW: teacher-safe SP list (no admin privileges needed)
export const fetchServiceProvidersForTeacherApi = async () => {
  const res = await api.get("/users/service-providers");
  return res.data; // { users }
};