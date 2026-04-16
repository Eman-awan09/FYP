// // src/pages/teacher/TeacherProfilePage.jsx
// import React, { useEffect, useState } from "react";
// import { useMyProfile } from "../../hooks/useMyProfile";
// import ProfileForm from "../../components/profile/ProfileForm";

// const TeacherProfilePage = () => {
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
//       <h2>My Profile (Teacher)</h2>
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

// export default TeacherProfilePage;

import React, { useEffect, useState } from "react";
import { useMyProfile } from "../../hooks/useMyProfile";
import ProfileForm from "../../components/profile/ProfileForm";
import { MdPerson, MdEmail, MdSchool, MdInfoOutline } from "react-icons/md";
import "./TeacherProfilePage.css";
import { toast } from 'react-toastify';

const TeacherProfilePage = () => {
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
      <div className="tp-page tp-page--center">
        <div className="tp-status-card">
          <span className="tp-spinner" />
          <p>Loading profile...</p>
        </div>
      </div>
    );
  }

  if (error && !profile) {
    return (
      <div className="tp-page tp-page--center">
        <div className="tp-status-card tp-status-card--error">
          <MdInfoOutline size={26} />
          <h2>Unable to load profile</h2>
          <p>{error}</p>
        </div>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="tp-page tp-page--center">
        <div className="tp-status-card">
          <h2>No profile data found.</h2>
          <p>Please contact administration to set up your account.</p>
        </div>
      </div>
    );
  }

  const displayName = formValues.name || profile.name || "Teacher";
  const email = formValues.email || profile.email || "";
  const department = formValues.department || profile.department || "";
    // const designation = formValues.designation || profile.designation || "";

  const role = profile.role || "TEACHER";
  const initial = (displayName || "T").trim().charAt(0).toUpperCase();

  return (
    <div className="tp-page">
      {/* Header */}
      <header className="tp-header">
        <div className="tp-header__left">
          <h1 className="tp-title">
            <MdPerson className="tp-title__icon" size={22} />
            <span>My Profile</span>
          </h1>
          <p className="tp-subtitle">
            Manage your personal and academic information. This data is used
            across complaints, resource requests, events and other modules.
          </p>
        </div>

        <div className="tp-header__meta">
          <div className="tp-meta-item">
            <span className="tp-meta-label">Role</span>
            <span className="tp-meta-value tp-meta-value--badge">{role}</span>
          </div>
          {department && (
            <div className="tp-meta-item">
              <span className="tp-meta-label">Department</span>
              <span className="tp-meta-value tp-meta-value--icon">
                <MdSchool size={14} />
                <span>{department}</span>
                 {/* {designation} */}
              </span>
            </div>
          )}
        </div>
      </header>

      {(error || localError) && (
        <div className="tp-error">
          <MdInfoOutline size={18} />
          <span>{localError || error}</span>
        </div>
      )}

      {/* Main grid: summary + form + info */}
      <section className="tp-grid">
        {/* Summary card */}
        <aside className="tp-card tp-card--summary">
          <div className="tp-avatar">
            <span>{initial}</span>
          </div>
          <h2 className="tp-name">{displayName}</h2>

          {email && (
            <p className="tp-info-line">
              <MdEmail size={16} />
              <span>{email}</span>
            </p>
          )}
          {department && (
            <p className="tp-info-line">
              <MdSchool size={16} />
              <span>{department}</span>
            </p>
          )}

          <p className="tp-note">
            Your profile is used to associate complaints and resource requests
            with the correct teacher and department.
          </p>
        </aside>

        {/* Form card */}
        <article className="tp-card tp-card--form">
          <div className="tp-card__header">
            <h2 className="tp-card__title">Edit Profile</h2>
            <p className="tp-card__subtitle">
              Update your name, contact details, department, and any other
              fields provided by your institution.
            </p>
          </div>

          <div className="tp-form-wrapper">
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
        <aside className="tp-card tp-card--side">
          <div className="tp-side-badge">Tips</div>
          <h2 className="tp-side-title">Keep your profile current</h2>
          <p className="tp-side-text">
            The system relies on your profile to automatically fill in details
            for complaints, resource requests, event registrations, and more.
          </p>

          <ul className="tp-side-list">
            <li>
              Make sure your <strong>email</strong> is correct to receive
              notifications and updates.
            </li>
            <li>
              Keep your <strong>department</strong> and designation up to date,
              especially if you change roles.
            </li>
            <li>
              If any critical field is locked or incorrect, contact your{" "}
              <strong>department coordinator or admin</strong>.
            </li>
          </ul>

          <p className="tp-side-note">
            Profile changes may take a short time to propagate across all
            modules, but they will apply to new complaints and requests you
            create.
          </p>
        </aside>
      </section>
    </div>
  );
};

export default TeacherProfilePage;