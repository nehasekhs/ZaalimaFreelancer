import React from 'react';
import './LearnMore.css';

function LearnMore() {
  return (
    <div className="learn-more">
      <header className="learn-header">
        <h1>Learn About Gig Connectors</h1>
        <p>
          We connect skilled freelancers with clients across industries.  
          Hiring and working with freelancers is simple, secure, and efficient.
        </p>
      </header>

      <section className="how-it-works">
        <h2>How It Works</h2>
        <div className="steps">
          <div className="step">
            <h3>1. Sign Up</h3>
            <p>Create your free account as a freelancer or client.</p>
          </div>
          <div className="step">
            <h3>2. Post / Browse Projects</h3>
            <p>Clients post jobs, freelancers apply to them.</p>
          </div>
          <div className="step">
            <h3>3. Hire or Get Hired</h3>
            <p>Secure payments and project tracking all in one place.</p>
          </div>
        </div>
      </section>

      <section className="benefits">
        <h2>Benefits</h2>
        <div className="benefits-grid">
          <div className="benefit-box">
            <h3>For Freelancers</h3>
            <ul>
              <li>Access to 1000+ projects</li>
              <li>Secure and fast payments</li>
              <li>Grow your portfolio</li>
            </ul>
          </div>
          <div className="benefit-box">
            <h3>For Clients</h3>
            <ul>
              <li>Hire skilled professionals</li>
              <li>Competitive pricing</li>
              <li>Easy project management</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="cta">
        <h2>Ready to Start?</h2>
        <button onClick={() => window.location.href='/signup'} className="cta-btn">Sign Up Now</button>
      </section>
    </div>
  );
}

export default LearnMore;