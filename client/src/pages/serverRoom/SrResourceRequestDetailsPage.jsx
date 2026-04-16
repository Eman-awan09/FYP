// // src/pages/serverRoom/SrResourceRequestDetailsPage.jsx
// import React, { useEffect, useState } from "react";
// import { useNavigate, useParams } from "react-router-dom";
// import {
//   fetchServerRoomResourceRequestsApi,
//   updateServerRoomResourceRequestStatusApi,
// } from "../../api/resourceRequestsApi";

// const SrResourceRequestDetailsPage = () => {
//   const { id } = useParams();
//   const navigate = useNavigate();

//   const [request, setRequest] = useState(null);
//   const [loading, setLoading] = useState(true);

//   const loadRequest = async () => {
//     try {
//       setLoading(true);
//       // Simple approach: fetch all then find by id
//       const data = await fetchServerRoomResourceRequestsApi();
//       const found = (data.requests || []).find((r) => r._id === id);
//       if (!found) {
//         alert("Request not found.");
//         navigate("/server-room/requests");
//         return;
//       }
//       setRequest(found);
//     } catch (error) {
//       console.error("Error loading request:", error);
//       const msg =
//         error?.response?.data?.message ||
//         "Failed to load resource request.";
//       alert(msg);
//       navigate("/server-room/requests");
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     loadRequest();
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [id]);

//   const handleStatusChange = async (newStatus) => {
//     const note = window.prompt(
//       `Optional: add a note for changing status to ${newStatus}`,
//       ""
//     );

//     try {
//       await updateServerRoomResourceRequestStatusApi(id, {
//         status: newStatus,
//         note,
//       });
//       alert("Status updated.");
//       // reload
//       loadRequest();
//     } catch (error) {
//       console.error("Error updating status:", error);
//       const msg =
//         error?.response?.data?.message ||
//         "Failed to update status. Please try again.";
//       alert(msg);
//     }
//   };

//   if (loading) return <div>Loading request...</div>;
//   if (!request) return null;

//   const canApproveReject = request.status === "PENDING";
//   const canComplete = request.status === "APPROVED";

//   return (
//     <div>
//       <h2>Resource Request Details</h2>

//       <p>
//         <strong>Teacher: </strong>
//         {request.requestedByTeacher
//           ? request.requestedByTeacher.name ||
//             request.requestedByTeacher.email
//           : "-"}
//       </p>
//       <p>
//         <strong>Student Roll: </strong>
//         {request.studentRollNumber}
//       </p>
//       <p>
//         <strong>Purpose: </strong>
//         {request.purpose}
//       </p>
//       <p>
//         <strong>Date/Time: </strong>
//         {new Date(request.dateTime).toLocaleString()}
//       </p>
//       <p>
//         <strong>Status: </strong>
//         {request.status}
//       </p>
//       <p>
//         <strong>Handled By: </strong>
//         {request.handledByServerRoomStaff
//           ? request.handledByServerRoomStaff.name ||
//             request.handledByServerRoomStaff.email
//           : "-"}
//       </p>

//       <h3>Resources</h3>
//       <ul>
//         {request.resources?.map((item, idx) => (
//           <li key={idx}>
//             {item.name} (x{item.quantity}){" "}
//             {item.notes ? `- ${item.notes}` : ""}
//           </li>
//         ))}
//       </ul>

//       <h3>Status Actions</h3>
//       {canApproveReject && (
//         <div style={{ marginBottom: "8px" }}>
//           <button
//             style={{ marginRight: "8px" }}
//             onClick={() => handleStatusChange("APPROVED")}
//           >
//             Approve
//           </button>
//           <button onClick={() => handleStatusChange("REJECTED")}>
//             Reject
//           </button>
//         </div>
//       )}
//       {canComplete && (
//         <button onClick={() => handleStatusChange("COMPLETED")}>
//           Mark as Completed
//         </button>
//       )}

//       <div style={{ marginTop: "16px" }}>
//         <button onClick={() => navigate("/server-room/requests")}>
//           Back to List
//         </button>
//       </div>
//     </div>
//   );
// };

