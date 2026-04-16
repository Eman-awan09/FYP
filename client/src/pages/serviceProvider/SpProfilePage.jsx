// // src/pages/serviceProvider/SpProfilePage.jsx
// import React, { useEffect, useState } from "react";
// import { useMyProfile } from "../../hooks/useMyProfile";
// import ProfileForm from "../../components/profile/ProfileForm";

// const SpProfilePage = () => {
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
//       <h2>My Profile (Service Provider)</h2>
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

// export default SpProfilePage;

import React, { useEffect, useState } from "react";
import { useMyProfile } from "../../hooks/useMyProfile";
import ProfileForm from "../../components/profile/ProfileForm";
import { MdBuild, MdEmail, MdInfoOutline, MdBusiness } from "react-icons/md";
import "./SpProfilePage.css";
import { toast } from 'react-toastify';

const SpProfilePage = () => {
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
      <div className="sp-page sp-page--center">
        <div className="sp-status-card">
          <span className="sp-spinner" />
          <p>Loading profile...</p>
        </div>
      </div>
    );
  }

  if (error && !profile) {
    return (
      <div className="sp-page sp-page--center">
        <div className="sp-status-card sp-status-card--error">
          <MdInfoOutline size={26} />
          <h2>Unable to load profile</h2>
          <p>{error}</p>
        </div>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="sp-page sp-page--center">
        <div className="sp-status-card">
          <h2>No profile data found.</h2>
          <p>Please contact administration to set up your service provider account.</p>
        </div>
      </div>
    );
  }

  const displayName = formValues.name || profile.name || "Service Provider";
  const email = formValues.email || profile.email || "";
  const specialization = formValues.specialization || profile.specialization || "";
  const campusOrBuilding =
    formValues.campusOrBuilding || profile.campusOrBuilding || "";
  const role = profile.role || "SERVICE_PROVIDER";
  const initial = (displayName || "S").trim().charAt(0).toUpperCase();

  return (
    <div className="sp-page">
      {/* Header */}
      <header className="sp-header">
        <div className="sp-header__left">
          <h1 className="sp-title">
            <MdBuild className="sp-title__icon" size={22} />
            <span>My Profile (Service Provider)</span>
          </h1>
          <p className="sp-subtitle">
            Manage your service provider profile. Your details are used when
            admins assign complaints and when users see who resolved their
            issues.
          </p>
        </div>

        <div className="sp-header__meta">
          <div className="sp-meta-item">
            <span className="sp-meta-label">Role</span>
            <span className="sp-meta-value sp-meta-value--badge">{role}</span>
          </div>
        </div>
      </header>

      {(error || localError) && (
        <div className="sp-error">
          <MdInfoOutline size={18} />
          <span>{localError || error}</span>
        </div>
      )}

      {/* Main grid: summary + form + tips */}
      <section className="sp-grid">
        {/* Summary card */}
        <aside className="sp-card sp-card--summary">
          <div className="sp-avatar">
            <span>{initial}</span>
          </div>
          <h2 className="sp-name">{displayName}</h2>

          {email && (
            <p className="sp-info-line">
              <MdEmail size={16} />
              <span>{email}</span>
            </p>
          )}
          {specialization && (
            <p className="sp-info-line">
              <MdBuild size={16} />
              <span>{specialization}</span>
            </p>
          )}
          {campusOrBuilding && (
            <p className="sp-info-line">
              <MdBusiness size={16} />
              <span>{campusOrBuilding}</span>
            </p>
          )}

          <p className="sp-note">
            Your specialization and location help admins route complaints to the
            correct person or team (e.g., Network, Electrical, Main Campus).
          </p>
        </aside>

        {/* Editable form */}
        <article className="sp-card sp-card--form">
          <div className="sp-card__header">
            <h2 className="sp-card__title">Edit Profile</h2>
            <p className="sp-card__subtitle">
              Update your name, phone, specialization and building/campus.
              Accurate details make complaint assignment smoother.
            </p>
          </div>

          <div className="sp-form-wrapper">
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
        <aside className="sp-card sp-card--side">
          <div className="sp-side-badge">Tips</div>
          <h2 className="sp-side-title">Help the system route work to you</h2>
          <p className="sp-side-text">
            The more accurate your profile, the easier it is for admins to
            assign complaints correctly and for users to know who helped them.
          </p>

          <ul className="sp-side-list">
            <li>
              Keep your <strong>specialization</strong> clear: e.g., “Network
              Support”, “Electrical Maintenance”, “HVAC”.
            </li>
            <li>
              Update your <strong>campus / building</strong> when you move
              locations or change assigned areas.
            </li>
            <li>
              Make sure your <strong>phone</strong> is correct so admins and
              staff can contact you for urgent complaints.
            </li>
          </ul>

          <p className="sp-side-note">
            Changes here will reflect the next time admins or the system decide
            which service provider to assign for new complaints.
          </p>
        </aside>
      </section>
    </div>
  );
};

export default SpProfilePage;