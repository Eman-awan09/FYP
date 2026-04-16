// src/router/routes.jsx
import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import ProtectedRoute from "../components/common/ProtectedRoute";
import RoleGuard from "../components/common/RoleGuard";
import AppLayout from "../components/layout/AppLayout";

import { USER_ROLES } from "../constants/roles";

import LoginPage from "../pages/auth/LoginPage";
import RegisterPage from "../pages/auth/RegisterPage";
import VerifyOtpPage from "../pages/auth/VerifyOtpPage";

// Profile pages
import StudentProfilePage from "../pages/student/StudentProfilePage";
import TeacherProfilePage from "../pages/teacher/TeacherProfilePage";
import SpProfilePage from "../pages/serviceProvider/SpProfilePage";
import ServerRoomProfilePage from "../pages/serverRoom/SrProfilePage";
import AdminProfilePage from "../pages/admin/AdminProfilePage";

import StudentDashboard from "../pages/dashboard/StudentDashboard";
import TeacherDashboard from "../pages/dashboard/TeacherDashboard";
import SpDashboard from "../pages/dashboard/SpDashboard";
import SrDashboard from "../pages/dashboard/SrDashboard";
import AdminDashboard from "../pages/dashboard/AdminDashboard";

import StudentComplaintsPage from "../pages/student/StudentComplaintsPage";
import StudentEventsPage from "../pages/student/StudentEventsPage";
import StudentComplaintCreatePage from "../pages/student/StudentComplaintCreatePage";
import StudentComplaintEditPage from "../pages/student/StudentComplaintEditPage";
import StudentChatbotPage from "../pages/student/StudentChatbotPage";

import TeacherResourceRequestsPage from "../pages/teacher/TeacherResourceRequestsPage";
import TeacherResourceRequestCreatePage from "../pages/teacher/TeacherResourceRequestCreatePage";
import TeacherComplaintsPage from "../pages/teacher/TeacherComplaintsPage";
import TeacherComplaintCreatePage from "../pages/teacher/TeacherComplaintCreatePage";
import TeacherComplaintEditPage from "../pages/teacher/TeacherComplaintEditPage";
import TeacherEventsPage from "../pages/teacher/TeacherEventsPage";
import TeacherChatbotPage from "../pages/teacher/TeacherChatbotPage";
import TeacherServiceProvidersPage from "../pages/teacher/TeacherServiceProvidersPage";


import SpAssignedComplaintsPage from "../pages/serviceProvider/SpAssignedComplaintsPage";

// Server Room
import SrResourceRequestsPage from "../pages/serverRoom/SrResourceRequestsPage";
import SrResourceRequestDetailsPage from "../pages/serverRoom/SrResourceRequestDetailsPage";