// export default SrResourceRequestDetailsPage;

import React, { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import {
  fetchServerRoomResourceRequestsApi,
  updateServerRoomResourceRequestStatusApi,
} from "../../api/resourceRequestsApi";
import {
  MdStorage,
  MdArrowBack,
  MdInfoOutline,
  MdPerson,
  MdBadge,
  MdInventory2,
  MdSchedule,
  MdCheckCircle,
  MdCancel,
} from "react-icons/md";
import "./SrResourceRequestDetailsPage.css";
import { toast } from 'react-toastify';

const SrResourceRequestDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [request, setRequest] = useState(null);
  const [loading, setLoading] = useState(true);
  const [localError, setLocalError] = useState("");
  const [updating, setUpdating] = useState(false);

  const loadRequest = async () => {
    try {
      setLocalError("");
      setLoading(true);
      // Simple approach: fetch all then find by id
      const data = await fetchServerRoomResourceRequestsApi();
      const found = (data.requests || []).find((r) => r._id === id);
      if (!found) {
        toast("Request not found.");
        navigate("/server-room/requests");
        return;
      }
      setRequest(found);
    } catch (error) {
      console.error("Error loading request:", error);
      const msg =
        error?.response?.data?.message ||
        "Failed to load resource request.";
      setLocalError(msg);
      toast(msg);
      navigate("/server-room/requests");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadRequest();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const handleStatusChange = async (newStatus) => {
    const note = window.prompt(
      `Optional: add a note for changing status to ${newStatus}`,
      ""
    );

    try {
      setUpdating(true);
      await updateServerRoomResourceRequestStatusApi(id, {
        status: newStatus,
        note,
      });
      toast("Status updated.");
      loadRequest();
    } catch (error) {
      console.error("Error updating status:", error);
      const msg =
        error?.response?.data?.message ||
        "Failed to update status. Please try again.";
      setLocalError(msg);
      toast(msg);
    } finally {
      setUpdating(false);
    }
  };

  if (loading && !request) {
    return (
      <div className="srd-page srd-page--center">
        <div className="srd-status-card">
          <span className="srd-spinner" />
          <p>Loading request...</p>
        </div>
      </div>
    );
  }

  if (!request) return null;

  const canApproveReject = request.status === "PENDING";
  const canComplete = request.status === "APPROVED";

  const teacherName = request.requestedByTeacher
    ? request.requestedByTeacher.name || request.requestedByTeacher.email
    : "-";
  const handledBy =
    request.handledByServerRoomStaff &&
    (request.handledByServerRoomStaff.name ||
      request.handledByServerRoomStaff.email);

  return (
    <div className="srd-page">
      {/* Header */}
      <header className="srd-header">
        <div className="srd-header__left">
          <button
            type="button"
            className="srd-icon-btn"
            onClick={() => navigate("/server-room/requests")}
            aria-label="Back to Requests"
          >
            <MdArrowBack size={18} />
          </button>

          <div className="srd-header__titles">
            <h1 className="srd-title">
              <MdStorage className="srd-title__icon" size={22} />
              <span>Resource Request Details</span>
            </h1>
            <p className="srd-subtitle">
              Review the full details of this resource request and update its
              status as you process it.
            </p>
          </div>
        </div>

        <div className="srd-header__meta">
          <div className="srd-meta-item">
            <span className="srd-meta-label">Request ID</span>
            <span className="srd-meta-value srd-meta-value--mono">
              {request._id}
            </span>
          </div>
          <div className="srd-meta-item">
            <span className="srd-meta-label">Status</span>
            <span
              className={`srd-meta-badge srd-meta-badge--${(request.status ||
                "").toLowerCase()}`}
            >
              {request.status}
            </span>
          </div>
        </div>
      </header>

      {localError && (
        <div className="srd-error">
          <MdInfoOutline size={18} />
          <span>{localError}</span>
        </div>
      )}

      {/* Main grid: summary + resources + actions */}
      <section className="srd-grid">
        {/* Summary card */}
        <article className="srd-card srd-card--summary">
          <div className="srd-summary-row">
            <div className="srd-summary-icon">
              <MdPerson size={20} />
            </div>
            <div className="srd-summary-body">
              <p className="srd-summary-label">Teacher</p>
              <p className="srd-summary-value">{teacherName}</p>
            </div>
          </div>

          <div className="srd-summary-row">
            <div className="srd-summary-icon">
              <MdBadge size={20} />
            </div>
            <div className="srd-summary-body">
              <p className="srd-summary-label">Student Roll</p>
              <p className="srd-summary-value">
                {request.studentRollNumber || "-"}
              </p>
            </div>
          </div>

          <div className="srd-summary-row">
            <div className="srd-summary-icon">
              <MdSchedule size={20} />
            </div>
            <div className="srd-summary-body">
              <p className="srd-summary-label">Requested Date/Time</p>
              <p className="srd-summary-value">
                {new Date(request.dateTime).toLocaleString()}
              </p>
            </div>
          </div>

          <div className="srd-summary-row">
            <div className="srd-summary-icon">
              <MdInventory2 size={20} />
            </div>
            <div className="srd-summary-body">
              <p className="srd-summary-label">Handled By</p>
              <p className="srd-summary-value">{handledBy || "-"}</p>
            </div>
          </div>
        </article>

        {/* Details card */}
        <article className="srd-card srd-card--details">
          <div className="srd-card__header">
            <h2 className="srd-card__title">Request Details</h2>
            <p className="srd-card__subtitle">
              Purpose and list of resources required for this request.
            </p>
          </div>

          <div className="srd-section-block">
            <h3>Purpose</h3>
            <p className="srd-purpose">{request.purpose}</p>
          </div>

          <div className="srd-section-block">
            <h3>Resources</h3>
            <ul className="srd-resources">
              {request.resources?.map((item, idx) => (
                <li key={idx} className="srd-resources__item">
                  <span className="srd-resources__name">
                    {item.name} (x{item.quantity})
                  </span>
                  {item.notes && (
                    <span className="srd-resources__notes">
                      – {item.notes}
                    </span>
                  )}
                </li>
              ))}
            </ul>
          </div>

          <div className="srd-section-block">
            <h3>Created</h3>
            <p className="srd-meta-text">
              {new Date(request.createdAt).toLocaleString()}
            </p>
          </div>
        </article>

        {/* Status actions / tips */}
        <aside className="srd-card srd-card--actions">
          <h2 className="srd-card__title">Status Actions</h2>
          <p className="srd-card__subtitle">
            Change the status based on the stage of handling. Add a note when
            you update the status so that teachers and admins understand what
            was done.
          </p>

          {/* Buttons */}
          <div className="srd-actions">
            {canApproveReject && (
              <div className="srd-actions__row">
                <button
                  type="button"
                  className="srd-btn-status srd-btn-status--approve"
                  disabled={updating}
                  onClick={() => handleStatusChange("APPROVED")}
                >
                  <MdCheckCircle size={18} />
                  <span>
                    {updating ? "Updating..." : "Approve Request"}
                  </span>
                </button>
                <button
                  type="button"
                  className="srd-btn-status srd-btn-status--reject"
                  disabled={updating}
                  onClick={() => handleStatusChange("REJECTED")}
                >
                  <MdCancel size={18} />
                  <span>Reject</span>
                </button>
              </div>
            )}

            {canComplete && (
              <button
                type="button"
                className="srd-btn-status srd-btn-status--complete"
                disabled={updating}
                onClick={() => handleStatusChange("COMPLETED")}
              >
                {updating ? "Updating..." : "Mark as Completed"}
              </button>
            )}

            {!canApproveReject && !canComplete && (
              <p className="srd-status-note">
                This request is already in <strong>{request.status}</strong>{" "}
                state. If needed, contact admin to adjust the status.
              </p>
            )}
          </div>

          <div className="srd-back-link">
            <button
              type="button"
              className="srd-back-btn"
              onClick={() => navigate("/server-room/requests")}
            >
              <MdArrowBack size={16} />
              <span>Back to Requests</span>
            </button>
          </div>
        </aside>
      </section>
    </div>
  );
};

export default SrResourceRequestDetailsPage;