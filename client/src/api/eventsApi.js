// src/api/eventsApi.js
import api from "./axiosInstance";

// Public (Student/Teacher/Admin): get active events
export const fetchEventsApi = async () => {
  const res = await api.get("/events");
  return res.data; // { events }
};

// Admin: list all events (including inactive)
export const fetchAdminEventsApi = async () => {
  const res = await api.get("/events/admin");
  return res.data; // { events }
};

// Admin: create event
export const createEventApi = async (payload) => {
  const res = await api.post("/events", payload);
  return res.data; // { message, event }
};

// Admin: get event by id
export const fetchEventByIdApi = async (id) => {
  const res = await api.get(`/events/${id}`);
  return res.data; // { event }
};

// Admin: update event
export const updateEventApi = async (id, payload) => {
  const res = await api.put(`/events/${id}`, payload);
  return res.data; // { message, event }
};

// Admin: delete event
export const deleteEventApi = async (id) => {
  const res = await api.delete(`/events/${id}`);
  return res.data; // { message }
};