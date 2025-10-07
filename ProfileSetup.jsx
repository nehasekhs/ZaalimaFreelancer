import React, { useState } from 'react';
import './dashboard.css';

function ProfileSetup({ setUser }) {
  const [step, setStep] = useState(1);
  const [profile, setProfile] = useState({
    skills: '',
    experience: '',
    hourlyRate: '',
    portfolio: '',
  });

  const handleNext = () => {
    if(step < 3) setStep(step + 1);
    else {
      setUser(prev => ({ ...prev, isProfileComplete: true }));
    }
  };

  return (
    <div className="dark-theme dashboard-container">
      <h2>Complete Your Freelancer Profile</h2>
      {step === 1 && (
        <div>
          <label>Skills:</label>
          <input type="text" value={profile.skills} onChange={(e) => setProfile({...profile, skills: e.target.value})} />
        </div>
      )}
      {step === 2 && (
        <div>
          <label>Experience Level:</label>
          <select value={profile.experience} onChange={(e) => setProfile({...profile, experience: e.target.value})}>
            <option value="">Select</option>
            <option>Beginner</option>
            <option>Intermediate</option>
            <option>Expert</option>
          </select>
        </div>
      )}
      {step === 3 && (
        <div>
          <label>Hourly Rate ($):</label>
          <input type="number" value={profile.hourlyRate} onChange={(e) => setProfile({...profile, hourlyRate: e.target.value})} />
          <label>Portfolio Link:</label>
          <input type="text" value={profile.portfolio} onChange={(e) => setProfile({...profile, portfolio: e.target.value})} />
        </div>
      )}
      <button onClick={handleNext}>{step < 3 ? "Next" : "Finish"}</button>
    </div>
  );
}

export default ProfileSetup;