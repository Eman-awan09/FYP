// src/components/layout/roleSidebarConfig.js
import { USER_ROLES } from "../../constants/roles";

export const roleSidebarConfig = {
  [USER_ROLES.STUDENT]: [
    { label: "Dashboard", path: "/student" },
    { label: "Complaints", path: "/student/complaints" },
    { label: "Events", path: "/student/events" },
    { label: "Chatbot", path: "/student/chatbot" },
    { label: "Profile", path: "/student/profile" },
  ],
  [USER_ROLES.TEACHER]: [
    { label: "Dashboard", path: "/teacher" },
    { label: "Complaints", path: "/teacher/complaints" },
    { label: "Resource Requests", path: "/teacher/resource-requests" },
    { label: "Events", path: "/teacher/events" },
    { label: "Chatbot", path: "/teacher/chatbot" },
    { label: "Service Providers", path: "/teacher/service-providers" },
    { label: "Profile", path: "/teacher/profile" },
  ],
  [USER_ROLES.SERVICE_PROVIDER]: [
    { label: "Dashboard", path: "/service-provider" },
    { label: "Assigned Complaints", path: "/service-provider/complaints" },
    { label: "Profile", path: "/service-provider/profile" },
  ],
  [USER_ROLES.SERVER_ROOM_STAFF]: [
    { label: "Dashboard", path: "/server-room" },
    { label: "Resource Requests", path: "/server-room/requests" },
    { label: "Profile", path: "/server-room/profile" },
  ],
  [USER_ROLES.ADMIN]: [
    { label: "Dashboard", path: "/admin" },
    { label: "Users", path: "/admin/users" },
    { label: "Complaints", path: "/admin/complaints" },
    { label: "Resource Requests", path: "/admin/resource-requests" },
    { label: "Events", path: "/admin/events" },
    { label: "Dept Calendar / Chatbot", path: "/admin/chatbot" },
    { label: "Profile", path: "/admin/profile" },
  ],
};