// src/api/authApi.js
import api from "./axiosInstance";

export const loginApi = async (email, password) => {
  const res = await api.post("/auth/login", { email, password });
  return res.data; // { token, user }
};

export const registerApi = async (payload) => {
  const res = await api.post("/auth/register", payload);
  return res.data; // { message, userId, email }
};

export const verifyOtpApi = async (email, otp) => {
  const res = await api.post("/auth/verify-otp", { email, otp });
  return res.data; // { message, token, user }
};