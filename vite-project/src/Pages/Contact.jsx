import React from "react";
import "./Pages.css";

const Contact = () => {
  return (
    <div className="page">
      <h1>Contact Us</h1>
      <p className="subtitle">
        We’d love to hear from you. Fill out the form below or reach us at
        support@zaalima.in
      </p>

      <form className="form large-form">
        <input type="text" placeholder="Full Name" />
        <input type="email" placeholder="Email Address" />
        <textarea rows="5" placeholder="Your Message"></textarea>
        <button type="submit">Send Message</button>
      </form>

      <div className="contact-info">
        <div>
          <h3>Address</h3>
          <p>Electronic City Bangalore,Karnataka</p>
        </div>
        <div>
          <h3>Phone</h3>
          <p>+91 8277035909</p>
        </div>
      </div>
    </div>
  );
};

export default Contact;