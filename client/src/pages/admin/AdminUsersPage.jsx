// // src/pages/admin/AdminUsersPage.jsx
// import React, { useEffect, useState } from "react";
// import {
//   fetchUsersApi,
//   deleteUserApi,
//   hardDeleteUserApi,
//   updateUserApi,
// } from "../../api/userApi";
// import { Link } from "react-router-dom";

// const ROLES = [
//   "STUDENT",
//   "TEACHER",
//   "SERVICE_PROVIDER",
//   "SERVER_ROOM_STAFF",
//   "ADMIN",
// ];

// const AdminUsersPage = () => {
//   const [users, setUsers] = useState([]);
//   const [roleFilter, setRoleFilter] = useState("");
//   const [search, setSearch] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [blockingId, setBlockingId] = useState(null);
//   const [deletingId, setDeletingId] = useState(null);

//   const loadUsers = async () => {
//     try {
//       setLoading(true);
//       const params = {};
//       if (roleFilter) params.role = roleFilter;
//       if (search) params.search = search;

//       const data = await fetchUsersApi(params);
//       const allUsers = data.users || [];

//       // Remove ADMIN users from the list completely
//       const nonAdminUsers = allUsers.filter((u) => u.role !== "ADMIN");

//       setUsers(nonAdminUsers);
//     } catch (error) {
//       console.error("Error loading users:", error);
//       const msg = error?.response?.data?.message || "Failed to load users.";
//       alert(msg);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     loadUsers();
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, []); // initial load

//   const handleFilterSubmit = (e) => {
//     e.preventDefault();
//     loadUsers();
//   };

//   const handleToggleBlockUser = async (userId, currentlyActive) => {
//     const user = users.find((u) => u.id === userId || u._id === userId);
//     const identifier = user?.email || user?.name || userId;

//     const action = currentlyActive ? "BLOCK" : "UNBLOCK";

//     const confirmed = window.confirm(
//       `Are you sure you want to ${action} user: ${identifier}?`
//     );
//     if (!confirmed) return;

//     try {
//       setBlockingId(userId);

//       if (currentlyActive) {
//         // Block -> soft delete (isActive = false)
//         await deleteUserApi(userId);
//       } else {
//         // Unblock -> set isActive = true via updateUser
//         await updateUserApi(userId, { isActive: true });
//       }

//       alert(
//         currentlyActive
//           ? "User blocked (deactivated) successfully."
//           : "User unblocked (activated) successfully."
//       );
//       loadUsers();
//     } catch (error) {
//       console.error("Error toggling user block state:", error);
//       const msg =
//         error?.response?.data?.message ||
//         `Failed to ${currentlyActive ? "block" : "unblock"} user.`;
//       alert(msg);
//     } finally {
//       setBlockingId(null);
//     }
//   };

//   const handleHardDeleteUser = async (userId) => {
//     const user = users.find((u) => u.id === userId || u._id === userId);
//     const identifier = user?.email || user?.name || userId;

//     const confirmed = window.confirm(
//       `Are you sure you want to PERMANENTLY DELETE user: ${identifier}? This cannot be undone.`
//     );
//     if (!confirmed) return;

//     try {
//       setDeletingId(userId);
//       await hardDeleteUserApi(userId); // hard delete from DB
//       alert("User permanently deleted.");
//       loadUsers();
//     } catch (error) {
//       console.error("Error deleting user:", error);
//       const msg =
//         error?.response?.data?.message || "Failed to delete user.";
//       alert(msg);
//     } finally {
//       setDeletingId(null);
//     }
//   };

//   return (
//     <div>
//       <h2>Admin - User Management</h2>

//       {/* Filters */}
//       <form
//         onSubmit={handleFilterSubmit}
//         style={{
//           display: "flex",
//           gap: "12px",
//           marginBottom: "16px",
//           flexWrap: "wrap",
//         }}
//       >
//         <div>
//           <label>Role</label>
//           <select
//             value={roleFilter}
//             onChange={(e) => setRoleFilter(e.target.value)}
//             style={{ marginLeft: "8px" }}
//           >
//             <option value="">All</option>
//             {ROLES.filter((r) => r !== "ADMIN").map((r) => (
//               <option key={r} value={r}>
//                 {r}
//               </option>
//             ))}
//           </select>
//         </div>

