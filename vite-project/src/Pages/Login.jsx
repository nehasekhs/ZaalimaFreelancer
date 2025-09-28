import React from "react";
import "./Pages.css";

const Login = () => {
  return (
    <div className="page auth-page">
      <h1>Login to Your Account</h1>
      <p className="subtitle">Access your projects, messages, and earnings.</p>

      <form className="form large-form">
        <input type="email" placeholder="Email" />
        <input type="password" placeholder="Password" />
        <button type="submit">Login</button>
      </form>

      <p className="link-text">
        Don’t have an account? <a href="/signup">Sign Up</a>
      </p>
    </div>
  );
};

export default Login;