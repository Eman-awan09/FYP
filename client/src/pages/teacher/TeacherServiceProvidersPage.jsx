// src/pages/teacher/TeacherServiceProvidersPage.jsx
import React, { useEffect, useState } from "react";
import { MdBuild, MdInfoOutline } from "react-icons/md";
import { fetchServiceProvidersForTeacherApi } from "../../api/userApi";
import "./TeacherServiceProvidersPage.css";
import { toast } from 'react-toastify';

const TeacherServiceProvidersPage = () => {
  const [serviceProviders, setServiceProviders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const loadServiceProviders = async () => {
    try {
      setError("");
      setLoading(true);
      const data = await fetchServiceProvidersForTeacherApi();
      setServiceProviders(data.users || []);
    } catch (error) {
      console.error("Error loading service providers:", error);
      const msg =
        error?.response?.data?.message ||
        "Failed to load service providers.";
      setError(msg);
      toast(msg);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadServiceProviders();
  }, []);

  return (
    <div className="tsp-page">
      {/* Header */}
      <header className="tsp-header">
        <div className="tsp-header__left">
          <h1 className="tsp-title">
            <MdBuild className="tsp-title__icon" size={22} />
            <span>Service Providers Directory</span>
          </h1>
          <p className="tsp-subtitle">
            Read‑only list of service providers assigned to your campus. Use
            this directory to know who is handling IT, maintenance and other
            services.
          </p>
        </div>
      </header>

      {/* Info banner */}
      <div className="tsp-info">
        <MdInfoOutline size={18} />
        <span>
          This directory is maintained by the administration. For any changes
          (e.g., phone numbers or specialization), please contact your admin
          office.
        </span>
      </div>

      {/* Error banner */}
      {error && (
        <div className="tsp-error">
          <MdInfoOutline size={18} />
          <span>{error}</span>
        </div>
      )}

      {/* Table card */}
      <section className="tsp-section">
        <article className="tsp-card">
          <div className="tsp-card__header">
            <h2 className="tsp-card__title">Directory</h2>
            <p className="tsp-card__subtitle">
              Names, contact details, departments and specializations of service
              providers.
            </p>
          </div>

          <div className="tsp-table__wrapper">
            <table className="tsp-table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Department</th>
                  <th>Specialization</th>
                  <th>Phone</th>
                  <th>Office Location</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan={6} className="tsp-table__empty">
                      Loading service providers...
                    </td>
                  </tr>
                ) : serviceProviders.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="tsp-table__empty">
                      No service providers found.
                    </td>
                  </tr>
                ) : (
                  serviceProviders.map((sp) => (
                    <tr key={sp._id}>
                      <td>{sp.name || "-"}</td>
                      <td>{sp.email}</td>
                      <td>{sp.department || "-"}</td>
                      <td>{sp.specialization || "-"}</td>
                      <td>{sp.phone || "-"}</td>
                      <td>{sp.officeLocation || sp.campusOrBuilding || "-"}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </article>
      </section>
    </div>
  );
};

export default TeacherServiceProvidersPage;