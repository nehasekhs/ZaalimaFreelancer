import React from "react";
import "./HeroSection.css";
import {useNavigate} from 'react-router-dom';


export default function HeroSection() {
  return (
    <section className="hero">
      <div className="hero-container">
        {/* Left Content */}
        <div className="hero-text">
          <h1 className="hero-title">Welcome to Gig Connectors</h1>
          <p>
            Connect with top freelancers and clients. Hire or get hired easily
            with our platform.
          </p>
          <div className="hero-buttons">
            <button onClick={() => window.location.href='/login'}className="btn btn-primary" >Get Started</button>
            <button onClick={() => window.location.href='/LearnMore'} className="btn btn-outline">Learn More</button>
          </div>

          <div className="info-cards">
            <div className="cardH">
              <h3>1000+ Freelancers</h3>
              <p>Skilled professionals ready to work</p>
            </div>
            <div className="cardH">
              <h3>500+ Projects</h3>
              <p>Active opportunities across industries</p>
            </div>
          </div>
        </div>

        {/* Right Image
        <div className="hero-image">
          <img
            src="https://images.pexels.com/photos/5429004/pexels-photo-5429004.jpeg   "
            alt="Freelance work"
          />
        </div> */}
      </div>
    </section>
  );
}