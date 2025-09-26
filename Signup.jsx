import React from "react";
import "./Pages.css";

const Signup = () => {
  return (
    <div className="page auth-page">
      <h1>Create an Account</h1>
      <p className="subtitle">
        Join thousands of freelancers and clients today.
      </p>

      <form className="form large-form">
        <input type="text" placeholder="Full Name" />
        <input type="email" placeholder="Email Address" />
        <input type="password" placeholder="Password" />
        <select>
          <option>Freelancer</option>
          <option>Client</option>
        </select>
        <button type="submit">Sign Up</button>
      </form>

      <p className="link-text">
        Already have an account? <a href="/login">Login</a>
      </p>
    </div>
  );
};

export default Signup;