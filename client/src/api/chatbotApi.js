// // src/api/chatbotApi.js
// import api from "./axiosInstance";

// // Admin: CRUD entries
// export const adminCreateChatbotEntryApi = async (payload) => {
//   const res = await api.post("/chatbot/entries", payload);
//   return res.data;
// };

// export const adminListChatbotEntriesApi = async (params = {}) => {
//   const res = await api.get("/chatbot/entries", { params });
//   return res.data;
// };

// export const adminUpdateChatbotEntryApi = async (id, payload) => {
//   const res = await api.put(`/chatbot/entries/${id}`, payload);
//   return res.data;
// };

// export const adminDeleteChatbotEntryApi = async (id) => {
//   const res = await api.delete(`/chatbot/entries/${id}`);
//   return res.data;
// };

// // Student/Teacher/Admin: query
// export const queryChatbotApi = async (query, semester) => {
//   const params = { q: query };
//   if (semester) params.semester = semester;
//   const res = await api.get("/chatbot/query", { params });
//   return res.data; // { answer, entries }
// };



// src/api/chatbotApi.js
 
// import api from "./axiosInstance";
 
// /**
//  * RAG-based chatbot query
//  * Calls /api/calendar/rag-chat
//  * @param {string} query - The user's question
//  * @param {string} department - Optional department code (e.g. "CS", "IT")
//  */
// export const queryChatbotApi = async (query, department = "") => {
//   const params = { q: query };
//   if (department && department.trim()) {
//     params.department = department.trim().toUpperCase();
//   }
//   const res = await api.get("/calendar/rag-chat", { params });
//   return res.data; // { answer, department, sources }
// };
 
// // ─── Admin: manage calendar entries ───────────────────────────────────────────
 
// export const adminUpsertCalendarEntryApi = async (payload) => {
//   const res = await api.post("/calendar", payload);
//   return res.data;
// };
 
// export const adminListCalendarEntriesApi = async (department = "") => {
//   const params = {};
//   if (department) params.department = department;
//   const res = await api.get("/calendar", { params });
//   return res.data;
// };
 
// export const adminDeleteCalendarEntryApi = async (id) => {
//   const res = await api.delete(`/calendar/${id}`);
//   return res.data;
// };

// src/api/chatbotApi.js
import api from "./axiosInstance";

/**
 * RAG chatbot query — no department param sent from frontend.
 * Department is extracted from the question text by the backend,
 * or falls back to showing all departments if none mentioned.
 *
 * @param {string} query - The user's natural language question
 */
export const queryChatbotApi = async (query) => {
  const res = await api.get("/calendar/rag-chat", {
    params: { q: query },
    // ✅ No department param — backend detects it from the question
  });
  return res.data; // { answer, department, sources, mode }
};

// ─── Admin: manage calendar entries ──────────────────────────────────────────
export const adminUpsertCalendarEntryApi = async (payload) => {
  const res = await api.post("/calendar", payload);
  return res.data;
};

export const adminListCalendarEntriesApi = async (department = "") => {
  const params = {};
  if (department) params.department = department;
  const res = await api.get("/calendar", { params });
  return res.data;
};

export const adminDeleteCalendarEntryApi = async (id) => {
  const res = await api.delete(`/calendar/${id}`);
  return res.data;
};