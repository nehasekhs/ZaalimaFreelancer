import React from "react";
import { Link } from "react-router-dom";
import "./FreelancerDashboard.css";

const FreelancerDashboard = () => {
  return (
    <div className="dashboard-container">
      {/* Sidebar */}
      <div className="dashboard-wrapper">
        <aside className="sidebar">
          <h2 className="sidebar-title">Freelancer Dashboard</h2>
          <ul className="sidebar-menu">
            <li className="active">📊Dashboard</li>
            <li>📁Projects</li>
            <li>💵Earnings</li>
            <li>💬Messages</li>
            <li>⚙️Settings</li>
          </ul>
          <Link to="/" className="back-home">
            Back to Home
          </Link>
        </aside>

        {/* Main Content */}
        <main className="main-content">
          <div className="cards-grid">
            {/* Profile Summary */}
            <div className="card">
              <h3 className="card-title">Profile Summary</h3>
              <div className="profile">
                
                <div className="profile-info">
                  <h4>John Doe</h4>
                  <p className="job-title">Web Developer</p>
                  <div className="stars">★★★★★</div>
                  <p>50 projects completed</p>
                  <p className="skills">Skills: HTML, CSS, JS</p>
                </div>
              </div>
            </div>

            {/* Current Projects */}
            <div className="card">
              <h3 className="card-title">Current Projects</h3>
              <table className="projects-table">
                <thead>
                  <tr>
                    <th>Project</th>
                    <th>Progress</th>
                    <th>Payment</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Website Redesign</td>
                    <td>
                      <div className="progress-bar">
                        <div className="progress-fill two-thirds"></div>
                      </div>
                    </td>
                    <td className="pending">Pending</td>
                  </tr>
                  <tr>
                    <td>Mobile App</td>
                    <td>
                      <div className="progress-bar">
                        <div className="progress-fill full green"></div>
                      </div>
                    </td>
                    <td className="paid">Paid</td>
                  </tr>
                  <tr>
                    <td>SEO Optimization</td>
                    <td>
                      <div className="progress-bar">
                        <div className="progress-fill half"></div>
                      </div>
                    </td>
                    <td className="pending">Pending</td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Earnings Overview */}
            <div className="card">
              <h3 className="card-title">Earnings Overview</h3>
              <p className="big-text">$12,000</p>
              <p className="small-text">Pending Payments: $2,500</p>
              <div className="earnings-chart">
                <div className="bar blue">Paid</div>
                <div className="bar green">Pending</div>
              </div>
            </div>

            {/* Messages */}
            <div className="card messages-card">
              <h3 className="card-title">Messages</h3>
              <div className="message">
                {/* <img
                  src="https://via.placeholder.com/40"
                  alt="Jane"
                  className="message-img"
                /> */}
                <div className="message-info">
                  <p className="name">👤Jane Smith</p>
                  <p className="text">Best Regards</p>
                </div>
                <span className="time">52m</span>
              </div>
              <div className="message">
                {/* <img
                  src="https://via.placeholder.com/40"
                  alt="Bob"
                  className="message-img"
                /> */}

                <div className="message-info">
                  <p className="name">👤Bob Johnson</p>
                  <p className="text">Warm Regards</p>
                </div>
                <span className="time">43m</span>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default FreelancerDashboard;