//         <div>
//           <label>Search</label>
//           <input
//             type="text"
//             placeholder="name or email"
//             value={search}
//             onChange={(e) => setSearch(e.target.value)}
//             style={{ marginLeft: "8px" }}
//           />
//         </div>

//         <button type="submit" disabled={loading}>
//           {loading ? "Filtering..." : "Apply Filters"}
//         </button>

//         <Link
//           to="/admin/users/new"
//           style={{
//             marginLeft: "auto",
//             padding: "8px 12px",
//             background: "#1976d2",
//             color: "#fff",
//             textDecoration: "none",
//             borderRadius: "4px",
//           }}
//         >
//           + Create User
//         </Link>
//       </form>

//       {/* Users Table */}
//       <div style={{ overflowX: "auto" }}>
//         <table
//           style={{
//             width: "100%",
//             borderCollapse: "collapse",
//             border: "1px solid #ddd",
//           }}
//         >
//           <thead>
//             <tr style={{ background: "#f5f5f5" }}>
//               <th style={thStyle}>Name</th>
//               <th style={thStyle}>Email</th>
//               <th style={thStyle}>Role</th>
//               <th style={thStyle}>Phone</th>
//               <th style={thStyle}>Department</th>
//               <th style={thStyle}>Status</th>
//               <th style={thStyle}>Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {loading ? (
//               <tr>
//                 <td
//                   colSpan="7"
//                   style={{ textAlign: "center", padding: "12px" }}
//                 >
//                   Loading...
//                 </td>
//               </tr>
//             ) : users.length === 0 ? (
//               <tr>
//                 <td
//                   colSpan="7"
//                   style={{ textAlign: "center", padding: "12px" }}
//                 >
//                   No users found.
//                 </td>
//               </tr>
//             ) : (
//               users.map((u) => {
//                 const userId = u.id || u._id; // backend might use _id
//                 const isActive = !!u.isActive;
//                 const blockButtonLabel = isActive ? "Block" : "Unblock";

//                 return (
//                   <tr key={userId}>
//                     <td style={tdStyle}>{u.name || "-"}</td>
//                     <td style={tdStyle}>{u.email}</td>
//                     <td style={tdStyle}>{u.role}</td>
//                     <td style={tdStyle}>{u.phone || "-"}</td>
//                     <td style={tdStyle}>{u.department || "-"}</td>
//                     <td style={tdStyle}>{isActive ? "Active" : "Inactive"}</td>
//                     <td style={tdStyle}>
//                       <div
//                         style={{
//                           display: "flex",
//                           gap: "6px",
//                           flexWrap: "wrap",
//                         }}
//                       >
//                         <button
//                           onClick={() =>
//                             handleToggleBlockUser(userId, isActive)
//                           }
//                           disabled={blockingId === userId}
//                           style={{
//                             padding: "4px 8px",
//                             background: isActive ? "#f57c00" : "#388e3c", // orange for block, green for unblock
//                             color: "#fff",
//                             border: "none",
//                             borderRadius: "4px",
//                             cursor:
//                               blockingId === userId
//                                 ? "not-allowed"
//                                 : "pointer",
//                           }}
//                         >
//                           {blockingId === userId
//                             ? isActive
//                               ? "Blocking..."
//                               : "Unblocking..."
//                             : blockButtonLabel}
//                         </button>

//                         <button
//                           onClick={() => handleHardDeleteUser(userId)}
//                           disabled={deletingId === userId}
//                           style={{
//                             padding: "4px 8px",
//                             background: "#d32f2f", // red
//                             color: "#fff",
//                             border: "none",
//                             borderRadius: "4px",
//                             cursor:
//                               deletingId === userId
//                                 ? "not-allowed"
//                                 : "pointer",
//                           }}
//                         >
//                           {deletingId === userId ? "Deleting..." : "Delete"}
//                         </button>
//                       </div>
//                     </td>
//                   </tr>
//                 );
//               })
//             )}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

// // Simple styles to keep table readable
// const thStyle = {
//   padding: "8px",
//   borderBottom: "1px solid #ddd",
//   textAlign: "left",
// };

// const tdStyle = {
//   padding: "8px",
//   borderBottom: "1px solid #eee",
// };

