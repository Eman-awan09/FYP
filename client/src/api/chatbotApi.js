// src/api/chatbotApi.js
import api from "./axiosInstance";

// Admin: CRUD entries
export const adminCreateChatbotEntryApi = async (payload) => {
  const res = await api.post("/chatbot/entries", payload);
  return res.data;
};

export const adminListChatbotEntriesApi = async (params = {}) => {
  const res = await api.get("/chatbot/entries", { params });
  return res.data;
};

export const adminUpdateChatbotEntryApi = async (id, payload) => {
  const res = await api.put(`/chatbot/entries/${id}`, payload);
  return res.data;
};

export const adminDeleteChatbotEntryApi = async (id) => {
  const res = await api.delete(`/chatbot/entries/${id}`);
  return res.data;
};

// Student/Teacher/Admin: query
export const queryChatbotApi = async (query, semester) => {
  const params = { q: query };
  if (semester) params.semester = semester;
  const res = await api.get("/chatbot/query", { params });
  return res.data; // { answer, entries }
};