// import React from "react";
// import "./TeamSection.css";

// const teamMembers = [
//   {
//     image: "eman.jpg",
//     name: "Hafiz Muhammad Noor Ul Eman",
//     role: "Frontend Developer",
//   },
//   {
//     image: "hussnain.png",
//     name: "Hussnain Bhatti",
//     role: "Backend Developer",
//   },
//   {
//     image: "eman.jpg",
//     name: "Hafiz Muhammad Noor Ul Eman",
//     role: "Frontend Developer",
//   },
//   {
//     image: "hussnain.png",
//     name: "Hussnain Bhatti",
//     role: "Backend Developer",
//   },
//   {
//     image: "eman.jpg",
//     name: "Hafiz Muhammad Noor Ul Eman",
//     role: "Frontend Developer",
//   },
//   {
//     image: "hussnain.png",
//     name: "Hussnain Bhatti",
//     role: "Backend Developer",
//   },
//   {
//     image: "eman.jpg",
//     name: "Hafiz Muhammad Noor Ul Eman",
//     role: "Frontend Developer",
//   },
//   {
//     image: "hussnain.png",
//     name: "Hussnain Bhatti",
//     role: "Backend Developer",
//   },
//   {
//     image: "eman.jpg",
//     name: "Hafiz Muhammad Noor Ul Eman",
//     role: "Frontend Developer",
//   },
//   {
//     image: "hussnain.png",
//     name: "Hussnain Bhatti",
//     role: "Backend Developer",
//   },
//   {
//     image: "eman.jpg",
//     name: "Hafiz Muhammad Noor Ul Eman",
//     role: "Frontend Developer",
//   },
//   {
//     image: "hussnain.png",
//     name: "Hussnain Bhatti",
//     role: "Backend Developer",
//   },

// ];


// const TeamSection = () => {
//   return (
//     <section className="team-section">
//       {/* <h2 className="team-heading">Our Creative Team</h2> */}
//       <h2 className="team-heading">Project Team</h2>
//       <div className="team-scroll-container">
//         <div className="team-scroll-row">
//           {teamMembers.map((member, index) => (
//             <div className="team-card" key={index}>
//               <img src={member.image} alt={member.name} className="team-img" />
//               <div className="team-info">
//                 <div className="team-name">{member.name}</div>
//                 <div className="team-role">{member.role}</div>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// };

// export default TeamSection;
import React from "react";
import "./TeamSection.css";

const teamMembers = [
  {
    image: "eman.jpg",
    name: "Hafiz Muhammad Noor Ul Eman",
    role: "Frontend Developer",
  },
  {
    image: "hussnain.jpeg",
    name: "Hussnain Bhatti",
    role: "Backend Developer",
  },
  {
    image: "eman.jpg",
    name: "Hafiz Muhammad Noor Ul Eman",
    role: "Frontend Developer",
  },
  {
    image: "hussnain.jpeg",
    name: "Hussnain Bhatti",
    role: "Backend Developer",
  },
  {
    image: "eman.jpg",
    name: "Hafiz Muhammad Noor Ul Eman",
    role: "Frontend Developer",
  },
  {
    image: "hussnain.jpeg",
    name: "Hussnain Bhatti",
    role: "Backend Developer",
  },
  {
    image: "eman.jpg",
    name: "Hafiz Muhammad Noor Ul Eman",
    role: "Frontend Developer",
  },
  {
    image: "hussnain.jpeg",
    name: "Hussnain Bhatti",
    role: "Backend Developer",
  },
];

const TeamSection = () => {
  // duplicate the list to make the auto-scroll loop feel seamless
  const loopMembers = [...teamMembers, ...teamMembers];

  return (
    <section className="team-section">
      <div className="team-section__inner">
        <header className="team-header">
          <span className="team-badge">Project Team</span>
          <h2 className="team-heading">The team behind CampusHub</h2>
          <p className="team-subtitle">
            A focused team of developers building a unified platform for campus
            information, complaints and resources.
          </p>
        </header>

        <div className="team-scroll-container">
          <div className="team-scroll-row">
            {loopMembers.map((member, index) => (
              <div className="team-card" key={`${member.name}-${index}`}>
                <div className="team-avatar">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="team-img"
                  />
                </div>
                <div className="team-info">
                  <div className="team-name">{member.name}</div>
                  <div className="team-role">{member.role}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TeamSection;