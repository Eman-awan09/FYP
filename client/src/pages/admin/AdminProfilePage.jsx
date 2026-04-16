// // src/pages/admin/AdminProfilePage.jsx
// import React, { useEffect, useState } from "react";
// import { useMyProfile } from "../../hooks/useMyProfile";
// import ProfileForm from "../../components/profile/ProfileForm";

// const AdminProfilePage = () => {
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
//       <h2>My Profile (Admin)</h2>
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

// export default AdminProfilePage;

import React, { useEffect, useState } from "react";
import { useMyProfile } from "../../hooks/useMyProfile";
import ProfileForm from "../../components/profile/ProfileForm";
import {
  MdAdminPanelSettings,
  MdEmail,
  MdInfoOutline,
} from "react-icons/md";
import "./AdminProfilePage.css";
import { toast } from 'react-toastify';

const AdminProfilePage = () => {
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
      <div className="ap-page ap-page--center">
        <div className="ap-status-card">
          <span className="ap-spinner" />
          <p>Loading profile...</p>
        </div>
      </div>
    );
  }

  if (error && !profile) {
    return (
      <div className="ap-page ap-page--center">
        <div className="ap-status-card ap-status-card--error">
          <MdInfoOutline size={26} />
          <h2>Unable to load profile</h2>
          <p>{error}</p>
        </div>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="ap-page ap-page--center">
        <div className="ap-status-card">
          <h2>No profile data found.</h2>
          <p>Please contact system administrator to set up your account.</p>
        </div>
      </div>
    );
  }

  const displayName = formValues.name || profile.name || "Admin";
  const email = formValues.email || profile.email || "";
  const role = profile.role || "ADMIN";
  const initial = (displayName || "A").trim().charAt(0).toUpperCase();

  return (
    <div className="ap-page">
      {/* Header */}
      <header className="ap-header">
        <div className="ap-header__left">
          <h1 className="ap-title">
            <MdAdminPanelSettings className="ap-title__icon" size={22} />
            <span>My Profile (Admin)</span>
          </h1>
          <p className="ap-subtitle">
            Update your admin profile information. This data is used across
            dashboards, audit logs and notifications.
          </p>
        </div>

        <div className="ap-header__meta">
          <div className="ap-meta-item">
            <span className="ap-meta-label">Role</span>
            <span className="ap-meta-value ap-meta-value--badge">{role}</span>
          </div>
        </div>
      </header>

      {(error || localError) && (
        <div className="ap-error">
          <MdInfoOutline size={18} />
          <span>{localError || error}</span>
        </div>
      )}

      {/* Main grid: summary + form + info */}
      <section className="ap-grid">
        {/* Summary card */}
        <aside className="ap-card ap-card--summary">
          <div className="ap-avatar">
            <span>{initial}</span>
          </div>
          <h2 className="ap-name">{displayName}</h2>

          {email && (
            <p className="ap-info-line">
              <MdEmail size={16} />
              <span>{email}</span>
            </p>
          )}

          <p className="ap-note">
            As an admin, your account is used to manage users, complaints,
            resource requests and system configuration. Keep your contact
            details current and secure your credentials.
          </p>
        </aside>

        {/* Form card */}
        <article className="ap-card ap-card--form">
          <div className="ap-card__header">
            <h2 className="ap-card__title">Edit Profile</h2>
            <p className="ap-card__subtitle">
              Adjust your name and optional contact information. Some fields may
              be locked depending on system configuration.
            </p>
          </div>

          <div className="ap-form-wrapper">
            <ProfileForm
              role={profile.role}
              values={formValues}
              onChange={handleChange}
              onSubmit={handleSubmit}
              submitting={saving}
            />
          </div>
        </article>

        {/* Tips card */}
        <aside className="ap-card ap-card--side">
          <div className="ap-side-badge">Tips for Admins</div>
          <h2 className="ap-side-title">Keep admin accounts secure</h2>
          <p className="ap-side-text">
            Admin accounts have elevated privileges across the system. Follow
            basic hygiene and security practices:
          </p>

          <ul className="ap-side-list">
            <li>
              Use a <strong>strong password</strong> and change it regularly.
            </li>
            <li>
              Do not share your admin credentials with other staff. Instead,
              create separate accounts with appropriate roles.
            </li>
            <li>
              Ensure your <strong>email</strong> is correct so that audit and
              security notifications reach you.
            </li>
          </ul>

          <p className="ap-side-note">
            If another administrator needs access, create an additional admin
            account through the user management module instead of sharing your
            login.
          </p>
        </aside>
      </section>
    </div>
  );
};

export default AdminProfilePage;