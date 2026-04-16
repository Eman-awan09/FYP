// import React, { useEffect, useRef } from "react";
// import "./ProjectGallery.css";
// import gsap from "gsap";

// // const projects = [
// //   {
// //     title: "Hanubu",
// //     image:
// //       "https://cdn.prod.website-files.com/67fbf7c5cc41cb226348d97c/684990e3f855db1a69e94062_hanubu-image-min.avif",
// //     tags: ["Automotive", "Series A", "United Kingdom"],
// //   },
// //   {
// //     title: "Marco",
// //     image:
// //       "https://cdn.prod.website-files.com/67fbf7c5cc41cb226348d97c/68c40ce248088eb9945d661f_marco-one.avif",
// //     tags: ["SaaS", "Pre-Seed", "United Kingdom"],
// //   },
// //   {
// //     title: "RootPe",
// //     image:
// //       "https://cdn.prod.website-files.com/67fbf7c5cc41cb226348d97c/68c40d7149dc6a36da6408b2_rootpe-one.avif",
// //     tags: ["PayTech", "Seed", "India / US"],
// //   },
// //   {
// //     title: "Paddle",
// //     image:
// //       "https://cdn.prod.website-files.com/67fbf7c5cc41cb226348d97c/6849937249192440feb7e3fd_paddle.avif",
// //     tags: ["PayTech", "Series D", "Global"],
// //   },
// //   {
// //     title: "Softr",
// //     image:
// //       "https://cdn.prod.website-files.com/67fbf7c5cc41cb226348d97c/6849990e98ef0f1b3aad0f92_softr.avif",
// //     tags: ["SaaS", "Series A", "Germany"],
// //   },
// //   {
// //     title: "FileWorld",
// //     image:
// //       "https://cdn.prod.website-files.com/67fbf7c5cc41cb226348d97c/68499847fd9cfad46bc95aaf_file.avif",
// //     tags: ["SaaS", "Seed", "Switzerland"],
// //   },
// //   {
// //     title: "Cole-James",
// //     image:
// //       "https://cdn.prod.website-files.com/67fbf7c5cc41cb226348d97c/68c40d3b739057f8aaa585bb_cj-one.avif",
// //     tags: ["Recruitment", "Early Stage", "United Kingdom"],
// //   },
// // ];

// const projects = [
//   {
//     title: "Campus Information Portal",
//     image: "https://cdn.pixabay.com/photo/2016/11/21/15/10/students-1845906_1280.jpg", // students walking
//     tags: ["Campus Info", "Students", "Web Portal"],
//   },
//   {
//     title: "Online Complaint Management",
//     image: "https://images.pexels.com/photos/3184325/pexels-photo-3184325.jpeg", // students outdoors discussion
//     tags: ["Complaints", "Resolution", "Workflow System"],
//   },
//   {
//     title: "Student Resource Desk",
//     image: "https://images.pexels.com/photos/3861954/pexels-photo-3861954.jpeg", // students on laptop
//     tags: ["Resources", "Support", "Learning Tools"],
//   },
//   {
//     title: "Admin Dashboard",
//     image: "https://cdn.pixabay.com/photo/2018/05/08/08/27/monitor-3386264_1280.jpg", // generic dashboard (Pixabay)
//     tags: ["Admin", "Monitoring", "Stats"],
//   },
//   {
//     title: "Complaint Tracking System",
//     image: "https://images.pexels.com/photos/4145197/pexels-photo-4145197.jpeg", // students in classroom
//     tags: ["Tracking", "Status Updates", "User Feedback"],
//   },
//   {
//     title: "User Login & Authentication",
//     image: "https://cdn.pixabay.com/photo/2019/08/11/18/59/virtual-4393277_1280.jpg", // login/security
//     tags: ["Login", "Security", "Access Control"],
//   },
//   {
//     title: "Reports & Analytics",
//     image: "https://cdn.pixabay.com/photo/2019/06/12/18/36/graph-4270288_1280.jpg", // report analytics
//     tags: ["Analytics", "Reports", "Insights"],
//   },
// ];




// export default function ProjectGallery({ active }) {
//   const galleryRef = useRef(null);

