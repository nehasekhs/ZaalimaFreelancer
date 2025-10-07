

import React from "react";
import { useNavigate } from "react-router-dom";
import "./FindWorkMenu.css";

export default function FindWorkMenu() {
  const navigate = useNavigate();

  const categories = [
    { title: "Website Jobs", route: "/website-job" },
    { title: "Mobile App Development Jobs", route: "/mobile-app" },
    { title: "Graphic Design Jobs", route: "/graphic" },
    { title: "Data Entry Jobs", route: "/data-entry" },
    { title: "Internet Marketing Jobs", route: "/internet-marketing" },
    { title: "SEO Jobs", route: "/seo" },
    { title: "Writing Jobs", route: "/writing" },
    { title: "Local Jobs", route: "/local" },
    { title: "Software Development Jobs", route: "/software-dev" }
  ];
  const handleCardClick = (route) =>{
    if(!isLoggedIn){
        navigate("/signup",{state:{from:route}});
    }
    else{
        navigate(route);
    }
  }

  return (
    <div className="findwork-dropdown">
      <div className="findwork-grid">
        {categories.map((cat, index) => (
          <div
            key={index}
            className="findwork-card"
            onClick={() => navigate(cat.route)}
          >
            <span className="findwork-card-title">{cat.title}</span>
          </div>
        ))}
      </div>
    </div>
  );
}