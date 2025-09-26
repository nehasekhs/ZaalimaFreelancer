
import { useState } from "react";
import "./Profile.css";

export default function Profile() {
  const [formData, setFormData] = useState({
    name: "John Doe",
    title: "Full-Stack Developer",
    skills: "React, Node.js, MongoDB",
    portfolioLink: "https://myportfolio.com"
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Profile updated! (connect to backend here)");
  };

  const handleDelete = () => {
    alert("Profile deleted! (connect to backend here)");
  };

  return (
    <div className="profile-page">
      <h1>Your Profile</h1>
      <p>Edit your details, skills and portfolio below.</p>
      <div className="profile-card">
        <form onSubmit={handleSubmit}>
          <label>Name</label>
          <input
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
          <label>Professional Title</label>
          <input
            name="title"
            value={formData.title}
            onChange={handleChange}
          />
          <label>Skills</label>
          <textarea
            name="skills"
            rows="3"
            value={formData.skills}
            onChange={handleChange}
          />
          <label>Portfolio Link</label>
          <input
            name="portfolioLink"
            value={formData.portfolioLink}
            onChange={handleChange}
          />

          <div className="button-group">
            <button type="submit" className="submit-btn">Save Changes</button>
            <button
              type="button"
              className="delete-btn"
              onClick={handleDelete}
            >
              Delete Profile
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}