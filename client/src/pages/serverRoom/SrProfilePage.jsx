// // src/pages/serverRoom/SrProfilePage.jsx
// import React, { useEffect, useState } from "react";
// import { useMyProfile } from "../../hooks/useMyProfile";
// import ProfileForm from "../../components/profile/ProfileForm";

// const SrProfilePage = () => {
//   const { profile, loading, saving, error, saveProfile } = useMyProfile();
//   const [formValues, setFormValues] = useState({});

//   useEffect(() => {
//     if (profile) {
//       setFormValues(profile);
//     }
//   }, [profile]);

//   const handleChange = (field, value) => {
//     setFormValues((prev) => ({ ...prev, [field]: value }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const { message } = await saveProfile(formValues);
//     alert(message);
//   };

//   if (loading && !profile) {
//     return <div>Loading profile...</div>;
//   }

//   if (error && !profile) {
//     return <div style={{ color: "red" }}>{error}</div>;
//   }

//   if (!profile) {
//     return <div>No profile data found.</div>;
//   }

//   return (
//     <div>
//       <h2>My Profile (Server Room Staff)</h2>
//       {error && (
//         <div style={{ color: "red", marginBottom: "8px" }}>{error}</div>
//       )}
//       <ProfileForm
//         role={profile.role}
//         values={formValues}
//         onChange={handleChange}
//         onSubmit={handleSubmit}
//         submitting={saving}
//       />
//     </div>
//   );
// };

// export default SrProfilePage;

import React, { useEffect, useState } from "react";
import { useMyProfile } from "../../hooks/useMyProfile";
import ProfileForm from "../../components/profile/ProfileForm";
import {
  MdStorage,
  MdEmail,
  MdInfoOutline,
  MdApartment,
} from "react-icons/md";
import "./SrProfilePage.css";
import { toast } from 'react-toastify';

const SrProfilePage = () => {
  const { profile, loading, saving, error, saveProfile } = useMyProfile();
  const [formValues, setFormValues] = useState({});
  const [localError, setLocalError] = useState("");

  useEffect(() => {
    if (profile) {
      setFormValues(profile);
    }
  }, [profile]);

  const handleChange = (field, value) => {
    setFormValues((prev) => ({ ...prev, [field]: value }));
    if (localError) setLocalError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLocalError("");
    const { message, error: saveError } = await saveProfile(formValues);
    if (saveError) {
      setLocalError(saveError);
      toast(saveError);
    } else if (message) {
      toast(message);
    }
  };

  if (loading && !profile) {
    return (
      <div className="srp-page srp-page--center">
        <div className="srp-status-card">
          <span className="srp-spinner" />
          <p>Loading profile...</p>
        </div>
      </div>
    );
  }

  if (error && !profile) {
    return (
      <div className="srp-page srp-page--center">
        <div className="srp-status-card srp-status-card--error">
          <MdInfoOutline size={26} />
          <h2>Unable to load profile</h2>
          <p>{error}</p>
        </div>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="srp-page srp-page--center">
        <div className="srp-status-card">
          <h2>No profile data found.</h2>
          <p>Please contact administration to set up your server-room account.</p>
        </div>
      </div>
    );
  }

  const displayName = formValues.name || profile.name || "Server Room Staff";
  const email = formValues.email || profile.email || "";
  const specialization = formValues.specialization || profile.specialization || "";
  const campusOrBuilding =
    formValues.campusOrBuilding || profile.campusOrBuilding || "";
  const role = profile.role || "SERVER_ROOM_STAFF";
  const initial = (displayName || "S").trim().charAt(0).toUpperCase();

  return (
    <div className="srp-page">
      {/* Header */}
      <header className="srp-header">
        <div className="srp-header__left">
          <h1 className="srp-title">
            <MdStorage className="srp-title__icon" size={22} />
            <span>My Profile (Server Room Staff)</span>
          </h1>
          <p className="srp-subtitle">
            Manage your server room profile. These details are used in resource
            request handling and logs, so teachers know who processed their
            requests.
          </p>
        </div>

        <div className="srp-header__meta">
          <div className="srp-meta-item">
            <span className="srp-meta-label">Role</span>
            <span className="srp-meta-value srp-meta-value--badge">{role}</span>
          </div>
        </div>
      </header>

      {(error || localError) && (
        <div className="srp-error">
          <MdInfoOutline size={18} />
          <span>{localError || error}</span>
        </div>
      )}

      {/* Main grid: summary + form + tips */}
      <section className="srp-grid">
        {/* Summary */}
        <aside className="srp-card srp-card--summary">
          <div className="srp-avatar">
            <span>{initial}</span>
          </div>
          <h2 className="srp-name">{displayName}</h2>

          {email && (
            <p className="srp-info-line">
              <MdEmail size={16} />
              <span>{email}</span>
            </p>
          )}
          {specialization && (
            <p className="srp-info-line">
              <MdStorage size={16} />
              <span>{specialization}</span>
            </p>
          )}
          {campusOrBuilding && (
            <p className="srp-info-line">
              <MdApartment size={16} />
              <span>{campusOrBuilding}</span>
            </p>
          )}

          <p className="srp-note">
            Your specialization and building/campus help the system and admins
            know which lab or area you support (e.g., Main Campus CS Block,
            Network Room).
          </p>
        </aside>

        {/* Editable form */}
        <article className="srp-card srp-card--form">
          <div className="srp-card__header">
            <h2 className="srp-card__title">Edit Profile</h2>
            <p className="srp-card__subtitle">
              Update your name, phone, specialization and campus/building.
              Accurate data supports efficient routing of resource requests.
            </p>
          </div>

          <div className="srp-form-wrapper">
            <ProfileForm
              role={profile.role}
              values={formValues}
              onChange={handleChange}
              onSubmit={handleSubmit}
              submitting={saving}
            />
          </div>
        </article>

        {/* Tips */}
        <aside className="srp-card srp-card--side">
          <div className="srp-side-badge">Tips</div>
          <h2 className="srp-side-title">Support smooth lab operations</h2>
          <p className="srp-side-text">
            As server room staff, you are responsible for ensuring requested
            resources are available and functioning when needed.
          </p>

          <ul className="srp-side-list">
            <li>
              Keep your <strong>specialization</strong> clear (e.g., “Network
              Infrastructure”, “Lab Equipment”, “Audio/Visual”).
            </li>
            <li>
              Maintain the correct <strong>campus or building</strong> so
              requests from that area are routed correctly to you.
            </li>
            <li>
              Use the resource request details page to{" "}
              <strong>update status and add notes</strong>, keeping teachers
              informed.
            </li>
          </ul>

          <p className="srp-side-note">
            If you move to a different building or your responsibilities
            change, make sure to update your profile or inform the admin to
            adjust your account.
          </p>
        </aside>
      </section>
    </div>
  );
};

export default SrProfilePage;