//   useEffect(() => {
//     const slides = galleryRef.current.querySelectorAll(".project-card");
//     slides.forEach((slide, i) => {
//       slide.style.display = i === active ? "block" : "none";
//     });

//     gsap.fromTo(
//       slides[active],
//       { opacity: 0, y: 30, scale: 0.96 },
//       { opacity: 1, y: 0, scale: 1, duration: 0.8, ease: "power3.out" }
//     );
//   }, [active]);

//   return (
//     <div className="project-gallery" ref={galleryRef}>
//       {projects.map((project, i) => (
//         <div
//           key={i}
//           className={`project-card ${i === active ? "active" : ""}`}
//         >
//           <div className="project-card-inner">
//             <div className="project-image-wrapper">
//               <img src={project.image} alt={project.title} />
//             </div>
//             <div className="project-info">
//               <h2>{project.title}</h2>
//               <div className="tags">
//                 {project.tags.map((tag, idx) => (
//                   <span key={idx}>{tag}</span>
//                 ))}
//               </div>
//             </div>
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// }
// src/components/projects/ProjectGallery.jsx
import React, { useEffect, useRef } from "react";
import "./ProjectGallery.css";
import gsap from "gsap";

const projects = [
  {
    title: "Unified Campus Overview",
    image:
      "https://images.pexels.com/photos/256431/pexels-photo-256431.jpeg?auto=compress&cs=tinysrgb&w=1200",
    tags: ["Campus Map", "Announcements", "Departments"],
  },
  {
    title: "Online Complaint Management",
    image:
      "https://images.pexels.com/photos/1181555/pexels-photo-1181555.jpeg?auto=compress&cs=tinysrgb&w=1200",
    tags: ["Complaints", "Resolution", "Workflow"],
  },
  {
    title: "Student Resource Desk",
    image:
      "https://images.pexels.com/photos/4145353/pexels-photo-4145353.jpeg?auto=compress&cs=tinysrgb&w=1200",
    tags: ["Notes", "Papers", "Digital Resources"],
  },
  {
    title: "Admin Control Dashboard",
    image:
      "https://images.pexels.com/photos/6476584/pexels-photo-6476584.jpeg?auto=compress&cs=tinysrgb&w=1200",
    tags: ["Admin", "Monitoring", "Roles"],
  },
  {
    title: "Complaint Tracking Timeline",
    image:
      "https://images.pexels.com/photos/1181467/pexels-photo-1181467.jpeg?auto=compress&cs=tinysrgb&w=1200",
    tags: ["Tracking", "Status Updates", "Feedback"],
  },
  {
    title: "Secure Login & Authentication",
    image:
      "https://images.pexels.com/photos/5380642/pexels-photo-5380642.jpeg?auto=compress&cs=tinysrgb&w=1200",
    tags: ["Login", "Security", "Access Control"],
  },
  {
    title: "Reports & Analytics",
    image:
      "https://images.pexels.com/photos/669619/pexels-photo-669619.jpeg?auto=compress&cs=tinysrgb&w=1200",
    tags: ["Analytics", "Reports", "Insights"],
  },
];

export default function ProjectGallery({ active }) {
  const galleryRef = useRef(null);

  useEffect(() => {
    const el = galleryRef.current;
    if (!el) return;

    const slides = el.querySelectorAll(".project-card");
    slides.forEach((slide, i) => {
      slide.style.display = i === active ? "block" : "none";
    });

    if (slides[active]) {
      gsap.fromTo(
        slides[active],
        { opacity: 0, y: 30, scale: 0.96 },
        { opacity: 1, y: 0, scale: 1, duration: 0.8, ease: "power3.out" }
      );
    }
  }, [active]);

  return (
    <div className="project-gallery" ref={galleryRef}>
      {projects.map((project, i) => (
        <div
          key={i}
          className={`project-card ${i === active ? "active" : ""}`}
        >
          <div className="project-card-inner">
            <div className="project-image-wrapper">
              <img src={project.image} alt={project.title} />
            </div>
            <div className="project-info">
              <span className="project-pill">CampusHub Module</span>
              <h2>{project.title}</h2>
              <div className="tags">
                {project.tags.map((tag, idx) => (
                  <span key={idx}>{tag}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}