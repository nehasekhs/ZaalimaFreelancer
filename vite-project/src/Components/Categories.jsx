import React from "react";
import Marquee from "react-fast-marquee";
import "./Categories.css";
// import"./Pages.css";

export default function Categories() {
  // You can replace these images with your own URLs
  const categories = [
    {
      name: "Web Development",
      img: "https://cdn-icons-png.flaticon.com/512/919/919827.png",
    },
    {
      name: "Graphic Design",
      img: "https://cdn-icons-png.flaticon.com/512/1055/1055687.png",
    },
    {
      name: "Digital Marketing",
      img: "https://cdn-icons-png.flaticon.com/512/3135/3135715.png",
    },
    {
      name: "Content Writing",
      img: "https://cdn-icons-png.flaticon.com/512/3135/3135719.png",
    },
    {
      name: "Video Editing",
      img: "https://cdn-icons-png.flaticon.com/512/847/847969.png",
    },
    {
      name: "Mobile App",
      img: "https://cdn-icons-png.flaticon.com/512/919/919836.png",
    },
  ];

  return (
    <section className="categories-section">
        <div className="categories-container">
      <h2 className="categories-title">Explore Categories</h2>
      <Marquee
        gradient={false}
        speed={40}
        pauseOnHover={true}
        className="categories-marquee"
      >
        {categories.map((cat, index) => (
          <div key={index} className="category-card">
            <img src={cat.img} alt={cat.name} className="category-img" />
            <p className="category-name">{cat.name}</p>
          </div>
        ))}
      </Marquee>
      </div>
    </section>
  );
}