// Admin
import AdminResourceRequestsPage from "../pages/admin/AdminResourceRequestsPage";
import AdminUsersPage from "../pages/admin/AdminUsersPage";
import AdminUserCreatePage from "../pages/admin/AdminUserCreatePage";
import AdminComplaintsPage from "../pages/admin/AdminComplaintsPage";
import AdminEventsPage from "../pages/admin/AdminEventsPage";
import AdminEventCreatePage from "../pages/admin/AdminEventCreatePage";
import AdminEventEditPage from "../pages/admin/AdminEventEditPage";
import AdminDepartmentCalendarPage from "../pages/admin/AdminDepartmentCalendarPage";
import Home from "../pages/landingPage/Home";
import NotFoundPage from "../pages/notFound/NotFoundPage";

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public */}
        <Route path="/" element={<Home />} />

        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/verify-otp" element={<VerifyOtpPage />} />

        {/* Protected: must be logged in */}
        <Route element={<ProtectedRoute />}>


          {/* STUDENT routes */}
          <Route element={<RoleGuard allowedRoles={[USER_ROLES.STUDENT]} />}>
            <Route
              path="/student"
              element={
                <AppLayout>
                  <StudentDashboard />
                </AppLayout>
              }
            />
            <Route
              path="/student/complaints"
              element={
                <AppLayout>
                  <StudentComplaintsPage />
                </AppLayout>
              }
            />
            <Route
              path="/student/chatbot"
              element={
                <AppLayout>
                  <StudentChatbotPage />
                </AppLayout>
              }
            />


            <Route
              path="/student/complaints/new"
              element={
                <AppLayout>
                  <StudentComplaintCreatePage />
                </AppLayout>
              }
            />
            <Route
              path="/student/complaints/:id/edit"
              element={
                <AppLayout>
                  <StudentComplaintEditPage />
                </AppLayout>
              }
            />

            <Route
              path="/student/events"
              element={
                <AppLayout>
                  <StudentEventsPage />
                </AppLayout>
              }
            />

            <Route
              path="/student/profile"
              element={
                <AppLayout>
                  <StudentProfilePage />
                </AppLayout>
              }
            />
          </Route>

          {/* TEACHER routes */}
          <Route element={<RoleGuard allowedRoles={[USER_ROLES.TEACHER]} />}>
            <Route
              path="/teacher"
              element={
                <AppLayout>
                  <TeacherDashboard />
                </AppLayout>
              }
            />
            <Route
              path="/teacher/complaints"
              element={
                <AppLayout>
                  <TeacherComplaintsPage />
                </AppLayout>
              }
            />
            <Route
              path="/teacher/complaints/new"
              element={
                <AppLayout>
                  <TeacherComplaintCreatePage />
                </AppLayout>
              }
            />
            <Route
              path="/teacher/complaints/:id/edit"
              element={
                <AppLayout>
                  <TeacherComplaintEditPage />
                </AppLayout>
              }
            />

            <Route
              path="/teacher/chatbot"
              element={
                <AppLayout>
                  <TeacherChatbotPage />
                </AppLayout>
              }
            />

            <Route
              path="/teacher/events"
              element={
                <AppLayout>
                  <TeacherEventsPage />
                </AppLayout>
              }
            />

            <Route
              path="/teacher/resource-requests"
              element={
                <AppLayout>
                  <TeacherResourceRequestsPage />
                </AppLayout>
              }
            />
            <Route
              path="/teacher/resource-requests/new"
              element={
                <AppLayout>
                  <TeacherResourceRequestCreatePage />
                </AppLayout>
              }
            />

            <Route
              path="/teacher/service-providers"
              element={
                <AppLayout>
                  <TeacherServiceProvidersPage />
                </AppLayout>
              }
            />
            <Route
              path="/teacher/profile"
              element={
                <AppLayout>
                  <TeacherProfilePage />
                </AppLayout>
              }
            />
          </Route>

          {/* SERVICE PROVIDER routes */}
          <Route
            element={
              <RoleGuard allowedRoles={[USER_ROLES.SERVICE_PROVIDER]} />
            }
          >

            <Route
              path="/service-provider"
              element={
                <AppLayout>
                  <SpDashboard />
                </AppLayout>
              }
            />
            <Route
              path="/service-provider/complaints"
              element={
                <AppLayout>
                  <SpAssignedComplaintsPage />
                </AppLayout>
              }
            />

            <Route
              path="/service-provider/profile"
              element={
                <AppLayout>
                  <SpProfilePage />
                </AppLayout>
              }
            />

          </Route>

          {/* SERVER ROOM STAFF routes */}
          <Route
            element={
              <RoleGuard allowedRoles={[USER_ROLES.SERVER_ROOM_STAFF]} />
            }
          >
            <Route
              path="/server-room"
              element={
                <AppLayout>
                  <SrDashboard />
                </AppLayout>
              }
            />

            <Route
              path="/server-room/requests"
              element={
                <AppLayout>
                  <SrResourceRequestsPage />
                </AppLayout>
              }
            />
            <Route
              path="/server-room/requests/:id"
              element={
                <AppLayout>
                  <SrResourceRequestDetailsPage />
                </AppLayout>
              }
            />
            <Route
              path="/server-room/profile"
              element={
                <AppLayout>
                  <ServerRoomProfilePage />
                </AppLayout>
              }
            />

          </Route>

          {/* ADMIN routes */}
          <Route element={<RoleGuard allowedRoles={[USER_ROLES.ADMIN]} />}>
            <Route
              path="/admin"
              element={
                <AppLayout>
                  <AdminDashboard />
                </AppLayout>
              }
            />
            <Route
              path="/admin/users"
              element={
                <AppLayout>
                  <AdminUsersPage />
                </AppLayout>
              }
            />

            <Route
              path="/admin/resource-requests"
              element={
                <AppLayout>
                  <AdminResourceRequestsPage />
                </AppLayout>
              }
            />
            <Route
              path="/admin/users/new"
              element={
                <AppLayout>
                  <AdminUserCreatePage />
                </AppLayout>
              }
            />

            <Route
              path="/admin/events"
              element={
                <AppLayout>
                  <AdminEventsPage />
                </AppLayout>
              }
            />
            <Route
              path="/admin/events/new"
              element={
                <AppLayout>
                  <AdminEventCreatePage />
                </AppLayout>
              }
            />
            <Route
              path="/admin/events/:id"
              element={
                <AppLayout>
                  <AdminEventEditPage />
                </AppLayout>
              }
            />


            <Route
              path="/admin/complaints"
              element={
                <AppLayout>
                  <AdminComplaintsPage />
                </AppLayout>
              }
            />

            <Route
              path="/admin/chatbot"
              element={
                <AppLayout>
                  <AdminDepartmentCalendarPage />
                </AppLayout>
              }
            />

            <Route
              path="/admin/profile"
              element={
                <AppLayout>
                  <AdminProfilePage />
                </AppLayout>
              }
            />
          </Route>
        </Route>

        {/* Default redirect */}
        <Route path="/" element={<Navigate to="/login" replace />} />
        {/* Explicit 404 for RoleGuard */}
        <Route path="/404" element={<NotFoundPage />} />
        {/* Catch all */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
// import React from "react";
// import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
// import ProtectedRoute from "../components/common/ProtectedRoute";
// import RoleGuard from "../components/common/RoleGuard";
// import AppLayout from "../components/layout/AppLayout";

// import { USER_ROLES } from "../constants/roles";

// import LoginPage from "../pages/auth/LoginPage";
// import RegisterPage from "../pages/auth/RegisterPage";
// import VerifyOtpPage from "../pages/auth/VerifyOtpPage";

// // Profile pages
// import StudentProfilePage from "../pages/student/StudentProfilePage";
// import TeacherProfilePage from "../pages/teacher/TeacherProfilePage";
// import SpProfilePage from "../pages/serviceProvider/SpProfilePage";
// import ServerRoomProfilePage from "../pages/serverRoom/SrProfilePage";
// import AdminProfilePage from "../pages/admin/AdminProfilePage";

// import StudentDashboard from "../pages/dashboardPlaceholder/StudentDashboard";
// import TeacherDashboard from "../pages/dashboardPlaceholder/TeacherDashboard";
// import SpDashboard from "../pages/dashboardPlaceholder/SpDashboard";
// import SrDashboard from "../pages/dashboardPlaceholder/SrDashboard";
// import AdminDashboard from "../pages/dashboardPlaceholder/AdminDashboard";

// import StudentComplaintsPage from "../pages/student/StudentComplaintsPage";
// import StudentEventsPage from "../pages/student/StudentEventsPage";
// import StudentComplaintCreatePage from "../pages/student/StudentComplaintCreatePage";
// import StudentComplaintEditPage from "../pages/student/StudentComplaintEditPage";
// import StudentChatbotPage from "../pages/student/StudentChatbotPage";

// import TeacherResourceRequestsPage from "../pages/teacher/TeacherResourceRequestsPage";
// import TeacherResourceRequestCreatePage from "../pages/teacher/TeacherResourceRequestCreatePage";
// import TeacherComplaintsPage from "../pages/teacher/TeacherComplaintsPage";
// import TeacherComplaintCreatePage from "../pages/teacher/TeacherComplaintCreatePage";
// import TeacherComplaintEditPage from "../pages/teacher/TeacherComplaintEditPage";
// import TeacherEventsPage from "../pages/teacher/TeacherEventsPage";
// import TeacherChatbotPage from "../pages/teacher/TeacherChatbotPage";
// import TeacherServiceProvidersPage from "../pages/teacher/TeacherServiceProvidersPage";

// import SpAssignedComplaintsPage from "../pages/serviceProvider/SpAssignedComplaintsPage";

// // Server Room
// import SrResourceRequestsPage from "../pages/serverRoom/SrResourceRequestsPage";
// import SrResourceRequestDetailsPage from "../pages/serverRoom/SrResourceRequestDetailsPage";

// // Admin
// import AdminResourceRequestsPage from "../pages/admin/AdminResourceRequestsPage";
// import AdminUsersPage from "../pages/admin/AdminUsersPage";
// import AdminUserCreatePage from "../pages/admin/AdminUserCreatePage";
// import AdminComplaintsPage from "../pages/admin/AdminComplaintsPage";
// import AdminEventsPage from "../pages/admin/AdminEventsPage";
// import AdminEventCreatePage from "../pages/admin/AdminEventCreatePage";
// import AdminEventEditPage from "../pages/admin/AdminEventEditPage";
// import AdminDepartmentCalendarPage from "../pages/admin/AdminDepartmentCalendarPage";
// import AdminAnalyticsPage from "../pages/admin/AdminAnalyticsPage";
// import NotFoundPage from "../pages/notFound/NotFoundPage";

// const AppRoutes = () => {
//   return (
//     <BrowserRouter>
//       <Routes>
//         {/* Public */}
//         <Route path="/login" element={<LoginPage />} />
//         <Route path="/register" element={<RegisterPage />} />
//         <Route path="/verify-otp" element={<VerifyOtpPage />} />

//         {/* Protected: must be logged in */}
//         <Route element={<ProtectedRoute />}>


//           {/* STUDENT routes */}
//           <Route element={<RoleGuard allowedRoles={[USER_ROLES.STUDENT]} />}>
//             <Route
//               path="/student"
//               element={
//                 <AppLayout>
//                   <StudentDashboard />
//                 </AppLayout>
//               }
//             />
//             <Route
//               path="/student/complaints"
//               element={
//                 <AppLayout>
//                   <StudentComplaintsPage />
//                 </AppLayout>
//               }
//             />
//             <Route
//               path="/student/chatbot"
//               element={
//                 <AppLayout>
//                   <StudentChatbotPage />
//                 </AppLayout>
//               }
//             />


//             <Route
//               path="/student/complaints/new"
//               element={
//                 <AppLayout>
//                   <StudentComplaintCreatePage />
//                 </AppLayout>
//               }
//             />
//             <Route
//               path="/student/complaints/:id/edit"
//               element={
//                 <AppLayout>
//                   <StudentComplaintEditPage />
//                 </AppLayout>
//               }
//             />

//             <Route
//               path="/student/events"
//               element={
//                 <AppLayout>
//                   <StudentEventsPage />
//                 </AppLayout>
//               }
//             />

//             <Route
//               path="/student/profile"
//               element={
//                 <AppLayout>
//                   <StudentProfilePage />
//                 </AppLayout>
//               }
//             />
//           </Route>

//           {/* TEACHER routes */}
//           <Route element={<RoleGuard allowedRoles={[USER_ROLES.TEACHER]} />}>
//             <Route
//               path="/teacher"
//               element={
//                 <AppLayout>
//                   <TeacherDashboard />
//                 </AppLayout>
//               }
//             />
//             <Route
//               path="/teacher/complaints"
//               element={
//                 <AppLayout>
//                   <TeacherComplaintsPage />
//                 </AppLayout>
//               }
//             />
//             <Route
//               path="/teacher/complaints/new"
//               element={
//                 <AppLayout>
//                   <TeacherComplaintCreatePage />
//                 </AppLayout>
//               }
//             />
//             <Route
//               path="/teacher/complaints/:id/edit"
//               element={
//                 <AppLayout>
//                   <TeacherComplaintEditPage />
//                 </AppLayout>
//               }
//             />

//             <Route
//               path="/teacher/chatbot"
//               element={
//                 <AppLayout>
//                   <TeacherChatbotPage />
//                 </AppLayout>
//               }
//             />

//             <Route
//               path="/teacher/events"
//               element={
//                 <AppLayout>
//                   <TeacherEventsPage />
//                 </AppLayout>
//               }
//             />

//             <Route
//               path="/teacher/resource-requests"
//               element={
//                 <AppLayout>
//                   <TeacherResourceRequestsPage />
//                 </AppLayout>
//               }
//             />
//             <Route
//               path="/teacher/resource-requests/new"
//               element={
//                 <AppLayout>
//                   <TeacherResourceRequestCreatePage />
//                 </AppLayout>
//               }
//             />

//             <Route
//               path="/teacher/profile"
//               element={
//                 <AppLayout>
//                   <TeacherProfilePage />
//                 </AppLayout>
//               }
//             />
//             <Route
//               path="/teacher/service-providers"
//               element={
//                 <AppLayout>
//                   <TeacherServiceProvidersPage />
//                 </AppLayout>
//               }
//             />


//           </Route>

//           {/* SERVICE PROVIDER routes */}
//           <Route
//             element={
//               <RoleGuard allowedRoles={[USER_ROLES.SERVICE_PROVIDER]} />
//             }
//           >

//             <Route
//               path="/service-provider"
//               element={
//                 <AppLayout>
//                   <SpDashboard />
//                 </AppLayout>
//               }
//             />
//             <Route
//               path="/service-provider/complaints"
//               element={
//                 <AppLayout>
//                   <SpAssignedComplaintsPage />
//                 </AppLayout>
//               }
//             />

//             <Route
//               path="/service-provider/profile"
//               element={
//                 <AppLayout>
//                   <SpProfilePage />
//                 </AppLayout>
//               }
//             />

//           </Route>

//           {/* SERVER ROOM STAFF routes */}
//           <Route
//             element={
//               <RoleGuard allowedRoles={[USER_ROLES.SERVER_ROOM_STAFF]} />
//             }
//           >
//             <Route
//               path="/server-room"
//               element={
//                 <AppLayout>
//                   <SrDashboard />
//                 </AppLayout>
//               }
//             />

//             <Route
//               path="/server-room/requests"
//               element={
//                 <AppLayout>
//                   <SrResourceRequestsPage />
//                 </AppLayout>
//               }
//             />
//             <Route
//               path="/server-room/requests/:id"
//               element={
//                 <AppLayout>
//                   <SrResourceRequestDetailsPage />
//                 </AppLayout>
//               }
//             />
//             <Route
//               path="/server-room/profile"
//               element={
//                 <AppLayout>
//                   <ServerRoomProfilePage />
//                 </AppLayout>
//               }
//             />

//           </Route>

//           {/* ADMIN routes */}
//           <Route element={<RoleGuard allowedRoles={[USER_ROLES.ADMIN]} />}>
//             <Route
//               path="/admin"
//               element={
//                 <AppLayout>
//                   <AdminDashboard />
//                 </AppLayout>
//               }
//             />
//             <Route
//               path="/admin/users"
//               element={
//                 <AppLayout>
//                   <AdminUsersPage />
//                 </AppLayout>
//               }
//             />

//             <Route
//               path="/admin/analytics"
//               element={
//                 <AppLayout>
//                   <AdminAnalyticsPage />
//                 </AppLayout>
//               }
//             />

//             <Route
//               path="/admin/resource-requests"
//               element={
//                 <AppLayout>
//                   <AdminResourceRequestsPage />
//                 </AppLayout>
//               }
//             />
//             <Route
//               path="/admin/users/new"
//               element={
//                 <AppLayout>
//                   <AdminUserCreatePage />
//                 </AppLayout>
//               }
//             />

//             <Route
//               path="/admin/events"
//               element={
//                 <AppLayout>
//                   <AdminEventsPage />
//                 </AppLayout>
//               }
//             />
//             <Route
//               path="/admin/events/new"
//               element={
//                 <AppLayout>
//                   <AdminEventCreatePage />
//                 </AppLayout>
//               }
//             />
//             <Route
//               path="/admin/events/:id"
//               element={
//                 <AppLayout>
//                   <AdminEventEditPage />
//                 </AppLayout>
//               }
//             />


//             <Route
//               path="/admin/complaints"
//               element={
//                 <AppLayout>
//                   <AdminComplaintsPage />
//                 </AppLayout>
//               }
//             />

//             <Route
//               path="/admin/chatbot"
//               element={
//                 <AppLayout>
//                   <AdminDepartmentCalendarPage />
//                 </AppLayout>
//               }
//             />

//             <Route
//               path="/admin/profile"
//               element={
//                 <AppLayout>
//                   <AdminProfilePage />
//                 </AppLayout>
//               }
//             />
//           </Route>
//         </Route>

//         {/* Default redirect */}
//         <Route path="/" element={<Navigate to="/login" replace />} />
//         {/* Explicit 404 for RoleGuard */}
//         <Route path="/404" element={<NotFoundPage />} />
//         {/* Catch all */}
//         <Route path="*" element={<NotFoundPage />} />
//       </Routes>
//     </BrowserRouter >
//   );
// };

// export default AppRoutes;