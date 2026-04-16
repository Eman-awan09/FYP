// // src/pages/student/StudentProfilePage.jsx
// import React, { useEffect, useState } from "react";
// import { useMyProfile } from "../../hooks/useMyProfile";
// import ProfileForm from "../../components/profile/ProfileForm";

// const StudentProfilePage = () => {
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
//     const { success, message } = await saveProfile(formValues);
//     alert(message);
//     // optionally: if not success, you can also highlight errors in UI
//   };

//   if (loading && !profile) return <div>Loading profile...</div>;
//   if (error && !profile) return <div style={{ color: "red" }}>{error}</div>;
//   if (!profile) return <div>No profile data found.</div>;

//   return (
//     <div>
//       <h2>My Profile (Student)</h2>
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

// export default StudentProfilePage;

// src/pages/student/StudentProfilePage.jsx
import React, { useEffect, useState } from "react";
import { useMyProfile } from "../../hooks/useMyProfile";
import ProfileForm from "../../components/profile/ProfileForm";
import { MdPerson, MdEmail, MdSchool, MdInfoOutline } from "react-icons/md";
import "./StudentProfilePage.css";
import { toast } from 'react-toastify';

const StudentProfilePage = () => {
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
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLocalError("");

    // keep backend logic contract the same, just handle errors a bit better
    const { message, error: saveError, success } = await saveProfile(formValues);

    if (saveError) {
      setLocalError(saveError);
      toast(saveError);
    } else if (message) {
      toast(message);
    } else if (success === false) {
      // fallback in case backend returns success flag without message
      setLocalError("Failed to save profile. Please try again.");
      toast("Failed to save profile. Please try again.");
    }
  };

  // Loading state (no profile yet)
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

  // Fatal error state (no profile to show)
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

  // No profile at all
  if (!profile) {
    return (
      <div className="sp-page sp-page--center">
        <div className="sp-status-card">
          <h2>No profile data found.</h2>
          <p>Please contact your campus administration to set up your account.</p>
        </div>
      </div>
    );
  }

  // Derived display fields for the summary card
  const displayName = formValues.name || profile.name || "Student";
  const email = formValues.email || profile.email || "";
  const department = formValues.department || profile.department || "";
  const role = profile.role || "STUDENT";
  const initial = (displayName || "S").trim().charAt(0).toUpperCase();

  return (
    <div className="sp-page">
      {/* Header */}
      <header className="sp-header">
        <div className="sp-header__left">
          <h1 className="sp-title">
            <MdPerson className="sp-title__icon" size={22} />
            <span>My Profile</span>
          </h1>
          <p className="sp-subtitle">
            Manage your personal and academic details. This information is used
            across campus info, complaints, and resource desk modules.
          </p>
        </div>

        <div className="sp-header__meta">
          <div className="sp-meta-item">
            <span className="sp-meta-label">Role</span>
            <span className="sp-meta-value sp-meta-value--badge">{role}</span>
          </div>
          {department && (
            <div className="sp-meta-item">
              <span className="sp-meta-label">Department</span>
              <span className="sp-meta-value sp-meta-value--icon">
                <MdSchool size={14} />
                <span>{department}</span>
              </span>
            </div>
          )}
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
          {department && (
            <p className="sp-info-line">
              <MdSchool size={16} />
              <span>{department}</span>
            </p>
          )}

          <p className="sp-note">
            Your profile is used to link complaints, resource downloads,
            and other activities with the correct student and department.
          </p>
        </aside>

        {/* Form card */}
        <article className="sp-card sp-card--form">
          <div className="sp-card__header">
            <h2 className="sp-card__title">Edit Profile</h2>
            <p className="sp-card__subtitle">
              Update your name, contact information, program, and other details
              provided by your institution.
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
          <h2 className="sp-side-title">Why your profile matters</h2>
          <p className="sp-side-text">
            The system uses your profile to auto-fill information for campus
            services such as complaints, resource desk downloads, and event
            registrations.
          </p>

          <ul className="sp-side-list">
            <li>
              Make sure your <strong>email</strong> is correct so you receive
              notifications and status updates.
            </li>
            <li>
              Keep your <strong>department</strong> and program accurate for
              department‑specific resources and announcements.
            </li>
            <li>
              If any important field is locked or wrong, contact your{" "}
              <strong>department office or campus admin</strong>.
            </li>
          </ul>

          <p className="sp-side-note">
            Profile updates may take a short time to reflect everywhere, but new
            complaints and requests will use your latest details.
          </p>
        </aside>
      </section>
    </div>
  );
};

export default StudentProfilePage;