// src/api/calendarApi.js
import api from "./axiosInstance";

export const upsertDepartmentCalendarEntryApi = async (payload) => {
  const res = await api.post("/calendar", payload);
  return res.data;
};

export const listDepartmentCalendarEntriesApi = async (params = {}) => {
  const res = await api.get("/calendar", { params });
  return res.data;
};

export const deleteDepartmentCalendarEntryApi = async (id) => {
  const res = await api.delete(`/calendar/${id}`);
  return res.data;
};