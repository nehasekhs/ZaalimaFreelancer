import React from 'react';
import './dashboard.css';

function ProfileSummary({ user }) {
  return (
    <div className="card">
      <h2>Welcome, {user.name}</h2>
      <p>This is your profile summary.</p>
      <p>Add your bio, skills, and experience here.</p>
    </div>
  );
}

export default ProfileSummary;