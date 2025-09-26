


import React from "react";
import "./FreelancerSection.css";

const freelancers = [

  {
    name: "Arav Khan",
    role: "UI/UX Designer",
    experience: "4+ years",
    rating: 4.8,
    url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSx1Ao71wwwDHLi2iEQpADidDgWThpTfRSZkQ&s"
  },

  {
    name: "Madhura jadhav",
    role: "video editor",
    experience: "3+ years",
    rating: 4.5,
    url: "https://st4.depositphotos.com/2600593/27296/i/450/depositphotos_272969482-stock-photo-young-woman-video-editor-working.jpg"
  },
    {
    name: "Ramya Shinde",
    role: "Virtual Assistant",
    experience: "6+ years",
    rating: 4.7,
    url: "https://media.istockphoto.com/id/1289220781/photo/portrait-of-happy-smiling-woman-at-desk.jpg?s=612x612&w=0&k=20&c=FtC05luuxRpiKRj5F84e2CiPf0h_ZuX6o7o5JwlNaJM="
  },

 {
    name: "Harry Doe",
    role: "frontend Devloper",
    experience: "5+ years",
    rating: 4.9,
    url: "https://t3.ftcdn.net/jpg/06/33/80/44/360_F_633804450_DWH5bj77LdDwlCSvMcqy6qVk4j9kchT3.jpg"
  }

];

const FreelancerSection = () => {
  return (
    <section className="freelancer-section">
      <h2 className="freelancer-title">Top Rated Talent</h2>
      <div className="freelancer-grid">
        {freelancers.map((freelancer, index) => (
          <div key={index} className="freelancer-card">
            <img
              src={freelancer.url}
              alt={freelancer.name}
              className="freelancer-image"
            />
            <div className="freelancer-info">
              <h3>{freelancer.name}</h3>
              <p className="role">{freelancer.role}</p>
              <p>{freelancer.experience}</p>
              <p>{freelancer.projects}</p>
              <p className="rating">⭐ {freelancer.rating}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FreelancerSection;