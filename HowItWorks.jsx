

import React, { useState } from "react";
import "./HowItWorks.css";
// import { FaUserCheck, FaSearch, FaHandshake, FaCheckCircle } from "react-icons/fa";

const steps = [
  {
    // icon: <FaUserCheck />,
    title: "Sign Up",
    description: "Create your free account as a freelancer or client to get started."
  },
  {
    // icon: <FaSearch />,
    title: "Browse & Post Gigs",
    description: "Freelancers browse jobs, and clients post projects easily."
  },
  {
    // icon: <FaHandshake />,
    title: "Collaborate",
    description: "Communicate and collaborate securely through our platform."
  },
  {
    // icon: <FaCheckCircle />,
    title: "Complete & Review",
    description: "Finish the job, leave reviews, and build your profile reputation."
  }
];

export default function HowItWorks() {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleStep = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section className="howitworks-section">
      <h2 className="howitworks-heading">How It Works</h2>
      <div className="howitworks-list">
        {steps.map((step, index) => (
          <div key={index} className="howitworks-item">
            <button
              className="howitworks-button"
              onClick={() => toggleStep(index)}
            >
              <span className="howitworks-icon">{step.icon}</span>
              <span className="howitworks-title">{step.title}</span>
            </button>
            {activeIndex === index && (
              <p className="howitworks-description">{step.description}</p>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}

