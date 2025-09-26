import React from "react";
import Sidebar from "../Components/Sidebar";
import { Outlet } from "react-router-dom";

const FreelancerDashboardLayout = () => {
  return (
    <div className="dashboard-container">
      <aside className="siderbar">
      <Sidebar />
      </aside>
      <div className="dashboard-content">
        <Outlet /> {/* This will render nested routes */}
      </div>
    </div>
  );
};

export default FreelancerDashboardLayout;