// export default AdminUsersPage;
import React, { useEffect, useState } from "react";
import {
  fetchUsersApi,
  deleteUserApi,
  hardDeleteUserApi,
  updateUserApi,
} from "../../api/userApi";
import { Link } from "react-router-dom";
import {
  MdPeople,
  MdRefresh,
  MdSearch,
  MdFilterList,
  MdAdd,
  MdBlock,
  MdCheckCircle,
  MdDeleteForever,
} from "react-icons/md";
import "./AdminUsersPage.css";
import { toast } from 'react-toastify';

const ROLES = [
  "STUDENT",
  "TEACHER",
  "SERVICE_PROVIDER",
  "SERVER_ROOM_STAFF",
  "ADMIN",
];

const AdminUsersPage = () => {
  const [users, setUsers] = useState([]);
  const [roleFilter, setRoleFilter] = useState("");
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [blockingId, setBlockingId] = useState(null);
  const [deletingId, setDeletingId] = useState(null);

  const loadUsers = async () => {
    try {
      setLoading(true);
      const params = {};
      if (roleFilter) params.role = roleFilter;
      if (search) params.search = search;

      const data = await fetchUsersApi(params);
      const allUsers = data.users || [];

      // Remove ADMIN users from the list completely
      const nonAdminUsers = allUsers.filter((u) => u.role !== "ADMIN");

      setUsers(nonAdminUsers);
    } catch (error) {
      console.error("Error loading users:", error);
      const msg = error?.response?.data?.message || "Failed to load users.";
      toast(msg);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadUsers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // initial load

  const handleFilterSubmit = (e) => {
    e.preventDefault();
    loadUsers();
  };

  const handleToggleBlockUser = async (userId, currentlyActive) => {
    const user = users.find((u) => u.id === userId || u._id === userId);
    const identifier = user?.email || user?.name || userId;

    const action = currentlyActive ? "BLOCK" : "UNBLOCK";

    const confirmed = window.confirm(
      `Are you sure you want to ${action} user: ${identifier}?`
    );
    if (!confirmed) return;

    try {
      setBlockingId(userId);

      if (currentlyActive) {
        // Block -> soft delete (isActive = false)
        await deleteUserApi(userId);
      } else {
        // Unblock -> set isActive = true via updateUser
        await updateUserApi(userId, { isActive: true });
      }

      toast(
        currentlyActive
          ? "User blocked (deactivated) successfully."
          : "User unblocked (activated) successfully."
      );
      loadUsers();
    } catch (error) {
      console.error("Error toggling user block state:", error);
      const msg =
        error?.response?.data?.message ||
        `Failed to ${currentlyActive ? "block" : "unblock"} user.`;
      toast(msg);
    } finally {
      setBlockingId(null);
    }
  };

  const handleHardDeleteUser = async (userId) => {
    const user = users.find((u) => u.id === userId || u._id === userId);
    const identifier = user?.email || user?.name || userId;

    const confirmed = window.confirm(
      `Are you sure you want to PERMANENTLY DELETE user: ${identifier}? This cannot be undone.`
    );
    if (!confirmed) return;

    try {
      setDeletingId(userId);
      await hardDeleteUserApi(userId); // hard delete from DB
      toast("User permanently deleted.");
      loadUsers();
    } catch (error) {
      console.error("Error deleting user:", error);
      const msg =
        error?.response?.data?.message || "Failed to delete user.";
      toast(msg);
    } finally {
      setDeletingId(null);
    }
  };

  const stats = {
    total: users.length,
    active: users.filter((u) => u.isActive).length,
    blocked: users.filter((u) => !u.isActive).length,
  };

  return (
    <div className="au-page">
      {/* Header */}
      <header className="au-header">
        <div className="au-header__left">
          <h1 className="au-title">
            <MdPeople className="au-title__icon" size={22} />
            <span>User Management</span>
          </h1>
          <p className="au-subtitle">
            View, filter and manage all non-admin users. You can block/unblock
            accounts or permanently delete them when necessary.
          </p>
        </div>

        <div className="au-header__actions">
          <button
            type="button"
            className="au-btn au-btn--ghost"
            onClick={loadUsers}
            disabled={loading}
          >
            <MdRefresh size={18} />
            <span>{loading ? "Refreshing..." : "Refresh"}</span>
          </button>
          <Link to="/admin/users/new" className="au-btn au-btn--primary">
            <MdAdd size={18} />
            <span>Create User</span>
          </Link>
        </div>
      </header>

      {/* Summary cards */}
      <section className="au-section au-summary">
        <div className="au-summary-grid">
          <article className="au-card au-card--stat">
            <div className="au-card__icon au-card__icon--neutral">
              <MdPeople />
            </div>
            <div className="au-card__body">
              <p className="au-card__label">Total Users</p>
              <p className="au-card__value">{stats.total}</p>
            </div>
          </article>

          <article className="au-card au-card--stat">
            <div className="au-card__icon au-card__icon--active">
              <MdCheckCircle />
            </div>
            <div className="au-card__body">
              <p className="au-card__label">Active</p>
              <p className="au-card__value">{stats.active}</p>
            </div>
          </article>

          <article className="au-card au-card--stat">
            <div className="au-card__icon au-card__icon--blocked">
              <MdBlock />
            </div>
            <div className="au-card__body">
              <p className="au-card__label">Blocked</p>
              <p className="au-card__value">{stats.blocked}</p>
            </div>
          </article>
        </div>
      </section>

      {/* Filters */}
      <section className="au-section">
        <form className="au-filters" onSubmit={handleFilterSubmit}>
          <div className="au-filters__group">
            <div className="au-filter-label">
              <MdFilterList size={18} />
              <span>Filters</span>
            </div>

            <div className="au-filter-controls">
              <div className="au-select">
                <label htmlFor="roleFilter">Role</label>
                <select
                  id="roleFilter"
                  value={roleFilter}
                  onChange={(e) => setRoleFilter(e.target.value)}
                >
                  <option value="">All</option>
                  {ROLES.filter((r) => r !== "ADMIN").map((r) => (
                    <option key={r} value={r}>
                      {r}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          <div className="au-search">
            <MdSearch size={18} />
            <input
              type="text"
              placeholder="Search by name or email"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="au-btn au-btn--primary au-filters__submit"
          >
            {loading ? "Filtering..." : "Apply Filters"}
          </button>
        </form>
      </section>

      {/* Users Table */}
      <section className="au-section">
        <div className="au-table-card">
          <div className="au-table__wrapper">
            <table className="au-table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Role</th>
                  <th>Phone</th>
                  <th>Department</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan={7} className="au-table__empty">
                      Loading...
                    </td>
                  </tr>
                ) : users.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="au-table__empty">
                      No users found.
                    </td>
                  </tr>
                ) : (
                  users.map((u) => {
                    const userId = u.id || u._id; // backend might use _id
                    const isActive = !!u.isActive;
                    const blockButtonLabel = isActive ? "Block" : "Unblock";

                    return (
                      <tr key={userId}>
                        <td>{u.name || "-"}</td>
                        <td>{u.email}</td>
                        <td>{u.role}</td>
                        <td>{u.phone || "-"}</td>
                        <td>{u.department || "-"}</td>
                        <td>
                          <span
                            className={`au-badge au-badge--status au-badge--${
                              isActive ? "active" : "inactive"
                            }`}
                          >
                            {isActive ? "Active" : "Inactive"}
                          </span>
                        </td>
                        <td>
                          <div className="au-actions">
                            <button
                              type="button"
                              onClick={() =>
                                handleToggleBlockUser(userId, isActive)
                              }
                              disabled={blockingId === userId}
                              className={`au-icon-chip ${
                                isActive
                                  ? "au-icon-chip--warn"
                                  : "au-icon-chip--success"
                              }`}
                              title={blockButtonLabel}
                            >
                              {blockingId === userId ? (
                                <span>
                                  {isActive ? "Blocking..." : "Unblocking..."}
                                </span>
                              ) : isActive ? (
                                <>
                                  <MdBlock size={16} />
                                  <span>Block</span>
                                </>
                              ) : (
                                <>
                                  <MdCheckCircle size={16} />
                                  <span>Unblock</span>
                                </>
                              )}
                            </button>

                            <button
                              type="button"
                              onClick={() => handleHardDeleteUser(userId)}
                              disabled={deletingId === userId}
                              className="au-icon-chip au-icon-chip--danger"
                              title="Delete user permanently"
                            >
                              {deletingId === userId ? (
                                <span>Deleting...</span>
                              ) : (
                                <>
                                  <MdDeleteForever size={16} />
                                  <span>Delete</span>
                                </>
                              )}
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AdminUsersPage;