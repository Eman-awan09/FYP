// src/pages/admin/AdminAnalyticsPage.jsx
import React, { useEffect, useState } from "react";
import {
  fetchComplaintAnalyticsApi,
  fetchResourceRequestAnalyticsApi,
} from "../../api/adminAnalyticsApi";

const AdminAnalyticsPage = () => {
  const [complaintStats, setComplaintStats] = useState(null);
  const [requestStats, setRequestStats] = useState(null);
  const [loading, setLoading] = useState(false);

  const loadAnalytics = async () => {
    try {
      setLoading(true);
      const [cData, rData] = await Promise.all([
        fetchComplaintAnalyticsApi(),
        fetchResourceRequestAnalyticsApi(),
      ]);
      setComplaintStats(cData);
      setRequestStats(rData);
    } catch (error) {
      console.error("Error loading analytics:", error);
      const msg =
        error?.response?.data?.message || "Failed to load analytics.";
      alert(msg);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadAnalytics();
  }, []);

  return (
    <div>
      <h2>Admin - Analytics</h2>
      {loading && <p>Loading analytics...</p>}

      {/* High-level KPI cards */}
      <div
        style={{
          display: "flex",
          gap: "16px",
          flexWrap: "wrap",
          marginBottom: "24px",
        }}
      >
        {complaintStats && (
          <StatCard
            title="Total Complaints (all time)"
            value={complaintStats.totalComplaints}
          />
        )}
        {requestStats && (
          <StatCard
            title="Total Resource Requests (all time)"
            value={requestStats.totalRequests}
          />
        )}
        {complaintStats &&
          complaintStats.avgResolutionTimeHours != null && (
            <StatCard
              title="Avg Complaint Resolution Time (hrs)"
              value={complaintStats.avgResolutionTimeHours.toFixed(2)}
            />
          )}
        {requestStats &&
          requestStats.avgCompletionTimeHours != null && (
            <StatCard
              title="Avg Request Completion Time (hrs)"
              value={requestStats.avgCompletionTimeHours.toFixed(2)}
            />
          )}
      </div>

      {/* Complaints analytics */}
      {complaintStats && (
        <div style={{ marginBottom: "24px" }}>
          <h3>Complaints Overview</h3>
          <div
            style={{ display: "flex", gap: "24px", flexWrap: "wrap" }}
          >
            <SimpleTable
              title="Complaints by Status"
              headers={["Status", "Count"]}
              rows={objectToRows(complaintStats.byStatus)}
            />
            <SimpleTable
              title="Complaints by Priority"
              headers={["Priority", "Count"]}
              rows={objectToRows(complaintStats.byPriority)}
            />
            <SimpleTable
              title="Complaints by Creator Role"
              headers={["Role", "Count"]}
              rows={objectToRows(complaintStats.byCreatorRole)}
            />
          </div>

          <div style={{ marginTop: "16px" }}>
            <h4>
              Complaints by Department (Creator) – Last{" "}
              {complaintStats.periodDays} days
            </h4>
            <SimpleTable
              title=""
              headers={["Department", "Count"]}
              rows={complaintStats.byDepartment.map((d) => [
                d.department,
                d.count,
              ])}
            />
          </div>
        </div>
      )}

      {/* Resource Requests analytics */}
      {requestStats && (
        <div>
          <h3>Resource Requests Overview</h3>
          <div
            style={{ display: "flex", gap: "24px", flexWrap: "wrap" }}
          >
            <SimpleTable
              title="Requests by Status"
              headers={["Status", "Count"]}
              rows={objectToRows(requestStats.byStatus)}
            />
            <SimpleTable
              title={`Requests by Teacher Department – Last ${requestStats.periodDays} days`}
              headers={["Department", "Count"]}
              rows={requestStats.byTeacherDepartment.map((d) => [
                d.department,
                d.count,
              ])}
            />
          </div>
        </div>
      )}
    </div>
  );
};

const StatCard = ({ title, value }) => (
  <div
    style={{
      minWidth: "200px",
      padding: "12px",
      border: "1px solid #ddd",
      borderRadius: "4px",
      background: "#fafafa",
    }}
  >
    <div style={{ fontSize: "12px", color: "#777" }}>{title}</div>
    <div style={{ fontSize: "20px", fontWeight: "bold", marginTop: "4px" }}>
      {value}
    </div>
  </div>
);

const SimpleTable = ({ title, headers, rows }) => (
  <div style={{ minWidth: "260px" }}>
    {title && <h4>{title}</h4>}
    <table
      style={{
        width: "100%",
        borderCollapse: "collapse",
        border: "1px solid #ddd",
        fontSize: "13px",
      }}
    >
      <thead>
        <tr style={{ background: "#f5f5f5" }}>
          {headers.map((h) => (
            <th
              key={h}
              style={{
                padding: "6px",
                borderBottom: "1px solid #ddd",
                textAlign: "left",
              }}
            >
              {h}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {rows.length === 0 ? (
          <tr>
            <td
              colSpan={headers.length}
              style={{ textAlign: "center", padding: "6px" }}
            >
              No data
            </td>
          </tr>
        ) : (
          rows.map((row, idx) => (
            <tr key={idx}>
              {row.map((cell, i) => (
                <td
                  key={i}
                  style={{
                    padding: "6px",
                    borderBottom: "1px solid #eee",
                  }}
                >
                  {cell}
                </td>
              ))}
            </tr>
          ))
        )}
      </tbody>
    </table>
  </div>
);

const objectToRows = (obj) =>
  Object.entries(obj || {}).map(([key, value]) => [key, value]);

export default AdminAnalyticsPage;